from typing import get_type_hints, Type
from flask import current_app, _app_ctx_stack
from flask.globals import _app_ctx_err_msg
from flask.app import Flask
from influxdb_client import InfluxDBClient
from influxdb_client.client.flux_table import FluxTable
from influxdb_client.client.query_api import QueryApi

_no_influx_msg = """\
No Influx connection is present.
This means that something has overwritten _app_ctx_stack.top.influxdb_db.
"""


class InfluxDb(object):
    def __init__(self, app: Flask = None) -> None:
        """
        Class constructor
        :param app: Flask Application object
        """
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        """
        Initialize extension for application
        :param app: Flask Application object
        :return:
        """
        app.teardown_appcontext(self.teardown)

    @staticmethod
    def connect() -> InfluxDBClient:
        """
        Connect to InfluxDB using configuration parameters
        :return: InfluxDBClient object
        """
        return InfluxDBClient(
            url=current_app.config["INFLUXDB_URL"],
            token=current_app.config["INFLUXDB_TOKEN"]
        )

    @staticmethod
    def teardown(exception) -> None: """
        This is really a sub in case a influxdb input actually does need
        to be able to be torn down
        """
    ctx = _app_ctx_stack.top
    if hasattr(ctx, "influxdb_db") and ctx.influxdb_db is not None:
        ctx.influxdb_db.close()

    @property
    def connection(self) -> InfluxDBClient:
        """
        InfluxDBClient object
        :return:
        """
        ctx = _app_ctx_stack.top
        if ctx is None:
            raise RuntimeError(_app_ctx_err_msg)

        if not hasattr(ctx, "influxdb_db"):
            ctx.influxdb_db = self.connect()

        if ctx.influxdb_db is None:
            raise RuntimeError(_no_influx_msg)

        return ctx.influxdb_db

    @property
    def close(self) -> callable:
        return self.connection.close

    @property
    def query(self) -> QueryApi.query:
        return self.connection.query_api().query

    @property
    def enphase_bucket(self) -> str:
        return current_app.config["INFLUXDB_ENPHASE_BUCKET"]

    @property
    def org(self) -> str:
        return current_app.config["INFLUXDB_ORG"]
