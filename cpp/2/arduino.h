#define LOW 0
#define HIGH 1
#define INPUT 0
#define OUTPUT 1

void digitalWrite(int pin, int value)
{
    log("digitalWrite(%d, %d)\n", pin, value);
}

int digitalRead(int pin)
{
    log("digitalRead(%d)\n", pin);
    return 0;
}

void pinMode(int pin, int mode)
{
    log("pinMode(%d, %d)\n", pin, mode);
}