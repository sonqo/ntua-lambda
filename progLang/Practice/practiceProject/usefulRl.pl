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

% append([1, 2], [3, 4], Z) :=> Z = [1, 2, 3, 4] :=> Z is the result of unification of the two lists
% append can be used with variables instead of all three parameters!
append([], L, L).
append([H|L1], L2, [H|L3]) :- append(L1, L2, L3).

% member(X, Y) :=> List Y has a member X

% select(X, Y, Z) :=> List Y has a member X and list Z is equal to Y without ONE occurrence of element X

% length(L, N) :=> List L has length of N

% reverse(L, Y) :=> List Y is equal to the reversed list L - Not optimal!

% sort(L, X) :=> List X is the sorted version of random list L