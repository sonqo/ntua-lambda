import java.awt.*;

public class Shape extends Thread {

    int x, y, r;
    Canvas canvas;
    int interval = 500;
    int index, size;

    public void setX(int x){
        this.x = x;
    }

    public void setY(int y){
        this.y = y;
    }

    public void setRad(int r) {
        this.r = r;
    }

    public void setIndex(int index){
        this.index = index;
    }

    public void setSize(int size){
        this.size = size;
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
            if (canvas.value == this.index){ // Zoom only the last element inserted to List
                if (this.r < 20){
                    this.r += 10; // Keep last element zoomed - reset when user returns to drawing
                }
            }
            else{ // Return the rad to normal for all the other elements
                if (this.r == 20){
                    this.r -= 10;
                }
            }
            canvas.repaint();
        }
    }
}