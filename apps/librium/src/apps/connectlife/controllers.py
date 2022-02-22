import json
from typing import Literal

from apps.connectlife.service import dishWasher
from flask import Blueprint
from util.data import getSuccessMessage

connectLifeBlueprint = Blueprint('connect-life', __name__)


@connectLifeBlueprint.route("/start/dishwasher", methods=['GET'])
def startDishWasher():
    return getSuccessMessage(dishWasher.setProperty({
        "ChildLock": "7372"
    }))


@connectLifeBlueprint.route("/stop/dishwasher", methods=['GET'])
def stopDishWasher():
    return getSuccessMessage(dishWasher.setProperty({
        "ChildLock": "7371"
    }))

