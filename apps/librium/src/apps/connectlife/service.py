import requests
from requests.compat import urljoin, quote_plus
from flask import current_app


def login() -> str:
    url = current_app.config["CONNECT_LIFE_URL"]
    username = quote_plus(current_app.config["CONNECT_LIFE_USERNAME"])
    password = quote_plus(current_app.config["CONNECT_LIFE_PASSWORD"])

    r = requests.get(urljoin(url, f'v1/debug/get-token/{username}/{password}'))
    if (r.ok):
        return r.text.replace("\"", "")

    return None


class AtagAppliance:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def setProperty(self, properties):
        token = login()

        response = requests.post(
            url=urljoin(
                current_app.config["CONNECT_LIFE_URL"],
                "Appliance"
            ),
            headers={
                "Authorization": token
            },
            data=[
                {
                    "id": self.id,
                    "properties": properties
                }
            ]
        )

        print(urljoin(
                current_app.config["CONNECT_LIFE_URL"],
                "Appliance"
            ),
{
                "Authorization": token
            }, [
                {
                    "id": self.id,
                    "properties": properties
                }
            ]
            )
        print(response.json())

        if (response.ok):
            print(response.json())
            return response.json()

        return None


dishWasher = AtagAppliance(
    "8730010000000000007370150002202100010930013-0000000000007370150002202100010930013", 
    "DishWasher"
    )
refrigerator = AtagAppliance(
    "8730010000000000007325830006202100011030001-0000000000007325830006202100011030001",
    "Refrigerator"
)
    