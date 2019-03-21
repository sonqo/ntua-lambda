#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){
    
    int N, M;

    FILE *fp = fopen("Colors.txt", "r");
    if (fp == NULL){
        printf("File can not be opened\n");
        return 0;
    }
    // Reading length of ribbon(N) and number of colors(M)
    fscanf(fp, "%d", &N);
    fscanf(fp, "%d", &M);

    








}



