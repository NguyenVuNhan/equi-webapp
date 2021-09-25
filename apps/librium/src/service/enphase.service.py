import requests


class EnphaseBattery:
    def __init__(self, percent: int, state: str):
        self.percent = percent
        self.state = state


class EnphaseData:
    BASE_URL = "http://envoy.local"
    PRODUCTION_URL = BASE_URL + "/production.json?details=1"

    def __init__(self, production: int, consumption: int, battery: EnphaseBattery):
        self.production = production
        self.consumption = consumption
        self.battery = battery


def getEnphaseData() -> EnphaseData:
    r = requests.get(EnphaseData.PRODUCTION_URL)
    print(r.json())
    pass
