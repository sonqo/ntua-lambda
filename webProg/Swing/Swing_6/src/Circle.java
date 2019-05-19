import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.awt.geom.Ellipse2D;

public class Circle extends Ellipse2D.Double {
    private Color color;
    private Timer tim;
    private Canvas canvas;
    private int step;

    public Circle(int x, int y, int rad, int step, int time, Color color, Canvas canvas) {
        super(x - rad, y - rad, 2 * rad, 2 * rad);
        this.color = color;
        this.canvas = canvas;
        this.step = step;

        ActionListener taskPerformer = new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                setX(getX() + step);
                canvas.repaint();
                canvas.collide(Circle.this);
            }
        };
        tim = new Timer(time, taskPerformer);
        tim.start();
    }

    public void draw(Graphics g) {
        g.setColor(getColor());
        g.fillOval((int)x, (int)y, (int)width, (int)height);
    }

    public boolean collide(Circle c) {
        double rad = height / 2;
        double thisX = x + rad, thisY = y + rad, cX = c.x + rad, cY = c.y + rad;

        if (Math.sqrt((thisX - cX) * (thisX - cX) + (thisY - cY) * (thisY - cY)) < 2 * rad) {
            setColor(Color.RED);
            c.setColor(Color.RED);
            return true;
        }

        return false;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getX() {
        return x;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
        canvas.repaint();
    }
}
