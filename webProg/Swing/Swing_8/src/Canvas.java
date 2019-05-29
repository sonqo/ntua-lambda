import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel implements MouseListener, MouseMotionListener, KeyListener {

    int x, y, r  = 10; // Default rad

    List<Shape> shapes = new ArrayList<Shape>();

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
            g.setColor(Color.blue);
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
        for (int i = start_pointer; i < finish_pointer; i++){
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
        System.out.println(start_pointer);
    }

    @Override
    public void mouseReleased(MouseEvent e) {
        finish_pointer = shapes.size();
        System.out.println(finish_pointer);
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

    @Override
    public void keyTyped(KeyEvent e) {
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyChar() == 'D'){
            System.out.println("akppa");
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {

    }
}