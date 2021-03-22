from app import app

from app.blueprints.api import api_bp
from app.blueprints.client import client_bp

from flask_cors import CORS

CORS(api_bp)

app.register_blueprint(client_bp, url_prefix='/')
app.register_blueprint(api_bp,    url_prefix='/api')