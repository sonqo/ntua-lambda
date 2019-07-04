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

    (* A function that locates the finish pointer when all colors are met *)
    fun locateFnsh (ribbon, color, N, M, finish, sum) = 
      while !sum <> M andalso !finish <> N-1 do (
        finish := !finish + 1;
        if Array.sub (color, Array.sub (ribbon, !finish)) = 0 then ( 
            sum := !sum + 1;
            Array.update (color, Array.sub (ribbon, !finish), Array.sub (color, Array.sub (ribbon, !finish)) + 1)
        )
        else
            Array.update (color, Array.sub (ribbon, !finish), Array.sub (color, Array.sub (ribbon, !finish)) + 1)
    )

    (* A function that locates the start pointer excluding excessive colors *)
    fun locateStrt (ribbon, color, start) = 
      while Array.sub (color, Array.sub (ribbon, !start)) <> 1 do (
        Array.update (color, Array.sub (ribbon, !start), Array.sub (color, Array.sub (ribbon, !start)) - 1);
        start := !start + 1
    )

    (* Final function that calculates the least possible length *)
    fun leastSeq (ribbon, color, N, M, start, finish, sum, c, global_c) = 
      while !finish <> N-1 do (
        locateFnsh (ribbon, color, N, M, finish, sum);
        locateStrt (ribbon, color, start);
        
        c := !finish - !start + 1;

        if !c < !global_c  andalso !sum = M then
          global_c := !c
        else
          global_c := !global_c
        ;
        
        Array.update (color, Array.sub (ribbon, !start), Array.sub (color, Array.sub (ribbon, !start)) - 1);
        start := !start + 1;
        sum := !sum - 1
      )

    (* Reading length of ribbon(N), number of colors(M) and the ribbon *)
    val (N, M) = readFile file
    val ribbon_temp = parseFile file
    val ribbon = Array.fromList ribbon_temp

    (* Initializing start and finish pointers *)
    val start = ref 0
    val finish = ref 0

    (* Initializing counter of colors *)
    val color = Array.array (M+1, 0);

    (* Least possible length counters - Temp & final respectively *)
    val c = ref 0
    val global_c = ref (N + 1) 

    (* All colors found counter *)
    val sum = ref 1
  in
    Array.update (color, Array.sub (ribbon, !start), 1);
    leastSeq(ribbon, color, N, M, start, finish, sum, c, global_c);
    
    (* Printing least possible length *)
    if !global_c = N+1 then
        print("0\n")
    else
        print (Int.toString (!global_c) ^ "\n")
  end