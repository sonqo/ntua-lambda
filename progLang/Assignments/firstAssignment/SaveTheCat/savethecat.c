#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* stringConcat(char* position, char* destination){
/* A function that concatenates two strings given and returns the result - https://bit.ly/2zVGJZS */

    char* str = (char*) malloc(1 + strlen(position)+ strlen(destination));
    strcpy(str, position);
    strcat(str, destination);
    return str;
}

struct Tuple{ // Returning multiple from function - https://bit.ly/2W0Ym31
    int arjumand;
    int lpath;
    int cpath
};

struct Tuple pathFinding(int line, int column, int lpath, int cpath, int global_time, int arjumand){
/* A function that returns coordinates of the best possible location of Arjumand */

    struct Tuple result;

    if (global_time - 1 == arjumand){
        if (line <= lpath){
            if (column < cpath){
                lpath = line;
                cpath = column;
            }
        }
    }
    else if (global_time > arjumand){
        arjumand = global_time - 1;
        lpath = line;
        cpath = column;
    }
    result.arjumand = arjumand; result.lpath = lpath; result.cpath = cpath;
    return result;
}

struct node{
    int line; int column; char symbol; int time; char* position;
    struct node *next;
};

struct node *front = NULL;
struct node *rear = NULL;

void enqueueElem(int x, int y, char ch, int time){
    /* Not keeping path of elements */
    struct node *nptr = malloc(sizeof(struct node));
    nptr->line = x; nptr->column = y; nptr->symbol = ch; nptr->time = time; nptr->next = NULL;
    if (rear == NULL){
        front = nptr;
        rear = nptr;
    }
    else{
        rear->next = nptr;
        rear = rear->next;
    }
}

