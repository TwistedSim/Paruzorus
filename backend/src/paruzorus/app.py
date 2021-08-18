import argparse

from aiohttp import web

from paruzorus.web import create_app

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=3000)
    args = parser.parse_args()

    host = args.host
    port = args.port

    app = create_app()
    web.run_app(app, host=host, port=port)
