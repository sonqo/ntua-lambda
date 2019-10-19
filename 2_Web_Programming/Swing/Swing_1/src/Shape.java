import java.awt.*;

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

    public Color color;

    public void run(){
        while(true){
            try {
                sleep(interval);
            }catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (color == Color.blue){ // Alternating colors
                color = Color.red;
            }
            else{
                color = Color.blue;
            }
            canvas.repaint();
        }
    }
}