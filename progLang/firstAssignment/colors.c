#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]){

    int i, N, M;

    // Check if file is valid
    FILE *fp = fopen("Colors.txt", "r");
    if (fp == NULL){
        printf("File can not be opened\n");
        return 0;
    }

    // Reading length of ribbon(N) and number of colors(M)
    fscanf(fp, "%d", &N);
    fscanf(fp, "%d", &M);

    // Filling array - ribbon
    int array[N];
    for (i = 0; i < N; i++){
        fscanf(fp, "%d", &array[i]);
    }
    fclose(fp);

    

}
