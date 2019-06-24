middle([], []).
middle([X], [X]).
middle([X, Y], [X, Y]).
middle([First|Rest], [First, Middle, Last]) :-
    append(Inside, [Last], Rest),
    middle(Inside, Middle).