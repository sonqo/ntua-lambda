import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.Attributes;

public class Canvas extends JLabel implements MouseListener, MouseMotionListener{

    int x, y, r  = 10; // Default rad

    List<Shape> shapes = new ArrayList<Shape>();

    List<Integer> Pointers = new ArrayList<Integer>();

    private int temp_start, temp_finish;

    int counter = 0;
    int start_pointer, finish_pointer;

    public Canvas() {
        this.setPreferredSize(new Dimension(500,500));
        addMouseListener(this);
        addMouseMotionListener(this);
    }

    @Override
    public void paint(Graphics g) {
        Shape temp;
        for (int i = 0; i < shapes.size(); i++){
            temp = shapes.get(i);
            g.setColor(temp.color);
            g.drawOval(temp.x - temp.r, temp.y - temp.r, 2 * temp.r, 2 * temp.r);
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
        temp_finish = Pointers.get(Pointers.size()-1);
        temp_start = Pointers.get(Pointers.size()-2);

        Pointers.remove(Pointers.size()-1);
        Pointers.remove(Pointers.size()-1);

        for (int i = temp_start; i < temp_finish; i++){
            shapes.remove(shapes.size() - 1);
            this.repaint();
        }
    }

    public void resetBoard(){ // Reseting whole board
        while(!shapes.isEmpty()){
            shapes.remove(0);
            this.repaint();
        }
    }

    @Override
    public void mouseClicked(MouseEvent e) {
    }

    @Override
    public void mousePressed(MouseEvent e) {
        start_pointer = shapes.size();
        Pointers.add(start_pointer);
    }

    @Override
    public void mouseReleased(MouseEvent e) {
        finish_pointer = shapes.size();
        Pointers.add(finish_pointer);
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