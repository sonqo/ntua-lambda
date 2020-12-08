#include <stdio.h>

struct tuple {
    int value;
    int left[2], right[2];
};

int main() {

    int NKs[2]; // read N, K
    for (int i=0; i<2; i++) {
        scanf("%d", &NKs[i]);
    }

    int A[NKs[0]][NKs[0]]; // fill A array
    for (int i=0; i<NKs[0]; i++) {
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

    struct tuple B[NKs[0]][NKs[0]]; // initialize DP array
    for (int i=0; i<NKs[0]; i++) {
        for (int j=0; j<NKs[0]; j++) {
            if (i > j) {
                B[i][j].value = -1;
            } else if ((i == j) || (j-i < NKs[1])) {
                B[i][j].value = 0;
                if (i == j) {
                    B[i][j].left[0] = 0; B[i][j].left[1] = 0;
                    B[i][j].right[0] = 0; B[i][j].right[1] = 0;
                } else {
                    B[i][j].left[0] = i; B[i][j].left[1] = i;
                    B[i][j].right[0] = j; B[i][j].right[1] = j;
                }
            }
        }
    }

//    for (int i=2; i<NKs[0]; i++) {
//        for (int j=0, x=i; x<NKs[0]; j++, x++) {
//            struct tuple currL = B[j][x-1];
//            struct tuple currC = B[j+1][x];
//            if (currL.value+A[currL.right][x] < currC.value+A[j][currC.left]) {
//                B[j][x].left = currL.left;
//                B[j][x].right = currL.right;
//                B[j][x].value = currL.value + A[currL.right][x];
//                for (int y=currL.right+1; y<x; y++){
//                    B[j][x].value += A[y][x];
//                }
//            } else {
//                int curr = B[j][x].left;
//                B[j][x].left = j;
//                B[j][x].right = currC.right;
//                B[j][x].value = currC.value + A[j][currC.left];
//                for (int y=currL.left+1; y<curr; y++){
//                    B[j][x].value += A[y][x];
//                }
//            }
//        }
//    }

    for (int i=0; i<NKs[0]; i++) {
        for (int j=0, x=i; x<NKs[0]; j++, x++) {
            printf("[(%d,%d),(%d,%d)]^%d ", B[j][x].left[0], B[j][x].left[1], B[j][x].right[0], B[j][x].right[1], B[j][x].value);
        }
        printf("\n");
    }

//    for (int i=0; i<NKs[0]; i++) { // initialize DP array
//        for (int j=0; j < NKs[0]; j++) {
//            printf("%d ", A[i][j]);
//        }
//        printf("\n");
//    }

//    printf("%d\n", B[0][NKs[0]-1]);

    return 0;
}
