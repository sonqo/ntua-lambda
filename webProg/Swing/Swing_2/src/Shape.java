import java.awt.*;
import static java.awt.Color.*;

public class Shape extends Thread {

    Canvas canvas;
    int interval = 1000;
    int r, x, y;

    boolean blue = true;
    boolean red = false;

    public void setBlue(){
        blue = true;
        red = false;
    }

    public void setRed(){
        red = true;
        blue = false;
    }

    public void incInterval(){
        this.interval += 1000;
    }

    public Shape(Canvas c){

        super();
        canvas = c;
        r = 20;
        x = (int) Math.floor(Math.random() * 450);
        y = (int) Math.floor(Math.random() * 450);
        setDaemon(true);
    }

    public void run(){
        while(true){
            try {
                sleep(interval);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // Every two seconds the rad of circles changes
            if (this.r == 20){
                this.r = 40;
            }
            else{
                this.r = 20;
            }

            // Every two seconds the circles is located 20 pixels to the right
            this.x += 20;
            this.y += 20;

            // Every two seconds the color of circle alternates from red to blue and vice versa
            if (red){
                setBlue();
            }
            else{
                setRed();
            }
            canvas.repaint();
        }
    }

}

