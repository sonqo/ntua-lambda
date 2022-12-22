import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
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

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void keyTyped(KeyEvent e) {
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyChar() == 'R'){ // Change backround color according to mouse click
            getContentPane().setBackground(Color.red);
        }
        if (e.getKeyChar() == 'B'){
            getContentPane().setBackground(Color.black);
        }
        if (e.getKeyChar() == 'G'){
            getContentPane().setBackground(Color.gray);
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
    }
}