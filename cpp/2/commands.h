enum CMDS{SETL,SETH,CALL,RET,DEC,MOV,JMP,JZ,JNZ,ADD,SUB,MUL,DIV,MOD,PRN,HLT,NOP};

#define STACK_OVERFLOW 1
#define STACK_UNDERFLOW 2
#define DIV_BY_ZERO 4
#define PROGRAM_END 8
#define INVALID_OPCODE 16
#define INVALID_MEMORY_ACCESS 32

namespace tool {
    int set(int cmd) {
        return cmd << 24;
    }
    int set(int cmd,int reg) {
        return cmd << 24 | reg;
    }
    int set(int cmd,int reg,int param) {
        return cmd << 24 | param << 3 | reg;
    }

};

class Core {
    public:
    Core():data_memory(nullptr),prg_memory(nullptr),data_memory_size(0),prg_memory_size(0),pc(0),sp(0) {}
    Core(int _pin,int data_size,int prg_size):pin(_pin),data_memory_size(data_size),prg_memory_size(prg_size){
        data_memory=new int[data_size]{};
        prg_memory=new int[prg_size]{};
        data_memory_size = data_size;
        prg_memory_size = prg_size;
        pc = 0;
        sp = data_size -1;
    } 
    int pin;
    int registers[8];
    int *data_memory;
    int data_memory_size;
    int *prg_memory;    
    int prg_memory_size;
    int pc;
    int sp;
    int status;

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
        if (sp > data_memory_size) {
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

// 32 bit command layout
//---------------
// 31-24: opcode
// 23-03: parameter
// 02-00: register 

    void step() {
        int cmd = prg_memory[pc];    // get command                    
        switch(cmd >> 24) {
           case SETL:
                setLow();
                pc++;
                break;
            case SETH:
                setHigh();
                pc++;
                break;
            case CALL:
                pc++;
                push(pc);
                pc = cmd & 0xffffff;
                break;
            case RET:
                pop(&pc);                
                break;
            case DEC:                
                registers[cmd & 0x7]--;
                pc++;
                break;
            case MOV:
                registers[cmd & 0x7] = cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case JMP:
                pc = cmd & 0xffffff;
                break;
            case JZ:
                if (registers[cmd & 0x7] == 0) {
                    pc = cmd >> 3 & 0x1fffff;
                } else {
                    pc++;
                }
                break;
            case JNZ:
                if (registers[cmd & 0x7] != 0) {
                    pc = cmd >> 3 & 0x1fffff;
                } else {
                    pc++;
                }
                break;
            case ADD:
                registers[cmd & 0x7] += cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case SUB:
                registers[cmd & 0x7] -= cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case MUL:
                registers[cmd & 0x7] *= cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case DIV:
                if (cmd >> 3 & 0x1fffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] /= cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case MOD:
                if (cmd >> 3 & 0x1fffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] %= cmd >> 3 & 0x1fffff;
                pc++;
                break;
            case PRN:
                log("%d\n", registers[cmd & 0x7]);
                pc++;
                break;
            case HLT:
                status |= PROGRAM_END;
                log("Program halted.\n");
                break;
            case NOP:
                pc++;
                break;
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

    void run(int _pc) {
        pc = _pc;
        status = 0;
        while(status == 0) {
            step();
        }        
    }
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
