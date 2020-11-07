#include <stdio.h>
#include <malloc.h>

#define MIN(a, b) (((a)<(b))?(a):(b))

struct edge {
    int base, destination, weight;
};

void merge(struct edge** arr, int l, int m, int r) {

    int i, j, k;
    int n1 = m-l+1;
    int n2 = r-m;

    struct edge* L[n1];
    struct edge* R[n2];

    for (i=0; i<n1; i++) { // spit arrays to L(eft) and R(ight)
        L[i] = arr[l+i];
    }
    for (i=0; i<n2; i++) {
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

    while (i<n1) { // filling unsorted items
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

    int N = NMs[0];
    int M = NMs[1];

    int array[N+1];
    for (int i=1; i<N+1; i++) { // read unordered array
        scanf("%d", &array[i]);
    }

    struct edge* portals[M];
    for (int i=0; i<M; i++) { // read array of points to EDGE struct
        int acc[3];
        portals[i] = malloc(sizeof(struct edge));
        for (int j=0; j<3; j++){
            scanf("%d", &acc[j]);
        }
        if (acc[0] < acc[1]) {
            portals[i]->base = acc[0];
            portals[i]->destination = acc[1];
        } else {
            portals[i]->base = acc[1];
            portals[i]->destination = acc[0];
        }

        portals[i]->weight = acc[2];
    }

    mergesort(portals, 0, M-1); //sort pointers of edges according to their weight

    int parent[N+1]; // create parent array for union find implementation
    for (int i=1; i<N+1; i++) {
        parent[i] = i;
    }

    int path[N+1]; // ancestor array
    int weight_path[N+1]; // weight2ancestor array

    for (int i=0; i<N+1; i++) {
        path[i] = 0;
        weight_path[i] = -1;
    }

    int c1, c2;
    int global_min = 1000000000;
    for (int i=M-1; i>=0; i--) { // Kruskal's algorithm

        struct edge* curr = portals[i];

        c1 = parent[curr->base];
        c2 = parent[curr->destination];

        if (c1 != c2){
            global_min = MIN(global_min, curr->weight);
            path[curr->destination] = curr->base;
            weight_path[curr->destination] = curr->weight;
            for (int j=1; j<N+1; j++) {
                if (parent[j] == c2) {
                    if (path[j] == 0) {
                        path[j] = curr->destination;
                    }
                    parent[j] = c1;
                }
            }
        }
    }

    int p1, p2;
    int flag = 0;
    int curr_min = 1000000000;
    for (int i=1; i<N+1; i++) { // check sorting sequence
        if (array[i] != i){
            p1 = i;
            p2 = array[i];
            while ((path[p1] !=0 || path[p2] != 0) && flag == 0) {
                if (path[p1] != 0) {
                    if (weight_path[p1] != -1) {
                        curr_min = MIN(weight_path[p1], curr_min);
                    }
                    p1 = path[p1];
                }
                if (path[p2] != 0) {
                    if (weight_path[p2] != -1) {
                        curr_min = MIN(weight_path[p2], curr_min);
                    }
                    p2 = path[p2];
                }
                if (curr_min == global_min) {
                    flag = 1;
                }
            }
        }
    }

    printf("%d\n", curr_min);

    return 0;
}
