(* A function that reads input file and returns number of digits(N), number of winning tickets(W), number of canditate tickets(C) and all tickets *)
fun readFile file =   
    let
      fun readInt input = 
      Option.valOf (TextIO.scanStream (Int.scan StringCvt.DEC) input)

      (* Open input file *)
      val inStream = TextIO.openIn file

      (* Read three integers - Consume new line *)
      val N = readInt inStream
      val W = readInt inStream
      val C = readInt inStream

    fun readInts 0 acc = acc
      | readInts i acc = readInts (i - 1) (readInt inStream :: acc)

    in
      (N, W, C, readInts W [], readInts C []) (* Returning values in form of a list *)
    end

val (N, W, C, Tickets, Winners) = readFile "lottery.txt";

(* A function that reads two integers and returns total number of equal digits, starting from the end *)
fun revEqualDigits (N, M, S) = 
  if N = M then 
    ~1 (* No need to calculate number of digits, in case of equality the integer N is given from file *)
  else
    if N mod 10 = M mod 10 then
      revEqualDigits (N div 10, M div 10, S+1)
    else
      S

(* A function that checks who many times a number(N) has similar digits with elements from a list *)
fun testingSingWinner (N, [], S) = S
  | testingSingWinner (N, h::t, S) =     
    if revEqualDigits (N, h, 0) = 0 then 
      testingSingWinner(N, t, S)
    else
      testingSingWinner(N, t, S+1)