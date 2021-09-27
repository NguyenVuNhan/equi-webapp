import flask


def getSuccessMessage(data, message="Success", status=404):
    return flask.jsonify({
        "message": message,
        "status": 200,
        "data": data
    })
