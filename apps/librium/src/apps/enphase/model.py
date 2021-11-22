from app import influx
from flask import current_app


class EnphaseSeriesData(object):
    def __init__(self, name: str, tags: list[str]):
        self.name = name
        self.tags = tags

    def __db_switch(self):
        influx.database.switch(
            database=current_app.config["ENPHASE_INFLUX_DB"])

    def write(self):
        self.__db_switch()
        pass

    def read(self):
        self.__db_switch()
        pass
