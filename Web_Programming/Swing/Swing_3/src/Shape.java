public class Shape extends Thread {

    int r, x, y;
    Canvas canvas;
    int interval = 65;

    boolean up = false;
    boolean down = true;

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
            if (this.down == true){
                this.y += 50;
                if (this.y > 435){
                    this.up = true;
                    this.down = false;
                }
            }
            else if (this.up == true){
                this.y -= 50;
                if (this.y < 65){
                    this.up = false;
                    this.down = true;
                }
            }
            canvas.repaint();
        }
    }
}