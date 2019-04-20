import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel implements MouseListener {

    int x, y, r  = 15; // Deafault rad

    boolean red = false, blue = true; // Default color

    List<Shape> shapes = new ArrayList<Shape>();

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
        addMouseListener(this);
    }

    public void setRed(){
        this.red = true;
        this.blue = false;
    }

    public void setBlue(){
        this.red = false;
        this.blue = true;
    }

    public void setRad(int i){
        this.r = i;
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            if (red){
                g.setColor(Color.red);
            }
            else{
                g.setColor(Color.blue);
            }
            g.drawOval(temp.x- r, temp.y - r, 2* r, 2 * r);
        }
    }

    public void newShape(int x, int y) {
        Shape next = new Shape(this);
        next.setX(x); next.setY(y); next.setRad(r);
        shapes.add(next);
        next.start();
        this.repaint();
    }

    public void delShape() {
        if (shapes.size() != 0){
            shapes.remove(shapes.size() - 1);
            this.repaint();
        }
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        x = e.getX();
        y = e.getY();
        newShape(x, y);
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