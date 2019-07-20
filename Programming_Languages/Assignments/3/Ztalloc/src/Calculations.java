import java.util.*;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileNotFoundException;

public class Calculations {

    public int N;
    public String input;
    public Integer[][] cases = new Integer[10][4];

    public Queue<Case> caseQ = new LinkedList<Case>(); // Queue declaration

    public Calculations(String input){
        this.input = input;
        fileReading(); // Case reading
        caseExpansion();
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
    }

    public void caseExpansion(){

        for (int i=0; i<N; i++){

            Case element = new Case(cases[i][0], cases[i][1], "", 0);
            caseQ.add(element);



        }

//        System.out.print(caseQ.size());

    }



}
