public class ItemSymbol {

    private int line;
    private int column;
    private String symbol;
    private int time;
    private String position;

    public ItemSymbol(int line, int column, String symbol, int time, String position){

        this.line = line;
        this.column = column;
        this.symbol = symbol;
        this.time = time;
        this.position = position;
    }

    public int getLine(){
        return line;
    }

    public int getColumn(){
        return column;
    }

    public String getItem(){
        return symbol;
    }

    public int getTime(){
        return time;
    }

    public String getPosition(){
        return position;
    }
}
