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

val (N, M) = readFile "colors.txt"
val ribbon = parseFile "colors.txt"

(* A function that checks if an integer is in a list. *)
fun isMember ([], el:int) = false 
  | isMember ((h::t), 0) = true
  | isMember ((h::t), el) = 
      if h = el then 
        true
      else 
        isMember (t, el)

(* A function that checks if the ribbon has all the colors needed. *)
fun allColors ([], col) = false
  | allColors ((h::t), 0) = true
  | allColors ((h::t), col:int) =
      if isMember ((h::t), col) then  
        isMember ((h::t), (col - 1))
      else 
        false

(* A function that splits a list to the Mth element *)
(* fun splitList 0 _ = []
  | splitList _ []:int list = []   
  | splitList M (h::t) = h :: splitList (M - 1) t *)

(* A function that checks sequences of ribbon with length I, given the number fof colors M *)
(* fun testSeq [] M I = 0
  | testSeq (h::t) 0 I:int = 0
  | testSeq (h::t) M 0 = 0
  | testSeq (h::t) M I = 
    if allColors (splitList I h::t, M) then 
      length (splitList I h::t)
    else
      testSeq t M I *)

(* Final function *)
(* fun colors [] M I = 0
  | colors array 0 I = 0
  | colors array M 0 = 0
  | colors array M I =
    if testSeq array M I = 0 then
      testSeq array M I+1
    else
      testSeq array M I *)