fun head [] = raise Empty
    |head (h::_) = h

fun tail [] = []
    |tail (_::t) = t

fun member [] _ = false
    |member (h::t) element = if h = element then true else member t element

fun len [] = 0
    |len (h::t) = 1 + len t

fun subset _ [] = true
    |subset l (h2::t2) = if member l h2 = true then subset l t2 else false

fun zip [] _ = []
    |zip _ [] = []
    |zip (h1::t1) (h2::t2) = [[h1, h2]] @ zip t1 t2

fun unzip [] = []
    |unzip (h::t) = head h :: tail h @ unzip t

fun nth ([], _) = raise Empty
    |nth ((h::_), 1) = h
    |nth ((h::t), n) = nth (t, n-1)

fun take ([], _) = []
    |take (_, 0) = []
    |take ((h::t), n) = [h] @ take (t, n-1)

fun drop ([], _) = []
    |drop ((h::t), 1) = t 
    |drop ((h::t), n) = drop (t, n-1)

fun rev [] = []
    |rev (h::t) = rev t @ [h]

fun last ([], _) = []
    |last (_, 0) = []
    |last (l, n) = drop(l, (len l) - n)

fun fact 0 = 1
    |fact n = n * fact (n-1)

fun max(x, y) = if x > y then x else y
fun mymax [] = 0
    |mymax [x] = x
    |mymax (x::xs) = let val y = mymax xs in max(x, y) end

fun listify [] = [[]]
    |listify [x] = [[]]
    |listify [x, y] = if x < y then [[x, y]] else [[x], [y]]
    |listify (x::y::xs) = 
        let 
            val first::rest = listify (y::xs) 
        in
            if x < y then (x::first)::rest
            else [x]::first::rest
        end 
