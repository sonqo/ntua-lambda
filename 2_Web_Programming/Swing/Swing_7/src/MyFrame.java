import java.awt.*;
import javax.swing.*;
import java.util.Random;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseListener;

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

    Random rand = new Random();

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void keyTyped(KeyEvent e) {
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyChar() == 'U'){
            canvas.newShape(rand.nextInt(500), rand.nextInt(500));
        }
        if (e.getKeyChar() == 'D'){
            canvas.delShape();
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
    }
}