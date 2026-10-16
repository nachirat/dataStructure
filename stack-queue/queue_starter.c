#include <stdio.h>
#define CAPACITY 5
int data[CAPACITY];
int front = 0, rear = -1, count = 0;
int enqueue(int value) {
    /* TODO: check full; advance rear with modulo; store; increment count */
    return 0;
}
int dequeue(void) {
    /* TODO: check empty; print removed value; advance front;
       decrement count; return 1 on success, 0 on underflow */
    return 0;
}
int peek(void) {
    /* TODO: print front value without modifying state */
    return 0;
}
int main(void) {
    enqueue(10); enqueue(20); enqueue(30);
    dequeue(); dequeue();
    enqueue(40); enqueue(50); enqueue(60); enqueue(70);
    enqueue(80);
    while (dequeue()) { }
    return 0;
}
