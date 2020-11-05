#include <stdio.h>

int main() {

    int NMs[2];
    for (int i=0; i<2; i++){ // NMs[0]=N : numbers of universes | NMs[1]=M : number of portals
        scanf("%d", &NMs[i]);
    }

    int array[NMs[0]];
    int portals[NMs[1]][3];
    for (int i=0; i<NMs[0]; i++){ // read unordered array
        scanf("%d", &array[i]);
    }
    for (int i=0; i<NMs[1]; i++){ // read M portals and their respective widths
        for (int j=0; j<3; j++){
            scanf("%d", &portals[i][j]);
        }
    }

    return 0;
}
