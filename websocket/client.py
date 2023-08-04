import asyncio
import websockets

async def client():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        msg = input("What's your message? ")
        await websocket.send(msg)
        print(f"Sent message to server: {msg}")

        response = await websocket.recv()
        print(f"Received response from server: {response}")

asyncio.get_event_loop().run_until_complete(client())
