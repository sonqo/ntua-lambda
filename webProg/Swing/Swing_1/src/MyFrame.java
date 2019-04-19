import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MyFrame extends JFrame implements ActionListener {

    Canvas canvas = new Canvas();

    public Canvas getCanvas(){
        return canvas;
    }

    public void setCanvas(){
        this.canvas = canvas;
    }

    public static void main (String[] args){
        new MyFrame();
    }

    public MyFrame() throws HeadlessException{

        super("Shape Exercise");
        setVisible(true);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        getContentPane().add(canvas);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.CENTER));

        panel.add(new JLabel("Select Shape"));

        String [] options = {"Circle", "Square"};

        JRadioButton circleButton = new JRadioButton(options[0]);
        circleButton.setActionCommand(options[0]);
        circleButton.setSelected(true);

        JRadioButton squareButton = new JRadioButton(options[1]);
        squareButton.setActionCommand(options[1]);

        ButtonGroup group = new ButtonGroup();
        group.add(circleButton);
        group.add(squareButton);

        panel.add(circleButton);
        panel.add(squareButton);

        circleButton.addActionListener(this);
        squareButton.addActionListener(this);

        getContentPane().add(panel, BorderLayout.NORTH);
        pack();
    }

    @Override
    public void actionPerformed(ActionEvent ev) {

        if (ev.getSource() instanceof  JRadioButton) {
            if (ev.getActionCommand().equals("Circle")) {
                canvas.setCircle(true);
            }
            else {
                canvas.setCircle(false);
                canvas.setSquare(true);
            }
        }
    }
}