import logging
from generated_comm_files import backend_api_pb2


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class Resource:
    def __init__(
            self,
            resourceId,
            replenishment,
            xCoordinate,
            yCoordinate,
            color,
            shape,
            environment):
        logging.info(f"Creating new resource with id {resourceId}")
        self.id = resourceId
        self.replenishment = replenishment
        self.xCoordinate = xCoordinate
        self.yCoordinate = yCoordinate
        self.color = color
        self.shape = shape
        self.environment = environment

        self.environment.addToResourceRegistry(self)

    def noticeOfConsumption(self):
        logging.info(f"Destroying resource with id {self.resourceId}")
        self.environment.removeFromResourceRegistry(self)

    def serialize(self):
        return {
            'resourceId': self.id,
            'locationX': self.xCoordinate,
            'locationY': self.yCoordinate,
            'color': self.color,
            'shape': self.shape
        }

    def getAnimationInfo(self):
        logging.info(f"Fetching animation info for resource {self.id}")
        return backend_api_pb2.ResourceInfo(
            id = self.id,
            replenishment = self.replenishment,
            xCoordinate = self.xCoordinate,
            yCoordinate = self.yCoordinate,
            shape = self.shape,
            color = self.color
        )

    def save(self):
        logging.info(f"Saving resource {self.id}")
        return {
            'id': self.id,
            'replenishment': self.replenishment,
            'xCoordinate': self.xCoordinate,
            'yCoordinate': self.yCoordinate,
            'color': self.color,
            'shape': self.shape,
        }
