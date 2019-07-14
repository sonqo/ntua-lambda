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
                    if (line.charAt(i-1) == 'A'){
                        element = new ItemSymbol(N+1, i, "A", 0, "");
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
            for (int i=0; i<=this.N+2; i++){
                for (int j=0; j<=this.M+2; j++){
                    System.out.print(map[i][j]);
                }
                System.out.println();
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

    }

}
