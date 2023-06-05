import logging
from resources import Resource
import random
from enum import Enum
import noise
import numpy as np
from PIL import Image
import time
from generated_comm_files import backend_api_pb2


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


THRESHOLD = 20


class Region:
    def __init__(
            self,
            topLeftXCoordinate,
            topLeftYCoordinate,
            topRightXCoordinate,
            topRightYCoordinate,
            bottomLeftXCoordinate,
            bottomLeftYCoordinate,
            bottomRightXCoordinate,
            bottomRightYCoordinate):
        self.topLeftXCoordinate = int(topLeftXCoordinate)
        self.topLeftYCoordinate = int(topLeftYCoordinate)
        self.topRightXCoordinate = int(topRightXCoordinate)
        self.topRightYCoordinate = int(topRightYCoordinate)
        self.bottomLeftXCoordinate = int(bottomLeftXCoordinate)
        self.bottomLeftYCoordinate = int(bottomLeftYCoordinate)
        self.bottomRightXCoordinate = int(bottomRightXCoordinate)
        self.bottomRightYCoordinate = int(bottomRightYCoordinate)

        logging.info(
            f"Initializing new region:\n" +
            f"\ttopLeftXCoordinate: {self.topLeftXCoordinate}\n" +
            f"\ttopLeftYCoordinate: {self.topLeftYCoordinate}\n" +
            f"\ttopRightXCoordinate: {self.topRightXCoordinate}\n" +
            f"\ttopRightYCoordinate: {self.topRightYCoordinate}\n" +
            f"\tbottomLeftXCoordinate: {self.bottomLeftXCoordinate}\n" +
            f"\tbottomLeftYCoordinate: {self.bottomLeftYCoordinate}\n" +
            f"\tbottomRightXCoordinate: {self.bottomRightXCoordinate}\n" +
            f"\tbottomRightYCoordinate: {self.bottomRightYCoordinate}\n")

    def save(self):
        return {
            'topLeftXCoordinate': self.topLeftXCoordinate,
            'topLeftYCoordinate': self.topLeftYCoordinate,
            'topRightXCoordinate': self.topRightXCoordinate,
            'topRightYCoordinate': self.topRightYCoordinate,
            'bottomLeftXCoordinate': self.bottomLeftXCoordinate,
            'bottomLeftYCoordinate': self.bottomLeftYCoordinate,
            'bottomRightXCoordinate': self.bottomRightXCoordinate,
            'bottomRightYCoordinate': self.bottomRightYCoordinate,
        }


