#include <stdio.h>
#include <malloc.h>

#define ROWS 2500
#define COLUMNS 2500

int main() {

    int NKs[2]; // read N, K
    for (int i=0; i<2; i++) {
        scanf("%d", &NKs[i]);
    }

    int (*A)[COLUMNS] = malloc(sizeof(int[ROWS][COLUMNS]));
    int (*B)[COLUMNS] = malloc(sizeof(int[ROWS][COLUMNS]));
    for (int i=0; i<NKs[0]; i++) { // read A array
        for (int j=0; j<NKs[0]; j++) {
            if ((i > j) || (i == j)){
                A[i][j] = 0;
                B[i][j] = 0;
            } else {
                scanf("%d", &A[i][j]);
            }
        }
    }

    for (int i=NKs[0]-1; i>=0; i--) { // calculate energy for the (i-j) mixture
        for (int j=i+1; j<NKs[0]; j++) {
            B[i][j] = A[i][j] + B[i][j-1] + B[i+1][j] - B[i+1][j-1];
        }
    }

    

    return 0;
}
