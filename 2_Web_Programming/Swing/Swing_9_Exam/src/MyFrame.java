import java.awt.*;
import javax.swing.*;
import java.util.Random;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class MyFrame extends JFrame implements KeyListener{

    int temp;

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
            temp = rand.nextInt(5) + 1;
            canvas.newShape(temp * 75, 25, temp);
        }
        if (e.getKeyChar() == 'P'){
            canvas.maxHeight();
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
    }
}