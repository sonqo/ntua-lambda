#include <stdio.h>
#include <stdlib.h>

#define MIN(a,b) (((a)<(b))?(a):(b))

typedef long long int Long;

struct edge {
    Long base, destination, weight;
};

struct node {
    Long data;
    struct node* next;
};

void swap(Long* n1, Long* n2) {
    Long temp;
    temp = *n1;
    *n1 = *n2;
    *n2 = temp;
}

void push(struct node** head, Long data) {
    struct node* curr;
    curr = (struct node*) malloc(sizeof(struct node));
    curr->data = data;
    curr->next = *head;
    *head = curr;
}

Long pop(struct node** head) {
    Long r;
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

void merge(struct edge** array, Long left, Long border, Long right) {
    Long i, j, k;
    Long p2 = right-border;
    Long p1 = border-left+1;

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

void merge_sort(struct edge** array, Long left, Long right) {
    if (left<right) {

        Long border = left + (right-left)/2;

        merge_sort(array, left, border);
        merge_sort(array, border+1, right);

        merge(array, left, border, right);
    }
}

int main() {

    Long* NMs = malloc(2 * sizeof(Long));
    for (Long i=0; i<2; i++) { // NMs[0]=N : numbers of universes | NMs[1]=M : number of portals
        scanf("%lld", &NMs[i]);
    }

    Long N = NMs[0];
    Long M = NMs[1];

    Long* size = malloc((N+1) * sizeof(Long));
    Long* array = malloc((N+1) * sizeof(Long));
    struct node** ancestors = malloc((N+1) * sizeof(struct node));
    for (Long i=1; i<N+1; i++) { // read unordered array
        size[i] = 0;
        scanf("%lld", &array[i]);

        ancestors[i] = malloc(sizeof(struct node));
        ancestors[i]->data = 0;
        ancestors[i]->next = NULL;
        push(&ancestors[i], i);
    }

    struct edge** portals = malloc(M * sizeof(struct edge));
    for (Long i=0; i<M; i++) { // read array of points to EDGE struct
        Long acc[3];
        portals[i] = malloc(sizeof(struct edge));
        for (Long j=0; j<3; j++){
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

    Long* parent = malloc((N+1) * sizeof(Long)); // create parent array for union find implementation
    for (Long i=1; i<N+1; i++) {
        parent[i] = i;
    }

    Long* path = malloc(((N+1) * sizeof(Long))); // immidiate ancestor array
    Long* weight_path = malloc(((N+1) * sizeof(Long))); // weight-to-ancestor array
    for (Long i=0; i<N+1; i++) {
        path[i] = 0;
        weight_path[i] = -1;
    }

    merge_sort(portals, 0, M-1); //sort pointers of edges according to their weight

    Long c1, c2;
    Long global_min = 1000000000;
    for (Long i=0; i<M; i++) { // Kruskal's algorithm
        c1 = parent[portals[i]->base];
        c2 = parent[portals[i]->destination];

        Long base = portals[i]->base;
        Long dest = portals[i]->destination;
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
                Long curr = pop(&ancestors[c2]);
                parent[curr] = c1;
                if (path[curr] == 0) {
                    path[curr] = dest;
                }
                push(&ancestors[c1], curr);
            }
        }
    }

    Long p1, p2;
    Long flag = 0;
    Long curr_min = 1000000000;
    for (Long i=1; i<(N+1/2); i++) { // check sorting sequence
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