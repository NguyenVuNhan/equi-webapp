class Config:
    ENVOY_BASE_URL = "http://envoy.local"
    ENVOY_PRODUCTION_URL = ENVOY_BASE_URL + "/production.json?details=1"
    INFLUXDB_TOKEN = "x75OjHI7A0AMMuZYSFSmjzg0Yiz61UG__FoQyiceZ3A4XDshOcAyKadClPs2HChc5kvMcodhg9gsi5gykbflYA=="
    INFLUXDB_ORG = "equi"
    INFLUXDB_BUCKET = "test"


class ProdConfig(Config):
    pass


class DevConfig(Config):
    pass
