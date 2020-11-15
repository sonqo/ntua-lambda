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

void swap(SHIPIT* n1, SHIPIT* n2) {
    SHIPIT temp;
    temp = *n1;
    *n1 = *n2;
    *n2 = temp;
}

void push(struct node** head, SHIPIT data) {
    struct node* curr;
    curr = (struct node*) malloc(sizeof(struct node));
    curr->data = data;
    curr->next = *head;
    *head = curr;
}

SHIPIT pop(struct node** head) {
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

void merge(struct edge** array, SHIPIT left, SHIPIT border, SHIPIT right) {
    SHIPIT i, j, k;
    SHIPIT p2 = right-border;
    SHIPIT p1 = border-left+1;

    struct edge* TempL[p1];
    struct edge* TempR[p2];

    for (i=0; i<p1; i++) { // spit arrays to TempL(eft) and TempR(ight)
        TempL[i] = array[left+i];
    }
    for (i=0; i<p2; i++) {
        TempR[i] = array[border+1+i];
    }

    i = 0;
    j = 0;
    k = left;
    while (i<p1 && j<p2) {
        if (TempL[i]->weight > TempR[j]->weight) {
            array[k++] = TempL[i++];
        }
        else {
            array[k++] = TempR[j++];
        }
    }

    while (i<p1) { // filling unsorted items
        array[k++] = TempL[i++];
    }
    while (j<p2) {
        array[k++] = TempR[j++];
    }
}

void merge_sort(struct edge** array, SHIPIT left, SHIPIT right) {
    if (left<right) {

        SHIPIT border = left + (right-left)/2;

        merge_sort(array, left, border);
        merge_sort(array, border+1, right);

        merge(array, left, border, right);
    }
}

int main() {

    SHIPIT* NMs = malloc(2 * sizeof(SHIPIT));
    for (SHIPIT i=0; i<2; i++) { // NMs[0]=N : numbers of universes | NMs[1]=M : number of portals
        scanf("%lld", &NMs[i]);
    }

    SHIPIT N = NMs[0];
    SHIPIT M = NMs[1];

    SHIPIT* size = malloc((N+1) * sizeof(SHIPIT));
    SHIPIT* array = malloc((N+1) * sizeof(SHIPIT));
    struct node** ancestors = malloc((N+1) * sizeof(struct node));
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
    for (SHIPIT i=0; i<M; i++) { // Kruskal's algorithm
        c1 = parent[portals[i]->base];
        c2 = parent[portals[i]->destination];

        SHIPIT base = portals[i]->base;
        SHIPIT dest = portals[i]->destination;
        if (size[c2] > size[c1]) { // connect smaller to bigger tree
            swap(&c1, &c2);
            swap(&base, &dest);
        }
        if (c1 != c2){
            size[c1]++;
            path[dest] = base;
            global_min = MIN(global_min, portals[i]->weight);
            weight_path[dest] = portals[i]->weight;
            while (ancestors[c2]->data != 0) {
                SHIPIT curr = pop(&ancestors[c2]);
                parent[curr] = c1;
                if (path[curr] == 0) {
                    path[curr] = dest;
                }
                push(&ancestors[c1], curr);
            }
        }
    }

    SHIPIT p1, p2;
    SHIPIT flag = 0;
    SHIPIT curr_min = 1000000000;
    for (SHIPIT i=1; i<(N+1/2); i++) { // check sorting sequence
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