#include <stdio.h>
#include <malloc.h>

#define ROWS 2500
#define COLUMNS 2500

struct tuple {
    int value;
    int left[2], right[2];
};

int calculate_energy(int base, int dest, int key, int A[ROWS][COLUMNS]) {
    int res = 0;
    if (base == key) {
        for (int i=base; i<=dest; i++) {
            res += A[key][i];
        }
    } else {
        for (int i=base; i<=dest; i++) {
            res += A[i][key];
        }
    }
    return res;
}

int main() {

    int NKs[2]; // read N, K
    for (int i=0; i<2; i++) {
        scanf("%d", &NKs[i]);
    }

    int (*A)[COLUMNS] = malloc(sizeof(int[ROWS][COLUMNS]));
    for (int i=0; i<NKs[0]; i++) { // read A array
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

    struct tuple (*B)[COLUMNS] = malloc(sizeof(struct tuple[ROWS][COLUMNS]));
    for (int i=0; i<NKs[0]; i++) { // initialize DP 2D-array
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

    for (int i=NKs[1]; i<NKs[0]; i++) {
        for (int j=0, x=i; x<NKs[0]; j++, x++) {
            struct tuple currL = B[j][x-1];
            struct tuple currC = B[j+1][x];
            if (currL.value + calculate_energy(currL.right[0], x, x, A) < currC.value + calculate_energy(j, currC.left[1], j, A)) {

                B[j][x].right[1] = x;
                B[j][x].right[0] = currL.right[0];
                B[j][x].left[0] = currL.left[0];
                B[j][x].left[1] = currL.left[1];

                B[j][x].value = currL.value + calculate_energy(currL.right[0], x, x, A);

            } else {

                B[j][x].left[0] = j;
                B[j][x].left[1] = currC.left[1];
                B[j][x].right[0] = currC.right[0];
                B[j][x].right[1] = currC.right[1];

                B[j][x].value = currC.value + calculate_energy(j, currC.left[1], j, A);

            }
        }
    }

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
