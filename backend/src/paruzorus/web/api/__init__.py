from dataclasses import asdict, dataclass
from logging import getLogger

from aiohttp import web
from aiohttp_middlewares.cors import cors_middleware
from aiohttp_middlewares.error import error_middleware

from paruzorus.util.version import __version__
from paruzorus.web.api.quiz import routes as quiz

routes = web.RouteTableDef()
logger = getLogger(__name__)


@dataclass
class APIInfo:
    version: str = __version__


@routes.get("")
async def api_info(request: web.Request):
    return web.json_response(asdict(APIInfo()))


async def create_api():

    api = web.Application(
        middlewares=(
            cors_middleware(allow_all=True),
            error_middleware(),
        )
    )

    api.add_routes(routes)
    api.add_routes(quiz)
    return api
