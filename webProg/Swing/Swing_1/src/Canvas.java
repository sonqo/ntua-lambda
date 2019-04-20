import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel implements MouseListener {

    int x, y, r  = 15; // Deafault rad

    int total = 5;
    int interval = 1000;

    List<Shape> shapes = new ArrayList<Shape>();

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
        addMouseListener(this);
    }

    public void incTotal(){ // Duplicate total number of circles
        this.total *= 2;
    }

    public void incTime(){
        interval *= 2;
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            g.setColor(temp.color);
            g.drawOval(temp.x- r, temp.y - r, 2 * r, 2 * r);
        }
    }

    public void newShape(int x, int y) {
        if (shapes.size() == total){ // If total cirlces greater than (initial) 5, delete least recent
            delShape();
        }
        Shape next = new Shape(this);
        next.interval = interval; // Pass wanted interval to the new element
        next.setX(x); next.setY(y); next.setRad(r);
        shapes.add(next);
        next.start();
        this.repaint();
    }

    public void delShape() {
        if (shapes.size() != 0){
            shapes.remove(0); // Delete least recent circle
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