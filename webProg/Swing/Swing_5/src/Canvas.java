import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel implements MouseListener, MouseMotionListener {

    int x, y, r  = 20; // Deafault rad

    int value; // Keeping value of size of List

    List<Shape> shapes = new ArrayList<Shape>();

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
        addMouseListener(this);
        addMouseMotionListener(this);
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++) {
            temp = shapes.get(i);
            g.setColor(Color.blue);
            g.drawOval(temp.x - temp.r, temp.y - temp.r, 2 * temp.r, 2 * temp.r);
        }
    }

    public void newShape(int x, int y) {
        Shape next = new Shape(this);
        next.setX(x); next.setY(y); next.setRad(r);
        shapes.add(next);
        next.setIndex(shapes.size()-1);
        next.start();
        this.repaint();
    }

    @Override
    public void mouseClicked(MouseEvent e) {

    }

    @Override
    public void mousePressed(MouseEvent e) {
    }

    @Override
    public void mouseReleased(MouseEvent e) {
        this.value = shapes.size() - 1; // Keeping size of List and comparing to index of element
    }

    @Override
    public void mouseEntered(MouseEvent e) {
    }

    @Override
    public void mouseExited(MouseEvent e) {
    }

    @Override
    public void mouseDragged(MouseEvent e) { // Draw when mouseclick is pressed
            x = e.getX();
            y = e.getY();
            newShape(x, y);
    }

    @Override
    public void mouseMoved(MouseEvent e) { // Draw without mouse click pressed
    }
}