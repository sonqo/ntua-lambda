import java.util.*;
import java.io.FileReader;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileNotFoundException;

public class Calculations {

    public String input;
    public Integer[][] cases = new Integer[10][4];
    public int N, flag, temp_1, temp_2, temp_state;

    public Queue<Case> caseQ = new LinkedList<>(); // Queue declaration

    public Calculations(String input){
        this.input = input;
        fileReading(); // Case reading
        caseExpansion(); // Calculation expansion
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

    public void caseExpansion(){ // Adding multiple values for a single key - Multimap implementation - https://bit.ly/2xYEe7h

        for (int i=0; i<N; i++){

            Case element = new Case(cases[i][0], cases[i][1], "", 0);
            caseQ.add(element);

            HashMap<Integer, ArrayList<Integer>> hashCases = new HashMap<>(); // Different HashMap for every case

            ArrayList<Integer> myList =  new ArrayList<>();
            myList.add(cases[i][1]);
            hashCases.put(cases[i][0], myList);

            flag = 0; // Borders found flag
            temp_state = 0; // Keeping total number of cases examined

            while ((!caseQ.isEmpty()) && (flag != 1)){

                Case temp;
                temp = caseQ.remove();
                if ((temp.low_b >= cases[i][2]) && (temp.high_b <= cases[i][3])){ // Printing when borders are met
                    flag = 1;
                    if (temp.path == ""){
                        System.out.println("EMPTY");
                    }
                    else{
                        System.out.println(temp.path);
                    }
                }
                if (temp.state < 1000000){ // Do not examine more than 1M states
                    temp_1 = temp.low_b / 2;
                    temp_2 = temp.high_b / 2;
                    myList = hashCases.get(temp_1);
                    if (myList == null){
                        myList = new ArrayList<>();
                    }
                    if (!myList.contains(temp_2)){
                        temp_state += 1;
                        Case border = new Case(temp_1, temp_2, temp.path + "h", temp_state);
                        caseQ.add(border);
                        myList.add(temp_2);
                        hashCases.put(temp_1, myList);
                    }
                    temp_1 = temp.low_b * 3 + 1;
                    temp_2 = temp.high_b * 3 + 1;
                    if ((temp_1 <= 999999) && (temp_2 <= 999999)){ // Machine stores numbers up to 6-digits
                        myList = hashCases.get(temp_1);
                        if (myList == null){
                            myList = new ArrayList<>();
                        }
                        if (!myList.contains(temp_2)){
                            temp_state += 1;
                            Case border = new Case(temp_1, temp_2, temp.path + "t", temp_state);
                            caseQ.add(border);
                            myList.add(temp_2);
                            hashCases.put(temp_1, myList);
                        }
                    }
                }
            }
            if (flag == 1){ // Empty queue when a solution was already found
                while (!caseQ.isEmpty()){
                    caseQ.remove();
                }
            }
            if (flag == 0){ // No solution after 1M states
                System.out.println("IMPOSSIBLE");
            }
        }
    }

}
