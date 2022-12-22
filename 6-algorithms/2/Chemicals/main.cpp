#include <iostream>

#define ROWS 2500
#define COLUMNS 2500

int main() {

    int NKs[2]; // read N, K
    for (int & NK : NKs) {
        scanf("%d", &NK);
    }

    int *A[ROWS], *B[ROWS], *C[ROWS];
    for (int i=0; i<ROWS; i++) {
        A[i] = (int *) malloc(COLUMNS * sizeof(int));
        B[i] = (int *) malloc(COLUMNS * sizeof(int));
        C[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    for (int i=0; i<NKs[0]; i++) { // read A array
        for (int j=0; j<NKs[0]; j++) {
            if ((i > j) || (i == j)) {
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

    int j;
    int minimum_energy, minimum_j;
    if (NKs[1] == 1) {
        std::cout << B[0][NKs[0]-1] << std::endl;
    } else {
        C[0][1] = 0;
        for (int i=2; i<=NKs[0]; i++) {
            C[0][i] = B[0][i-1];
        }
        for (int l=1; l<NKs[1]; l++) { // for every cut until K
            j = 1;
            for (int i=1; i<=NKs[0]; i++) { // for every substance i
                if (i <= l+1) {
                    C[l][i] = 0;
                } else {
                    minimum_energy = -1;
                    for (int k=j; k<i; k++) { // for every substance j<i
                        if (minimum_energy == -1) {
                            minimum_j = k;
                            minimum_energy = C[l-1][k] + B[k][i-1];
                        } else {
                            if (C[l-1][k] + B[k][i-1] < minimum_energy) {
                                minimum_j = k;
                                minimum_energy = C[l-1][k] + B[k][i-1];
                            }
                        }
                    }
                    j = minimum_j;
                    C[l][i] = minimum_energy;
                }
            }
        }
        std::cout << C[NKs[1]-1][NKs[0]] << std::endl;
    }

    return 0;
}
