fun parse "Colors.txt" =
let
    fun next_String input = (TextIO.inputAll input) 
    val stream = TextIO.openIn "Colors.txt"
    val a = next_String stream
in
    a
end;

