datatype BinarySearchTree = Leaf | Node of BinarySearchTree * int * BinarySearchTree

val myTree = Node(Node(Leaf, ~4, Leaf), 1, Node(Node(Leaf, 6, Leaf), 3, Node(Leaf, 2, Leaf)))

fun sum Leaf = 0
    |sum (Node(t1, i, t2)) = i + sum t1 + sum t2

fun max3 a b c =
    if a > b then 
        if a > c then a
        else c
    else
        if b > c then b
        else c

fun maxsum Leaf m = (0, 0)
    |maxsum (Node(t1, i, t2)) m = 
        let
            val (curr_1, m) = maxsum t1 m
            val (curr_2, m) = maxsum t2 m
        in
            (i + curr_1 + curr_2, max3 m curr_1 curr_2)
        end

fun final tr = #2(maxsum tr 0)