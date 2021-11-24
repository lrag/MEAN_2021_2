



import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.swing.JOptionPane;


public class ReceptorMessageListenerTopic implements MessageListener {

	public void metodo(){
		
		Context ic = null;
		try {
			ic = new InitialContext();

			TopicConnectionFactory topicConnFac = (TopicConnectionFactory) ic.lookup("ConnectionFactory");
			TopicConnection qcx = topicConnFac.createTopicConnection(); 
			//1er parámetro: si hay transaccion o no
			//2º parámetro: Como se realiza el ACK del mensaje
			TopicSession sesion = qcx.createTopicSession(false, QueueSession.AUTO_ACKNOWLEDGE);
			
			Topic topic = (Topic) ic.lookup("pruebas.topic");
			TopicSubscriber subscriptor = sesion.createSubscriber(topic);

			//Arrancamos la conexón
			qcx.start(); 

			subscriptor.setMessageListener(this);
			
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
		ReceptorMessageListenerTopic rml = new ReceptorMessageListenerTopic();
		rml.metodo();
		
		JOptionPane.showMessageDialog(null, ".oOo.oOo.oOo.");
		
	}

}
