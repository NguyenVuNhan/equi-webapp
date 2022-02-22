from os import environ


class Config(object):
    DEBUG = False
    ENVOY_URL = environ.get('ENVOY_URL')

    # Influxdb
    INFLUXDB_URL = environ.get('INFLUXDB_URL')
    INFLUXDB_TOKEN = environ.get('INFLUXDB_TOKEN')
    INFLUXDB_ORG = environ.get('INFLUXDB_ORG')
    INFLUXDB_ENPHASE_BUCKET = environ.get('INFLUXDB_ENPHASE_BUCKET')

    # Connect life
    CONNECT_LIFE_URL = environ.get('CONNECT_LIFE_URL')
    CONNECT_LIFE_USERNAME = environ.get('CONNECT_LIFE_USERNAME')
    CONNECT_LIFE_PASSWORD = environ.get('CONNECT_LIFE_PASSWORD')

    @property
    def ENVOY_PRODUCTION_URL(self):
        return f"{self.ENVOY_URL}/production.json?details=1"


class Development(Config):
    DEBUG = True


class Production(Config):
    pass
