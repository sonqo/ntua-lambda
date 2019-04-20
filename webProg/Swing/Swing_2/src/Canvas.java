import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Canvas extends JLabel{

    private int x = -1;
    private int y = -1;
    private int rad = 50;

    private boolean pressed = false;

    public void setPressed(boolean pressed){
        this.pressed = true;
    }

    List <Shapes> queue = new ArrayList <Shapes>();

    Random number = new Random();

    public Canvas(){
        setPreferredSize(new Dimension(500, 500));
    }

    public void paint(Graphics g){

        g.setColor(Color.red);

        if (x < 0){
            reset();
        }
        if (pressed) {
            x = number.nextInt(500);
            y = number.nextInt(500);
            g.drawOval(x - rad, y - rad, 2 * rad, 2 * rad);
        }

    }

    public void reset(){
        x = getWidth() / 2;
        y = getHeight() / 2;
    }
}
