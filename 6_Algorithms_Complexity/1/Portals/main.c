#include <stdio.h>
#include <malloc.h>

#define MIN(a,b) (((a)<(b))?(a):(b))

typedef long long int SHIPIT;

struct edge {
    SHIPIT base, destination, weight;
};

struct node {
    SHIPIT data;
    struct node* next;
};

void push (struct node** head, SHIPIT data) {
    struct node* curr;
    curr = (struct node*) malloc(sizeof(struct node));
    curr->data = data;
    curr->next = *head;
    *head = curr;
}

SHIPIT pop (struct node** head) {
    SHIPIT r;
    if (*head != NULL) {
        r = (*head)->data;
        struct node* curr = *head;
        *head = (*head) -> next;
        free(curr);
        return r;
    } else {
        return -1;
    }
}

void merge(struct edge** arr, SHIPIT l, SHIPIT m, SHIPIT r) {
    SHIPIT i, j, k;
    SHIPIT n2 = r-m;
    SHIPIT n1 = m-l+1;

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

void merge_sort(struct edge** arr, SHIPIT l, SHIPIT r) {
    if (l<r) {

        SHIPIT m = l + (r-l)/2;

        merge_sort(arr, l ,m);
        merge_sort(arr, m+1, r);

        merge(arr, l, m, r);
    }
}

SHIPIT main() {

    SHIPIT* NMs = malloc(2 * sizeof(SHIPIT));
    for (SHIPIT i=0; i<2; i++) { // NMs[0]=N : numbers of universes | NMs[1]=M : number of portals
        scanf("%lld", &NMs[i]);
    }

    SHIPIT N = NMs[0];
    SHIPIT M = NMs[1];

    struct node* ancestors[N+1];
    SHIPIT* size = malloc((N+1) * sizeof(SHIPIT));
    SHIPIT* array = malloc((N+1) * sizeof(SHIPIT));
    for (SHIPIT i=1; i<N+1; i++) { // read unordered array
        size[i] = 0;
        scanf("%lld", &array[i]);

        ancestors[i] = malloc(sizeof(struct node));
        ancestors[i]->data = 0;
        ancestors[i]->next = NULL;
        push(&ancestors[i], i);
    }

    struct edge** portals = malloc(M * sizeof(struct edge));
    for (SHIPIT i=0; i<M; i++) { // read array of points to EDGE struct
        SHIPIT acc[3];
        portals[i] = malloc(sizeof(struct edge));
        for (SHIPIT j=0; j<3; j++){
            scanf("%lld", &acc[j]);
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

    SHIPIT* parent = malloc((N+1) * sizeof(SHIPIT)); // create parent array for union find implementation
    for (SHIPIT i=1; i<N+1; i++) {
        parent[i] = i;
    }

    SHIPIT* path = malloc(((N+1) * sizeof(SHIPIT))); // immidiate ancestor array
    SHIPIT* weight_path = malloc(((N+1) * sizeof(SHIPIT))); // weight-to-ancestor array
    for (SHIPIT i=0; i<N+1; i++) {
        path[i] = 0;
        weight_path[i] = -1;
    }

    merge_sort(portals, 0, M-1); //sort pointers of edges according to their weight

    SHIPIT c1, c2;
    SHIPIT global_min = 1000000000;
    for (SHIPIT i=M-1; i>=0; i--) { // Kruskal's algorithm
        c1 = parent[portals[i]->base];
        c2 = parent[portals[i]->destination];
        if (size[c2] > size[c1]) { // connect smaller to bigger tree
            SHIPIT t = c2;
            c2 = c1;
            c1 = t;
        }
        if (c1 != c2){
            size[c1]++;
            path[portals[i]->destination] = portals[i]->base;
            global_min = MIN(global_min, portals[i]->weight);
            weight_path[portals[i]->destination] = portals[i]->weight;
            while (ancestors[c2]->data != 0) {
                SHIPIT curr = pop(&ancestors[c2]);
                parent[curr] = c1;
                if (path[curr] == 0) {
                    path[curr] = portals[i]->destination;
                }
                push(&ancestors[c1], curr);
            }
        }
    }

    SHIPIT p1, p2;
    SHIPIT flag = 0;
    SHIPIT curr_min = 1000000000;
    for (SHIPIT i=1; i<N+1; i++) { // check sorting sequence
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

    printf("%lld\n", curr_min);

    return 0;
}