import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      sender: string;
      text: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        message,
      });

      const aiMessage = {
        sender: "Kael AI",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Kael AI",
          text: "Something went wrong while contacting Gemini.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          🤖 Kael AI Assistant
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] overflow-y-auto">

          {messages.length === 0 && (
            <p className="text-gray-400">
              Start chatting with Kael AI...
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-5 ${
                msg.sender === "You"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-3 rounded-xl max-w-xl ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <strong>{msg.sender}</strong>

                <p className="mt-2 whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-gray-500">
              🤖 Kael AI is thinking...
            </p>
          )}

        </div>

        <div className="flex gap-3 mt-5">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Kael AI anything..."
            className="flex-1 border rounded-lg p-4"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default Chat;