from virtueSolarForecast import get_data, get_forecast
from config import API_url, API_key


if __name__ == '__main__':
    data = get_data(API_url, API_key)

    forecast = get_forecast(data)
    print(forecast)
