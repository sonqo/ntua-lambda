public class Shapes extends Thread {

    int r, x, y;
    int interval;
    Canvas canvas;

    public Shapes(Canvas c) {

        super();
        canvas = c;
        interval = 2000;
        r = 20;
        x = (int) Math.floor(Math.random()*460);
        y = (int) Math.floor(Math.random()*460);
        setDaemon(true);
    }

    public void run(){

        while(true){
            try {
                sleep(interval);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            if (this.r == 20) this.r = 40;
            else this.r = 20;
            canvas.repaint();
        }
    }

}

