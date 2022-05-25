from machine import Pin
from time import sleep
led = Pin(14, Pin.OUT)
print("program started.")
for i in range(1000000):
  led.value(1)
  led.value(0)
  #led.on()
  #led.off()

