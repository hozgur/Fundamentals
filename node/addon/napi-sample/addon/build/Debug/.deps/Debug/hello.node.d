cmd_Debug/hello.node := ln -f "Debug/obj.target/hello.node" "Debug/hello.node" 2>/dev/null || (rm -rf "Debug/hello.node" && cp -af "Debug/obj.target/hello.node" "Debug/hello.node")
