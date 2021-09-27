from typing import Literal
from flask import Blueprint
from flask_socketio import SocketIO

from apps.enphase.service import getEnphaseData
from util.data import getSuccessMessage

enphase_blueprint = Blueprint('enphase', __name__)


@enphase_blueprint.route("/production", methods=['GET'])
def production() -> int:
    enphaseData = getEnphaseData()
    return getSuccessMessage(enphaseData.production)


@enphase_blueprint.route("/consumption", methods=['GET'])
def consumption() -> int:
    enphaseData = getEnphaseData()
    return getSuccessMessage(enphaseData.consumption)


@enphase_blueprint.route("/battery", methods=['GET'])
def batteryState() -> Literal["idle", "charging", "discharging"]:
    enphaseData = getEnphaseData()
    return getSuccessMessage(enphaseData.battery)
