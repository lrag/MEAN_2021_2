

import java.util.Properties;

import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class ReceptorColaPrioridad {

	public static void main(String[] args) {
		
		Context ic = null;
		try {
			ic = new InitialContext();

			QueueConnectionFactory queueConnFac = (QueueConnectionFactory) ic.lookup("ConnectionFactory");
			QueueConnection qcx = queueConnFac.createQueueConnection(); 
			//1er parámetro: si hay transaccion o no
			//2º parámetro: Como se realiza el ACK del mensaje
			QueueSession sesion = qcx.createQueueSession(false, QueueSession.AUTO_ACKNOWLEDGE);
			
			Queue cola = (Queue) ic.lookup("pruebas.cola");
			MessageConsumer receptor = sesion.createConsumer(cola, " JMSPriority>5 and cantidad>500 ");

			//Arrancamos la conexión
			qcx.start(); 
			
			//Para recibir los mensajes:
			TextMessage txtMsg = (TextMessage) receptor.receive();
			System.out.println("Mensaje recibido:"+txtMsg.getText());
			System.out.println("Prioridad:"+txtMsg.getJMSPriority());
			System.out.println("Cantidad:"+txtMsg.getIntProperty("cantidad"));
			
			sesion.close();
			qcx.close();			
			
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
}
