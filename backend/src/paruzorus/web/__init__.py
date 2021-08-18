import base64
from logging import getLogger

from aiohttp import web
from aiohttp_middlewares import cors_middleware, error_middleware
from aiohttp_session import setup
from aiohttp_session.cookie_storage import EncryptedCookieStorage
from cryptography import fernet

from paruzorus.controllers.quiz_controller import QuizController
from paruzorus.providers.macaulay import MacAulayProvider
from paruzorus.species.warblers import TARGET_SPECIES
from paruzorus.web.api import create_api

logger = getLogger(__name__)


async def create_app():
    app = web.Application(
        middlewares=(
            cors_middleware(allow_all=True),
            error_middleware(),
        )
    )

    fernet_key = fernet.Fernet.generate_key()
    secret_key = base64.urlsafe_b64decode(fernet_key)
    setup(app, EncryptedCookieStorage(secret_key))

    provider = MacAulayProvider(TARGET_SPECIES)
    app["quiz_controller"] = QuizController(provider)

    api = await create_api()
    app.add_subapp("/api", api)

    logger.debug("App creation completed")

    return app
