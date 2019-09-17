datatype BinarySearchTree = Leaf | Node of BinarySearchTree * int * BinarySearchTree

val myTree = Node(Node(Node(Leaf, ~5, Leaf), ~4, Node(Node(Leaf, 8, Leaf), ~1, Node(Leaf, 8, Leaf))), 1, Node(Node(Leaf, 6, Leaf), 3, Node(Leaf, 2, Leaf)))

fun sum Leaf = 0
    |sum (Node(t1, i, t2)) = i + sum t1 + sum t2

fun max3 a b c =
    if a > b then 
        if a > c then a
        else c
    else
        if b > c then b
        else c

fun max2 a b =
    if a > b then a
    else b

fun maxsum Leaf m = (0, 0)
    |maxsum (Node(t1, i, t2)) m = 
        let
            val (curr, m) = (i + #1(maxsum t1 m) + #1(maxsum t2 m), m)
        in
            (curr, max2 curr m)
        end

fun final tr = #2(maxsum tr 0)