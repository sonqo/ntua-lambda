/* A predicate that reads the input from File and returns it in the last three arguments: N, M and Ribbon. */

read_input(File, N, M, Ribbon) :-
    open(File, read, Stream),
    read_line(Stream, [N, M]),
    read_line(Stream, Ribbon).

read_line(Stream, L) :-
    read_line_to_codes(Stream, Line),
    atom_codes(Atom, Line),
    atomic_list_concat(Atoms, ' ', Atom),
    maplist(atom_number, Atoms, L).