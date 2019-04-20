import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class MyFrame extends JFrame implements KeyListener{

    Canvas canvas = new Canvas();

    public static void main (String[] args){
        new MyFrame();
    }

    public MyFrame() throws HeadlessException{

        super("Shape Exercise");
        setVisible(true);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        getContentPane().setBackground(Color.white);
        getContentPane().add(canvas);
        addKeyListener(this);
        pack();
    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyChar() == 'P'){
            canvas.setPressed(true);
            canvas.repaint();
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {

    }
}