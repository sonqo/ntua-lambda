import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyFrame extends JFrame implements KeyListener, ActionListener{

    Canvas canvas = new Canvas();

    private JButton resetButton;

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.CENTER)); // Button in center
        resetButton = new JButton("Reset!");

        resetButton.addActionListener(this);

        addKeyListener(this);

        panel.add(resetButton);
        getContentPane().add(panel);

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

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == this.resetButton){
            canvas.resetBoard();
        }
    }
}