#include <napi.h>
#include <stdio.h>
using namespace Napi;

inline void log(const char* msg) {
  printf("%s\n", msg);
}

