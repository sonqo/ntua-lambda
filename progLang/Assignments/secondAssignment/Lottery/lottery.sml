(* A function that reads input file and returns number of digits(N), number of winning tickets(W), number of canditate tickets(C) and all tickets *)
fun readFile file =   
    let
      fun readInt input = 
      Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

      (* Open input file. *)
      val inStream = TextIO.openIn file

      (* Read three integers - Consume new line. *)
      val N = readInt inStream
      val W = readInt inStream
      val C = readInt inStream

    fun readInts 0 acc = acc
      | readInts i acc = readInts (i - 1) (readInt inStream :: acc)

    in
      [[N], [W], [C], readInts W [], readInts C []]
    end

