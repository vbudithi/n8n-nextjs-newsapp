import { useState } from "react";
import { Mail, CheckCircle, XCircle } from "lucide-react";

export default function NewsletterWidget() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const reset = () => {
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Successfully subscribed! 🎉");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }

    reset();
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5" />
        <h3 className="font-bold text-lg">Stay Updated</h3>
      </div>
      <p className="text-sm text-blue-50 mb-4">
        Get the latest tech news delivered to your inbox
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" && (
            <>
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="w-4 h-4" />
              Subscribed!
            </>
          )}
          {(status === "idle" || status === "error") && "Subscribe"}
        </button>

        {/* Status Messages */}
        {message && (
          <div
            className={`text-sm flex items-center gap-2 ${
              status === "success" ? "text-green-100" : "text-red-100"
            }`}
          >
            {status === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {message}
          </div>
        )}
      </form>

      <p className="text-xs text-blue-100 mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
