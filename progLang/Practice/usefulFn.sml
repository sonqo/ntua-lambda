(* A Function that returns the head of a list *)
fun head [] = raise Empty
  | head (h::t) = h;

(* A Function that returns the tail of a list *)
fun tail [] = raise Empty
  | tail (h::t) = t;

(* A Function that returns the last element of a list *)
fun last [] = raise Empty
  | last [xs] = xs
  | last (h::t) = last t;

(* A Function that returns the length of a list *)
fun len [] = 0
  | len (h::t) = 1 + length t;

(* A Function that returns a reversed list *)
fun rev [] = []
  | rev (h::t) = rev t @ [h];

(* A Function that checks if an integer is in a list *)
fun member ([], el:int) = false 
  | member (h::t, el) = 
      if h = el then 
        true
      else 
        member (t, el);

(* A Function that checks whether two lists are equal or not *)
fun compare ([], []) = true
  | compare ([], (h::t):int list) = false
  | compare ((h::t):int list, []) = false
  | compare ((h1::t1), (h2::t2)) = 
      if h1 = h2 andalso compare (t1, t2) then
        true
      else
        false;

(* A Function that checks if a list is palindrome or not *)
fun palindrome [] = true
  | palindrome (h::t) = 
      let
        val reversed = rev (h::t)
      in
        if compare ((h::t), reversed) then
          true
        else
          false
      end

(* A function that deletes specific element of a list *)
fun delete (x, []) = []
  | delete (x, y::ys) = 
      if y = x then 
        delete (x, ys) 
      else 
        y :: delete (x, ys)

