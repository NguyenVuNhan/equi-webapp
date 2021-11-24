from os import environ


class Config(object):
    DEBUG = False
    ENVOY_URL = environ.get('ENVOY_URL')
    INFLUXDB_URL = environ.get('INFLUXDB_URL')
    INFLUXDB_TOKEN = environ.get('INFLUXDB_TOKEN')
    INFLUXDB_ORG = environ.get('INFLUXDB_ORG')
    INFLUXDB_ENPHASE_BUCKET = environ.get('INFLUXDB_ENPHASE_BUCKET')

    @property
    def ENVOY_PRODUCTION_URL(self):
        return f"{self.ENVOY_URL}/production.json?details=1"


class Development(Config):
    DEBUG = True


class Production(Config):
    pass
