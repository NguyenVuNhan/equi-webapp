import json
from typing import Literal

from apps.enphase.service import EnphaseData, getEnphaseData, getEnphaseDataGraph
from flask import Blueprint, jsonify, request
from util.data import getSuccessMessage

enphase_blueprint = Blueprint('enphase', __name__)


@enphase_blueprint.route("/power-status", methods=['GET'])
def powerStatus() -> EnphaseData:
    data = getEnphaseData().getJson()
    return getSuccessMessage(data)


@enphase_blueprint.route("/series", methods=['GET'])
def series():
    return getEnphaseDataGraph()
