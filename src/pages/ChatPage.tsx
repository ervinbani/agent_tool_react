import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { chatService } from "../services/chatService";
import type { Message, Conversation } from "../types/chat";
import "./ChatPage.css";

export function ChatPage() {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [indexes, setIndexes] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  useEffect(() => {
    chatService.getAllIndexes().then((data) => {
      setIndexes(data);
      if (data.length > 0) {
        setSelectedIndex(data[0]);
      }
    }).catch((err) => {
      console.error("Failed to load indexes:", err);
    });
  }, []);

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversation(newConv);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    let conv = activeConversation;
    if (!conv) {
      conv = {
        id: crypto.randomUUID(),
        title: input.slice(0, 30) + (input.length > 30 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
      };
      setConversations((prev) => [conv!, ...prev]);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedConv = {
      ...conv,
      messages: [...conv.messages, userMessage],
      title:
        conv.messages.length === 0
          ? input.slice(0, 30) + (input.length > 30 ? "..." : "")
          : conv.title,
    };

    setActiveConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c)),
    );
    setInput("");
    setIsLoading(true);

    try {
      // Generate a random bot_id
      const botId = Math.floor(Math.random() * 100000).toString();

      // Real API call
      const response = await chatService.sendMessage(
        userMessage.content,
        botId,
        selectedIndex,
      );

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };

      const finalConv = {
        ...updatedConv,
        messages: [...updatedConv.messages, aiMessage],
      };

      setActiveConversation(finalConv);
      setConversations((prev) =>
        prev.map((c) => (c.id === finalConv.id ? finalConv : c)),
      );
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      };

      const finalConv = {
        ...updatedConv,
        messages: [...updatedConv.messages, errorMessage],
      };

      setActiveConversation(finalConv);
      setConversations((prev) =>
        prev.map((c) => (c.id === finalConv.id ? finalConv : c)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversation?.id === id) {
      setActiveConversation(null);
    }
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={createNewConversation}>
            <span>+</span> New chat
          </button>
        </div>

        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${activeConversation?.id === conv.id ? "active" : ""}`}
              onClick={() => setActiveConversation(conv)}
            >
              <span className="conv-title">{conv.title}</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button
            className="settings-btn"
            onClick={() => setShowSettings(true)}
          >
            ⚙️ Settings
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="settings-overlay"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="settings-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-modal-header">
              <h3>⚙️ Settings</h3>
              <button
                className="settings-close-btn"
                onClick={() => setShowSettings(false)}
              >
                ×
              </button>
            </div>
            <div className="settings-modal-body">
              <label className="settings-label" htmlFor="index-select">
                Knowledge Base (Index)
              </label>
              {indexes.length === 0 ? (
                <p className="settings-loading">Loading indexes...</p>
              ) : (
                <select
                  id="index-select"
                  className="index-select"
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(e.target.value)}
                >
                  {indexes.map((idx) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  ))}
                </select>
              )}
              <p className="settings-hint">
                All new messages will use the selected index.
              </p>
            </div>
            <div className="settings-modal-footer">
              <button
                className="settings-save-btn"
                onClick={() => setShowSettings(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle sidebar button */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "◀" : "▶"}
      </button>

      {/* Main chat area */}
      <main className="chat-main">
        {activeConversation ? (
          <>
            <div className="messages-container">
              {activeConversation.messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === "user" ? "👤" : "🤖"}
                  </div>
                  <div className="message-content">
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <div className="welcome-screen">
            <h1>🤖 Chatbot AI</h1>
            <p>How can I help you today?</p>
            <div className="suggestions">
              <button onClick={() => setInput("Explain how React works")}>
                Explain how React works
              </button>
              <button onClick={() => setInput("Write a JavaScript function")}>
                Write a JavaScript function
              </button>
              <button
                onClick={() =>
                  setInput("What are the best practices for TypeScript?")
                }
              >
                Best practices for TypeScript
              </button>
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="input-container">
          {selectedIndex && (
            <div className="index-badge-row">
              <span className="index-badge">
                🗂️ {selectedIndex}
              </span>
              <button
                className="index-change-btn"
                onClick={() => setShowSettings(true)}
              >
                change
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              rows={1}
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              ➤
            </button>
          </form>
          <p className="disclaimer">
            The chatbot can make mistakes. Verify important information.
          </p>
        </div>
      </main>
    </div>
  );
}
