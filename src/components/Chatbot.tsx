import { useState } from 'react';

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
    <div className="p-[2vh] h-screen flex flex-col bg-background text-white">
      <h2 className="text-[4vw] font-bold mb-[2vh]">Financial Assistant</h2>
      <div className="flex-grow overflow-y-auto p-[1vh] border rounded-lg bg-secondary">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-[1vh] ${msg.startsWith('You') ? 'text-right' : 'text-left'}`}>
            <span className={`${msg.startsWith('You') ? 'bg-primary' : 'bg-accent'} p-[1vh] rounded inline-block`}>
              {msg}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-[2vh] flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow p-[1vh] border rounded"
        />
        <button onClick={handleSend} className="ml-[1vw] p-[1vh] bg-primary text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;