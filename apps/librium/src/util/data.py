import flask


def getSuccessMessage(data, message=None, status=404):
    return flask.jsonify({
        "message": message,
        "status": 200,
        "data": data
    })
