cmd_Debug/obj.target/hello.node := g++ -o Debug/obj.target/hello.node -shared -pthread -rdynamic -m64  -Wl,-soname=hello.node -Wl,--start-group Debug/obj.target/hello/main.o -Wl,--end-group 
