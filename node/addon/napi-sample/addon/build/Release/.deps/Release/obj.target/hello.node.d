cmd_Release/obj.target/hello.node := g++ -o Release/obj.target/hello.node -shared -pthread -rdynamic -m64  -Wl,-soname=hello.node -Wl,--start-group Release/obj.target/hello/main.o -Wl,--end-group 
