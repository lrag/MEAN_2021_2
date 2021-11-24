



import java.util.Properties;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.swing.JOptionPane;


public class ReceptorMessageListener implements MessageListener {

	public void metodo(){
		
		Context ic = null;
		try {
			ic = new InitialContext();

			QueueConnectionFactory queueConnFac = (QueueConnectionFactory) ic.lookup("ConnectionFactory");
			QueueConnection qcx = queueConnFac.createQueueConnection(); 
			//1er parámetro: si hay transaccion o no
			//2º parámetro: Como se realiza el ACK del mensaje
			QueueSession sesion = qcx.createQueueSession(false, QueueSession.AUTO_ACKNOWLEDGE);
			
			Queue cola = (Queue) ic.lookup("pruebas.cola");
			MessageConsumer receptor = sesion.createConsumer(cola);

			//Arrancamos la conexón
			qcx.start(); 

			receptor.setMessageListener(this);
			
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (JMSException e) {
			e.printStackTrace();
		}
		
	}
	
	@Override
	public void onMessage(Message msg) {

		TextMessage txtMsg = (TextMessage) msg;
		try {
			System.out.println("Mensaje recibido:"+txtMsg.getText());
		} catch (JMSException e) {
			e.printStackTrace();
		}
		
	}
	
	public static void main(String[] args) {
		ReceptorMessageListener rml = new ReceptorMessageListener();
		rml.metodo();
		
		JOptionPane.showMessageDialog(null, ".oOo.oOo.oOo.");
		
	}

}
