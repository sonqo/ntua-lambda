#include <stdio.h>

struct tuple {
    int value, left, right;
};

int main() {

    int NKs[2];
    for (int i=0; i<2; i++) { // read N, K
        scanf("%d", &NKs[i]);
    }

    int A[NKs[0]][NKs[0]];
    for (int i=0; i<NKs[0]; i++) { // fill A array
        for (int j=0; j<NKs[0]; j++) {
            if (i > j) {
                A[i][j] = -1;
            } else if (i == j) {
                A[i][j] = 0;
            } else {
                scanf("%d", &A[i][j]);
            }
        }
    }

    struct tuple B[NKs[0]][NKs[0]];
    for (int i=0; i<NKs[0]; i++) { // initialize DP array
        for (int j=0; j<NKs[0]; j++) {
            if (i > j) {
                B[i][j].left = 0;
                B[i][j].right = 0;
                B[i][j].value = -1;
            } else if ((i == j) || (j-i < NKs[1])) {
                if (i == j) {
                    B[i][j].left = 0;
                    B[i][j].right = 0;
                } else {
                    B[i][j].left = i;
                    B[i][j].right = j;
                }
                B[i][j].value = 0;
            }
        }
    }

    for (int i=2; i<NKs[0]; i++) {
        for (int j=0, x=i; x<NKs[0]; j++, x++) {
            struct tuple currL = B[j][x-1];
            struct tuple currC = B[j+1][x];
            if (currL.value+A[currL.right][x] < currC.value+A[j][currC.left]) {
                B[j][x].left = currL.left;
                B[j][x].right = currL.right;
                B[j][x].value = currL.value + A[currL.right][x];
            } else {
                B[j][x].left = j;
                B[j][x].right = currC.right;
                B[j][x].value = currC.value + A[j][currC.left];
            }
        }
    }

//    for (int i=0; i<NKs[0]; i++) {
//        for (int j=0; j < NKs[0]; j++) {
//            printf("(%d,%d)^%d ", B[i][j].left, B[i][j].right, B[i][j].value);
//        }
//        printf("\n");
//    }

//    for (int i=0; i<NKs[0]; i++) { // initialize DP array
//        for (int j=0; j < NKs[0]; j++) {
//            printf("%d ", A[i][j]);
//        }
//        printf("\n");
//    }

    printf("%d\n", B[0][NKs[0]-1]);

    return 0;
}
