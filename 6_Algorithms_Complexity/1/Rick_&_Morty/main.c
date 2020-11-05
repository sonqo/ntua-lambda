#include <stdio.h>
#include <malloc.h>

struct edge {
    int base, destination, weight;
};

int main() {

    int NMs[2];
    for (int i=0; i<2; i++) { // NMs[0]=N : numbers of universes | NMs[1]=M : number of portals
        scanf("%d", &NMs[i]);
    }

    int array[NMs[0]];
    for (int i=0; i<NMs[0]; i++) { // read unordered array
        scanf("%d", &array[i]);
    }

    struct edge* portals[NMs[1]];
    for (int i=0; i<NMs[1]; i++) { // read array of points to EDGE struct
        int acc[3];
        portals[i] = (struct edge*) malloc(sizeof(struct edge));
        for (int j=0; j<3; j++){
            scanf("%d", &acc[j]);
        }
        portals[i]->base = acc[0];
        portals[i]->destination = acc[1];
        portals[i]->weight = acc[2];
    }

    return 0;
}
