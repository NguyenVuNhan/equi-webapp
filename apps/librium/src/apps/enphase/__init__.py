from app import app
from apps.enphase.controllers import enphase_blueprint

app.register_blueprint(enphase_blueprint, url_prefix='/enphase/')
