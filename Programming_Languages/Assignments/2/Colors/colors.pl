% A predicate that initializes a list of N elements to the value of X.
build(_, 0, []). 
build(X, N, [X|L]) :- N > 0, N1 is N - 1, build(X, N1, L).

% A predicate update/3 that returns an update counter list for ribbon - https://bit.ly/2yKGpMf
replace([_|T], 0, X, [X|T]).
replace([H|T], I, V, [H|N]):- I > 0, I1 is I-1, replace(T, I1, V, N).
update([H|_], List, NewList) :- replace(List, H, El, NewList), nth0(H, List, Elem), El is Elem+1, !.

% A predicate correct/1 that checks whether the counter list is not zero
check([]).
check([H|L]) :- \+H = 0, check(L).
all_colors([H|L]) :- H = 0, check(L).

% A predicate locate_seq/3 that returns the counter list of the first completed sequence
locate_seq(_, Counters, NewCounters) :- all_colors(Counters), NewCounters = Counters, !.
locate_seq([H|L], Counters, FinalCounters) :- update([H|L], Counters, NewCounters), locate_seq(L, NewCounters, FinalCounters).

