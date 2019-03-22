(* Function for reading a file *) 
fun parse file =   
    let
        fun readInt input = 
	    Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

        (* Open input file. *)
        val inStream = TextIO.openIn file

        (* Read two integers: Length of ribbon(N) and number of colors(M) - Consume new line *)
	    val N = readInt inStream
        val M = readInt inStream
	    val _ = TextIO.inputLine inStream

        (* A function to read N integers from the open file. *)
        fun readInts 0 acc = acc (* Replace with 'rev acc' for proper order. *)
        | readInts i acc = readInts (i - 1) (readInt inStream :: acc)
    in
   	    (N, M, readInts N [])
    end

