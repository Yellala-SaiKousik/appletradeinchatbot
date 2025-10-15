import { useState, useRef, useEffect } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about Apple Trade-In 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await response.json();

      const botMessage = {
        role: 'assistant',
        content: data.answer || 'Sorry, I couldn’t find an answer to that.'
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'There was an error fetching the answer.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '600px',
      margin: '40px auto',
      padding: '16px',
      border: '1px solid #ccc',
      borderRadius: '16px',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: '20px',
        color: '#333'
      }}>Apple Trade-In Assistant</h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '60vh',
        overflowY: 'auto',
        paddingRight: '8px',
        marginBottom: '16px'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.role === 'user' ? '#d8ecff' : '#f1f1f1',
            padding: '10px 14px',
            borderRadius: '12px',
            maxWidth: '80%',
            fontSize: '14px',
            color: '#333'
          }}>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about trade-ins..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #aaa'
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: '10px 16px',
            borderRadius: '6px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
