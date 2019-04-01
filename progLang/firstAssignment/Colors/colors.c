#include <stdio.h>
#include <stdlib.h>

// A function that returns the sum of an array
int sum_array(int array[], int num_elements){
    int i, sum=0;
    for (i = 0; i < num_elements; i++){
        sum += array[i];
    }
    return (sum);
}

int main(int argc, char *argv[]){

    int i, N, M;

    // Checking if file is valid
    FILE *fp = fopen(argv[1], "r");
    if (fp == NULL){
        printf("File can not be opened\n");
        return 1;
    }

    // Reading length of ribbon(N) and number of colors(M)
    fscanf(fp, "%d", &N);
    fscanf(fp, "%d", &M);

    int ribbon[N];
    int colors[M];

    // Reading ribbon
    for (i = 0; i < N; i++){
        fscanf(fp, "%d", &ribbon[i]);
    }
    fclose(fp);

    // Initializing counter of colors to 0's
    for (i = 0; i < M+1; i++){
        colors[i] = 0;
    }

    // Start/finish pointers of ribbon and counter of the least possible length
    int strt_pos = 0;
    int fnsh_pos = -1;
    int c = 0;

    // First found
    int ff = 0;

    while (c > M){
        colors[ribbon[strt_pos]] = 1;
        while (ff == 0){
            if (colors[ribbon[strt_pos+1]] == 1){
                strt_pos++;
            }
            else {
                ff = 1;
            }
        fnsh_pos = strt_pos + 1;
        colors[ribbon[fnsh_pos]] = 1;
        while (sum_array(colors, M+1) != M){
            fnsh_pos++;
            if (colors[ribbon[fnsh_pos]] == 0){
                colors[ribbon[fnsh_pos]] = 1;
            }
        }
        }

    }

    return 0;
}