#include "main.h"
#include "myobject.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return MyObject::Init(env, exports);
}

NODE_API_MODULE(class_test, InitAll)