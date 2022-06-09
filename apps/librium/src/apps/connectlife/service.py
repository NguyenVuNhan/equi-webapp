from cgitb import text
import json
import time
import timeit

import requests
from flask import current_app
from requests.compat import quote_plus, urljoin
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def login() -> str:
    url = current_app.config["CONNECT_LIFE_URL"]
    username = quote_plus(current_app.config["CONNECT_LIFE_USERNAME"])
    password = quote_plus(current_app.config["CONNECT_LIFE_PASSWORD"])

    r = requests.get(urljoin(url, f'v1/debug/get-token/{username}/{password}'))
    if (r.ok):
        return r.text.replace("\"", "")

    return None

class Appliance(object):
    def start(self):
        raise NotImplementedError()

class DishWasher(Appliance):
    def __init__(self):
        self.applianceId = "8730010000000000007370150002202100010930013-0000000000007370150002202100010930013"
        self.name = "DishWasher"
    
    def __setProperty(self, properties):
        token = login()

        data = [{
            "id": self.applianceId,
            "properties": properties
        }]

        response = requests.post(
            url=urljoin(
                current_app.config["CONNECT_LIFE_URL"],
                "v1/Appliance"
            ),
            headers={
                "Authorization": token,
                "Content-Type": "application/json"
            },
            data=json.dumps(data)
        )

        if (response.ok):
            return response.json()

        return {
            "isFailed": True,
            "status": response.status_code,
            "token": token,
            "data": data,
            "response": response.json()
        }

    def start(self):
        return self.__setProperty({
            "Actions": "2",
            "SelectedProgramId": "7191", # ECO Program
            "ProgramMode": "7436"        # Normal mode
        })

class WashingMachine(Appliance):
    def start(self):
        # instantiate a chrome options object so you can set the size and headless preference
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920x1080")
        # go to google
        driver = webdriver.Chrome(
            chrome_options=chrome_options,
            executable_path="/usr/bin/chromedriver")
        driver.get("https://my.homey.app/login")

        try:
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "#root iframe"))
            )
            driver.switch_to.frame(element)
            driver.find_element_by_css_selector('#main input[name="email"]')\
                  .send_keys("Jim.blom@teamvirtue.nl")
            driver.find_element_by_css_selector('#main input[name="password"]')\
                  .send_keys("SmartSystemForLife#1")
            driver.find_element_by_css_selector('#main form[name="login"]')\
                  .submit()

            time.sleep(5)

            driver.get("https://my.homey.app/homeys/608fe2c7a268e00c2b5f2ca0/flows/f01f64c4-1e79-4573-a10a-81b5f6aabcc8")
            element = WebDriverWait(driver, 30).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "div.css-1i31ksw.e1v3vv30 > button.css-4ml5bp.e8sxues1 > span.css-ot5p3k.e8sxues0"))
            )
            element.click()
            time.sleep(20)
            return element.text
        finally:
            pass
            driver.quit()

dishWasher = DishWasher();
washingMachine = WashingMachine();
