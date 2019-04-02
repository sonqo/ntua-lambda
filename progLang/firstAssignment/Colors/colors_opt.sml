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

    (* A function that returns the least possible sequence of ribbon with all the colors needed *)
    fun testSeq ([], M, I) = 0
      | testSeq ((h::t), M, 0) = 0
      | testSeq ((h::t), M, I) = 
        if (allColors ((h::t), M)) then
            if (allColors (excessColors (splitList ((h::t), I)), M)) then 
                length (excessColors (splitList ((h::t), I)))
            else
                testSeq ((h::t), M, I+1)
        else
            0

    (* A function that returns all possible length of the ribbon with all the colors included *)
    fun allSequence ([], N, M) = []
      | allSequence ((h::t), N, M) = 
        if testSeq((h::t), M, M) <> 0 then 
            testSeq((h::t), M, M)::allSequence(t, M, M)
        (* If a part with length of M is found, stop *)
        else if testSeq((h::t), M, M) = M then
            [testSeq((h::t), M, M)]
        else 
            allSequence(t,M,M)

    (* A function that returns the minimum element of a list *)
    fun minElement ([]) = 0
      | minElement ([h]) = h
      | minElement ((h::t)) =
        let 
          val x = minElement (t)
        in
          if h < x then h else x
        end
    
    val (N, M) = readFile file
    val ribbon = parseFile file
  in
    print(Int.toString(minElement (allSequence(ribbon, N, M))) ^ "\n")
  end