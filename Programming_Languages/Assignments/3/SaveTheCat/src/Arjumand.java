import java.io.*;
import java.util.Queue;
import java.util.LinkedList;

public class Arjumand {

    public static void main(String args[]) throws IOException {

        BufferedReader fileInput = new BufferedReader(new FileReader("savethecat.txt"));
        String text = fileInput.readLine();

        int N = 0; // Calculating N-M dimensions of map
        int M = text.length();

        while (text != null) {
            text = fileInput.readLine();
            N++;
        }

        Queue<ItemSymbol> symbolQ = new LinkedList<ItemSymbol>();

        String[][] chMap = new String[N + 2][M + 2]; // Reading Map

        BufferedReader br = new BufferedReader(new FileReader("savethecat.txt"));
        int time = 0;
        for (int i = 1; i < N + 1; i++) {
            text = br.readLine();
            for (int j = 1; j < M + 1; j++) {
                chMap[i][j] = String.valueOf(text.charAt(j - 1));
                if (chMap[i][j].equals("A")) {
                    ItemSymbol element = new ItemSymbol(i, j, "A", time, "");
                    symbolQ.add(element);
                }
            }
        }

        for (int i = 0; i < M + 2; i++) { //Border Creation of X's
            chMap[0][i] = "X";
            chMap[N + 1][i] = "X";
        }
        for (int i = 0; i < N + 2; i++) {
            chMap[i][0] = "X";
            chMap[i][M + 1] = "X";
        }



        for (int i = 0; i < N + 2; i++) {
            for (int j = 0; j < M + 2; j++) {
                System.out.print(chMap[i][j]);
            }
            System.out.println();
        }
    }
}
