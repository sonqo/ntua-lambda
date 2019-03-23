(* A function for reading a file. *) 
fun parseFile file =   
    let
        fun readInt input = 
	    Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

        (* Open input file. *)
        val inStream = TextIO.openIn file

        (* Read two integers: Length of ribbon(N) and number of colors(M) - Consume new line. *)
	    val N = readInt inStream
        val M = readInt inStream
	    val _ = TextIO.inputLine inStream

        (* A function to read N integers from the open file. *)
        fun readInts 0 acc = acc (* Replace with 'rev acc' for proper order. *)
        | readInts i acc = readInts (i - 1) (readInt inStream :: acc)
    in
        (readInts N [])
    end

val array = parse "colors.txt"

(* A function that checks if an integer is in a list. *)
fun isMember ([], el:int) = false 
  | isMember (h::t, el) = 
      if h = el then 
        true
      else 
        isMember (t, el);

(* A function that checks if the ribbon has all the colors needed. *)
fun allColors ([], el:int) = false
    | allColors (h::t, el) =
        if isMember (h::t, el) then  
            isMember (h::t, el - 1)
        else 
            false

