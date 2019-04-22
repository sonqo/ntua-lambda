import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyFrame extends JFrame implements ActionListener {

    Canvas canvas = new Canvas();

    private JButton repButton;

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.CENTER)); // Button in center
        repButton = new JButton("Replicate");

        repButton.addActionListener(this);

        panel.add(repButton); // Adding button to panel and panel to canvas
        getContentPane().add(panel);

        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == this.repButton){
            canvas.repDrawing(); // Increase number of circles when button is pressed
            canvas.cannotDraw(); // Cannot draw after button is pressed
            repaint();
        }

    }
}