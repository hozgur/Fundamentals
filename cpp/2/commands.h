enum CMDS{SETL,SETH,GET,CALL,RET,INC,DEC,MOV,JMP,JZ,JNZ,ADD,SUB,MUL,DIV,MOD,AND,OR,XOR,SHL,SHR,PUSH,POP,CMP,PRN,END,NOP,SETI,SETO};

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


// !! flag'ler şu an kullanılmıyor !!
// instruction flags
#define USE_REGISTER_FLAG 0x80



namespace tool {
    int set(int cmd) {
        return cmd << 24;
    }    
    int set(int cmd,int reg,int param) {
        return cmd << 24 | param << 8 | reg;
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
        log("push sp:%d -> %d \n", sp, value);
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
        log("pop called at sp: %d -> %d\n",sp, *value);
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
            case GET:
                registers[cmd & 0x7] = get();
                pc++;
                break;
            case SETI:
                setIn();
                pc++;
                break;
            case SETO:
                setOut();
                pc++;
                break;
            case CALL:
                pc++;                
                push(pc);
                pc = cmd >> 8 & 0xffff;
                break;
            case RET:
                pop(&pc);                
                break;
            case DEC:                
                registers[cmd & 0x7]--;
                pc++;
                break;
            case MOV:
                registers[cmd & 0x7] = cmd >> 8 & 0xffff;
                pc++;
                break;
            case JMP:
                pc = cmd >> 8 & 0xffff;
                break;
            case JZ:
                if (registers[cmd & 0x7] == 0) {
                    pc = cmd >> 8 & 0xffff;
                } else {
                    pc++;
                }
                break;
            case JNZ:
                if (registers[cmd & 0x7] != 0) {
                    pc = cmd >> 8 & 0xffff;
                } else {
                    pc++;
                }
                break;
            case ADD:
                registers[cmd & 0x7] += cmd >> 8 & 0xffff;
                pc++;
                break;
            case SUB:
                registers[cmd & 0x7] -= cmd >> 8 & 0xffff;
                pc++;
                break;
            case MUL:
                registers[cmd & 0x7] *= cmd >> 8 & 0xffff;
                pc++;
                break;
            case DIV:
                if (cmd >> 8 & 0xffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] /= cmd >> 8 & 0xffff;
                pc++;
                break;
            case MOD:
                if (cmd >> 8 & 0xffff == 0) {
                    status |= DIV_BY_ZERO;
                    return;
                }
                registers[cmd & 0x7] %= cmd >> 8 & 0xffff;
                pc++;
                break;
            case PRN:
                log("%d\n", registers[cmd & 0x7]);
                pc++;
                break;            
            case END:
                status |= PROGRAM_END;
                log("Program halted.\n");
                break;
            case NOP:
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
        if(status)
            log("Error: %d\n", status);
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
