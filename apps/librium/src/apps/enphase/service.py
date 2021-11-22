from typing import List
import requests
from exception import AppError
from flask import current_app

from util.time import getTimeStamp


class EnphaseBattery:
    def __init__(self, percent: int, state: str):
        self.percent = percent
        self.state = state


class EnphaseData:
    def __init__(self, production: int, consumption: int, battery: EnphaseBattery):
        self.production = production
        self.consumption = consumption
        self.battery = battery


def getEnphaseData() -> EnphaseData:
    r = requests.get(current_app.config["ENVOY_PRODUCTION_URL"])
    if (r.ok):
        data = r.json()
        battery = data['storage'][0]
        return EnphaseData(
            production=data["production"][1]["wNow"],
            consumption=data["consumption"][0]["wNow"],
            battery=EnphaseBattery(
                percent=battery["percentFull"],
                state=battery["state"]
            )
        )

    raise AppError("Unable to get enphase data")


def getEnphaseDataGraph() -> List[List[int]]:
    query = '''
        from(bucket:"test")
            |> range(start: -24h, stop: now())
            |> window(every: 15m, period: 5m, createEmpty: true)
            |> mean()
            |> duplicate(column: "_stop", as: "_time")
            |> window(every: inf)
    '''
