import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JLabel;

public class Canvas extends JLabel implements MouseListener{

	private int x = -1;
	private int y = -1;
	private int rad = 50;
	private boolean circle = true; // Setting default shape

	public void setCircle(boolean circle){
		this.circle = circle;
	}

	public Canvas(){
		setPreferredSize(new Dimension(500,500));
		addMouseListener(this); // Adding mouse to THIS canvas
	}

	public void paint(Graphics g){
		g.setColor(Color.blue);
		if (x < 0){
			reset();
		}
		if (circle){
			g.drawOval(x - rad, y - rad, 2 * rad, 2 * rad);
		}
		else{
			g.drawRect(x - rad, y - rad, 2 * rad, 2 * rad);
		}
	}

	public void reset(){
		x = getWidth() / 2;
		y = getHeight() / 2;
	}


	public void mouseClicked(MouseEvent ev) {
		x = ev.getX(); // Getting coordinates
		y = ev.getY();
		repaint(); // Repainting to corresponding coordinates
	}

	public void mouseEntered(MouseEvent arg0) {
		// TODO Auto-generated method stub
	}

	public void mouseExited(MouseEvent arg0) {
		// TODO Auto-generated method stub
	}

	public void mousePressed(MouseEvent arg0) {
		// TODO Auto-generated method stub
	}

	public void mouseReleased(MouseEvent arg0) {
		// TODO Auto-generated method stub
	}
}