#pragma once
#include "log.h"
#include "..\compiler\enum_commands.h"
#include "arduino.h"

#define STACK_OVERFLOW 1
#define STACK_UNDERFLOW 2
#define DIV_BY_ZERO 4
#define PROGRAM_END 8
#define INVALID_OPCODE 16
#define INVALID_MEMORY_ACCESS 32

// 32 bit command layout
//---------------
// 31-24: opcode
// 23-08: parameter
// 07-00: flags + register


// instruction flags
// instruction  --8 bit opcode-  --16 bit parameter--  --8 bit register--
// opcode       7 6 5 4 3 2 1 0 
//              R
// R = Register on param 
#define SRC_REG 0x80

class Core {
    public:

    int pin;
    int registers[8];
    int *data_memory;
    int data_memory_size;
    int *prg_memory;    
    int prg_memory_size;
    int pc;
    int sp;
    int status;

    Core();
    Core(int _pin,int data_size,int prg_size);

    void load_prg(int *prg,int size){
        for(int i=0;i<size;i++){
            prg_memory[i]=prg[i];
        }        
    }

    void push(int value) {
        if (sp < 0) {
            status |= STACK_OVERFLOW;
            return;
        }
        data_memory[sp] = value;
        sp--;
    }

    void pop(int *value) {
        
        if (sp >= data_memory_size) {
            status |= STACK_UNDERFLOW;
            return;
        }
        sp++;
        *value = data_memory[sp];
    }

    void setHigh() {
        digitalWrite(pin, HIGH);
    }
    void setLow() {
        digitalWrite(pin, LOW);
    }
    void setIn() {
        pinMode(pin, INPUT);
    }
    void setOut() {
        pinMode(pin, OUTPUT);
    }
    int get() {
        return digitalRead(pin);
    }
    unsigned long getTime() {
        return micros();
    }
    void step();
    void run(int _pc);
};

#define CORE_SIZE 8

class MultiCore {
    public:
    Core cores[CORE_SIZE];
    MultiCore(int pins[],int data_size,int prg_size){        
        for(int i=0;i<CORE_SIZE;i++){
            cores[i] = Core(pins[i],data_size,prg_size);
        }
    }
    void load_prg(int *prg,int size){
        for(int i=0;i<CORE_SIZE;i++){
            cores[i].load_prg(prg,size);
        }
    }
    void run() {        
        for(int i=0;i<CORE_SIZE;i++){
            cores[i].pc = 0;
            cores[i].status = 0;
        }
        bool canrun = false;
        do{
            canrun = false;
            for(int i=0;i<CORE_SIZE;i++){
                if(cores[i].status == 0) {
                    cores[i].step();
                    canrun = true;
                }
            }
        }while(canrun);
        log("All Halted.\n");
    }
};
