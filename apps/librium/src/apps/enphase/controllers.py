from typing import Literal
from flask import Blueprint

from apps.enphase.service import getEnphaseData
from util.data import getSuccessMessage

enphase_blueprint = Blueprint('enphase', __name__)


@enphase_blueprint.route("/production", methods=['GET'])
def production() -> int:
    enphaseData = getEnphaseData()
    return enphaseData.production


@enphase_blueprint.route("/consumption", methods=['GET'])
def consumption() -> int:
    enphaseData = getEnphaseData()
    return (enphaseData.consumption)


@enphase_blueprint.route("/batery/state", methods=['GET'])
def batteryState() -> Literal["idle", "charging", "discharging"]:
    enphaseData = getEnphaseData()
    return (enphaseData.battery.state)


@enphase_blueprint.route("/batery/percentage", methods=['GET'])
def batteryPercentage() -> int:
    enphaseData = getEnphaseData()
    return (enphaseData.battery.percent)
