listens2Music(mia).
listens2Music(yolanda):- 
    happy(yolanda).  
happy(yolanda). 
playsAirGuitar(mia):- 
    listens2Music(mia). 
playsAirGuitar(yolanda):- 
    listens2Music(yolanda). 

is_digesting(X,Y)  :-  just_ate(X,Y). 
is_digesting(X,Y)  :- 
    just_ate(X,Z), 
    is_digesting(Z,Y). 
    
just_ate(mosquito,blood(john)). 
just_ate(frog,mosquito). 
just_ate(stork,frog).

