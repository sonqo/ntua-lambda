% Read file predicate - https://bit.ly/2McaL2O
read_file(File, N, K, C) :- open(File, read, Stream), read_line(Stream, [N, K]), read_line(Stream, C).
read_line(Stream, L) :- read_line_to_codes(Stream, Line), atom_codes(Atom, Line), atomic_list_concat(Atoms, ' ', Atom), maplist(atom_number, Atoms, L).

% A predicate that initializes a list of N elements to the value of X - https://bit.ly/2KAqXYu
build(_, 0, []). 
build(X, N, [X|L]) :- N > 0, N1 is N - 1, build(X, N1, L), !.

% Predicates update_inc/3 and update_dec/3 that increases and decreases respectively the ColorCounter list - https://bit.ly/2yKGpMf
replace([_|T], 0, X, [X|T]).
replace([H|T], I, V, [H|N]) :- 
    I > 0, I1 is I-1, replace(T, I1, V, N).
update_inc(List, Index, NewList) :- 
    replace(List, Index, El, NewList), nth0(Index, List, Elem), El is Elem+1, !.
update_dec(List, Index, NewList) :- 
    replace(List, Index, El, NewList), nth0(Index, List, Elem), El is Elem-1, !.

% A predicate all_colors/1 that checks colors counter to decide whethers all colors have been met 
check([]).
check([H|L]) :- \+H = 0, check(L).
all_colors([H|L]) :- H = 0, check(L).

% A predicate locate_tail/5 that locates the ending pointer of a valid sequence
locate_tail(_, _, N, EndingP, _, _, _) :- EndingP > N.  
locate_tail(_, Counters, _, EndingP, GlobalIteration, FinalCounters, FinalP) :- 
    GlobalIteration = 0, all_colors(Counters), FinalCounters = Counters, FinalP is EndingP-1, !.
locate_tail(_, Counters, _, EndingP, GlobalIteration, FinalCounters, FinalP) :- 
    \+GlobalIteration = 0, all_colors(Counters), FinalCounters = Counters, FinalP is EndingP-1, !.
locate_tail(List, Counters, N, EndingP, _, FinalCounters, FinalP) :- 
    nth0(EndingP, List, Index), update_inc(Counters, Index, NewCounters),
    NewEndingP is EndingP+1, locate_tail(List, NewCounters, N, NewEndingP, 1, FinalCounters, FinalP).

% A predicate locate_head/5 that locates the best possible starting pointer for a potential valid sequence
locate_head(List, Counters, _, StartingP, Iteration, FinalCounters, FinalP) :- 
    ( \+Iteration = 0 ->
        nth0(StartingP, List, Element), nth0(Element, Counters, El), El = 1, FinalCounters = Counters, FinalP is StartingP, !
    ;
        false
    ).
locate_head(List, Counters, N, StartingP, Iteration, FinalCounters, FinalP) :- 
    nth0(StartingP, List, Index), update_dec(Counters, Index, NewCounters), NewStartingP is StartingP+1, 
    NewIteration is Iteration+1, locate_head(List, NewCounters, N, NewStartingP, NewIteration, FinalCounters, FinalP), !.


