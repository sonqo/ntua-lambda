fun colors file = 
  
  let
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

        (* A function to read N integers from the opened file. *)
        fun readInts 0 acc = acc 
          | readInts i acc = readInts (i - 1) (readInt inStream :: acc)
      in
        readInts N []
      end

    (* A function that checks if an integer is in a list. *)
    fun isMember ([], el:int) = false 
      | isMember ((h::t), el) = 
        if h = el then 
          true
        else 
          isMember (t, el)

    (* A function that checks if the ribbon has all the colors needed. *)
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

    (* A function that checks sequences of ribbon with length I, given the number of colors M *)
    fun testSeq ([], M, I) = 0
      | testSeq ((h::t), M, 0) = 0
      | testSeq ((h::t), M, I) = 
        if allColors (splitList ((h::t), I), M) then 
          length (splitList ((h::t), I))
        else
          testSeq (t, M, I)

    (* Final function that returns the length of the least possible sequence of colors in the ribbon*)
    fun leastSeq ([], M, I) = 0
      | leastSeq ((h::t), M, I) =
        (* Making sure that the ribbon has all the colors down from M *)
        if (testSeq ((h::t), M, I) = 0) andalso (allColors ((h::t), M)) then 
          leastSeq ((h::t), M, I+1)
        else
          testSeq ((h::t), M, I);
    
    val (N, M) = readFile file
    val ribbon = parseFile file

  in
    print(Int.toString(leastSeq (ribbon, M, M)) ^ "\n")
  end

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