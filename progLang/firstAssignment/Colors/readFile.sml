(* A function to read an integer from specified input. *) 
fun parse file =   
    let
        fun readInt input = 
	    Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

        (* Open input file. *)
        val inStream = TextIO.openIn file

        (* Read an integer (number of countries) and consume newline. *)
	    val n = readInt inStream
        val m = readInt inStream
	    val _ = TextIO.inputLine inStream

        (* A function to read N integers from the open file. *)
        fun readInts 0 acc = acc (* Replace with 'rev acc' for proper order. *)
        | readInts i acc = readInts (i - 1) (readInt inStream :: acc)
    in
   	    (m, readInts n [])
    end

fun delete (x, []) = []
  | delete (x, y::ys) = 
      if y = x then 
        delete (x, ys) 
      else 
        y :: delete (x, ys)