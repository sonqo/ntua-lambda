import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MyFrame extends JFrame implements ActionListener {

    Canvas canvas = new Canvas();

    public static void main (String[] args){
        new MyFrame();
    }

    public MyFrame() throws HeadlessException{

        super("Shape Exercise");
        setVisible(true);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        getContentPane().add(canvas);

        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout(FlowLayout.LEFT));

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

        String [] colors = {"Red", "Blue", "Green"};

        JComboBox colorList = new JComboBox(colors);
        colorList.setSelectedIndex(0);
        colorList.addActionListener(this);

        panel.add(colorList);

        circleButton.addActionListener(this);
        squareButton.addActionListener(this);

        getContentPane().add(panel, BorderLayout.NORTH);
        pack();
    }

    @Override
    public void actionPerformed(ActionEvent ev) {

        if (ev.getSource() instanceof JComboBox){
            if (((JComboBox) ev.getSource()).getSelectedItem().equals("Red")){
                canvas.setRed(true);
                canvas.setBlue(false);
                canvas.setGreen(false);
            }
            if (((JComboBox) ev.getSource()).getSelectedItem().equals("Blue")){
                canvas.setRed(false);
                canvas.setBlue(true);
                canvas.setGreen(false);
            }
            if (((JComboBox) ev.getSource()).getSelectedItem().equals("Green")){
                canvas.setRed(false);
                canvas.setBlue(false);
                canvas.setGreen(true);
            }
        }

        if (ev.getSource() instanceof JRadioButton){
            if (ev.getActionCommand().equals("Circle")){
                canvas.setCircle(true);
                canvas.setSquare(false);
            }
            else {
                canvas.setCircle(false);
                canvas.setSquare(true);
            }
        }
    }
}
