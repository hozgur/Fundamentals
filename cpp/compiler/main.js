const fs = require('fs');
const allFileContents = fs.readFileSync('./sample.asm', 'utf-8');

let commands = require('./commands.json');

let pc = 0;
let labels =[];
let lines = [];
let program = [];
allFileContents.split(/\r?\n/).forEach(line =>  {
    line = line.trim();
    if(line.length > 2 && line[0] !== ';') {            // remove comments and empty lines
        lines.push({lineNo: pc, line: line})
    }
    pc++;
});
pc = 0;
lines.forEach(lineObj => {    
    let line = lineObj.line;
    if(line[0] === '.') {
        labels.push({label:line.substring(1, line.length), addr:pc});
    }
    else
        pc++;
});

pc = 0;
lines.forEach(lineObj => {
    let line = lineObj.line;
    if(line[0] !== '.') {
    // Split tokens
        tokens = line.split(' ');
    // Cleanup tokens
        tokens.forEach(function (token,index) {
            if(token.indexOf(',') !== -1) {
                this[index] = token.replace(',','');
            }
        },tokens);
    // Get command
        let cmd = tokens[0].toUpperCase();
        let opcode = undefined;
        let operandCount = 0;
        let value = 0;
        let register = 0;
        commands.forEach(function (command) {            
            if(cmd == command.name) {
                opcode = command.opcode;
                operandCount = command.pcount;
            }});        
        if(opcode == undefined) {
            console.log('Unknown command: ' + cmd + ' at line ' + lineObj.lineNo);
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            process.exit(1);
        }

        if(operandCount !== tokens.length - 1) {
            console.log('Invalid number of operands for command ' + cmd + ' at line ' + lineObj.lineNo);
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            process.exit(1);
        }
        if(operandCount > 0) {
            if(operandCount == 2) {
                if(tokens[1][0] === 'R')
                    register = parseInt(tokens[1].substring(1, tokens[1].length));
                else
                {
                    console.log('Invalid operand for command ' + cmd + ' at line ' + lineObj.lineNo);
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    process.exit(1);
                }
            }
            
            // Label Address Calculation
            if(cmd == 'CALL' | cmd == 'JMP' | cmd == 'JZ' | cmd == 'JNZ') {
                console.log(tokens);
                let label = tokens[1];
                if(cmd == 'JZ' | cmd == 'JNZ') {
                    label = tokens[2];
                }
                let labelObj = labels.find(labelObj => labelObj.label == label);
                if(labelObj == undefined) {
                    console.log('Undefined label ' + label + ' at line ' + lineObj.lineNo);
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    process.exit(1);
                }
                value = labelObj.addr;
            }
            else {
                
            }            
        }
        program.push(opcode << 24 | value << 8 | register);
        console.log(`opcode: ${opcode} value: ${value} register: ${register}`);
        pc++;
    }
    
});

console.log(`${pc} instructions`);
console.log(`${labels.length} labels`);
console.log(`${lines.length} lines`);
program.forEach(function (instruction) {
    console.log(`${instruction.toString(16)}`);
});
