#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Struct Queue */
struct node{
	int line;
	int column;
	char symbol;
	int time;
	char* position;
	struct node *next;
};

struct node *front = NULL;
struct node *rear = NULL;

/* Functions of Queue */
void enqueue(int x, int y, char ch, int time, char* pos){
	struct node *nptr = malloc(sizeof(struct node));
	nptr->line = x;
	nptr->column = y;
	nptr->symbol = ch;
	nptr->time = time;
	nptr->position = pos;
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
    	printf("%s ", temp->position);
    	printf("\n");
    	temp = temp->next;
	}
}

int main(int argc, char *argv[]) {
	
	/* Variables Declaration */
	int i, j, N = 0, M = 0, flag = 0;
	char ch;
	
	FILE *fp = fopen(argv[1], "r");
	
	/* Lines and columns calculation */
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
	char* path[N+2][N+2];
	char* ptime[100];
	
	/* File reading and map filling */
	fp = fopen(argv[1], "r");
	for (i = 1; i <= N+1; i++){
		for (j = 1; j <= M+1; j++){
			ch = fgetc(fp);	
			array[i][j] = ch;
			if (ch == 'W'){
				int time = 1;
				enqueue(i, j, ch, time, "");
			}
			if (ch == 'A'){
				int time = 1;
				enqueue(i, j, ch, time, "");
			}
		}
	}
		
	/* Border creation of X's */
	for (i = 0; i < M+2; i++){
		array[0][i] = 'X';
		array[N+1][i] = 'X';
	}
	
	for (i = 0; i < N+2; i++){
		array[i][0] = 'X';
		array[i][M+1] = 'X';
	}	
	
    /* Printing for testing */
	for (i = 0; i < N+2; i++){
		for (j = 0; j < M+2; j++){
			printf("%c ", array[i][j]);
		}
		printf("\n");
	}
	printf("\n");
	
	int global_time = 0;
	int arjumand = 0;
	int time = front->time;
	
	char* down = "D";
	char* left = "L";
	char* right = "R";
	char* up = "U";
	
	int lpath = N;
	int cpath = M;
		
	/* Floodfill Algorithm */
	while (front != NULL){
		printf("Time: ");
		printf("%d\n", global_time);
		while (global_time == time){
			int line = front->line;
			int column = front->column;
			char item = front->symbol;
			char* pos = front->position;
			/* Cross Elements for the tested item */
			char item_east = array[line][column+1];
			char item_west = array[line][column-1];
			char item_north = array[line+1][column];
			char item_south = array[line-1][column];
			if (item == 'A'){
				if ((item_east != 'W') && (item_east != 'X') && (item_east != 'A')){
					array[line][column+1] = item;
					char* str = (char*) malloc(1 + strlen(pos)+ strlen(right));
					strcpy(str, pos);
      				strcat(str, right);
      				path[line][column+1] = str;
					enqueue(line, column+1, item, time+1, str);	
				}
				if ((item_west != 'W') && (item_west != 'X') && (item_west != 'A')){
					array[line][column-1] = item;
					char* str = (char*) malloc(1 + strlen(pos)+ strlen(left));
					strcpy(str, pos);
      				strcat(str, left);
      				path[line][column-1] = str;
					enqueue(line, column-1, item, time+1, str);
				}
				if ((item_north != 'W') && (item_north != 'X') && (item_north != 'A')){
					array[line+1][column] = item;
					char* str = (char*) malloc(1 + strlen(pos)+ strlen(up));
					strcpy(str, pos);
      				strcat(str, down);
      				path[line+1][column] = str;
					enqueue(line+1, column, item, time+1, str);	
				}
				if ((item_south != 'W') && (item_south != 'X') && (item_south != 'A')){
					array[line-1][column] = item;
					char* str = (char*) malloc(1 + strlen(pos)+ strlen(down));
					strcpy(str, pos);
      				strcat(str, up);
      				path[line-1][column] = str;
					enqueue(line-1, column, item, time+1, str);	
				}
			}
			if (item == 'W'){
				if ((item_west != 'W') && (item_west != 'X') && (item_west != 'A')){
					array[line][column-1] = item;
					enqueue(line, column-1, item, time+1, "");	
				}
				else if (item_west == 'A'){
					array[line][column-1] = item;
					enqueue(line, column-1, item, time+1, "");
					if (global_time-1 == arjumand){
						if ((column-1) < cpath){;
							cpath = column-1;
						}
					}
					else if (global_time > arjumand){
						arjumand = global_time-1;
						lpath = line;
						cpath = column-1;
						printf("%d ", lpath);
						printf("%d\n", cpath);
					}
				}
				if ((item_east != 'W') && (item_east != 'X') && (item_east != 'A')){
					array[line][column+1] = item;
					enqueue(line, column+1, item, time+1, "");	
				}
				else if (item_east == 'A'){
					array[line][column+1] = item;
					enqueue(line, column+1, item, time+1, "");
					if (global_time-1 == arjumand){
						if ((column+1) < cpath){
							cpath = column+1;
						}
					}
					else if (global_time > arjumand){
						arjumand = global_time-1;
						lpath = line;
						cpath = column+1;
						printf("%d ", lpath);
						printf("%d\n", cpath);
					}
				}
				if ((item_north != 'W') && (item_north != 'X') && (item_north != 'A')){
					array[line+1][column] = item;
					enqueue(line+1, column, item, time+1, "");	
				}
				else if (item_north == 'A'){
					array[line+1][column] = item;
					enqueue(line+1, column, item, time+1, "");
					if (global_time-1 == arjumand){
						if ((line+1) < lpath){
							lpath = line+1;
						}
					}
					else if (global_time > arjumand){
						arjumand = global_time-1;
						lpath = line+1;
						cpath = column;
						printf("%d ", lpath);
						printf("%d\n", cpath);
					}
				}
				if ((item_south != 'W') && (item_south != 'X') && (item_south != 'A')){
					array[line-1][column] = item;
					enqueue(line-1, column, item, time+1, "");	
				}
				else if (item_south == 'A'){
					array[line-1][column] = item;
					enqueue(line-1, column, item, time+1, "");
					if (global_time-1 == arjumand){
						if ((line-1) < lpath){
							lpath = line-1;
						}
					}
					else if (global_time > arjumand){
						arjumand = global_time-1;
						lpath = line-1;
						cpath = column;
						printf("%d ", lpath);
						printf("%d\n", cpath);
					}
				}
			}
			dequeue();
			
			/* If queue is not empty, go to the next element */
			if (front != NULL){
				time = front->time;
			}
			else{
				global_time = -1;
			}
		}
		
		/* Printing for testing */
		for (i = 0; i < N+2; i++){
			for (j = 0; j < M+2; j++){
				printf("%c ", array[i][j]);
			}
			printf("\n");
		}
		printf("\n");
		
		global_time++;
	}
	
	printf("%d ", arjumand);
	printf("\n");
	printf("%s\n", path[lpath][cpath]);
	printf("%d ", lpath);
	printf("%d\n", cpath);
	
	return 0;
}
