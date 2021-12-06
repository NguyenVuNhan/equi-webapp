import logging
import asyncio
import websockets
import serial
import serial_asyncio 


# save all clients
clients = set()


class OutputProtocol(asyncio.Protocol):
    def connection_made(self, transport):
        self.transport = transport
        print('port opened', transport)

    def data_received(self, data):
        print('data received', repr(data))
        line = str(line, 'utf-8').strip()
        sendMessage(line)

    def connection_lost(self, exc):
        print('port closed')
        self.transport.loop.stop()

    def pause_writing(self):
        print('pause writing')
        print(self.transport.get_write_buffer_size())

    def resume_writing(self):
        print(self.transport.get_write_buffer_size())
        print('resume writing')


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
    coro = serial_asyncio.create_serial_connection(loop, OutputProtocol, '/dev/ttyACM0', baudrate=9600)
    transport, protocol = loop.run_until_complete(coro)

    # run all the async
    loop.run_forever()