void enqueueCat(int x, int y, char ch, int time, char* pos){
    /* Keeping path of cat elemets */
    struct node *nptr = malloc(sizeof(struct node));
    nptr->line = x; nptr->column = y; nptr->symbol = ch; nptr->time = time; nptr->position = pos; nptr->next = NULL;
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

int main(int argc, char *argv[]) {

    char ch;
    int i, j, N = 0, M = 0, flag = 0;

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

    int leastl = 0, leastc = 0; // Keeping coordinates of the best possible cat cell on the map
    int start_line = 0, start_column = 0; // Starting coordinates of Arjumand

    /* File reading and map padding */
    fp = fopen(argv[1], "r");
    for (i = 1; i <= N+1; i++){
        for (j = 1; j <= M+1; j++){
            ch = fgetc(fp);
            array[i][j] = ch;
            if (ch == 'W'){
                int time = 1;
                enqueueElem(i, j, ch, time);
            }
            if (ch == 'A'){
                int time = 1;
                enqueueElem(i, j, ch, time);
                leastl = i; leastc = j; start_line = i; start_column = j;
            }
        }
    }

    /* Border creation of X's */
    for (i = 0; i < M+2; i++){
        array[0][i] = 'X'; array[N+1][i] = 'X';
    }
    for (i = 0; i < N+2; i++){
        array[i][0] = 'X'; array[i][M+1] = 'X';
    }

    int arjumand, lpath, cpath;
    int global_time = 0, time = front->time;

    struct Tuple result; // Keeping coordinates of the path Arjumand and the longest possible time of rescue
    result.lpath = N; result.cpath = M; result.arjumand = 0;

    /* Floodfilling A's and W's */
    while (front != NULL){
        while (global_time == time){
            int line = front->line, column = front->column;
            char item = front->symbol;
            /* Cross elements for the tested item */
            char item_east = array[line][column+1], item_west = array[line][column-1];
            char item_north = array[line+1][column], item_south = array[line-1][column];
            if (item == 'A'){
                if ((item_east != 'W') && (item_east != 'X') && (item_east != 'A')){
                    array[line][column+1] = item;
                    enqueueElem(line, column+1, item, time+1);
                    if ((line < leastl)){
                        leastl = line;
                        leastc = column+1;
                    }
                }
                if ((item_north != 'W') && (item_north != 'X') && (item_north != 'A')){
                    array[line+1][column] = item;
                    enqueueElem(line+1, column, item, time+1);
                    if ((line < leastl)){
                        leastl = line+1;
                        leastc = column;
                    }
                }
                if ((item_west != 'W') && (item_west != 'X') && (item_west != 'A')){
                    array[line][column-1] = item;
                    enqueueElem(line, column-1, item, time+1);
                    /* Getting least possible path */
                    if ((line <= leastl)){
                        if (column-1 <= leastc){
                            leastl = line;
                            leastc = column-1;
                        }
                    }
                }
                if ((item_south != 'W') && (item_south != 'X') && (item_south != 'A')){
                    array[line-1][column] = item;
                    enqueueElem(line-1, column, item, time+1);
                    /* Getting least possible path */
                    if (line-1 <= leastl){
                        if (column <= leastc){
                            leastl = line-1;
                            leastc = column;
                        }
                    }
                }
            }
            if (item == 'W'){
                if ((item_west != 'W') && (item_west != 'X') && (item_west != 'A')){
                    array[line][column-1] = item;
                    enqueueElem(line, column-1, item, time+1);
                }
                else if (item_west == 'A'){
                    array[line][column-1] = item;
                    enqueueElem(line, column-1, item, time+1);
                    result = pathFinding(line, column-1, result.lpath, result.cpath, global_time, result.arjumand);
                }
                if ((item_east != 'W') && (item_east != 'X') && (item_east != 'A')){
                    array[line][column+1] = item;
                    enqueueElem(line, column+1, item, time+1);
                }
                else if (item_east == 'A'){
                    array[line][column+1] = item;
                    enqueueElem(line, column+1, item, time+1);
                    result = pathFinding(line, column+1, result.lpath, result.cpath, global_time, result.arjumand);
                }
                if ((item_north != 'W') && (item_north != 'X') && (item_north != 'A')){
                    array[line+1][column] = item;
                    enqueueElem(line+1, column, item, time+1);
                }
                else if (item_north == 'A'){
                    array[line+1][column] = item;
                    enqueueElem(line+1, column, item, time+1);
                    result = pathFinding(line+1, column, result.lpath, result.cpath, global_time, result.arjumand);
                }
                if ((item_south != 'W') && (item_south != 'X') && (item_south != 'A')){
                    array[line-1][column] = item;
                    enqueueElem(line-1, column, item, time+1);
                }
                else if (item_south == 'A'){
                    array[line-1][column] = item;
                    enqueueElem(line-1, column, item, time+1);
                    result = pathFinding(line-1, column, result.lpath, result.cpath, global_time, result.arjumand);
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
        global_time++;
    }

    arjumand = result.arjumand; lpath = result.lpath; cpath = result.cpath;

    front = NULL, rear = NULL;

    // Enqueuing starting position of Arjumand
    array[start_line][start_column] = 'a', enqueueCat(start_line, start_column, 'a', 1, "");

    flag = 0; // When least possible path is found

    char* str; // Temp variable for string concatenation
    char* path = ""; // Safest path when Arjumand is in danger
    char* road = ""; // Best path when Arjumans is not in danger

    /* Floodfilling A's for path finding  */
    while ((front != NULL) && (flag != 1)){
        while (global_time == time){
            int line = front->line, column = front->column;
            char item = front->symbol;
            char *pos = front->position;
            /* Cross elements for the tested item */
            char item_east = array[line][column + 1], item_west = array[line][column - 1];
            char item_north = array[line + 1][column], item_south = array[line - 1][column];
            if (item == 'a'){
                if ((item_north != 'X') && (item_north != 'a')){
                    array[line+1][column] = item;
                    str = stringConcat(pos, "D");
                    enqueueCat(line+1, column, item, time + 1, str);
                    /* Getting least possible path */
                    if (arjumand != 0){
                        if ((line+1 == lpath) && (column == cpath)){
                            path = str;
                            flag = 1;
                        }
                    }
                    if (arjumand == 0){
                        if ((line+1 == leastl) && (column == leastc)){
                            road = str;
                            flag = 1;
                        }
                    }
                }
                if ((item_west != 'X') && (item_west != 'a')){
                    array[line][column-1] = item;
                    str = stringConcat(pos, "L");
                    enqueueCat(line, column - 1, item, time + 1, str);
                    /* Getting least possible path */
                    if (arjumand != 0){
                        if ((line == lpath) && (column-1 == cpath)){
                            path = str;
                            flag = 1;
                        }
                    }
                    if (arjumand == 0){
                        if ((line == leastl) && (column-1 == leastc)){
                            road = str;
                            flag = 1;
                        }
                    }
                }
                if ((item_east != 'X') && (item_east != 'a')){
                    array[line][column + 1] = item;
                    str = stringConcat(pos, "R");
                    enqueueCat(line, column + 1, item, time + 1, str);
                    /* Getting least possible path */
                    if (arjumand != 0){
                        if ((line == lpath) && (column+1 == cpath)){
                            path = str;
                            flag = 1;
                        }
                    }
                    if (arjumand == 0){
                        if ((line == leastl) && (column+1 == leastc)){
                            road = str;
                            flag = 1;
                        }
                    }
                }
                if ((item_south != 'X') && (item_south != 'a')){
                    array[line-1][column] = item;
                    str = stringConcat(pos, "U");
                    enqueueCat(line-1, column, item, time + 1, str);
                    /* Getting least possible path */
                    if (arjumand != 0){
                        if ((line-1 == lpath) && (column == cpath)){
                            path = str;
                            flag = 1;
                        }
                    }
                    if (arjumand == 0){
                        if ((line-1 == leastl) && (column == leastc)){
                            road = str;
                            flag = 1;
                        }
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
        global_time++;
    }

    /* In case Arjumand is safe */
    if (arjumand == 0){
        printf("infinity\n");
        if (strcmp(road, "") == 0){
            printf("stay");
        }
        else{
            printf("%s", road);
        }
    }
    /* In case Arjumand ought to be saved */
    else{
        printf("%d\n", arjumand);
        if (strcmp(path, "") == 0){
            printf("stay");
        }
        else{
            printf("%s", path);
        }
    }

    return 0;
}