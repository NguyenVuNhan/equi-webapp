import json
from typing import Literal

from apps.enphase.service import (EnphaseData, getEnphaseData,
                                  getEnphaseDataGraph)
from flask import Blueprint, jsonify, request
from util.data import getFailedMessage, getSuccessMessage

enphase_blueprint = Blueprint('enphase', __name__)


@enphase_blueprint.route("/power-status", methods=['GET'])
def powerStatus() -> EnphaseData:
    try:
        data = getEnphaseData()
        return getSuccessMessage(data)
    except Exception as e:
        return getFailedMessage(str(e))

@enphase_blueprint.route("/series", methods=['GET'])
def series():
    data = getEnphaseDataGraph()
    return getSuccessMessage({
        "battery": data["storage_0_percentFull"][1:],
        "production": data["production_1_wNow"][1:],
        "consumption": data["consumption_1_wNow"][1:],
    })
