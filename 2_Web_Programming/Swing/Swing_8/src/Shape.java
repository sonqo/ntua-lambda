import java.awt.*;

public class Shape extends Thread {

    int x, y, r = 10;
    int counter = 0;
    Canvas canvas;
    int interval = 1000;
    public Color color = Color.blue ;

    boolean blue = true, red = false, yellow = false;

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

        }
    }
}