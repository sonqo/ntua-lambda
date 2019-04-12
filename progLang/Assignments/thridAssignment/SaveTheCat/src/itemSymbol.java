public class itemSymbol{

    private int x;
    private int y;
    private String it;
    private int t;

    public itemSymbol(){
        this(0,0,".", 0);
    }

    public itemSymbol(int line, int column, String symbol, int time){

        x = line;
        y = column;
        it = symbol;
        t = time;
    }

    public int getLine(){
        return x;
    }

    public int getColumn(){
        return y;
    }

    public String getItem(){
        return it;
    }

    public int getTime(){
        return t;
    }
}