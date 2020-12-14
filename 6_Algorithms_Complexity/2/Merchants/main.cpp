#include <iostream>

#define COLUMNS 1500

struct ware {
    int amount, value;
};

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

    for (int i=1; i<10; i++) {
        pointers[i] = 0;
        value[i] = (int *) malloc(COLUMNS * sizeof(int));
        amount[i] = (int *) malloc(COLUMNS * sizeof(int));
    }

    int NMs[2];
    for (int & NM : NMs) {
        scanf("%d", &NM);
    }

    int curr_int;
    char curr[2];
    for (int i=0; i<NMs[1]; i++) {
        scanf("%s", curr);
        curr_int = curr[0] - '0' - 1;
        scanf("%d", &amount[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]]);
        scanf("%d", &value[3*curr_int+ware2int(curr[1])][pointers[3*curr_int+ware2int(curr[1])]++]);
    }

    return 0;
}
