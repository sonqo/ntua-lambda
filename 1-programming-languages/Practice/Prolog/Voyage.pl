byCar(auckland,hamilton). 
byCar(hamilton,raglan). 
byCar(valmont,saarbruecken). 
byCar(valmont,metz). 

byTrain(metz,frankfurt). 
byTrain(saarbruecken,frankfurt). 
byTrain(metz,paris). 
byTrain(saarbruecken,paris). 

byPlane(frankfurt,bangkok). 
byPlane(frankfurt,singapore). 
byPlane(paris,losAngeles). 
byPlane(bangkok,auckland). 
byPlane(singapore,auckland). 
byPlane(losAngeles,auckland).

% travel/2 predicate - possibility of traveling to a destination
travel(X, Y) :- byCar(X, Y); byTrain(X, Y); byPlane(X, Y).
travel(X, Y) :- 
    (byCar(X, Z); byTrain(X, Z); byPlane(X, Z)),
    travel(Z, Y).

% travel/3 predicate - extensions of travel/2, added mean of transportation and in between cities
travel(X, Y, car(X, Y)) :- byCar(X, Y).
travel(X, Y, train(X, Y)) :- byTrain(X, Y).
travel(X, Y, plane(X, Y)) :- byPlane(X, Y).
travel(X, Y, car(X, Z, G)) :- 
    byCar(X, Z),
    travel(Z, Y, G).
travel(X, Y, train(X, Z, G)) :- 
    byTrain(X, Z),
    travel(Z, Y, G).
travel(X, Y, plane(X, Z, G)) :- 
    byPlane(X, Z),
    travel(Z, Y, G).