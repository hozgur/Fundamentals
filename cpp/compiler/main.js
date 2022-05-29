
//read commandline to get input file name
const args = process.argv.slice(2);
if(args.length < 1) {
    console.log("Usage: node main.js <file.asm>");
    process.exit(1);
}
const inputFile = args[0];
const outputFile = args[0].split(".")[0] + ".bin";

//load commands and add opcodes sequentially
/********************************************************************************************/
let commands = require('./commands.json');
for(i=0; i<commands.length; i++){
    commands[i]["opcode"] = i;
}

// Create Variables to hold file data, labels and opcodes
/********************************************************************************************/
let pc = 0;
let labels =[];
let lines = [];
let program = [];

// Split the file into lines
// remove comments and empty lines
/********************************************************************************************/
const fs = require('fs');
const allFileContents = fs.readFileSync(inputFile, 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
    line = line.trim();
    if(line.length > 2 && line[0] !== ';') {            
        lines.push({lineNo: pc+1, line: line})
    }
    pc++;
});

// remove post comments
/********************************************************************************************/
for(i=0; i<lines.length; i++)
    lines[i]["line"] = lines[i]["line"].split(';')[0].trim();

//extract labels with addr
/********************************************************************************************/
pc = 0;
lines.forEach(lineObj => {    
    let line = lineObj.line;
    if(line[0] === '.') {
        labels.push({label:line.substring(1, line.length), addr:pc});
    }
    else
        pc++;
});

// parse instructions
/********************************************************************************************/
pc = 0;
lines.forEach(lineObj => {
    let line = lineObj.line;
    if(line[0] !== '.') {
    // Split tokens
        tokens = line.split(' ');
    // Cleanup tokens
        tokens.forEach(function (token,index) {
            this[index] = token.replace(',','');
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
    // Validate operand count
        if(operandCount !== tokens.length - 1) {
            console.log('Invalid number of operands for command ' + cmd + ' at line ' + lineObj.lineNo);
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            process.exit(1);
        }
    // Validate operands
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
                value = parseInt(tokens[2]);
            }
            if(operandCount == 1) {
                if(tokens[1][0] === 'R')
                    register = parseInt(tokens[1].substring(1, tokens[1].length));
                else
                    value = parseInt(tokens[1]);
            }
            
    // Label Address replacement.
            if(cmd == 'CALL' | cmd == 'JMP' | cmd == 'JZ' | cmd == 'JNZ') {                
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
        }
    // Build instruction
        program.push(opcode << 24 | value << 8 | register);
        console.log(`opcode: ${opcode} value: ${value} register: ${register}`);
        pc++;
    }    
});

console.log(`${pc} instructions`);
console.log(`${labels.length} labels`);
labels.forEach(labelObj => {
    console.log(`${labelObj.label} : ${labelObj.addr}`);
});
console.log(`${lines.length} lines`);
lines.forEach(lineObj => {
    console.log(`${lineObj.lineNo} : ${lineObj.line}`);
});

fs.writeFileSync(outputFile, Int32Array.from(program), 'binary');
