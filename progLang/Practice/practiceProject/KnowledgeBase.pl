listens2Music(mia).
listens2Music(yolanda):- 
    happy(yolanda).  
happy(yolanda). 
playsAirGuitar(mia):- 
    listens2Music(mia). 
playsAirGuitar(yolanda):- 
    listens2Music(yolanda). 

is_digesting(X,Y) :- just_ate(X,Y). 
is_digesting(X,Y) :- 
    just_ate(X,Z), 
    is_digesting(Z,Y). 
just_ate(mosquito,blood(john)). 
just_ate(frog,mosquito). 
just_ate(stork,frog).

child(bridget,caroline). 
child(caroline,donna).
child(anne,bridget). 
child(bridget,caroline). 
child(caroline,donna). 
child(donna,emily).
descend(X,Y) :- child(X,Y). 
descend(X,Y) :- 
    child(X,Z), 
    descend(Z,Y).

numeral(0). 
numeral(succ(X)) :- numeral(X).

directly(katarina,olga).
directly(olga, natasha).
directly(natasha, irina).
in(X,Y) :- directly(X,Y).
in(X,Y) :- 
    directly(X,Z), 
    in(Z,Y).

connected(1,2). 
connected(3,4). 
connected(5,6). 
connected(7,8). 
connected(9,10). 
connected(12,13). 
connected(13,14). 
connected(15,16). 
connected(17,18). 
connected(19,20). 
connected(4,1). 
connected(6,3). 
connected(4,7). 
connected(6,11). 
connected(14,9). 
connected(11,15). 
connected(16,12). 
connected(14,17). 
connected(16,19).
path(X,Y) :- connected(X,Y); connected(Y,X).
path(X,Y) :-
    connected(X,Z),
    path(Z,Y).