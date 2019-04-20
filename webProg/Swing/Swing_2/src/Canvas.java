import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel {

    List<Shape> shapes = new ArrayList<Shape>();

    MyFrame frame;

    public Canvas(MyFrame sfram) {
        super();
        frame = sfram;
        this.setPreferredSize(new Dimension(500,500));
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            if (temp.blue){
                g.setColor(Color.blue);
            }
            else{
                g.setColor(Color.red);
            }
            g.drawOval(temp.x, temp.y, temp.r, temp.r);
        }
    }

    int sum = 0;
    public void newShape() {
        // Only five circles are to be shown, the least recent is deleted
        if (shapes.size() == 5){
            shapes.remove(shapes.size() - 5);
        }
        Shape next = new Shape(this);
        // Increasing interval every next cycle
        for (int j = 0; j < sum; j++){
            next.incInterval();
        }
        sum += 1;
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
