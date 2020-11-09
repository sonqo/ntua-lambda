#include <stdio.h>
#include <stdlib.h>

#define MAX(a,b) (((a)>(b))?(a):(b))

int compare(const void * a, const void * b) {
    return ( *(int*)a - *(int*)b );
}

int check_capacity(int curr, int* distances_nd, int max_distance, int max_capacity) {

}

int discard(int* array, int* new_array, int length) {
    int t=-1;
    int max_dist = 0;
    for (int i=0; i<length; i++) {
        if (array[i] != array[i+1]) {
            max_dist++;
            new_array[++t] = array[i];
        }
    }
    return max_dist;
}

int binary_search_answer(int lower, int higher, int* distances_nd, int max_distance, int max_capacity) {
    int curr;
    if (lower == higher) {
        return lower;
    } else {
        curr = (lower+higher)/2;
        if (check_capacity(curr, distances_nd, max_distance, max_distance) >= 0) {
            binary_search_answer(lower, curr, distances_nd, max_distance, max_capacity);
        } else {
            binary_search_answer(curr, higher, distances_nd, max_distance, max_capacity);
        }
    }
}

int main() {

    int NKDTs[4]; // NKDTs0] : number of cars | NKDTs0[1] : number of stations | NKDTs[2] : distance | NKDTs[3] : time
    for (int i=0; i<4; i++) {
        scanf("%d", &NKDTs[i]);
    }

    int max_capacity = 0;
    int cars[2][NKDTs[0]];
    for (int i=0; i<NKDTs[0]; i++) {
        scanf("%d", &cars[0][i]); // read price
        scanf("%d", &cars[1][i]); // read capacity
        if (cars[1][i] > max_capacity) { // get largest possible capacity
            max_capacity = cars[1][i];
        }
    }

    int distances[NKDTs[1]];
    int distances_nd[NKDTs[1]];
    for (int i=0; i<NKDTs[1]; i++) {
        scanf("%d", &distances[i]); // array of stations
    }

    int TCs[4];
    for (int i=0; i<4; i++) { // TCs[0] : Ts | TCs[1] : Cs | TCs[2] : Tf | TCs[3] : Cf
        scanf("%d", &TCs[i]);
    }

    qsort(distances, NKDTs[1], sizeof(int), compare); // sort distances of stations

    int uniq;
    uniq = discard(distances, distances_nd, NKDTs[1]); // discard duplicate distances on stations

    int max_distance = MAX(distances_nd[0], NKDTs[2]-distances_nd[uniq-1]);
    for (int i=1; i<uniq-1; i++) { // calculate longest possible distance
        if (distances_nd[i]-distances_nd[i-1] > max_distance) {
            max_distance = distances_nd[i] - distances_nd[i-1];
        }
    }

    

}
