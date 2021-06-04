import logging
import asyncio
import websockets
import serial


from serial_asyncio import open_serial_connection

clients = set()

value = 0


async def teensyReader():
    global value
    reader, writer = await open_serial_connection(url='/dev/ttyACM0', baudrate=9600)
    while True:
        line = await reader.readline()
        line = str(line, 'utf-8').strip()
        print(line)
        if (line == 'R'):
            value += 1
        elif (line == 'L'):
            value -= 1
        else:
            pass
        await sendMessage(str(value % 360))


async def sendMessage(message):
    if clients:
        await asyncio.wait([c.send(message) for c in clients])


async def register(websocket):
    clients.add(websocket)


async def deregister(websocket):
    clients.remove(websocket)


async def hello(websocket, path):
    await register(websocket)
    try:
        while True:
            value = await websocket.recv()
            print(f"< {value}")

            await sendMessage(value)
    finally:
        deregister(websocket)

if __name__ == "__main__":
    start_server = websockets.serve(hello, "localhost", 8765)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(start_server)
    loop.run_until_complete(teensyReader())

    loop.run_forever()
