boy(rami).
boy(hani).

girl(dania).

cat(lima).

person(X) :- boy(X).
person(X) :- girl(X).

friend(W,Z) :- person(W), person(Z), W\==Z.