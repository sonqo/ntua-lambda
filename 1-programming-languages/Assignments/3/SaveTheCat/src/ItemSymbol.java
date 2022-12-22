public class ItemSymbol{

    public int line, column, time;
    public String symbol, position;

    public ItemSymbol(){

    }

    public ItemSymbol(int line, int column, String symbol, int time){

        this.line = line; this.column = column; this.time = time;
        this.symbol = symbol;

    }

    public ItemSymbol(int line, int column, String symbol, int time, String position){

        this.line = line; this.column = column; this.time = time;
        this.symbol = symbol; this.position = position;

    }

    public int getLine() {
        return line;
    }

    public int getColumn() {
        return column;
    }

    public int getTime() {
        return time;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getPosition(){
        return position;
    }

}
