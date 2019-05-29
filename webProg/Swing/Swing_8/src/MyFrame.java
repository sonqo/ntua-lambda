import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyFrame extends JFrame implements KeyListener{

    Canvas canvas = new Canvas();

    private JButton repButton;

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        addKeyListener(this);

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
        if (e.getKeyChar() == 'D'){
            canvas.delShape();
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {

    }
}