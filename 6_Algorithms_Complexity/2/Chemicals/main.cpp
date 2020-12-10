#include <map>
#include <iostream>

#define ROWS 2500
#define COLUMNS 2500

int calculate_energy(int start, int finish, int k, int* B[ROWS], int* Acc[ROWS]) {

    int curr, sum = -1;

    if (k == 0) {
        return B[start][finish];
    } else {
        for (int i=start; i <=finish-k; i++) {
            curr = B[start][i] + calculate_energy(i + 1, finish, k - 1, B, Acc);
            if (sum == -1) {
                sum = curr;
            } else {
                if (curr < sum) {
                    sum = curr;
                }
            }
        }
        return sum;
    }
}

int main() {

//    std::map< std::tuple<int, int, int>, int> Acc;

//    std::cout << Acc.count(std::make_tuple(1,2,3));

    int NKs[2]; // read N, K
    for (int & NK : NKs) {
        scanf("%d", &NK);
    }

    int *A[ROWS], *B[ROWS], *Acc[ROWS];
    for (int i=0; i<ROWS; i++) {
        A[i] = (int *) malloc(COLUMNS * sizeof(int));
        B[i] = (int *) malloc(COLUMNS * sizeof(int));
        Acc[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    for (int i=0; i<NKs[0]; i++) { // read A array
        for (int j=0; j<NKs[0]; j++) {
            Acc[i][j] = -1;
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

    if (NKs[1] == 1) {
        std::cout << B[0][NKs[0]-1] << std::endl;
    } else {
        std::cout << calculate_energy(0, NKs[0]-1, NKs[1], B, Acc) << std::endl;
    }

    for (int i=0; i<NKs[0]; i++) {
        for (int j=0; j<NKs[0]; j++) {
            std::cout << Acc[i][j] << " ";
        }
        std::cout << std::endl;
    }

    std::cout << std::endl;
    std::cout << std::endl;

    for (int i=0; i<NKs[0]; i++) {
        for (int j=0; j<NKs[0]; j++) {
            std::cout << B[i][j] << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}


