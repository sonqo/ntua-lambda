import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.util.Arrays;

public class Calculations {

    public String input;

    public int N;

    public int[][] cases = new int[10][4];

    public Calculations(String input){

        this.input = input;
        fileReading();

    }

    public void fileReading(){
        String line;
        int i = -1, j = 0;
        try{
            FileReader fileReader = new FileReader(input);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            while((line = bufferedReader.readLine()) != null){
                for (String s : line.split(" ")){
                    if (i == -1){
                        N = Integer.parseInt(s);
                        i ++;
                    }
                    else{
                        cases[i][j] = Integer.parseInt(s);
                        j ++;
                        if (j % 4 == 0){
                            i ++;
                            j = 0;
                        }
                    }
                }
            }
            bufferedReader.close();
        }
        catch(FileNotFoundException ex){
            return;
        }
        catch(IOException ex){
            return;
        }

        System.out.println(Arrays.deepToString(cases));

    }



}
