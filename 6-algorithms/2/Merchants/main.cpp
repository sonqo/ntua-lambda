#include <iostream>
#include <algorithm>

#define COLUMNS 5000

using namespace std;

int ware2int (char input) {
    switch(input) {
        default: return 0;
        case 'A': return 1;
        case 'B': return 2;
        case 'C': return 3;
    }
}

int main() {

    auto **value = (int **) malloc(10 * sizeof(int *));
    auto **amount = (int **) malloc(10 * sizeof(int *));

    auto *pointers = (int *) malloc(10 * sizeof(int));
    auto **final = (int **) malloc(3 * sizeof(int *));
    auto **result = (int **) malloc(3 * sizeof(int *));
    auto **array = (int **) malloc(COLUMNS * sizeof(int *));

    for (int i=0; i<3; i++) {
        result[i] = (int *) malloc(5000 * sizeof(int));
        final[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    for (int i=0; i<COLUMNS; i++) { // allocate DP array
        array[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    for (int i=0; i<10; i++) { // allocate value and amount arrays
        pointers[i] = 0;
        value[i] = (int *) malloc(COLUMNS * sizeof(int));
        amount[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    int N, M;
    int NMs[2];
    for (int & NM : NMs) { // read N, M
        scanf("%d", &NM);
    }
    N = NMs[0];
    M = NMs[1];

    int curr_int;
    char curr[2];
    for (int i=0; i<M; i++) { // read amount and values for each merchant
        scanf("%s", curr);
        curr_int = curr[0] - '0' - 1;
        scanf("%d", &amount[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]]);
        scanf("%d", &value[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]++]);
    }

    for (int i=0; i<3; i++) {
        for (int j=0; j<N; j++) {
            final[i][j] = 0;
        }
    }

    for (int m=0; m<3; m++) { // merchants
        for (int z=1; z<4; z++) { // ware types, A-B-C
            for (int i=0; i<N; i++) { // initialize first ware
                if (pointers[3*m+z] == 0) {
                    array[0][i] = -1;
                } else {
                    if (i<amount[3*m+z][0]) {
                        array[0][i] = value[3*m+z][0];
                    } else {
                        array[0][i] = -1;
                    }
                }
            }
            for (int j=1; j<pointers[3*m+z]; j++) { // traverse every other ware of the same type
                for (int i=0; i<N; i++) {
                    if (i < amount[3*m+z][j]) {
                        if (array[j-1][i] > 0) {
                            array[j][i] = min(array[j-1][i], value[3*m+z][j]);
                        } else {
                            array[j][i] = value[3*m+z][j];
                        }
                    } else if (array[j-1][i-amount[3*m+z][j]] > 0) {
                        if (array[j-1][i] > 0) {
                            array[j][i] = min(value[3*m+z][j] + array[j-1][i-amount[3*m+z][j]], array[j-1][i]);
                        } else {
                            array[j][i] = value[3*m+z][j] + array[j-1][i-amount[3*m+z][j]];
                        }
                    } else {
                        array[j][i] = -1;
                    }
                }
            }
            for (int i=0; i<N; i++) {
                if (pointers[3*m+z] == 0) {
                    final[m][i] = numeric_limits<int>::max();
                } else {
                    if ((array[pointers[3*m+z]-1][i] > 0) && (final[m][i] != numeric_limits<int>::max())) {
                        final[m][i] += array[pointers[3*m+z]-1][i];
                    } else {
                        final[m][i] = numeric_limits<int>::max();
                    }
                }
            }
        }
    }

    int c, global_min;
    for (int i=0; i<3; i++) {
        result[i][0] = 0;
    }
    for (int i=1; i<N+1; i++) { // initialize first merchant
        result[0][i] = final[0][i-1];
    }
    for (int i=1; i<3; i++) { // calculations for the other two merchants
        for (int j=1; j<N+1; j++) { // for all sets
            global_min = numeric_limits<int>::max();
            for (int x=1; x<=j; x++) {
                c = min({final[i][j-1], result[i-1][j], result[i-1][j-x]+final[i][x-1]});
                if ((c < global_min) && (c > 0)){
                    global_min = c;
                }
            }
            result[i][j] = global_min;
        }
    }

    if (result[2][N] == numeric_limits<int>::max()){
        cout << -1 << endl;
    } else {
        cout << result[2][N] << endl;
    }

    return 0;
}
