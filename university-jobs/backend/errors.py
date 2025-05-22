from fastapi import HTTPException
from fastapi.responses import JSONResponse

class DetailedHTTPExpection(HTTPException):
    def __init__(self, status_code: int, detail: str, fix: str):
        super().__init__(status_code=status_code, detail=detail)
        self.fix = fix

def http_error_handler(request, exc):
    if isinstance(exc, DetailedHTTPExpection):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.detail,
                "fix": exc.fix,
                "request_params": str(request.path_params)
            }
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )