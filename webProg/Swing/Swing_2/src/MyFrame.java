import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class MyFrame extends JFrame implements KeyListener {

    static Canvas canvas;


    public MyFrame() throws HeadlessException {

        super("Shape Exercise");
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        getContentPane().setBackground(Color.white);

        canvas = new Canvas(this);
        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.addKeyListener(this);
        this.setVisible(true);

        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void keyPressed(KeyEvent e) {

    }

    @Override
    public void keyReleased(KeyEvent e) {

    }

    @Override
    public void keyTyped(KeyEvent e) {
        if (e.getKeyChar() == 'P'){
            canvas.newShape();
        }
        if (e.getKeyChar() == 'U'){
            canvas.delShape();
        }
    }

}
