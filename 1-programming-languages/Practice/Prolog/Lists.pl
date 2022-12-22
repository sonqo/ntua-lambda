second(H2, [_, H2|_]).

swap([_|T1], [_|T2]) :- T1 = T2.

tran(eins,one). 
tran(zwei,two). 
tran(drei,three). 
tran(vier,four). 
tran(fuenf,five). 
tran(sechs,six). 
tran(sieben,seven). 
tran(acht,eight). 
tran(neun,nine).
listtran([], []).
listtran([H1|T1], [X|T2]) :- tran(H1, X), listtran(T1, T2).

twice([], []).
twice([H1|T1], [H1, H1|T2]) :- twice(T1, T2).