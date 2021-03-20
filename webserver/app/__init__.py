import os

from flask import Flask
from flask import Blueprint

from flask_socketio import SocketIO

from flask_cors import CORS

from engineio.payload import Payload

Payload.max_decode_packets = 50

app = Flask(__name__, 
    static_folder = os.environ.get('STATIC_FOLDER', '/var/paruzorus/www/'),
)

cors = CORS(app, resources={r"/socket.io/*": {"origins": "*"}})
socketio = SocketIO(app, async_mode='eventlet')
