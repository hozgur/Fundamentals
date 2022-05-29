; OneWire Emulator
;-----------------------------------------------------------------------------

; Set Pin Direction to Input
; then wait reset pulse
SETI
.WAIT_RESET
CALL WAIT0
PRN R0
JNZ R0 WAIT_RESET
END





.WAIT0
MOV R0, 5
.LOOP1
GET R1
DEC R0
JZ R0 RESET
JNZ R1 LOOP1
RET
.RESET
RET