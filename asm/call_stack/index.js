const MEMORY_SIZE = 256;

let memory = new Int32Array(MEMORY_SIZE).fill(0);

let sp = MEMORY_SIZE - 1;
let bp = MEMORY_SIZE - 1;
let pc = 0;
let st = 0;
let registers = new Int32Array(8);

const Cmd = {
    push: 0,
    pop: 1,
    call: 2,
    ret: 3,
    add: 4,
    end: 5
}

function set(cmd,arg = 0)
{
    let opcode = cmd << 24 | arg;
    memory[pc++] = opcode;    
}

set(Cmd.call, 1);
set(Cmd.push, 1);
set(Cmd.push, 2);
set(Cmd.call, 10);
set(Cmd.end);

pc = 10;
set(Cmd.add, 1);
set(Cmd.ret);
pc = 0;

function push(value) {
    memory[sp] = value;
    sp--;
}

function pop() {
    sp++;
    return memory[sp];
}

function run_module() {    
    while(st == 0) {
        let opcode = memory[pc];
        let cmd = opcode >> 24;
        let arg = opcode & 0x00FFFFFF;
        switch(cmd) {
            case Cmd.push:
                push(arg);
                pc++
                break;
            case Cmd.pop:
                registers[arg] = pop();
                pc++
                break;
            case Cmd.call:
                push(bp);
                push(pc);
                bp = sp;
                pc = arg;                
                break;
            case Cmd.ret:
                sp = bp;
                bp = pop();
                pc = pop() + 1;
                break;
            case Cmd.add:
                push(pop() + pop() );
                pc++;
                break;
            case Cmd.end:
                st = 1;
                break;
            default: 
                console.log("Unknown command");
                st = 2;
                break;
        }
    }    
}

run_module();
