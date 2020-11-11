#include <stdio.h>
#include <stdlib.h>

typedef long long int SHIPIT;

int compare(const void * a, const void * b) { // qsort comparison function
    return ( *(int*)a - *(int*)b );
}

SHIPIT discard(SHIPIT const* array, SHIPIT* new_array, SHIPIT length) {
    SHIPIT t=-1;
    SHIPIT max_dist = 0;
    for (SHIPIT i=0; i<length; i++) {
        if (array[i] != array[i+1]) {
            max_dist++;
            new_array[++t] = array[i];
        }
    }
    return max_dist;
}

SHIPIT check_capacity(SHIPIT curr_capacity, SHIPIT const* distances_nd, SHIPIT uniq, SHIPIT max_distance, SHIPIT const* TCs, SHIPIT max_time) {
    SHIPIT curr = curr_capacity;
    if (curr_capacity >= max_distance*TCs[1]) {
        if (max_distance*TCs[2] <= max_time) {
            SHIPIT Xs, Xf, Ts, Tf;
            SHIPIT global_time = 0;
            SHIPIT initial, curr_distance, total_time;
            for (SHIPIT i=1; i<uniq; i++) {
                total_time = 0;
                curr_capacity = curr;
                initial = distances_nd[i]-distances_nd[i-1];
                curr_distance = distances_nd[i]-distances_nd[i-1];
                Xs = (curr_capacity - curr_distance*TCs[3]) / (TCs[1] - TCs[3]); // capacity = Cs*Xs + (d-Xs)*Cf
                if (initial < Xs) { //distance not reachable due to capacity
                    return -1;
                } else {
                    Xf = curr_distance - Xs;
                    Ts = Xs*TCs[0];
                    Tf = Xf*TCs[2];
                    total_time += Ts + Tf;
                    global_time += total_time;
                    if (global_time > max_time) {
                        return -1;
                    }
                }
            }
            return 1;
        } else { // distance not reachable in time
            return 0;
        }
    } else { // distance not reachable due to capacity
        return -1;
    }
}

SHIPIT binary_search_answer(SHIPIT lower, SHIPIT higher, SHIPIT* distances_nd, SHIPIT uniq, SHIPIT max_distance, SHIPIT* TCs, SHIPIT max_time) {
    if (lower == higher) {
        if (check_capacity(lower, distances_nd, uniq, max_distance, TCs, max_time) >= 0) {
            return higher;
        } else {
            return -1;
        }
    } else {
        SHIPIT curr = (lower+higher)/2;
        if (check_capacity(curr, distances_nd, uniq, max_distance, TCs, max_time) > 0) {
            return binary_search_answer(lower, curr, distances_nd, uniq, max_distance, TCs, max_time);
        } else if (check_capacity(curr, distances_nd, uniq, max_distance, TCs, max_time) < 0) {
            return binary_search_answer(curr+1, higher, distances_nd, uniq, max_distance, TCs, max_time);
        } else {
            return -1;
        }
    }
}

int main() {

    SHIPIT* NKDTs = malloc(4 * sizeof(SHIPIT)); // NKDTs0] : number of cars | NKDTs0[1] : number of stations | NKDTs[2] : distance | NKDTs[3] : time
    for (SHIPIT i=0; i<4; i++) {
        scanf("%lld", &NKDTs[i]);
    }

    SHIPIT max_capacity = 0;
    SHIPIT* cars_price = malloc(NKDTs[0] * sizeof(SHIPIT));
    SHIPIT* cars_capacity = malloc(NKDTs[0] * sizeof(SHIPIT));
    for (SHIPIT i=0; i<NKDTs[0]; i++) {
        scanf("%lld", &cars_price[i]); // read price
        scanf("%lld", &cars_capacity[i]); // read capacity
        if (cars_capacity[i] > max_capacity) { // get largest possible capacity
            max_capacity = cars_capacity[i];
        }
    }

    SHIPIT* distances = malloc((NKDTs[1]+2) * sizeof(SHIPIT));
    SHIPIT* distances_nd = malloc((NKDTs[1]+2) * sizeof(SHIPIT));
    for (SHIPIT i=1; i<NKDTs[1]+1; i++) {
        scanf("%lld", &distances[i]); // array of stations
    }
    distances[0] = 0;
    distances[NKDTs[1]+1] = NKDTs[2];

    SHIPIT* TCs = malloc(4 * sizeof(SHIPIT));
    for (SHIPIT i=0; i<4; i++) { // TCs[0] : Ts | TCs[1] : Cs | TCs[2] : Tf | TCs[3] : Cf
        scanf("%lld", &TCs[i]);
    }

    qsort(distances, NKDTs[1]+2, sizeof(SHIPIT), compare); // sort distances of stations

    SHIPIT uniq;
    uniq = discard(distances, distances_nd, NKDTs[1]+2); // discard duplicate distances on stations

    SHIPIT max_distance = 0;
    for (SHIPIT i=1; i<uniq; i++) { // calculate longest possible distance
        if (distances_nd[i]-distances_nd[i-1] > max_distance) {
            max_distance = distances_nd[i] - distances_nd[i-1];
        }
    }

    SHIPIT optimal_capacity;
    optimal_capacity = binary_search_answer(1, max_capacity, distances_nd, uniq, max_distance, TCs, NKDTs[3]);

    if (optimal_capacity == -1) {
        printf("%d\n", -1);
    } else {
        SHIPIT max_price = 1000000000;
        for (SHIPIT i=0; i<NKDTs[0]; i++) {
            if ((cars_capacity[i] >= optimal_capacity) && (max_price >= cars_price[i])) {
                max_price = cars_price[i];
            }
        }
        printf("%lld\n", max_price);
    }

}