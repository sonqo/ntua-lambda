import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel{

    int x, y, r  = 25; // Deafault rad

    int height;

    List<Shape> shapes = new ArrayList<>();
    public int[] counter = {0, 0, 0, 0, 0, 0};

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        height = 500;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            if (temp.y < height) {
                height = temp.y;
            }
            g.setColor(temp.color);
            g.drawRect(temp.x, temp.y, 2 * temp.r, 2 * temp.r);
        }
    }

    public void newShape(int x, int y, int c) {
        Shape next = new Shape(this);
        counter[c] += 1;
        next.setX(x); next.setY(y); next.setRad(r); next.setCounter(counter[c]);
        shapes.add(next);
        next.start();
        this.repaint();
    }

    public void maxHeight(){
        System.out.println(500 - height);
    }
}