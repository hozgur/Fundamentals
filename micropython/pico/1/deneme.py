from machine import Pin
import rp2
from utime import sleep
@rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
def blink():
    wrap_target()
    set(pins,1) [31]
    set(pins,0) [31]
    irq (block,0)
    wrap()


p = Pin(15, Pin.OUT)

sm = rp2.StateMachine(0, blink, freq=40000, set_base=Pin(14))

def irqfunc(flag):
     p.on()
     p.off()

for i in range(10):
    irqfunc(0)
    sleep(0.1)    
#rp2.PIO(0).irq(irqfunc)
sm.irq(irqfunc)

sm.active(1)
for i in range(50):
    sleep(1)
sm.active(0)