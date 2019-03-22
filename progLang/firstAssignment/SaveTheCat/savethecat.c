#include <stdio.h>
#include <stdlib.h>

/* Queue */
struct node{
	int line;
	int column;
	char symbol;
	int time;
	int visit;
	struct node *next;
};

struct node *front = NULL;
struct node *rear = NULL;

/* Functions */
void enqueue(int x, int y, char ch, int time){
	struct node *nptr = malloc(sizeof(struct node));
	nptr->line = x;
	nptr->column = y;
	nptr->symbol = ch;
	nptr->time = time;
	nptr->next = NULL;
	if (rear == NULL){
    	front = nptr;
    	rear = nptr;
	}
	else{
    	rear->next = nptr;
    	rear = rear->next;
	}
}

void dequeue(){
	if (front == NULL){
    	printf("\n\n Queue is empty \n");
	}
	else{
    	struct node *temp;
    	temp = front;
    	front = front->next;
    	free(temp);
	}
}

void display(){
	struct node *temp;
	temp = front;
	while (temp != NULL){
    	printf("%c ", temp->symbol);
    	temp = temp->next;
	}
}

int main(int argc, char *argv[]) {
	
	/* Variables */
	int i, j, N, M, flag;
	char ch;
	
	FILE *fp = fopen(argv[1], "r");
	
	/* Lines and Columns Calculation */
	flag = 0;
	N = 0;
	M = 0;
	while (!feof(fp)){
		ch = fgetc(fp);
		if(ch == '\n'){
			N++;
			flag = 1;
		}
		if (flag == 0){
			M++;
		}
	}
	fclose (fp);
	char array[N+2][M+2];	
	
	/* File Reading and Array Filling */
	fp = fopen(argv[1], "r");
	for (i = 1; i <= N+1; i++){
		for (j = 1; j <= M+1; j++){
			ch = fgetc(fp);	
			array[i][j] = ch;
			if ((ch == '+') || (ch == '-')){
				int time = 0;
				//enqueue(i, j, ch, time);
			}
		}
	}
		
	/* Border Creation */
	for (i = 0; i < M+2; i++){
		array[0][i] = 'X';
		array[N+1][i] = 'X';
	}
	
	for (i = 0; i < N+2; i++){
		array[i][0] = 'X';
		array[i][M+1] = 'X';
	}	
	
	for (i = 0; i < N+2; i++){
		for (j = 0; j < M+2; j++){
			printf("%c", array[i][j]);
		}
		printf("\n");
	}
	printf("\n");
	
	
	
	return 0;
}
