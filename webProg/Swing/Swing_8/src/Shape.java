import java.awt.*;
import java.util.ArrayList;
import java.util.List;

import static java.awt.Color.*;

public class Shape extends Thread {

    int x, y, r = 10;
    int counter = 0;
    Canvas canvas;
    int interval = 1000;
    int index;

    public void setX(int x){
        this.x = x;
    }

    public void setY(int y){
        this.y = y;
    }

    public void setRad(int r) {
        this.r = r;
    }

    public Shape(Canvas c){
        super();
        canvas = c;
        setDaemon(true);
    }

    public Color color;

    public void run(){
        while(true){
            try {
                sleep(interval);
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
            counter += 1;
            if (counter == 5){
                canvas.resetBoard();
                canvas.repaint();
            }
        }
    }
}