#include <stdio.h>
#include <stdlib.h>

#define MAX(a,b) (((a)>(b))?(a):(b))

int compare(const void * a, const void * b) { // qsort comparison function
    return ( *(int*)a - *(int*)b );
}

long long int discard(long long int* array, long long int* new_array, long long int length) {
    long long int t=-1;
    long long int max_dist = 0;
    for (long long int i=0; i<length; i++) {
        if (array[i] != array[i+1]) {
            max_dist++;
            new_array[++t] = array[i];
        }
    }
    return max_dist;
}

long long int check_capacity(long long int curr_capacity, long long int* distances_nd, long long int uniq, long long int max_distance, long long int* TCs, long long int max_time) {
    long long int curr = curr_capacity;
    if (curr_capacity >= max_distance*TCs[1]) {
        if (max_distance*TCs[2] <= max_time) {
            long long int Xs, Xf = 0;
            long long int Ts, Tf = 0;
            long long int curr_distance = max_distance;
            while (curr_capacity-TCs[3] >= (curr_distance-1)*TCs[1]) {
                Xf++;
                Tf += TCs[2];
                curr_distance--;
                curr_capacity -= TCs[3];
            }
            Xs = max_distance-Xf;
            if (Xs < 0) {
                Xs = 0;
            }
            Ts = Xs*TCs[0];
            long long int total_time = Ts + Tf;
            if (total_time <= max_time) {
                long long int global_time = 0;
                long long int curr_distance, initial;
                for (long long int i=1; i<uniq; i++) {
                    Xf = 0;
                    Tf = 0;
                    total_time = 0;
                    curr_capacity = curr;
                    initial = distances_nd[i]-distances_nd[i-1];
                    curr_distance = distances_nd[i]-distances_nd[i-1];
                    while ((curr_capacity-TCs[3] >= (curr_distance-1)*TCs[1]) && (curr_distance > 0)){
                        Xf++;
                        Tf += TCs[2];
                        curr_distance--;
                        curr_capacity -= TCs[3];
                    }
                    Xs = initial-Xf;
                    if (Xs < 0) {
                        Xs = 0;
                    }
                    Ts = Xs*TCs[0];
                    total_time += Ts + Tf;
                    global_time += total_time;
                    if (global_time > max_time) {
                        return -1;
                    }
                }
                return 1;
            } else {
                return -1;
            }
        } else { // distance not drivable in time with fast-capacity
            return 0;
        }
    } else { // distance not drivable with slow-capacity
        return -1;
    }
}

long long int binary_search_answer(long long int lower, long long int higher, long long int* distances_nd, long long int uniq, long long int max_distance, long long int* TCs, long long int max_time) {
    if (lower == higher) {
        if (check_capacity(lower, distances_nd, uniq, max_distance, TCs, max_time) >= 0) {
            return higher;
        } else {
            return -1;
        }
    } else {
        long long int curr = (lower+higher)/2;
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

    long long int* NKDTs = malloc(4 * sizeof(long long int)); // NKDTs0] : number of cars | NKDTs0[1] : number of stations | NKDTs[2] : distance | NKDTs[3] : time
    for (long long int i=0; i<4; i++) {
        scanf("%lld", &NKDTs[i]);
    }

    long long int max_capacity = 0;
    long long int* cars_price = malloc(NKDTs[0] * sizeof(long long int));
    long long int* cars_capacity = malloc(NKDTs[0] * sizeof(long long int));
    for (long long int i=0; i<NKDTs[0]; i++) {
        scanf("%lld", &cars_price[i]); // read price
        scanf("%lld", &cars_capacity[i]); // read capacity
        if (cars_capacity[i] > max_capacity) { // get largest possible capacity
            max_capacity = cars_capacity[i];
        }
    }

    long long int* distances = malloc((NKDTs[1]+2) * sizeof(long long int));
    long long int* distances_nd = malloc((NKDTs[1]+2) * sizeof(long long int));
    for (long long int i=1; i<NKDTs[1]+1; i++) {
        scanf("%lld", &distances[i]); // array of stations
    }
    distances[0] = 0;
    distances[NKDTs[1]+1] = NKDTs[2];

    long long int* TCs = malloc(4 * sizeof(long long int));
    for (long long int i=0; i<4; i++) { // TCs[0] : Ts | TCs[1] : Cs | TCs[2] : Tf | TCs[3] : Cf
        scanf("%lld", &TCs[i]);
    }

    qsort(distances, NKDTs[1]+2, sizeof(long long int), compare); // sort distances of stations

    long long int uniq;
    uniq = discard(distances, distances_nd, NKDTs[1]+2); // discard duplicate distances on stations

    long long int max_distance = 0;
    for (long long int i=1; i<uniq; i++) { // calculate longest possible distance
        if (distances_nd[i]-distances_nd[i-1] > max_distance) {
            max_distance = distances_nd[i] - distances_nd[i-1];
        }
    }

    long long int optimal_capacity;
    optimal_capacity = binary_search_answer(1, max_capacity, distances_nd, uniq, max_distance, TCs, NKDTs[3]);

    if (optimal_capacity == -1) {
        printf("%d\n", -1);
    } else {
        long long int max_price = 1000000000;
        for (long long int i=0; i<NKDTs[0]; i++) {
            if ((cars_capacity[i] >= optimal_capacity) && (max_price >= cars_price[i])) {
                max_price = cars_price[i];
            }
        }
        printf("%lld\n", max_price);
    }
    
}