#define LOW 0
#define HIGH 1

void digitalWrite(int pin, int value)
{
    log("digitalWrite(%d, %d)\n", pin, value);
}