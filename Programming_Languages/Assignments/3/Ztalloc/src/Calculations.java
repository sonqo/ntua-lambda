import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileNotFoundException;

public class Calculations {

    public String input;

    public int N;

    public int[][] cases = new int[11][4];

    public Calculations(String input){

        this.input = input;
        fileReading();

    }

    public void fileReading(){
        String line;
        int i = 0, j = 0;
        try{
            FileReader fileReader = new FileReader(input);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            while((line = bufferedReader.readLine()) != null){
                for (String s : line.split(" ")){
                    if (i == 0){
                        cases[i][0] = Integer.parseInt(s);
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
    }

}
