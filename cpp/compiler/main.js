const fs = require('fs');
const { exit } = require('process');
//load commands and add opcodes sequentially
/********************************************************************************************/
let commands = require('./commands.json');
for(i=0; i<commands.length; i++){
    commands[i]["opcode"] = i;
}

// Create header file for interpreter
/********************************************************************************************/
console.log("Creating header file for interpreter");
let str = "//It's an automatic generated header file by compiler\nenum commands { " + commands.map(x => x.name).join(", ") + " };";
fs.writeFileSync("enum_commands.h", str);
console.log(str);

//read commandline to get input file name
/********************************************************************************************/
const args = process.argv.slice(2);
if(args.length < 1) {
    console.log("Please specify input file name");        
    exit(1);
}

// Create output filename from input file 
/********************************************************************************************/
const inputFile = args[0];
const outputFile = args[0].split(".")[0] + ".bin";
const infoFile = args[0].split(".")[0] + ".inf";


// Create Variables to hold file data, labels and opcodes
/********************************************************************************************/
let pc = 0;
let labels =[];
let lines = [];
let program = [];
let infoLines = [];
// Split the file into lines
// remove comments and empty lines
/********************************************************************************************/
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
        let label = line.substr(1);
        if(label[0] === "R") {
            console.log("Error: Labels can't start with 'R'");
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');            
            exit(1);
        }
        if(labels.find(x => x.label === label)) {
            console.log("Error: Duplicate label");
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            exit(1);
        }
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
        let prms = tokens.slice(1);
        let opcode = undefined;
        let operandCount = 0;
        let value = 0;
        let register = 0;
        let src_register = 0;
        let prm1 = undefined;
        let prm2 = undefined;
        commands.forEach(function (command) {            
            if(cmd == command.name) {
                opcode = command.opcode;
                if(command.P1)
                    operandCount = 1;
                if(command.P2)
                    operandCount = 2;
                prm1 = command.P1;
                prm2 = command.P2;
            }});
        if(opcode == undefined) {
            console.log('Unknown command: ' + cmd + ' at line ' + lineObj.lineNo);
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            exit(1);
        }
    // Validate operand count
        if(operandCount !== prms.length) {
            console.log('Invalid number of operands for command ' + cmd + ' at line ' + lineObj.lineNo);
            console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
            console.log('Exiting...');
            exit(1);
        }
    // Validate operands
        if(prm1)
        {
            // Validate operand 1
            // if operand is register
            if(prms[0][0] === 'R')
            {
                // Validate command accepts register
                if(prm1.indexOf('R') === -1)
                {
                    console.log('Invalid operand for command ' + cmd + ' at line ' + lineObj.lineNo);
                    console.log("operand 1 can not be a register.");
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    exit(1);
                }
                register = prms[0].substr(1);
            }
            else
            {
                if(prm1.indexOf('C') === -1) {
                    console.log('Invalid operand for command ' + cmd + ' at line ' + lineObj.lineNo);
                    console.log("operand 1 can not be a constant.");
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    exit(1);
                }
                value = prms[0];
            }
                
        }

        if(prm2) {
            // Validate operand 2
            // if operand is register
            if(prms[1][0] === 'R')
            {
                // Validate command accepts register
                if(prm2.indexOf('R') === -1)
                {
                    console.log('Invalid operand for command ' + cmd + ' at line ' + lineObj.lineNo);
                    console.log("operand 2 can not be a register.");
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    exit(1);
                }
                src_register = 0x80;
                value = prms[1].substr(1);
            }
            else
            {
                if(prm2.indexOf('C') === -1) {
                    console.log('Invalid operand for command ' + cmd + ' at line ' + lineObj.lineNo);
                    console.log("operand 2 can not be a constant.");
                    console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                    console.log('Exiting...');
                    exit(1);
                }
                value = prms[1];
            }
        }
                            
    // Label Address replacement.
        if(cmd == 'CALL' | cmd == 'JMP' | cmd == 'JZ' | cmd == 'JNZ' | cmd == 'JPOS') {                
            let label = prms[0];
            if(cmd == 'JZ' | cmd == 'JNZ' | cmd == 'JPOS') {
                label = prms[1];
            }
            let labelObj = labels.find(labelObj => labelObj.label == label);
            if(labelObj == undefined) {
                console.log('Undefined label ' + label + ' at line ' + lineObj.lineNo);
                console.log(`line ${lineObj.lineNo} : ${lineObj.line}`);
                console.log('Exiting...');
                exit(1);
            }
            value = labelObj.addr;
        }
    // Build instruction
        program.push( (opcode + src_register) << 24 | value << 8 | register);
        let p1 = prms[0] || " ";
        let p2 = prms[1] || " ";
        if (labels.find(x => x.label === p1)) {
            p1 = labels.find(x => x.label === p1).addr;
        }
        if (labels.find(x => x.label === p2)) {
            p2 = labels.find(x => x.label === p2).addr;
        }
        let inst_info = pc.toString(10) + ": " + cmd + ' ' + p1 + ' ' + p2; 
        infoLines.push(inst_info);        
        pc++;
    }    
});

console.log(`${pc} instructions`);
console.log(`${labels.length} labels`);
labels.forEach(labelObj => {
    console.log(`${labelObj.label} : ${labelObj.addr}`);
});

fs.writeFileSync(outputFile, Int32Array.from(program), 'binary');
console.log(outputFile + ' created.');
fs.writeFileSync(infoFile, infoLines.join('\n'), 'utf8');
console.log(infoFile + ' created.');
console.log('Done.');