from app import app
from app import socketio
from app import routes   # includes the routing
from app import sockets  # includes the socketIO calls
from app import config

if __name__ == '__main__':
    print(*app.config.items())
    socketio.run(app, host=app.config['HOST'], port=app.config['PORT'])


