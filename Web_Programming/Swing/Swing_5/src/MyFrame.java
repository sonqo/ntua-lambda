import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyFrame extends JFrame{

    Canvas canvas = new Canvas();

    private JButton repButton;

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }
}