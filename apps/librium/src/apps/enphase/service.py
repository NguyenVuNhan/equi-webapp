from typing import List

from flask import jsonify
import requests
from app import influxdb
from exception import AppError
from flask import current_app
from util.time import getTimeStamp
from util.helper import pluck


class EnphaseBattery:
    def __init__(self, percent: int, state: str, whNow: int):
        self.percent = percent
        self.state = state
        self.whNow = whNow

    def getJson(self):
        return {
            "percent": self.percent,
            "state": self.state,
            "whNow": self.whNow
        }


class EnphaseData:
    def __init__(self, production: int, consumption: int, battery: EnphaseBattery):
        self.production = production
        self.consumption = consumption
        self.battery = battery

    def getJson(self):
        return {
            "production": self.production,
            "consumption": self.consumption,
            "battery": self.battery.getJson()
        }


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
                state=battery["state"],
                whNow=battery["whNow"]
            )
        )

    raise AppError("Unable to get enphase data")


def getEnphaseDataGraph() -> List[List[int]]:
    query = f'''
        from(bucket:"{influxdb.enphase_bucket}")
            |> range(start: -24h, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "Enphasehttpjson")
            |> filter(fn: (r) => r["_field"] == "consumption_1_wNow" or r["_field"] == "production_1_wNow" or r["_field"] == "storage_0_percentFull")
            |> aggregateWindow(every: 5m, fn: mean, createEmpty: true)
            |> yield(name: "mean")
    '''
    tables = influxdb.query(query, org=influxdb.org)
    dict = {}
    for table in tables:
        for record in table.records:
            # print(record)
            _value, _field = pluck(record.values, "_value", "_field")
            if _field in dict:
                dict[_field].append(_value)
            else:
                dict[_field] = [_value]

    return dict