class TopographyPreset:
    def __init__(
            self,
            name,
            elevationAmplitude,
            resourceDensity,
            resourceReplenishment,
            resourceColor,
            resourceShape,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info(f"Defining new topography preset of type {name}")
            self.name = name
            self.elevationAmplitude = elevationAmplitude
            self.resourceDensity = resourceDensity
            self.resourceReplenishment = resourceReplenishment
            self.resourceColor = resourceColor
            self.resourceShape = resourceShape
        else:
            logging.info("Loading topography preset")
            self.name = saveData['name']
            self.elevationAmplitude = saveData['elevationAmplitude']
            self.resourceDensity = saveData['resourceDensity']
            self.resourceReplenishment = saveData['resourceReplenishment']
            self.resourceColor = saveData['resourceColor']
            self.resourceShape = saveData['resourceShape']

    def save(self):
        logging.info(f"Saving topography preset {self.name}")
        return {
            "name": self.name,
            "elevationAmplitude": self.elevationAmplitude,
            "resourceDensity": self.resourceDensity,
            "resourceReplenishment": self.resourceReplenishment,
            "resourceColor": self.resourceColor,
            "resourceShape": self.resourceShape,
        }


class Topography:
    def __init__(
            self,
            topLeftXCoordinate,
            topLeftYCoordinate,
            topRightXCoordinate,
            topRightYCoordinate,
            bottomLeftXCoordinate,
            bottomLeftYCoordinate,
            bottomRightXCoordinate,
            bottomRightYCoordinate,
            id,
            column,
            row,
            topographyPreset,
            environment,
            loadExistingSave=False, saveData=None):
        if not loadExistingSave:
            logging.info(f"Creating new topography with id {id}")
            self.id = id
            self.column = column
            self.row = row
            self.type = topographyPreset.name
            self.resourceRarity = topographyPreset.resourceDensity
            self.resourceReplenishment = topographyPreset.resourceReplenishment
            self.resourceColor = topographyPreset.resourceColor
            self.resourceShape = topographyPreset.resourceShape

            self.region = Region(
                topLeftXCoordinate,
                topLeftYCoordinate,
                topRightXCoordinate,
                topRightYCoordinate,
                bottomLeftXCoordinate,
                bottomLeftYCoordinate,
                bottomRightXCoordinate,
                bottomRightYCoordinate)
            self.shape = (int(bottomLeftYCoordinate - topLeftYCoordinate),
                          int(topRightXCoordinate - topLeftXCoordinate))
            self.environment = environment

            # Initialize resources based on topography type
            if self.type != "unselected":
                self.generateResources()

            # Register to environment
            # if topographyType != TemplateTopography.UNSELECTED:
                # self.environment.addToTopographyRegistry(self)
        else:
            logging.info(f"Loading existing topography")
            self.id = saveData['id']
            self.column = saveData['column']
            self.row = saveData['row']
            self.type = saveData['type']
            self.resourceRarity = saveData['resourceRarity']
            self.resourceReplenishment = saveData['resourceReplenishment']
            self.resourceColor = saveData['resourceColor']
            self.resourceShape = saveData['resourceShape']

            self.region = Region(saveData['region']['topLeftXCoordinate'],
                                 saveData['region']['topLeftYCoordinate'],
                                 saveData['region']['topRightXCoordinate'],
                                 saveData['region']['topRightYCoordinate'],
                                 saveData['region']['bottomLeftXCoordinate'],
                                 saveData['region']['bottomLeftYCoordinate'],
                                 saveData['region']['bottomRightXCoordinate'],
                                 saveData['region']['bottomRightYCoordinate'])
            self.shape = saveData['shape']
            #self.geography = saveData['geography']
            self.environment = environment
            # self.environment.addToTopographyRegistry(self)

    def serialize(self):
        return {
            'id': self.id,
            'column': self.column,
            'row': self.row,
            'type': self.type,
            'color': self.resourceColor,
        }

    def getDetails(self):
        return backend_api_pb2.TopographyInfo(
            id=self.id,
            row=self.row,
            column=self.column,
            type=f'{self.type}',
            color=self.resourceColor
        )

    def save(self):
        logging.info(f"Saving topography {self.id}")
        return {
            'id': self.id,
            'column': self.column,
            'row': self.row,
            'type': self.type,
            'shape': self.shape,
            'region': self.region.save(),
            'resourceRarity': self.resourceRarity,
            'resourceReplenishment': self.resourceReplenishment,
            'resourceColor': self.resourceColor,
            'resourceShape': self.resourceShape
        }

    # Using perlin-noise to create random geography
    # (https://en.wikipedia.org/wiki/Perlin_noise)
    # Unfortunately, due to time constraints, we were not able to fully implement this functionality.
    # def generateRandomGeography(self):
    #    scale = 100.0
    #    octaves = 6
    #    lacunarity = 2.0
    #    persistence = 0.0
#
    #    if self.type == TemplateTopography.FLAT:
    #        persistence = 1.0
    #    elif self.type == TemplateTopography.MILD:
    #        persistence = 0.8
    #    elif self.type == TemplateTopography.MODERATE:
    #        persistence = 0.6
    #    elif self.type == TemplateTopography.EXTREME:
    #        persistence = 0.4
    #    else:
    #        logging.info("Unknown topography type encountered")
    #        persistence = 0.5
#
    #    # Generate a random seed to use with the Perlin noise generator
    #    random.seed(time.time())
    #    seed = int(random.random() * 1_000)
#
    #    geography = np.zeros(self.shape)
    #    for i in range(self.shape[0]):
    #        for j in range(self.shape[1]):
    #            geography[i][j] = noise.pnoise2(i / scale,
    #                                            j / scale,
    #                                            octaves=octaves,
    #                                            persistence=persistence,
    #                                            lacunarity=lacunarity,
    #                                            repeatx=self.shape[0],
    #                                            repeaty=self.shape[1],
    #                                            base=seed)
#
    #    self.geography = np.floor(
    #        (geography + .5) * 255).astype(np.uint8).tolist()

    # def getGeography(self):
    #    return self.geography

    def generateResources(self):
        rarity = self.resourceRarity
        replenishment = self.resourceReplenishment
        color = self.resourceColor
        shape = self.resourceShape

        # Determine how many resources could fit into this area
        totalResourcesPossible = (
            self.shape[0] * self.shape[1]) / (THRESHOLD ** 2)
        # Now determine, using the rarity, how many resources will actually be
        # in this area
        resourcesToCreate = int(rarity * totalResourcesPossible)

        # Randomly spawn in resources
        while resourcesToCreate > 0:
            randomX = random.randrange(
                self.region.topLeftXCoordinate,
                self.region.topRightXCoordinate)
            randomY = random.randrange(
                self.region.topLeftYCoordinate - 20,
                self.region.bottomLeftYCoordinate)
            Resource(
                f"{self.id}{random.randrange(100000)}",
                replenishment,
                randomX,
                randomY,
                color,
                shape,
                self.environment)

            resourcesToCreate -= 1


'''
if __name__ == '__main__':
    # (vertical, horizontal)
    shape = (1024, 800)
    scale = 100.0
    octaves = 6
    persistence = 0.3
    lacunarity = 2.0

    random.seed(time.time())
    seed = int(random.random() * 1_000)

    geography = np.zeros(shape)
    for i in range(shape[0]):
        for j in range(shape[1]):
            geography[i][j] = noise.pnoise2(i / scale,
                                            j / scale,
                                            octaves=octaves,
                                            persistence=persistence,
                                            lacunarity=lacunarity,
                                            repeatx=1024,
                                            repeaty=800,
                                            base=seed)

    img = np.floor((geography + .5) * 255).astype(np.uint8)

    # Render as "blue-ish"
    blue_geography = np.zeros((shape[0], shape[1], 3))
    for i in range(shape[0]):
        for j in range(shape[1]):
            blue_geography[i][j] = [0, 0, img[i][j]]

    Image.fromarray(blue_geography.astype('uint8'), mode="RGB").save(f'./sample_{seed}_blue.jpg')
'''
