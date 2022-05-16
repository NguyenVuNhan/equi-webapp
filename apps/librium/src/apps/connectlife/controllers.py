import json
from typing import Literal

from apps.connectlife.service import dishWasher, washingMachine
from flask import Blueprint
from util.data import getSuccessMessage

connectLifeBlueprint = Blueprint('connect-life', __name__)


@connectLifeBlueprint.route("/start/dish-washer", methods=['GET'])
def startDishWasher():
    return getSuccessMessage(dishWasher.start())

@connectLifeBlueprint.route("/start/washing-machine")
def startWashingMachine():
    return getSuccessMessage(washingMachine.start())
    

