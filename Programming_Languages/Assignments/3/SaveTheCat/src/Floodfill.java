import java.util.Queue;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.io.BufferedReader;
import java.io.FileNotFoundException;

public class Floodfill {

    public char[][] map = new char [1002][1002];
    public String input;
    public int N, M;

    public ItemSymbol element;
    public Queue<ItemSymbol> symbolQ = new LinkedList<ItemSymbol>();

    public int start_line, start_column; // Starting coordinates
    public int leastl, leastc; // Arjumand not in danger
    public int lpath = 1002, cpath = 1002; // Arjumand in danger

    public Floodfill(String input){
        this.input = input;
        mapPadding();
        endGame();
    }

    public void mapPadding(){ // File reading - https://bit.ly/2utVcbH
        String line;
        try{
            FileReader fileReader = new FileReader(input);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            while((line = bufferedReader.readLine()) != null){
                if (N==0){
                    this.M=line.length();
                }
                for (int i=1; i<=this.M; i++){
                    map[N+1][i]=line.charAt(i-1);
                    if (line.charAt(i-1) == 'A'){ // Adding Arjumand
                        element = new ItemSymbol(N+1, i, "A", 0, "");
                        symbolQ.add(element);
                        leastl = N+1; leastc = i;
                        start_line = N+1; start_column = i; // Keeping starting coordinates of Arjumand
                    }
                    if (line.charAt(i-1) == 'W'){ // Adding water elements
                        element = new ItemSymbol(N+1, i, "W", 0, "");
                        symbolQ.add(element);
                    }
                }
                N++;
            }
            bufferedReader.close();
            for (int i=0; i<=this.M+1; i++){ // Border creation of X's
                this.map[0][i]='X';
                this.map[this.N+1][i]='X';
            }
            for (int i=0; i<=this.N+1; i++){
                map[i][0]='X';
                map[i][this.M+1]='X';
            }
        }
        catch(FileNotFoundException ex){
            return;
        }
        catch(IOException ex){
            return;
        }
    }

    public void endGame(){
        int time = 0;
        int arjumand = 0;
        int global_time = 0;
        while(symbolQ.peek() != null){
            while (global_time == time){
                ItemSymbol element = new ItemSymbol();
                element = ((LinkedList<ItemSymbol>) symbolQ).getFirst();
                time = element.getTime();
                String symbol = element.getSymbol();
                int line = element.getLine(); int column = element.getColumn();
                char itemWest = map[line][column-1]; char itemEast = map[line][column+1];
                char itemNorth = map[line-1][column]; char itemSouth = map[line+1][column];
                if (symbol.equals("A")) {
                    if ((itemNorth != 'A') && (itemNorth != 'X') && (itemNorth != 'W')) {
                        map[line-1][column] = 'A';
                        ItemSymbol item = new ItemSymbol(line-1, column, "A", time+1);
                        symbolQ.add(item);
                        if (line-1 < leastl){
                            leastl = line-1; leastc = column;
                        }
                        else if (line-1 == leastl){
                            if (column < leastc){
                                leastl = line-1; leastc = column;
                            }
                        }
                    }
                    if ((itemSouth != 'A') && (itemSouth != 'X') && (itemSouth != 'W')) {
                        map[line+1][column] = 'A';
                        ItemSymbol item = new ItemSymbol(line+1, column, "A", time+1);
                        symbolQ.add(item);
                        if (line+1 < leastl){
                            leastl = line+1; leastc = column;
                        }
                        else if (line+1 == leastl){
                            if (column < leastc){
                                leastl = line+1; leastc = column;
                            }
                        }
                    }
                    if ((itemEast != 'A') && (itemEast != 'X') && (itemEast != 'W')) {
                        map[line][column+1] = 'A';
                        ItemSymbol item = new ItemSymbol(line, column+1, "A", time+1);
                        symbolQ.add(item);
                        if (line < leastl){
                            leastl = line; leastc = column+1;
                        }
                        else if (line == leastl){
                            if (column+1 < leastc){
                                leastl = line; leastc = column+1;
                            }
                        }
                    }
                    if ((itemWest != 'A') && (itemWest != 'X') && (itemWest != 'W')) {
                        map[line][column-1] = 'A';
                        ItemSymbol item = new ItemSymbol(line, column-1, "A", time+1);
                        symbolQ.add(item);
                        if (line < leastl){
                            leastl = line; leastc = column-1;
                        }
                        else if (line == leastl){
                            if (column-1 < leastc){
                                leastl = line; leastc = column-1;
                            }
                        }
                    }
                }
                if (symbol.equals("W")) {
                    if ((itemNorth != 'W') && (itemNorth != 'X')) {
                        map[line-1][column] = 'W';
                        ItemSymbol item = new ItemSymbol(line-1, column, "W", time+1);
                        symbolQ.add(item);
                        if (itemNorth == 'A'){
                            if (global_time == arjumand){
                                if (line-1 < lpath){
                                    lpath = line-1; cpath = column;
                                }
                                else if (line-1 == lpath){
                                    if (column < cpath){
                                        lpath = line-1; cpath = column;
                                    }
                                }
                            }
                            else if (global_time > arjumand){
                                arjumand = global_time;
                                lpath = line-1; cpath = column;
                            }
                        }
                    }
                    if ((itemSouth != 'W') && (itemSouth != 'X')) {
                        map[line+1][column] = 'W';
                        ItemSymbol item = new ItemSymbol(line+1, column, "W", time+1);
                        symbolQ.add(item);
                        if (itemSouth == 'A'){
                            if (global_time == arjumand){
                                if (line+1 < lpath){
                                    lpath = line+1; cpath = column;
                                }
                                else if (line+1 == lpath){
                                    if (column < cpath){
                                        lpath = line+1; cpath = column;
                                    }
                                }
                            }
                            else if (global_time > arjumand){
                                arjumand = global_time;
                                lpath = line+1; cpath = column;
                            }
                        }
                    }

                    if ((itemEast != 'W') && (itemEast != 'X')) {
                        map[line][column+1] = 'W';
                        ItemSymbol item = new ItemSymbol(line, column+1, "W", time+1);
                        symbolQ.add(item);
                        if (itemEast == 'A'){
                            if (global_time == arjumand){
                                if (line < lpath){
                                    lpath = line; cpath = column+1;
                                }
                                else if (line == lpath){
                                    if (column+1 < cpath){
                                        lpath = line; cpath = column+1;
                                    }
                                }
                            }
                            else if (global_time > arjumand){
                                arjumand = global_time;
                                lpath = line; cpath = column+1;
                            }
                        }
                    }

                    if ((itemWest != 'W') && (itemWest != 'X')) {
                        map[line][column-1] = 'W';
                        ItemSymbol item = new ItemSymbol(line, column-1, "W", time+1);
                        symbolQ.add(item);
                        if (itemWest == 'A'){
                            if (global_time == arjumand){
                                if (line < lpath){
                                    lpath = line; cpath = column-1;
                                }
                                else if (line == lpath){
                                    if (column-1 < cpath){
                                        lpath = line; cpath = column-1;
                                    }
                                }
                            }
                            else if (global_time > arjumand){
                                arjumand = global_time;
                                lpath = line; cpath = column-1;
                            }
                        }
                    }
                }
                symbolQ.remove();
                if (symbolQ.peek() != null){
                    element = ((LinkedList<ItemSymbol>) symbolQ).getFirst();
                    time = element.getTime();
                }
                else{
                    global_time = -1;
                }
            }
            global_time ++;
        }
        spurenJagd();
    }

    public void spurenJagd(){

    }

}
