import java.awt.*;
import static java.awt.Color.*;

public class Shape extends Thread {

    int r, x, y;
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

    public void run(){
        while(true){
            try {
                sleep(interval);
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
            this.x += 25; // Move every different circle to the right by 20 pixels
            canvas.repaint();
        }
    }
}