#include "core.h"
#include "arduino.h"
#include "commands.h"
#include <iostream>
#include <stdio.h>
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
    FILE *f = fopen("..\\compiler\\sample2.bin", "r");
    if (f == NULL) {
        printf("Error opening file!\n");
        exit(1);
    }
    fseek(f, 0L, SEEK_END);
    int size = ftell(f);
    if (size == 0) {
        printf("invalid file size!\n");
        exit(1);
    }
    fseek(f, 0L, SEEK_SET);
    char *buffer = new char[size];
    fread(buffer, 1, size, f);
    fclose(f);
    Core m(0,DATA_MEMORY_SIZE,PRG_MEMORY_SIZE);
    m.load_prg((int*)buffer,size/4);    
    m.run(0);

    // int pins[] = {0,1,2,3,4,5,6,7};
    // MultiCore mc(pins,DATA_MEMORY_SIZE,PRG_MEMORY_SIZE);
    // mc.load_prg(mem,PRG_MEMORY_SIZE);
    // mc.run();
}