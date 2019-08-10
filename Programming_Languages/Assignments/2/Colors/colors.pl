% Read file predicate - https://bit.ly/2McaL2O
read_file(File, N, K, List) :- open(File, read, Stream), read_line(Stream, [N, K]), read_line(Stream, List).
read_line(Stream, L) :- read_line_to_codes(Stream, Line), atom_codes(Atom, Line), atomic_list_concat(Atoms, ' ', Atom), maplist(atom_number, Atoms, L).

% A predicate that initializes a list of N elements to the value of V, used for Counters list- https://bit.ly/2KAqXYu
build(_, 0, []). 
build(V, N, [V|L]) :- N > 0, N1 is N - 1, build(V, N1, L), !.

% A predicate all_colors/1 that checks the Counters list to decide whethers all colors have been met 
check([]).
check([H|L]) :- \+H = 0, check(L).
all_colors([H|L]) :- H = 0, check(L).

% Predicates update_inc/3 and update_dec/3 that increases and decreases respectively the ColorCounter list - https://bit.ly/2yKGpMf
replace([_|T], 0, X, [X|T]).
replace([H|T], I, V, [H|N]) :- 
    I > 0, I1 is I-1, replace(T, I1, V, N).
update_inc(List, Index, NewList) :- replace(List, Index, El, NewList), nth0(Index, List, Elem), El is Elem+1, !.
update_dec(List, Index, NewList) :- replace(List, Index, El, NewList), nth0(Index, List, Elem), El is Elem-1, !.

% A predicate locate_head/5 that locates the best possible starting pointer for a potential valid sequence
locate_head(List, Counters, _, StartingP, Iteration, FinalCounters, FinalP) :- 
    (\+Iteration = 0 -> nth0(StartingP, List, Element), nth0(Element, Counters, El), El = 1, FinalCounters = Counters, FinalP is StartingP, ! ; false).
locate_head(List, Counters, N, StartingP, Iteration, FinalCounters, FinalP) :- 
    nth0(StartingP, List, Index), update_dec(Counters, Index, NewCounters), NewStartingP is StartingP+1, 
    NewIteration is Iteration+1, locate_head(List, NewCounters, N, NewStartingP, NewIteration, FinalCounters, FinalP), !.

% A predicate locate_tail/5 that locates the ending pointer of a valid sequence
locate_tail(_, _, N, EndingP, _, _, _) :- EndingP > N.  
locate_tail(_, Counters, _, EndingP, Iteration, FinalCounters, FinalP) :- 
    Iteration = 0, all_colors(Counters), FinalCounters = Counters, FinalP is EndingP-1, !.
locate_tail(_, Counters, _, EndingP, Iteration, FinalCounters, FinalP) :- 
    \+Iteration = 0, all_colors(Counters), FinalCounters = Counters, FinalP is EndingP-1, !.
locate_tail(List, Counters, N, EndingP, _, FinalCounters, FinalP) :- 
    nth0(EndingP, List, Index), update_inc(Counters, Index, NewCounters),
    NewEndingP is EndingP+1, locate_tail(List, NewCounters, N, NewEndingP, 1, FinalCounters, FinalP).

prefinal(List, Counters, N, StartingP, EndingP, Iteration, FinalS, FinalE, FinalCounters) :-
    Iteration = 0, FinalS is StartingP, locate_tail(List, Counters, N, EndingP, 0, FinalCounters, FinalE), !.
prefinal(List, Counters, N, StartingP, EndingP, Iteration, FinalS, FinalE, FinalCounters) :-
    Iteration = 1, locate_head(List, Counters, N, StartingP, 0, NewCounters, FinalS), locate_tail(List, NewCounters, N, EndingP, 0, FinalCounters, FinalE),
    (locate_tail(List, NewCounters, N, EndingP, 0, FinalCounters, FinalE) = false -> false ; true).

final(List, Counters, N, StartingP, EndingP, Iteration, Length, FinalLength) :-
    prefinal(List, Counters, N, StartingP, EndingP, Iteration, NewStartingP, NewEndingP, NewCounters),
    (NewEndingP-NewStartingP+1 < Length -> 
    NewNewEndingP is NewEndingP+1, NewLength is NewEndingP-NewStartingP+1, final(List, NewCounters, N, NewStartingP, NewNewEndingP, 1, NewLength, FinalLength) ;
    NewNewEndingP is NewEndingP+1, final(List, NewCounters, N, NewStartingP, NewNewEndingP, 1, Length, FinalLength)).
final(_, _, N, _, _, _, Length, FinalLength) :-
    (NewN is N+1, Length = NewN -> FinalLength is 0 ; FinalLength is Length).

colors(File, Answer) :- 
    read_file(File, N, K, List), NewK is K+1, NewN is N+1, build(0, NewK, Counters),
    final(List, Counters, N, 0, 0 , 0, NewN, Answer), !.
