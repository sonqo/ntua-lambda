import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class MyFrame extends JFrame{

    Canvas canvas = new Canvas();

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.black); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }
}