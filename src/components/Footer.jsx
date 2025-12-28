import React, { useState } from "react";
import './footer.css';

/* ---------- Chat Box Component ---------- */
function ChatBox({ title, placeholder = "Type your message..." }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput("");
    setError("");

    try {
      // 1) Read API key from env
      const apiKey = import.meta.env.VITE_OPENROUTER_KEY;

      if (!apiKey) {
        setError(
          "API key is missing. Check your .env file for REACT_APP_OPENROUTER_KEY and restart your dev server."
        );
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,

          "HTTP-Referer": "https://www.iriswxy.com",
          "X-Title": "Iris' Portfolio",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: input
            }
          ]
        })
      });

      const data = await response.json();

      // 2) If HTTP status is not ok, show API error
      if (!response.ok) {
        console.error("OpenRouter API error:", data);
        setError(
          data?.error?.message ||
          `API error: ${response.status} ${response.statusText}`
        );
        setIsLoading(false);
        return;
      }

      // 3) Normal success path
      if (data?.choices?.[0]?.message?.content) {
        setOutput(data.choices[0].message.content);
      } else {
        setError("No response received from API.");
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
      setError("Network error or invalid response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-box-section">
      <div className="chat-container">
        {title && <h3 className="chat-title">{title}</h3>}

        <div className="chat-window">
          <form onSubmit={handleSubmit} className="chat-input-form">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows="3"
            />
            <button
              type="submit"
              className="chat-submit"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "Processing...(This may take a minite, please stay on the same page.)" : "Send"}
            </button>
          </form>

          {output && (
            <div className="chat-output">
              <div className="chat-output-label">Response:</div>
              <div
                className="chat-output-content"
                dangerouslySetInnerHTML={{
                  __html: output
                    .replace(/\n/g, "<br/>")
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")  // bold
                    .replace(/\*(.*?)\*/g, "<em>$1</em>")              // italics
                }}
              ></div>
            </div>
          )}

          {error && (
            <div className="chat-output error">
              <div className="chat-output-label">Error:</div>
              <div className="chat-output-content">{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Footer() {
  return (
    <footer className="footer-main">

      {/* Avatar on top of section */}
      <div className="footer-avatar-top">
        <img
          className="footer-avatar"
          src="/images/68bf957f0d86370cc8516d98_headshot-4 Medium.jpeg"
          alt="Iris Wong headshot"
        />
      </div>

      <div className="footer-relative"> 
        {/* Chat Box Section */}
        <div className="chat-floating">
          <ChatBox 
            title="Iris' first AI Assistant! Give it a try~"
            placeholder="Ask me anything! (limited prompts per day)"
          />
        </div>

        {/* Footer content */}
        <div className="footer-wrap">
          <div className="footer-bottom">
            <p className="footer-note">
              © 2025 Iris Wong. My Second React Project! Fueled by Reese Puffs
              Cereal. All rights reserved.
            </p>

            <a
              className="footer-ig"
              href="https://www.instagram.com/justmomentography/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/images/instagram 2.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


