from machine import Pin
from time import sleep

led = Pin(2, Pin.OUT)

while True:
  val = led.value()
  if (val) == 1:
    print("LED is on!!")
  else:
    print("LED is off")
  led.value(not val)
  sleep(0.5)