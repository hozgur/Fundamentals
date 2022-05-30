#define LOW 0
#define HIGH 1
#define INPUT 0
#define OUTPUT 1

int getsimPin();
void digitalWrite(int pin, int value);
int digitalRead(int pin);
void pinMode(int pin, int mode);

// simulate micros
unsigned long micros();