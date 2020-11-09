#include <stdio.h>
#include <malloc.h>

#define MIN(a, b) (((a)<(b))?(a):(b))

struct edge {
    int base, destination, weight;
};

void make_set(int* parent, int*size, int v) {
    parent[v] = v;
    size[v] = 1;
}

int find_set(int* parent, int v) {
    if (v == parent[v]) {
        return v;
    }
    return parent[v] = find_set(parent, parent[v]);
}

void union_sets(int a, int b, int* parent, int* size) {

    int rep_a, rep_b, t;

    rep_a = find_set(parent, a);
    rep_b = find_set(parent, b);
    if (rep_a != rep_b) {
        if (size[rep_a] < size[rep_b]) {
            t = rep_a;
            rep_a = rep_b;
            rep_b = t;
        }
        parent[rep_b] = rep_a;
        size[rep_a] += size[rep_b];
    }
}

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
        if (L[i]->weight > R[j]->weight) {
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

void merge_sort(struct edge** arr, int l, int r) {

    if (l<r) {
        int m = l + (r-l)/2;

        merge_sort(arr, l ,m);
        merge_sort(arr, m+1, r);

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
    struct node* vertex[N+1];
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

    merge_sort(portals, 0, M-1); //sort pointers of edges in ascending order

    int size[N+1];
    int parent[N+1];

    for (int i=1; i<N+1; i++) { // create a set for each vertex
        make_set(parent, size, i);
    }

    int global_min = 1000000000;
    for (int i=0; i<M; i++) { // traverse sorted edges
        if (find_set(parent, portals[i]->base) != find_set(parent, portals[i]->destination)) {
            union_sets(portals[i]->base, portals[i]->destination, parent, size);
        }
    }

    int p1, p2;

    int flag = 0;
    int curr_min = 1000000000;
//    for (int i=1; i<N+1; i++) { // check sorting sequence
//        if (array[i] != i){
//            p1 = i;
//            p2 = array[i];
//            while ((path[p1] !=0 || path[p2] != 0) && flag == 0) {
//                if (path[p1] != 0) {
//                    if (weight_path[p1] != -1) {
//                        curr_min = MIN(weight_path[p1], curr_min);
//                    }
//                    p1 = path[p1];
//                }
//                if (path[p2] != 0) {
//                    if (weight_path[p2] != -1) {
//                        curr_min = MIN(weight_path[p2], curr_min);
//                    }
//                    p2 = path[p2];
//                }
//                if (curr_min == global_min) {
//                    flag = 1;
//                }
//            }
//        }
//    }

//    printf("%d\n", curr_min);

    return 0;
}
