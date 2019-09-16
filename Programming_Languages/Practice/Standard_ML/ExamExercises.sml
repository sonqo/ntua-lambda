datatype BinarySearchTree = Leaf | Node of BinarySearchTree * int * BinarySearchTree

val myTree = Node(Node(Leaf, ~4, Leaf), 1, Node(Node(Leaf, 6, Leaf), 3, Node(Leaf, 2, Leaf)))

fun sum Leaf = 0
    |sum (Node(t1, i, t2)) = i + sum t1 + sum t2

fun maxsum Leaf m = (0, 0)
    |maxsum (Node(t1, i, t2)) m = 
        let
            val curr = i + #1(maxsum t1 m) + #1(maxsum t2 m)
            val curr_m = 
                if #2(maxsum t1 m) > curr then #2(maxsum t1 m)
                else if #2(maxsum t2 m) > curr then #2(maxsum t2 m)
                else curr  
        in
            (curr, curr_m)
        end