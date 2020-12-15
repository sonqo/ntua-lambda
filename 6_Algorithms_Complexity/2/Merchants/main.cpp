#include <iostream>
#include <algorithm>

#define COLUMNS 1500

using namespace std;

int ware2int (char input) {
    switch(input) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        default:
            return 0;
    }
}

int main() {

    auto *pointers = (int *) malloc(10 * sizeof(int));
    auto **value = (int **) malloc(10 * sizeof(int *));
    auto **amount = (int **) malloc(10 * sizeof(int *));
    auto **array = (int **) malloc(COLUMNS * sizeof(int *));

    for (int i=0; i<COLUMNS; i++) { // allocate DP array
        array[i] = (int *) malloc(10 * sizeof(int));
    }

    for (int i=0; i<10; i++) { // allocate value and amount arrays
        pointers[i] = 0;
        value[i] = (int *) malloc(COLUMNS * sizeof(int));
        amount[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    int NMs[2];
    for (int & NM : NMs) { // read N, M
        scanf("%d", &NM);
    }

    int curr_int;
    char curr[2];
    for (int i=0; i<NMs[1]; i++) { // read amount and values for each merchant
        scanf("%s", curr);
        curr_int = curr[0] - '0' - 1;
        scanf("%d", &amount[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]]);
        scanf("%d", &value[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]++]);
    }

    int final[3][10];

    for (int i=0; i<3; i++) {
        for (int j=0; j<10; j++) {
            final[i][j] = 0;
        }
    }

    for (int m=0; m<3; m++) { // merchants
        for (int z=1; z<4; z++) { // ware types
            for (int i=0; i<10; i++) { // initialize first ware
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
                for (int i=0; i<10; i++) {
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
            for (int i=0; i<10; i++) {
                if (pointers[3*m+z] == 0) {
                    final[m][i] = -1;
                } else {
                    if ((array[pointers[3*m+z]-1][i] > 0) && (final[m][i] != -1)) {
                        final[m][i] += array[pointers[3*m+z]-1][i];
                    } else {
                        final[m][i] = -1;
                    }
                }
            }
        }
    }

    for (int j=0; j<3; j++) {
        for (int i=0; i<10; i++) {
            cout << final[j][i] << " ";
        }
        cout << endl;
    }

    return 0;
}
