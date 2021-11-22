from flask import Flask
from flask_socketio import SocketIO
import os

_deployed_env_ = os.environ.get("ENVIRONMENT", default="development")

socketio = SocketIO()


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug
    # Loading correct environment variables
    if (_deployed_env_ == 'development'):
        app.config.from_object("config.Development")
    elif (_deployed_env_ == 'production'):
        app.config.from_object("config.Production")
    else:
        raise RuntimeError('Unknown environment setting provided.')

    # Register all controller to app
    from apps.enphase.controllers import enphase_blueprint
    app.register_blueprint(enphase_blueprint, url_prefix='/api/enphase/')

    socketio.init_app(app)
    return app
