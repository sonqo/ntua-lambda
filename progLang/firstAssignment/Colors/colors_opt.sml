(* A funtion that returns the head of a list *)
fun head ([]) = raise Empty
    | head ([h:int]) = h
    | head ((h::t)) = h

(* A function that skips consecutive integers of a list and starts counting from the last one *)
fun excessColors ([]) = []
    | excessColors ([h]) = [h] 
    | excessColors ((h::t)) = 
        if head (t) = h then excessColors (t)
        else (h::t)

(* A function that checks if an integer is in a list. *)
fun isMember ([], el:int) = false 
    | isMember ((h::t), el) = 
        if h = el then 
            true
        else 
            isMember (t, el)

(* A function that checks if the ribbon has all the colors needed *)
fun allColors ([], col) = false
    | allColors (list, 0) = true
    | allColors (list, col:int) =
        if isMember (list, col) then  
            allColors (list, (col - 1))
        else 
            false

(* A function that splits a list to the Mth element *)
fun splitList ((h::t):int list, 0) = []
    | splitList (([], M)) = []   
    | splitList ((h::t), M) = 
    if length ((h::t)) < M then []
    else h :: splitList (t, M-1)

fun leastSeq ([], col, len:int) = 0
    | leastSeq ((h::t), col, len) = 
        if allColors (excessColors (splitList ((h::t), len)), col) then 
            length (excessColors (splitList ((h::t), len)))
        else
            leastSeq ((h::t), col, len+1)