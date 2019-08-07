% A predicate that initializes a list of N elements to the value of X.
build(_, 0, []). 
build(X, N, [X|L]) :- N > 0, N1 is N - 1, build(X, N1, L).

% A predicate that updates the element of index I to value V.
replace([_|T], 0, X, [X|T]).
replace([H|T], I, V, [H|N]):- I > 0, I1 is I-1, replace(T, I1, V, N).

% A predicate correct/1 that checks whether the counter list is not zero
check([]).
check([H|L]) :- \+H = 0, check(L).
correct([H|L]) :- H = 0, check(L).

update([H|_], List, NewList) :- replace(List, Head, El, NewList), nth1(H, List, Elem), El is Elem+1, Head is H-1, !.

