import os
import tempfile
import secrets

from app import app

class Config:
    DEBUG = False
    TESTING = False
    HOST = os.environ.get('HOST', 'localhost')
    PORT = os.environ.get('PORT', 8000)
    SERVE_FRONTEND = os.environ.get('SERVE_FRONTEND', False)
    FRONTEND_HOST = os.environ.get('FRONTEND_HOST', '127.0.0.1')
    STATIC_FOLDER = os.environ.get('STATIC_FOLDER', '/var/paruzorus/www/')
    
class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    pass


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'test': TestingConfig,
}


environment_configuration = os.environ.get('CONFIGURATION_SETUP', 'prod')
print(f'Configuration environment: {environment_configuration}')
app.config.from_object(config[environment_configuration])
