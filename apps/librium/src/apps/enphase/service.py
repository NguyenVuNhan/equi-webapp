import json
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


def getEnphaseData():
    # First try to get the session_id
    try:
        r = requests.post(
            url=current_app.config["ENLIGHTEN_LOGIN_URL"],
            headers={
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "user": {
                    "email": current_app.config["ENLIGHTEN_USERNAME"],
                    "password": current_app.config["ENLIGHTEN_PASSWORD"]
                }}
        ))
        if (r.ok):
            data = r.json()
            print("check 2", data)
            session_id = data["session_id"]
            # Second try to get the battery data
            r = requests.get(
                url=current_app.config["ENLIGHTEN_BATTERY_URL"],
                headers={
                    "e-auth-token": session_id
                })
            if (r.ok):
                data = r.json()
                batteryPercentage = int(data["storages"][0]["current_charge"].replace("%", ""))
                return {
                    "battery": {
                        "percent": batteryPercentage
                    }
                }
        raise Exception
    except Exception as e:
        print(e)
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
