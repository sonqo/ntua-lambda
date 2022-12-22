import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.concurrent.ThreadLocalRandom;

public class Frame {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("JFrame title");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        frame.getContentPane().setBackground(Color.WHITE);
        Canvas canvas = new Canvas();
        frame.add(canvas);

        frame.pack();
        frame.setVisible(true);
    }

    private int randRange(int min, int max) {
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }
}
