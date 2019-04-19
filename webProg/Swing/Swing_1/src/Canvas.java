import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

public class Canvas extends JLabel implements MouseListener{

    private int x = -1;
    private int y = -1;
    private int rad = 50;
    private boolean circle = true;
    private boolean square = false;

    public Canvas(){
        setPreferredSize(new Dimension(500, 500));
        addMouseListener(this);
    }

    public void setCircle(boolean circle){
        this.circle = circle;
    }

    public void setSquare(boolean square){
        this.square = square;
    }

    public void paint(Graphics g){

        g.setColor(Color.blue);
        if (x < 0){
            reset();
        }
        if (circle){
            g.drawOval(x - rad, y - rad, 2 * rad, 2* rad);
        }
        else{
            if (square){
                g.drawRect(x - rad, y - rad, 2 * rad, 2 * rad);
            }
        }
    }

    public void reset(){
        x = getWidth() / 2;
        y = getHeight() / 2;
    }

    @Override
    public void mouseClicked(MouseEvent ev) {
        x = ev.getX();
        y = ev.getY();
        repaint();
    }

    @Override
    public void mousePressed(MouseEvent e) {

    }

    @Override
    public void mouseReleased(MouseEvent e) {

    }

    @Override
    public void mouseEntered(MouseEvent e) {

    }

    @Override
    public void mouseExited(MouseEvent e) {

    }
}
