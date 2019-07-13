import java.awt.*;

import static java.awt.Color.*;

public class Shape extends Thread {

    int x, y, r = 10;
    Canvas canvas;
    int interval = 2000;
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
            if (canvas.draw == false){
                if (this.color == blue){
                    this.color = white;
                }
                else{
                    this.color = blue;
                }
                canvas.repaint();
            }
        }
    }
}