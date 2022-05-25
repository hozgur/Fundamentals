from machine import Pin
import rp2
from utime import sleep
@rp2.asm_pio(sideset_init=rp2.PIO.OUT_LOW)
def blink():        
    label("start")
    pull(noblock)
    mov(y,osr) .side(1)
    label("loop")    
    jmp(y_dec,"loop")
    jmp("start") .side(0)

p = Pin(15, Pin.OUT)
sm = rp2.StateMachine(0, blink, freq=20000, sideset_base=Pin(14))

sm.put(20,8)

sm.active(1)

wait_time = 10

for i in range(wait_time):
    print("wait")
    sleep(1)

sm.active(0)
print("done")