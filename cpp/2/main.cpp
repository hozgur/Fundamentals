#include "core.h"
#include "arduino.h"
#include "commands.h"
#include <iostream>
#define DATA_MEMORY_SIZE 32
#define PRG_MEMORY_SIZE 32

using namespace tool;
// program
int mem[PRG_MEMORY_SIZE] = {
    set(SETL),
    set(CALL,0,10),
    set(SETH),
    set(CALL,0,10),
    set(END),
    set(NOP),
    set(NOP),
    set(NOP),
    set(NOP),
    set(NOP),
    set(MOV,0,10),
    set(DEC,0,0),
    set(JNZ,0,11),
    set(RET)
};


int main() {    
    Core m(0,DATA_MEMORY_SIZE,PRG_MEMORY_SIZE);
    m.load_prg(mem,PRG_MEMORY_SIZE);
    for(int a = 0;a<PRG_MEMORY_SIZE;a++) {
        std::cout << std::hex << mem[a] << std::endl;
    }
    m.run(0);
    int pins[] = {0,1,2,3,4,5,6,7};
    MultiCore mc(pins,DATA_MEMORY_SIZE,PRG_MEMORY_SIZE);
    mc.load_prg(mem,PRG_MEMORY_SIZE);
    mc.run();
}