import threading
import time
import random
from threading import Lock

lock = Lock()
table = []
def worker(id):
    with lock:
        for i in range(10):
            table.append(i)
        print(f"worker {id}: {i}")
        time.sleep(0.01 + random.random()/100)

def main():
    threads = []
    
    for i in range(5):
        t = threading.Thread(target=worker, args=(i,))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    print(f"table: {table}")


class Session():
    current_session = None
    


class Element():
    def __init__(self, value):
        self.value = value
        self.next = None




if __name__ == "__main__":
    main()