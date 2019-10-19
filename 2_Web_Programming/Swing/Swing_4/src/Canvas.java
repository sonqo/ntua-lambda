import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;
import java.util.List;

public class Canvas extends JLabel implements MouseListener, MouseMotionListener {

    int x, y, r  = 10; // Deafault rad

    boolean draw = true;
    boolean copy = false; // Showing copy
    boolean blue = true;

    List<Shape> shapes = new ArrayList<Shape>();

    public void repDrawing(){ // Replicate button pressed
        if (this.copy == false){
            this.copy = true;
        }
    }

    public void cannotDraw(){
        this.draw = false;
    }

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
            if (copy == false) {
                g.setColor(Color.blue);
                g.drawOval(temp.x - temp.r, temp.y - temp.r, 2 * temp.r, 2 * temp.r);
            }
            else {
                if (temp.color == Color.white){
                    g.setColor(Color.white);
                }
                else{
                    g.setColor(Color.blue);
                }
                g.drawOval(temp.x - temp.r + 400, temp.y - temp.r, 2 * temp.r, 2 * temp.r);
            }
        }
    }

    public void newShape(int x, int y) {
        Shape next = new Shape(this);
        next.setX(x); next.setY(y); next.setRad(r);
        shapes.add(next);
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
        //pressed = false;
    }

    @Override
    public void mouseEntered(MouseEvent e) {
    }

    @Override
    public void mouseExited(MouseEvent e) {
    }

    @Override
    public void mouseDragged(MouseEvent e) { // Draw when mouseclick is pressed
        if (draw == true) {
            x = e.getX();
            y = e.getY();
            newShape(x, y);
        }
    }

    @Override
    public void mouseMoved(MouseEvent e) { // Draw without mouse click pressed
    }
}