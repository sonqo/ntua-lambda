(* A funtion that splits a list into two equal parts *)
fun halve [] = ([], [])
    | halve [a] = ([a], [])
    | halve (h::m::cs) =
        let
            val (x, y) = halve cs
        in
            (h::x, m::y)
        end

(* A funtion that merges two sorted lists *)
fun merge (a, []) = a
    | merge ([], a) = a
    | merge (h1::t1, h2::t2) = 
        if h1 < h2 then h1::merge (t1, h2::t2)
        else h2:: merge (h1::t1, t2) 

(* A funtion that sorts a list in ascending order *)
fun mergeSort [] = []
    |mergeSort [a] = [a]
    |mergeSort (h::t) =
        let
            val (x, y) = halve (h::t)
        in
            merge (mergeSort x, mergeSort y)
        end

(* Using SML/NJ Library *)
fun sort l = ListMergeSort.sort (op >) l