#include <stdio.h>
#include <malloc.h>

struct edge {
    int base, destination, weight;
};

void merge(struct edge** arr, int l, int m, int r) {

    int i, j, k;
    int n1 = m-l+1;
    int n2 = r-m;

    struct edge* L[n1];
    struct edge* R[n2];

    // Copy arrays
    for (int i=0; i<n1; i++) {
        L[i] = arr[l+i];
    }
    for (int i=0; i<n2; i++) {
        R[i] = arr[m+1+i];
    }

    i = 0;
    j = 0;
    k = l;
    while (i<n1 && j<n2) {
        if (L[i]->weight <= R[j]->weight) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Filling unsorted items
    while (i<n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j<n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

}

void mergesort(struct edge** arr, int l, int r) {

    if (l<r) {

        int m = l + (r-l)/2;

        mergesort(arr, l ,m);
        mergesort(arr, m+1, r);

        merge(arr, l, m, r);
    }
}

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
        portals[i] = malloc(sizeof(struct edge));
        for (int j=0; j<3; j++){
            scanf("%d", &acc[j]);
        }
        portals[i]->base = acc[0];
        portals[i]->destination = acc[1];
        portals[i]->weight = acc[2];
    }

    mergesort(portals, 0, NMs[1]); //sort pointers of edges according to their weight

//    for (int i=0; i<NMs[1]; i++){
//        printf("%d ", portals[i]->weight);
//    }

    return 0;
}
