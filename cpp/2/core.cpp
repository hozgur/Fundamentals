
#include "core.h"

Core::Core():data_memory(nullptr),prg_memory(nullptr),data_memory_size(0),prg_memory_size(0),pc(0),sp(0) {};

Core::Core(int _pin,int data_size,int prg_size):pin(_pin),data_memory_size(data_size),prg_memory_size(prg_size){
        data_memory=new int[data_size]{};
        prg_memory=new int[prg_size]{};
        data_memory_size = data_size;
        prg_memory_size = prg_size;
        pc = 0;
        sp = data_size -1;
    } 
    
void Core::step() {
        int cmd = prg_memory[pc];    // get command                    
        switch((cmd >> 24) & 0xFF) {
    /**************************************************************************/
    // Zero Parameter Commands
    /**************************************************************************/
            case NOP:
                pc++;
                break;
           case SETL:
                setLow();
                pc++;
                break;
            case SETH:
                setHigh();
                pc++;
                break;
            case SETI:
                setIn();
                pc++;
                break;
            case GET:
                registers[cmd & 0x07] = get();
                pc++;
                break;            
            case SETO:
                setOut();
                pc++;
                break;
            case RET:
                pop(&pc);                
                break;
            case END:
                status |= PROGRAM_END;
                break;
    /**************************************************************************/
    // One Parameter Commands
    /**************************************************************************/
            case CALL:
                pc++;                
                push(pc);
                pc = cmd >> 8 & 0xffff;
                break;
            case TIME:
                registers[cmd & 0x7] = getTime();
                pc++;
                break;
            case INC:
                registers[cmd & 0x7]++;
                pc++;
                break;
            case DEC:
                registers[cmd & 0x7]--;
                pc++;
                break;
            case JMP:
                pc = cmd >> 8 & 0xffff;
                break;
            case PRN:
                log("%d\n", registers[cmd & 0x7]);
                pc++;
                break;
            case PUSH:
                push(registers[cmd & 0x7]);
                pc++;
                break;
            case POP:
                pop(&registers[cmd & 0x7]);
                pc++;
                break;
    /**************************************************************************/
    // Two Parameter Commands with optional source is register
    /**************************************************************************/
            case JZ:
                if (registers[cmd & 0x7] == 0) {
                    pc = cmd >> 8 & 0xffff;
                } else {
                    pc++;
                }
                break;
            case JZ + SRC_REG:
                if (registers[cmd & 0x7] == 0) {
                    pc = registers[cmd >> 8 & 0x7];
                } else {
                    pc++;
                }
                break;
    /**************************************************************************/
            case JNZ:
                if (registers[cmd & 0x7] != 0) {
                    pc = cmd >> 8 & 0xffff;
                } else {
                    pc++;
                }
                break;
            case JNZ + SRC_REG:
                if (registers[cmd & 0x7] != 0) {
                    pc = registers[cmd >> 8 & 0x7];
                } else {
                    pc++;
                }
                break;    
    /**************************************************************************/
            case JPOS:
                if (registers[cmd & 0x7] > 0) {
                    pc = cmd >> 8 & 0xffff;
                } else {
                    pc++;
                }
                break;
            case JPOS + SRC_REG:
                if (registers[cmd & 0x7] > 0) {
                    pc = registers[cmd >> 8 & 0x7];
                } else {
                    pc++;
                }
                break;    
    /**************************************************************************/
            case MOV:
                registers[cmd & 0x7] = cmd >> 8 & 0xffff;
                pc++;
                break;
            case MOV + SRC_REG:
                registers[cmd & 0x7] = registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/
            case ADD:
                registers[cmd & 0x7] += cmd >> 8 & 0xffff;
                pc++;
                break;
            case ADD + SRC_REG:
                registers[cmd & 0x7] += registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/
            case SUB:
                registers[cmd & 0x7] -= cmd >> 8 & 0xffff;
                pc++;
                break;
            case SUB + SRC_REG:
                registers[cmd & 0x7] -= registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/
            case MUL:
                registers[cmd & 0x7] *= cmd >> 8 & 0xffff;
                pc++;
                break;
            case MUL + SRC_REG:
                registers[cmd & 0x7] *= registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/
            case DIV:
                if (cmd >> 8 & 0xffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] /= cmd >> 8 & 0xffff;
                pc++;
                break;
            case DIV + SRC_REG:
                if (registers[cmd >> 8 & 0x7] == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] /= registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/
            case MOD:
                if (cmd >> 8 & 0xffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] %= cmd >> 8 & 0xffff;
                pc++;
                break;
            case MOD + SRC_REG:
                if (registers[cmd >> 8 & 0x7] == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] %= registers[cmd >> 8 & 0x7];
                pc++;
                break;
    /**************************************************************************/            
            default:
                status |= INVALID_OPCODE;
                log("Invalid opcode: %d\n", cmd >> 24);
                break;
        }
        if((pc >= prg_memory_size) || (pc < 0)) {
            status |= INVALID_MEMORY_ACCESS;
            log("Program ended.\n");
        }
    }

void Core::run(int _pc) {
    pc = _pc;
    status = 0;
    while(status == 0) {
        step();
    }
    switch (status)
    {
    case 0:
        log("Program ended without END instruction!.\n");
        break;
    case PROGRAM_END:
        log("Program ended as expected.\n");
        break;
    default:
        log("Program ended with error: %d\n", status);
        break;
    }
}