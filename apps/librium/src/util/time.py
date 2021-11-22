import calendar
import time


def getTimeStamp() -> int:
    return calendar.timegm(time.gmtime())
