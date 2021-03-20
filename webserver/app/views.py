import os
import requests

from flask import abort
from flask import render_template
from flask import send_from_directory

from app import app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if not app.config['SERVE_FRONTEND']:
        abort(404, description="Resource not found") 
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return app.send_static_file('index.html')
