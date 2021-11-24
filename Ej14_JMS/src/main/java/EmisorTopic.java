


import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicPublisher;
import javax.jms.TopicSession;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class EmisorTopic {

	public static void main(String[] args) {
		
		//activemq start
		//http://127.0.0.1:8161/admin/
		//login:admin
		//pw   :admin
		
		Context ic = null;
		try {
			ic = new InitialContext();
			
			//java:/jms/ColaPrueba 
			//java:jboss/exported/jms/ColaPrueba	
			
			TopicConnectionFactory topicConnFac = 
				(TopicConnectionFactory) ic.lookup("ConnectionFactory");
			TopicConnection qcx = topicConnFac.createTopicConnection(); 
			//1er parámetro: si hay transaccion o no
			//2º parámetro: Como se realiza el ACK del mensaje
			TopicSession sesion = qcx.createTopicSession(false, TopicSession.AUTO_ACKNOWLEDGE);
			//TopicSession sesion = qcx.createTopicSession(false, TopicSession.CLIENT_ACKNOWLEDGE);
			
            //Topic cola = sesion.createTopic("pruebas.cola");
			
			Topic topic = (Topic) ic.lookup("pruebas.topic");
			
			
			TopicPublisher productor = sesion.createPublisher(topic);

			//Arrancamos la conexón
			qcx.start();
			
			//Para enviar los mensajes necesitamos la sesion y el productor
			TextMessage txtMsg = sesion.createTextMessage("HOLA RADIOLA 2");
			productor.send(txtMsg);
			
			System.out.println("Mensaje enviado");
			
			sesion.close();
			qcx.close();
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (JMSException e) {
			e.printStackTrace();
		} finally {
			try {
				ic.close();
			} catch (NamingException e) {
				e.printStackTrace();
			}
		}		
	}		
}
