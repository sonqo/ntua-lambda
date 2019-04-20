import java.awt.*;
import static java.awt.Color.*;

public class Shape extends Thread {

    int x, y, r = 15;
    Canvas canvas;
    int interval = 1000;

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
            this.r += 20;
            if (this.r == 55){
                this.color = green; // Turn to color green before "explosion"
                canvas.repaint();
            }
            if (this.r == 75){
                canvas.delShape(); // Delete cicrle when specific rad is reached
                canvas.repaint();
            }
            canvas.repaint();
        }
    }
}