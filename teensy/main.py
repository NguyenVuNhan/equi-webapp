import logging
import asyncio
import websockets
import serial
from serial_asyncio import open_serial_connection


# save all clients
clients = set()


async def teensyReader():
    reader, writer = await open_serial_connection(url='/dev/ttyACM0', baudrate=9600)
    while True:
        line = await reader.readline()
        line = str(line, 'utf-8').strip()
        await sendMessage(line)


async def sendMessage(message):
    logging.debug(message)
    if clients:
        await asyncio.wait([c.send(message) for c in clients])


def register(websocket):
    clients.add(websocket)


def deregister(websocket):
    clients.remove(websocket)


async def socketHandler(websocket, path):
    register(websocket)
    logging.info(f"Client {websocket.remote_address} connected")

    try:
        while True:
            await websocket.recv()
    except websockets.ConnectionClosed:
        pass
    finally:
        deregister(websocket)
        logging.info(f"Client {websocket.remote_address} disconnected")

if __name__ == "__main__":
    # Change loggin option here
    logging.basicConfig(level=logging.INFO)
    # logging.basicConfig(level=logging.DEBUG)

    # Init the websocket handler
    start_server = websockets.serve(socketHandler, "localhost", 8765)

    # register the async tasks
    loop = asyncio.get_event_loop()
    loop.run_until_complete(start_server)
    loop.run_until_complete(teensyReader())

    # run all the async
    loop.run_forever()
