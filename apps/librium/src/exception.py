class AppError(Exception):
    """App error

    Attributes:
        code -- the error code
        message -- the error message
    """
    def __init__(self, message=None, code=None):
        self.code = code if code is not None else 500
        self.message = message if message is not None else "Api Error"

class NotfoundError(AppError):
    """Api internal error

    Attributes:
        message -- the error code
    """
    def __init__(self, message=None):
        super().__init__(404, message=message)