import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyFrame extends JFrame implements ActionListener {

    Canvas canvas = new Canvas();

    private JButton totalButton, timerButton;

    public MyFrame() throws HeadlessException {

        super("Shape Exercise"); // Title of window
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE); // Default operation
        getContentPane().setBackground(Color.white); // Canvas color

        getContentPane().add(canvas, BorderLayout.SOUTH);
        this.setVisible(true);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.CENTER)); // Button in center
        totalButton = new JButton("Duplicate Total");
        timerButton = new JButton("Duplicate Time");

        totalButton.addActionListener(this);
        timerButton.addActionListener(this);

        panel.add(totalButton); // Adding button to panel and panel to canvas
        panel.add(timerButton);
        getContentPane().add(panel);

        pack();
    }

    public static void main(String[] args) {
        new MyFrame();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == this.totalButton){
            canvas.incTotal(); // Increase number of circles when button is pressed
        }
        if (e.getSource() == this.timerButton){
            canvas.incTime(); // Duplicate color alternation time
        }
    }
}