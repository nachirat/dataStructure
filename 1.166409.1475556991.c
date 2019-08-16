#include<stdio.h>
#include <conio.h>
#include <stdlib.h>
typedef struct Node {
	int data;
	struct Node *next;
}TYPE_NODE;
typedef struct Node *type_nodePtr;
print(type_nodePtr p);
type_nodePtr newnode(int data,type_nodePtr next);
void insertafter(int data,type_nodePtr point);
void deleteafter(int data,type_nodePtr point);

int main(){
	type_nodePtr head,tail,q,N;
	int data;
	head = newnode(1,NULL);
	tail=head;
	for (data = 2;data <4;data++)
	{
		q = newnode(data,NULL);
		tail->next=q;
		tail=tail->next;
	}
	print(head);
	printf("\n---------\n");
	insertafter(4,head);
	print(head);
	insertafter(5,head->next);
	print(head);
	deleteafter(head);
	print(head);
	deleteafter(head->next);
	print(head);
	return 0;
}
print(type_nodePtr p)
{
	while (p!=NULL)
	 {
	 	printf("%d ",p->data);
	 	p=p->next;
	 }
	 printf("\n");
}

type_nodePtr newnode(int data,type_nodePtr next)
{   type_nodePtr n;
	n=(type_nodePtr)malloc(sizeof(TYPE_NODE));
	n->data=data;
	n->next=next;
	return n;
}
void insertafter(int data,type_nodePtr point)
{
type_nodePtr n;
	n=(type_nodePtr)malloc(sizeof(TYPE_NODE));
	n->data=data;
	n->next=point->next;
	point->next=n;	
}
void deleteafter(int data,type_nodePtr point)
{	type_nodePtr point2;
	point2=point->next;
	point->next=point2->next;
	point2->next=NULL;
	free(point2);
}
