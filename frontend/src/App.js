import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { marked } from 'marked';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'System initialized. Ready to generate test cases. \nType your requirements below.',
      id: 'init'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://192.168.29.76:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const systemMessage = {
          role: 'system',
          content: data.test_cases_markdown,
          id: (Date.now() + 1).toString()
        };
        setMessages(prev => [...prev, systemMessage]);
      } else {
        throw new Error(data.error_message || 'Failed to generate test cases');
      }
    } catch (error) {
      const errorMessage = {
        role: 'system',
        content: `**Error:** ${error.message}`,
        id: (Date.now() + 1).toString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-root">
      <header>
        <div className="logo-container">
          <div className="logo">LOCAL LLM TESTCASE GENERATOR</div>
        </div>
        <div className="status">
          <div className="status-dot"></div>
          Ollama Connected
        </div>
      </header>

      <main ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="avatar">
              {msg.role === 'system' ? <Bot size={20} color="white" /> : <User size={20} color="white" />}
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: msg.role === 'system' ? marked.parse(msg.content) : msg.content }}
            />
          </div>
        ))}
        {loading && (
          <div className="message system">
            <div className="avatar">
              <Bot size={20} color="white" />
            </div>
            <div className="content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Loader2 size={16} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="input-container">
        <div className="input-box">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your feature (e.g., 'Login page with email/password')..."
            rows={1}
            style={{ height: 'auto' }}
            ref={(el) => {
              if (el) {
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
              }
            }}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <div className="footer">
          <Sparkles size={12} style={{ marginRight: '4px' }} />
          Powered by Local Llama 3.2
        </div>
      </div>
    </div>
  );
}

export default App;
