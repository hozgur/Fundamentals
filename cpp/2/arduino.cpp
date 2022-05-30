#include "core.h"
#include "arduino.h"
#include <chrono>
// simulate a pin
unsigned long microseconds = 0;
const unsigned long data[] = {5,1,3,0};
const int data_length = 4;
unsigned long state_time = data[0];
int state = data[1];
unsigned long data_pos = 2;
int getsimPin() {
    auto time = micros();
    if (time >= state_time) {
        state_time = time + data[data_pos];
        data_pos++;
        state = data[data_pos];
        data_pos++;
        if (data_pos >= data_length) {
            data_pos = 0;
        }
    }
    return state;
}

void digitalWrite(int pin, int value)
{
    log("digitalWrite(%d, %d)\n", pin, value);
}

int digitalRead(int pin)
{
    return getsimPin();
}

void pinMode(int pin, int mode)
{
    log("pinMode(%d, %d)\n", pin, mode);
}

// real micros function
unsigned long _micros() {
    auto time = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::microseconds>(time.time_since_epoch()).count();
}

// simulate micros

unsigned long micros() {
    return microseconds++;
}