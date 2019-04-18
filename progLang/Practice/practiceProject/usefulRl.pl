% Finding the last element of a list

last_elem(X, [X]).
last_elem(X, [_|L]) :- last_elem(X, L).

% Finding the second last element of a list

second_last(X, [X, _]).
second_last(X, [_, SecondLast|L]) :- second_last(X, [SecondLast|L]).

% Finding the N'th element of a list

find_elem(X, [X|_], 1).
find_elem(X, [_|L], N) :- N > 1, N1 is N-1, find_elem(X, L, N1).

% Finding the length of a list

len(0, []).
len(X, [_|L]) :- len(X1, L), X is X1 + 1. 