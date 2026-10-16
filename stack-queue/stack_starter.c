#include <stdio.h>
#define CAPACITY 5
int data[CAPACITY];
int top = -1;
int push(int value) {
    /* TODO: return 0 when full; otherwise store value and return 1 */
    return 0;
}
int pop(void) {
    /* TODO: check empty before reading; print removed value;
       return 1 on success, 0 on underflow */
    return 0;
}
int peek(void) {
    /* TODO: print top value without removing it; return success status */
    return 0;
}
int main(void) {
    push(10); push(20); push(30);
    peek(); pop(); push(40);
    while (pop()) { }
    return 0;
}
