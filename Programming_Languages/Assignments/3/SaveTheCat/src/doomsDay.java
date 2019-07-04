import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class doomsDay{

    public static void main(String args[]) throws IOException{

        BufferedReader fileInput = new BufferedReader(new FileReader("Doomsday.txt"));
        String text = fileInput.readLine();

        // Calculating N-M dimensions of map
        int N = 0;
        int M = text.length();

        while (text != null) {
            text = fileInput.readLine();
            N++;
        }

        Queue<itemSymbol> symbolQ = new LinkedList<itemSymbol>();

        // Reading Map
        String[][] chMap = new String[N+2][M+2];

        BufferedReader br = new BufferedReader(new FileReader("Doomsday.txt"));
        int time = 0;
        for (int i = 1; i < N+1; i++){
            text = br.readLine();
            for (int j = 1; j < M+1; j++){
                chMap[i][j] = String.valueOf(text.charAt(j-1));
                if ((chMap[i][j].equals("+")) || (chMap[i][j].equals("-"))){
                    itemSymbol element = new itemSymbol(i, j, chMap[i][j], time);
                    symbolQ.add(element);
                }
            }
        }

        //Border Creation of X's
        for (int i = 0; i < M+2; i++) {
            chMap[0][i] = "X";
            chMap[N+1][i] = "X";
        }
        for (int i = 0; i < N+2; i++) {
            chMap[i][0] = "X";
            chMap[i][M+1] = "X";
        }

        //FloodFill
        int globalTime = 0;
        int doomsday = 0;
        while (symbolQ.peek() != null){
            while (globalTime == time){
                itemSymbol elementItem = new itemSymbol();
                elementItem = ((LinkedList<itemSymbol>) symbolQ).getFirst();
                time = elementItem.getTime();
                int line = elementItem.getLine();
                int column = elementItem.getColumn();
                String item = elementItem.getItem();
                String itemWest = chMap[line][column - 1];
                String itemEast = chMap[line][column + 1];
                String itemNorth = chMap[line - 1][column];
                String itemSouth = chMap[line + 1][column];
                if (item.equals("+")) {
                    if ((!itemNorth.equals("+")) && (!itemNorth.equals("-")) && (!itemNorth.equals("X")) && (!itemNorth.equals("*"))) {
                        chMap[line - 1][column] = item;
                        itemSymbol Item = new itemSymbol(line - 1, column, "+", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemNorth.equals("-")){
                        chMap[line - 1][column] = "*";
                        chMap[line][column] = "*";
                        itemSymbol Item = new itemSymbol(line - 1, column, "+", time + 1);
                        symbolQ.add(Item);
                        doomsday = 1;
                    }
                    if ((!itemSouth.equals("+")) && (!itemSouth.equals("-")) && (!itemSouth.equals("X")) && (!itemSouth.equals("*"))){
                        chMap[line + 1][column] = item;
                        itemSymbol Item = new itemSymbol(line + 1, column, "+", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemSouth.equals("-")){
                        chMap[line + 1][column] = "*";
                        chMap[line][column] = "*";
                        itemSymbol Item = new itemSymbol(line + 1, column, "+", time + 1);
                        symbolQ.add(Item);
                        doomsday = 1;
                    }
                    if ((!itemEast.equals("+")) && (!itemEast.equals("-")) && (!itemEast.equals("X")) && (!itemEast.equals("*"))){
                        chMap[line][column + 1] = item;
                        itemSymbol Item = new itemSymbol(line, column + 1, "+", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemEast.equals("-")){
                        chMap[line][column + 1] = "*";
                        chMap[line][column] = "*";
                        itemSymbol Item = new itemSymbol(line, column + 1, "+", time + 1);
                        symbolQ.add(Item);
                        doomsday = 1;
                    }
                    if ((!itemWest.equals("+")) && (!itemWest.equals("-")) && (!itemWest.equals("X")) && (!itemWest.equals("*"))){
                        chMap[line][column - 1] = item;
                        itemSymbol Item = new itemSymbol(line, column - 1, "+", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemWest.equals("-")){
                        chMap[line][column - 1] = "*";
                        chMap[line][column] = "*";
                        itemSymbol Item = new itemSymbol(line, column - 1, "+", time + 1);
                        symbolQ.add(Item);
                        doomsday = 1;
                    }
                }
                if (item.equals("-")) {
                    if ((!itemNorth.equals("+")) && (!itemNorth.equals("-")) && (!itemNorth.equals("X")) && (!itemNorth.equals("*"))){
                        chMap[line - 1][column] = item;
                        itemSymbol Item = new itemSymbol(line - 1, column, "-", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemNorth.equals("+")){
                        chMap[line - 1][column] = "*";
                        doomsday = 1;
                    }
                    if ((!itemSouth.equals("+")) && (!itemSouth.equals("-")) && (!itemSouth.equals("X")) && (!itemSouth.equals("*"))){
                        chMap[line + 1][column] = item;
                        itemSymbol Item = new itemSymbol(line + 1, column, "-", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemSouth.equals("+")){
                        chMap[line + 1][column] = "*";
                        doomsday = 1;
                    }
                    if ((!itemEast.equals("+")) && (!itemEast.equals("-")) && (!itemEast.equals("X")) && (!itemEast.equals("*"))){
                        chMap[line][column + 1] = item;
                        itemSymbol Item = new itemSymbol(line, column + 1, "-", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemEast.equals("+")){
                        chMap[line][column + 1] = "*";
                        doomsday = 1;
                    }
                    if ((!itemWest.equals("+")) && (!itemWest.equals("-")) && (!itemWest.equals("X")) && (!itemWest.equals("*"))){
                        chMap[line][column - 1] = item;
                        itemSymbol Item = new itemSymbol(line, column - 1, "-", time + 1);
                        symbolQ.add(Item);
                    }
                    else if (itemWest.equals("+")){
                        chMap[line][column - 1] = "*";
                        doomsday = 1;
                    }
                }
                symbolQ.remove();
                if (symbolQ.peek() != null){
                    elementItem = ((LinkedList<itemSymbol>) symbolQ).getFirst();
                    time = elementItem.getTime();
                }
                else{
                    globalTime = -1;
                }
            }
            globalTime++;
            if (doomsday == 1){
                while (symbolQ.peek() != null){
                    symbolQ.remove();
                }
            }
        }

        //Printing Time of Doomsday
        if (globalTime != 0){
            System.out.println(globalTime);
        }
        else{
            System.out.println("the world is saved");
        }

        //Printing Final Map
        for (int i = 1; i < N+1; i++){
            for (int j = 1; j < M+1; j++){
                System.out.print(chMap[i][j]);
            }
            System.out.println();
        }
    }
}
