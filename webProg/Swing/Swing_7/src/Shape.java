import java.awt.*;
import static java.awt.Color.*;

public class Shape extends Thread {

    int r, x, y;
    Canvas canvas;
    int interval = 1000;

    boolean red = false, blue = true; // Default color

    Color color = Color.blue;

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
            if (this.r == 15){ // Alternating rad of shapes
                this.r += 10;
            }
            else if(this.r == 25){
                this.r -= 10;
            }
            canvas.repaint();
        }
    }
}