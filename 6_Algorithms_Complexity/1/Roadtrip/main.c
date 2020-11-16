#include <stdio.h>
#include <stdlib.h>

typedef long long int Long;

int compare(const void * a, const void * b) { // qsort comparison function
    return ( *(int*)a - *(int*)b );
}

Long discard(Long const* array, Long* new_array, Long length) {
    Long t=-1;
    Long max_dist = 0;
    for (Long i=0; i<length; i++) {
        if (array[i] != array[i+1]) {
            max_dist++;
            new_array[++t] = array[i];
        }
    }
    return max_dist;
}

Long check_capacity(Long curr_capacity, Long const* distances_nd, Long uniq, Long max_distance, Long const* TCs, Long max_time) {
    Long curr = curr_capacity;
    if (curr_capacity >= max_distance*TCs[1]) {
        if (max_distance*TCs[2] <= max_time) {
            Long Xs, Xf, Ts, Tf;
            Long global_time = 0;
            Long initial, curr_distance, total_time;
            for (Long i=1; i<uniq; i++) {
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

Long binary_search_answer(Long lower, Long higher, Long* distances_nd, Long uniq, Long max_distance, Long* TCs, Long max_time) {
    if (lower == higher) {
        if (check_capacity(lower, distances_nd, uniq, max_distance, TCs, max_time) >= 0) {
            return higher;
        } else {
            return -1;
        }
    } else {
        Long curr = (lower+higher)/2;
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

    Long* NKDTs = malloc(4 * sizeof(Long)); // NKDTs0] : number of cars | NKDTs0[1] : number of stations | NKDTs[2] : distance | NKDTs[3] : time
    for (Long i=0; i<4; i++) {
        scanf("%lld", &NKDTs[i]);
    }

    Long max_capacity = 0;
    Long* cars_price = malloc(NKDTs[0] * sizeof(Long));
    Long* cars_capacity = malloc(NKDTs[0] * sizeof(Long));
    for (Long i=0; i<NKDTs[0]; i++) {
        scanf("%lld", &cars_price[i]); // read price
        scanf("%lld", &cars_capacity[i]); // read capacity
        if (cars_capacity[i] > max_capacity) { // get largest possible capacity
            max_capacity = cars_capacity[i];
        }
    }

    Long* distances = malloc((NKDTs[1]+2) * sizeof(Long));
    Long* distances_nd = malloc((NKDTs[1]+2) * sizeof(Long));
    for (Long i=1; i<NKDTs[1]+1; i++) {
        scanf("%lld", &distances[i]); // array of stations
    }
    distances[0] = 0;
    distances[NKDTs[1]+1] = NKDTs[2];

    Long* TCs = malloc(4 * sizeof(Long));
    for (Long i=0; i<4; i++) { // TCs[0] : Ts | TCs[1] : Cs | TCs[2] : Tf | TCs[3] : Cf
        scanf("%lld", &TCs[i]);
    }

    qsort(distances, NKDTs[1]+2, sizeof(Long), compare); // sort distances of stations

    Long uniq;
    uniq = discard(distances, distances_nd, NKDTs[1]+2); // discard duplicate distances on stations

    Long max_distance = 0;
    for (Long i=1; i<uniq; i++) { // calculate longest possible distance
        if (distances_nd[i]-distances_nd[i-1] > max_distance) {
            max_distance = distances_nd[i] - distances_nd[i-1];
        }
    }

    Long optimal_capacity;
    optimal_capacity = binary_search_answer(1, max_capacity, distances_nd, uniq, max_distance, TCs, NKDTs[3]);

    if (optimal_capacity == -1) {
        printf("%d\n", -1);
    } else {
        Long max_price = 1000000000;
        for (Long i=0; i<NKDTs[0]; i++) {
            if ((cars_capacity[i] >= optimal_capacity) && (max_price >= cars_price[i])) {
                max_price = cars_price[i];
            }
        }
        printf("%lld\n", max_price);
    }

    return 0;

}