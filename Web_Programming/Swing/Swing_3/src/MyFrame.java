import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class MyFrame extends JFrame implements KeyListener{

    Canvas canvas = new Canvas();

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        addKeyListener(this); // Keyboard Listener
        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void keyTyped(KeyEvent e) {
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyChar() == 'R'){
            canvas.setRed(); // Change every cirle to red
            repaint();
        }
        if (e.getKeyChar() == 'B'){
            canvas.setBlue(); // Change every circle to blue
            repaint();
        }
        if (e.getKeyChar() == 'D'){
            canvas.delShape();
        }
        if (e.getKeyChar() == '1'){
            canvas.setRad(15); // Rad alternation of all circles according to number pressed
            repaint();
        }
        if (e.getKeyChar() == '2'){
            canvas.setRad(30);
            repaint();
        }
        if (e.getKeyChar() == '3'){
            canvas.setRad(45);
            repaint();
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
    }
}