import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel{

    int x, y, r  = 15; // Deafault rad

    List<Shape> shapes = new ArrayList<Shape>();

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            g.setColor(temp.color);
            g.drawOval(temp.x, temp.y, 2 * temp.r, 2 * temp.r);
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
}