import java.io.*;
import java.util.*;

public class Buildings {

    List<Integer> acc = new ArrayList<Integer>();

    String com[], name = "";
    int max = 0, curr, height;

    public Buildings() throws IOException{

        while (!name.equals("x")){
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            name = reader.readLine();
            com = name.split(" ");
            if (com.length == 2){
                height = Integer.parseInt(com[1]);
                if (acc.isEmpty()){
                    max = height;
                    acc.add(height);
                }
                else{
                    if (height >= max){
                        while (!acc.isEmpty()){
                            acc.remove(acc.size()-1);
                        }
                        max = height;
                        acc.add(height);
                    }
                    else{
                        curr = (int) acc.get(acc.size()-1);
                        while (height >= curr){
                            acc.remove(acc.size()-1);
                            curr = (int) acc.get(acc.size()-1);
                        }
                        acc.add(height);
                    }
                }
            }
            else{
                if (com[0].equals("q")){
                    System.out.println(acc.size());
                    System.out.flush();
                }
            }
        }
    }
}
