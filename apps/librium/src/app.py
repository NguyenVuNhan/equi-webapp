from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug
    app.config.from_object("config.ProdConfig")

    from apps.enphase.controllers import enphase_blueprint
    app.register_blueprint(enphase_blueprint, url_prefix='/enphase/')

    socketio.init_app(app)
    return app
