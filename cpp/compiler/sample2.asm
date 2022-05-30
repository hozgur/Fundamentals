; OneWire Emulator
;-----------------------------------------------------------------------------

; Definitions


; Set Pin Direction to Input
; then wait reset pulse



SETI
CALL WAIT0
.WAIT_RESET
CALL WAIT1
JNZ R0 WAIT_RESET
MOV R0, 200
PRN R0
END



.WAIT0
.LOOP1
GET R1
JNZ R1 LOOP1
RET

.WAIT1
MOV R0, 3
.LOOP2
GET R1
DEC R0
PRN R0
JZ R0 LRESET
JZ R1 LOOP2
MOV R3, 200
PRN R3
RET
.LRESET
MOV R3, 100
PRN R3
RET