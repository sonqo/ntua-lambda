import javax.swing.*;

public class MyFrame extends JFrame {

    /* Βθττον ψρεατιον */
    JButton Load = new JButton("Load");
    JButton Save = new JButton("Save");

    public MyFrame(){

        super("Button Frame"); // Title of JFrame
        setSize(340, 170);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JPanel panel = new JPanel(); // Panel creation where button are being added
        panel.add(Load);
        panel.add(Save);
        add(panel);
        setVisible(true);

    }

    public static void main(String[] arguments){

        MyFrame mf = new MyFrame();

    }

}
