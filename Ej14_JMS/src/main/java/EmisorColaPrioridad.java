


import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class EmisorColaPrioridad {

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
			MessageProducer productor = sesion.createProducer(cola);
			productor.setPriority(8);
			
			//Arrancamos la conexión
			qcx.start();
			
			//Para enviar los mensajes necesitamos la sesion y el productor
			TextMessage txtMsg = sesion.createTextMessage("HOLA RADIOLA");
			
			txtMsg.setIntProperty("cantidad", 800);
			
			productor.send(txtMsg);			
			
			System.out.println("Mensaje enviado");
			
			sesion.close();
			qcx.close();
		
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (JMSException e) {
			e.printStackTrace();
		}		
	}		
}
