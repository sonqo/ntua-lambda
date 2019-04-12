datatype btree = Empty | Leaf | Node of btree * btree

(* A funtion that counts the leaves of a tree *)
fun countLeaves Empty = 0
    | countLeaves Leaf = 1
    | countLeaves (Node (t1, t2)) = countLeaves(t1) + countLeaves(t2)

(* A function that calculates the maximum depth of a tree *)
fun maxDepth Empty = 0
    | maxDepth Leaf = 1
    | maxDepth (Node (t1, t2)) = 1 + Int.max (maxDepth t1, maxDepth t2)