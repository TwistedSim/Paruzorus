import os

from flask import Blueprint
from flask import abort
from flask import Response
from flask import render_template
from flask import send_from_directory

from app import app

client_bp = Blueprint('client_bp', __name__)

@client_bp.route('/', defaults={'path': ''})
@client_bp.route('/<path:path>')
def serve(path):
    if not app.config['SERVE_FRONTEND']:
        abort(404, description="Resource not found") 
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return app.send_static_file('index.html')