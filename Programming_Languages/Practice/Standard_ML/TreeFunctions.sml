(* Trees *)
datatype btree = Empty | Leaf | Node of btree * btree

fun countLeaves Empty = 0
    | countLeaves Leaf = 1
    | countLeaves (Node (t1, t2)) = countLeaves(t1) + countLeaves(t2)

fun maxDepth Empty = 0
    | maxDepth Leaf = 1
    | maxDepth (Node (t1, t2)) = 1 + Int.max (maxDepth t1, maxDepth t2)

(* Binary Search Trees *)
datatype BinarySearchTree = Leaf | Br of BinarySearchTree * int * BinarySearchTree

fun Insert (i, Leaf) = Br (Leaf, i, Leaf)
    |Insert (i, tr as Br (t1, j, t2)) = 
        if i = j then tr
        else if i < j then Br (Insert(i, t1), j, t2)
        else Br (t1, j, Insert(i, t2))

fun Member (i, Leaf) = false
    |Member (i, Br (t1, j, t2)) = 
        if i = j then true
        else if i < j then Member(i, t1)
        else Member (i, t2)

fun traverse (Leaf) = []
    |traverse (Br (t1, i, t2)) = traverse (t1) @ [i] @ traverse (t2)

fun floor tr key = 
    let 
        fun walk Leaf sofar = sofar
            |walk (Br(t1, i, t2)) sofar =    
                if key = i then SOME i
                else if key < i then walk t1 sofar
                else walk t2 SOME i
    in 
        walk tr None
    end