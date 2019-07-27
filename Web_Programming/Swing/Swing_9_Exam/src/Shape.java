import java.awt.*;

public class Shape extends Thread {

    int r, x, y;
    Canvas canvas;
    int interval = 1000;
    int counter;

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

    public void setCounter(int counter){
        this.counter = counter;
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
            if (this.counter < 8){
                this.y += 50;
                this.counter += 1;
            }
            canvas.repaint();
        }
    }
}