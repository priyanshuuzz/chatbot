import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Trash2, Loader } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'system' | 'user' | 'ai';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hello! I'm NextGenCreator, an AI assistant. How can I help you today?", sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      simulateLLMResponse(input);
    }
  };

  const simulateLLMResponse = (userInput: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now(),
        text: generateAIResponse(userInput),
        sender: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      `That's an interesting point about "${userInput}". Let me elaborate...`,
      `I understand you're asking about "${userInput}". Here's what I know...`,
      `Regarding "${userInput}", there are several factors to consider...`,
      `Your question about "${userInput}" is quite complex. Let's break it down...`,
      `I'm glad you asked about "${userInput}". Here's my analysis...`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const clearConversation = () => {
    setMessages([
      { id: 0, text: "Hello! I'm NextGenCreator, an AI assistant. How can I help you today?", sender: 'system' }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg transform skew-y-1">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-md">NextGenCreator</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 perspective-1000">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`rounded-full p-2 ${
                  message.sender === 'user' ? 'bg-blue-500' : 
                  message.sender === 'ai' ? 'bg-purple-500' : 'bg-green-500'
                } shadow-lg transform hover:scale-110 transition-transform duration-200`}>
                  {message.sender === 'user' ? <User size={24} className="text-white" /> : 
                   message.sender === 'ai' ? <Bot size={24} className="text-white" /> :
                   <Bot size={24} className="text-white" />}
                </div>
                <div className={`mx-2 p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 
                  message.sender === 'ai' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                  'bg-gradient-to-br from-green-400 to-green-600'
                } shadow-md transform hover:-translate-y-1 transition-transform duration-200`}>
                  <p className="text-white">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-3 shadow-md">
                <Loader size={24} className="text-white animate-spin mr-2" />
                <p className="text-white">AI is typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg transform -skew-y-1">
        <div className="max-w-3xl mx-auto flex flex-col space-y-2">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-200 focus:scale-105"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-r-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-transform duration-200 hover:scale-105"
            >
              <Send size={20} />
            </button>
          </form>
          <button
            onClick={clearConversation}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 transform transition-transform duration-200 hover:scale-105 flex items-center justify-center"
          >
            <Trash2 size={20} className="mr-2" /> Clear Conversation
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;