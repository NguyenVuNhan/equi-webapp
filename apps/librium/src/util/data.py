import flask


def getSuccessMessage(data, message="Success"):
    return flask.jsonify({
        "message": message,
        "status": 200,
        "data": data
    })

def getFailedMessage(data, message="Failed", status=500):
    return flask.jsonify({
        "message": message,
        "status": status,
        "data": data
    })
