(* A function that reads the length of ribbon(N) and the number of colors(M) from file. *) 
fun readFile file =   
    let
        fun readInt input = 
	        Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

        (* Open input file. *)
        val inStream = TextIO.openIn file

        (* Read two integers: Length of ribbon(N) and number of colors(M) - Consume new line. *)
        val N = readInt inStream
        val M = readInt inStream
    in
        (N, M)
    end

(* A function that reads the ribbon from file *)
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
        fun readInts 0 acc = acc 
          | readInts i acc = readInts (i - 1) (readInt inStream :: acc)
    in
        readInts N []
    end

val array = parseFile "colors.txt"
val (N, M) = readFile "colors.txt"

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

