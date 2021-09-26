from importlib import import_module
from app import app

installed_apps = ["apps.enphase"]
for installed_apps in installed_apps:
    import_module(installed_apps)

if __name__ == "__main__":
    app.run(debug=True, port=8080, host='0.0.0.0')
