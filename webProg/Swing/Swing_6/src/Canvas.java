import java.awt.*;
import java.awt.event.*;
import java.awt.geom.*;
import javax.swing.*;
import javax.swing.event.*;
import java.util.Stack;
import java.util.concurrent.ThreadLocalRandom;

public class Canvas extends JPanel implements MouseInputListener {
    private Stack<Circle> items = new Stack<Circle>();
    private int time = 1000;

    public Canvas() {
        this.setOpaque(true);
        this.setBackground(Color.WHITE);

        setPreferredSize(new Dimension(500, 500));

        addMouseListener(this);
        addMouseMotionListener(this);
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (Circle l: items)
            l.draw(g);
    }

    public void collide(Circle circ) {
        boolean collides = false;

        for (Circle c: items) {
            if (c != circ) {
                if (circ.collide(c))
                    collides = true;
            }
        }

        if (!collides)
            circ.setColor(Color.BLACK);
    }

    public void addNewItem(Circle l) {
        items.push(l);
        repaint();
    }

    public Circle getLastItem() {
        return items.peek();
    }

    public void mouseClicked(MouseEvent e) {
        Circle c = new Circle(e.getX(), e.getY(), 15, 10, time, Color.BLACK, this);
        addNewItem(c);
        //time += 1000;
    }

    public void mouseEntered(MouseEvent e) {
    }

    public void mouseExited(MouseEvent e) {
    }

    public void mousePressed(MouseEvent e) {
    }

    public void mouseReleased(MouseEvent e) {
    }

    public void mouseDragged(MouseEvent e) {
    }

    public void mouseMoved(MouseEvent e) {
    }

    private int randRange(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }
}
