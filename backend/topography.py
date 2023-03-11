import logging
from resources import Resource
import random
from enum import Enum
import noise
import numpy as np
from PIL import Image
import time


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


THRESHOLD = 10


class TemplateTopography(str, Enum):
    UNSELECTED = 'unselected'
    FLAT = 'flat'
    MILD = 'mild'
    MODERATE = 'moderate'
    EXTREME = 'extreme'


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
            topographyType,
            environment,
            loadExistingSave=False, saveData=None):
        if not loadExistingSave:
            logging.info(f"Creating new topography with id {id}")
            self.id = id
            self.column = column
            self.row = row
            self.type = topographyType
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

            # Initialize random geography based on topography type
            # self.generateRandomGeography()

            # Initialize resources based on topography type
            if topographyType != TemplateTopography.UNSELECTED:
                self.generateResources()

            # Register to environment
            # if topographyType != TemplateTopography.UNSELECTED:
                # self.environment.addToTopographyRegistry(self)
        else:
            logging.info(f"Loading existing topography")
            self.id = saveData['id']
            self.column = saveData['column']
            self.row = saveData['row']
            self.type = TemplateTopography(saveData['type'])
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
        }

    def save(self):
        logging.info(f"Saving topography {self.id}")
        return {
            'id': self.id,
            'column': self.column,
            'row': self.row,
            'type': self.type,
        }

    # Using perlin-noise to create random geography
    # (https://en.wikipedia.org/wiki/Perlin_noise)
    def generateRandomGeography(self):
        scale = 100.0
        octaves = 6
        lacunarity = 2.0
        persistence = 0.0

        if self.type == TemplateTopography.FLAT:
            persistence = 1.0
        elif self.type == TemplateTopography.MILD:
            persistence = 0.8
        elif self.type == TemplateTopography.MODERATE:
            persistence = 0.6
        elif self.type == TemplateTopography.EXTREME:
            persistence = 0.4
        else:
            logging.info("Unknown topography type encountered")
            persistence = 0.5

        # Generate a random seed to use with the Perlin noise generator
        random.seed(time.time())
        seed = int(random.random() * 1_000)

        geography = np.zeros(self.shape)
        for i in range(self.shape[0]):
            for j in range(self.shape[1]):
                geography[i][j] = noise.pnoise2(i / scale,
                                                j / scale,
                                                octaves=octaves,
                                                persistence=persistence,
                                                lacunarity=lacunarity,
                                                repeatx=self.shape[0],
                                                repeaty=self.shape[1],
                                                base=seed)

        self.geography = np.floor(
            (geography + .5) * 255).astype(np.uint8).tolist()

    def generateResources(self):
        rarity = 0.0
        replenishment = 0.0
        color = ''
        shape = ''

        if self.type == TemplateTopography.FLAT:
            rarity = 0.5
            replenishment = 0.1
            color = 'blue'
            shape = 'circle'
        elif self.type == TemplateTopography.MILD:
            rarity = 0.4
            replenishment = 0.2
            color = 'purple'
            shape = 'triangle'
        elif self.type == TemplateTopography.MODERATE:
            rarity = 0.3
            replenishment = 0.3
            color = 'yellow'
            shape = 'square'
        elif self.type == TemplateTopography.EXTREME:
            rarity = 0.2
            replenishment = 0.4
            color = 'red'
            shape = 'circle'
        else:
            logging.info("Unknown/unselected topography type encountered")

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
                self.region.topLeftYCoordinate,
                self.region.bottomLeftYCoordinate)
            Resource(
                f"{self.id}{resourcesToCreate}",
                replenishment,
                randomX,
                randomY,
                color,
                shape,
                self.environment)

            resourcesToCreate -= 1


"""
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
                                            repeaty=1024,
                                            base=seed)

    img = np.floor((geography + .5) * 255).astype(np.uint8)

    # Render as "blue-ish"
    blue_geography = np.zeros((shape[0], shape[1], 3))
    for i in range(shape[0]):
        for j in range(shape[1]):
            blue_geography[i][j] = [0, 0, img[i][j]]

    Image.fromarray(blue_geography.astype('uint8'), mode="RGB").save(f'./sample_{seed}_blue.jpg')
"""
