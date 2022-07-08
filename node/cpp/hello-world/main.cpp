#include <napi.h>
#include <stdio.h>

using namespace Napi;

void log(const char* msg) {
  printf("%s\n", msg);
}

Value helloMethod(const CallbackInfo& info) {
    log("Hello from C++");
    return Number::New(info.Env(), 0);
}

Object Init(Env env, Object exports) {
    exports.Set(String::New(env, "hello"),
                Function::New(env, helloMethod));
  return exports;
}

NODE_API_MODULE(hello_module, Init)