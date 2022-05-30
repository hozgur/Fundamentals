#pragma once
#include <stdarg.h>
#include <stdio.h>
inline void log(const char *fmt, ...)
{
    va_list ap;
    va_start(ap, fmt);
    vfprintf(stdout, fmt, ap);
    va_end(ap);
}
