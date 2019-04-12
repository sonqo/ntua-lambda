#include <stdio.h>
#include <stdlib.h>

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
    int colors[M]; // Counter of colors

    // Initializing counter of colors to 0's
    for (i = 0; i < M+1; i++){
        colors[i] = 0;
    }

    // Reading ribbon
    for (i = 0; i < N; i++){
        fscanf(fp, "%d", &ribbon[i]);
        colors[ribbon[i]] += 1;
    }
    fclose(fp);

    int sum = 0;
    int flag = 0;
    for (i = 1; i < M+1; i++){
        if (colors[i] != 0){
            sum += 1;
        }
    }

    // Checking if ribbon has all colors
    if (sum != M){
        flag = 1;
    }

    // Initializing counter of colors to 0's
    for (i = 0; i < M+1; i++){
        colors[i] = 0;
    }

    sum = 1; // Sum of all colors
    int c = 0; // Temp length counter
    int global_c = N+1;
    int strt_pointer = 0;
    int fnsh_pointer = 0;
    colors[ribbon[strt_pointer]] ++;

    while ((fnsh_pointer != N-1) && (flag != 1)){
        while ((sum != M) && (fnsh_pointer != N-1)){
            fnsh_pointer ++;
            if (colors[ribbon[fnsh_pointer]] == 0){
                colors[ribbon[fnsh_pointer]] ++;
                sum ++;
            }
            else if (colors[ribbon[fnsh_pointer]] != 0){
                colors[ribbon[fnsh_pointer]] ++;
            }
        }
        while (colors[ribbon[strt_pointer]] != 1){
            colors[ribbon[strt_pointer]] --;
            strt_pointer ++;
        }
        c = fnsh_pointer - strt_pointer + 1;
        // Calculating least possible length
        if ((c < global_c) && (sum == M)){
            global_c = c;
        }
        colors[ribbon[strt_pointer]] --;
        strt_pointer ++;
        sum --;
    }

    // If colors are missing from ribbon
    if (flag == 1){
        printf("0\n");
    }
    // Printing least possible length
    else{
        printf("%d\n", global_c);
    }

    return 0;

}