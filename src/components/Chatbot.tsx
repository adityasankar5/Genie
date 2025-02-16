import { useState } from 'react';
import '../styles/chatbot.scss';

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const getBotResponse = (userMessage: string) => {
    const responses: { [key: string]: string } = {
      'hi': 'Hello! How can I assist you today?',
      'budget': 'You can track your expenses and create a budget on the Budget page.',
      'invest': 'Check out the Invest page for investment options tailored to your goals.',
      'loan': 'Use the Loan Calculator on the Invest page to calculate your EMI.',
      'default': "I'm sorry, I didn't understand that. Could you clarify?",
    };
    return responses[userMessage.toLowerCase()] || responses['default'];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const botResponse = getBotResponse(input);
    setMessages([...messages, `You: ${input}`, `Bot: ${botResponse}`]);
    setInput('');
  };

  return (
    <div className="chat">
      <h2 className="chat__title">Financial Assistant</h2>
      <div className="chat__messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat__message ${
              msg.startsWith('You') ? 'chat__message--user' : 'chat__message--bot'
            }`}
          >
            <span className="message-bubble">{msg}</span>
          </div>
        ))}
      </div>
      <div className="chat__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;