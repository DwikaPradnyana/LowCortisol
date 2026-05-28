import { useState, useRef, useEffect } from "react";
import { dashboardService } from "../../services/api";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

// ── SUGGESTION CHIPS ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Why am I stressed this week?",
  "How can I recover faster?",
  "What's my burnout risk?",
  "Give me tips for today",
];

// ── LABEL CONFIG ──────────────────────────────────────────────────────────────
const LABEL_CONFIG = {
  Low: { bg: "#eef8f4", border: "rgba(52,211,153,0.3)", color: "#0f6e56", dot: "#34d399" },
  Medium: { bg: "#fffbeb", border: "rgba(251,191,36,0.35)", color: "#92400e", dot: "#f59e0b" },
  High: { bg: "#fff1f1", border: "rgba(239,68,68,0.3)", color: "#991b1b", dot: "#ef4444" },
};

function getLabelConfig(label) {
  if (!label) return LABEL_CONFIG.Low;
  const key = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  return LABEL_CONFIG[key] || LABEL_CONFIG.Low;
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" />
  </svg>
);
const ExpandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);
const CollapseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" />
  </svg>
);
const CloseIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const AvatarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /><path d="M4 20v-1a8 8 0 0 1 16 0v1" />
  </svg>
);

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header({ onExpand, onCollapse, onClose, isExpanded }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 bg-white" style={{ borderBottom: "1px solid #f0f4f8" }}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg,#6ec6f5,#4a90e2)" }}>
          <AvatarIcon />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1a2332" }}>LowCortisol Assistant</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[7px] w-[7px] rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }} />
            <p className="text-xs" style={{ color: "#8a9ab0" }}>Active</p>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5">
        <button
          onClick={isExpanded ? onCollapse : onExpand}
          className="p-1.5 rounded-lg transition-colors hover:bg-blue-50"
          style={{ color: "#b0bec5" }}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        </button>
        <button onClick={onClose} className="p-1.5 rounded-lg transition-colors hover:bg-blue-50" style={{ color: "#b0bec5" }} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

// ── MESSAGES ──────────────────────────────────────────────────────────────────
function MessageList({ messages, isLoading, onSuggestion, endRef }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5 min-h-0">
      {messages.map((msg) => {
        if (msg.type === "greeting") return (
          <div key={msg.id} className="flex flex-col gap-2.5">
            <div className="p-3 max-w-[92%] text-[13px]" style={{ background: "#fff", border: "1px solid #e8eef5", borderRadius: "4px 18px 18px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <p style={{ color: "#556070", lineHeight: 1.65 }}>{msg.text}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 max-w-[92%]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSuggestion(s)}
                  className="text-[11.5px] px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                  style={{ background: "#eef4ff", border: "1px solid rgba(74,144,226,0.25)", color: "#3b6fd4", cursor: "pointer" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );

        if (msg.role === "user") return (
          <div key={msg.id} className="flex justify-end">
            <div className="text-[13px] leading-relaxed text-white px-4 py-2.5 max-w-[78%]"
              style={{ background: "linear-gradient(135deg,#6baed6,#4a90e2)", borderRadius: "18px 18px 4px 18px", boxShadow: "0 2px 10px rgba(74,144,226,0.3)" }}>
              {msg.text}
            </div>
          </div>
        );

        return (
          <div key={msg.id} className="p-3 max-w-[92%] text-[13px]"
            style={{ background: "#fff", border: "1px solid #e8eef5", borderRadius: "4px 18px 18px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            {msg.title && <p className="font-semibold mb-1" style={{ color: "#1a2332" }}>{msg.title}</p>}
            {msg.body && msg.isHtml
              ? <p className="leading-relaxed" style={{ color: "#556070" }} dangerouslySetInnerHTML={{ __html: msg.body }} />
              : msg.body && <p className="leading-relaxed" style={{ color: "#556070" }}>{msg.body}</p>
            }
          </div>
        );
      })}

      {isLoading && (
        <div className="p-3 max-w-[40%]" style={{ background: "#fff", border: "1px solid #e8eef5", borderRadius: "4px 18px 18px 18px" }}>
          <div className="flex gap-1 py-0.5">
            {[0, 150, 300].map((d) => (
              <span key={d} className="h-2 w-2 rounded-full animate-bounce" style={{ background: "#b0bec5", animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

// ── INPUT AREA ────────────────────────────────────────────────────────────────
function InputArea({ value, onChange, onSend, onKeyDown, disabled }) {
  return (
    <div className="flex-shrink-0 px-3.5 pb-3.5 pt-2.5 bg-white" style={{ borderTop: "1px solid #f0f4f8" }}>
      <div className="flex items-center gap-2 rounded-[14px] px-3.5 py-2" style={{ border: "1.5px solid #4a90e2", background: "#fff" }}>
        <input
          value={value} onChange={onChange} onKeyDown={onKeyDown}
          placeholder="Ask about your patterns..."
          className="flex-1 bg-transparent text-[13px] outline-none min-w-0"
          style={{ color: "#2a2e35", fontFamily: "inherit" }}
        />
        <button
          onClick={onSend} disabled={disabled}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] flex-shrink-0 transition-opacity disabled:opacity-35"
          style={{ background: "#4a90e2", border: "none", cursor: disabled ? "default" : "pointer" }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ── CONTEXT PANEL ────────────────────────────────────────────────────────────
function ContextPanel({ contextData, isLoadingContext }) {
  const burnoutLabel = contextData?.todayStatus?.risk || null;
  const cfg = getLabelConfig(burnoutLabel);

  if (isLoadingContext) {
    return (
      <div className="hidden md:block w-[220px] flex-shrink-0 p-4" style={{ background: "#fafbfd", borderLeft: "1px solid #f0f4f8" }}>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#b0bec5" }}>Context</p>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-5">
            <div className="h-3 w-16 rounded mb-2 animate-pulse" style={{ background: "#e8eef5" }} />
            <div className="h-7 w-24 rounded-full animate-pulse" style={{ background: "#e8eef5" }} />
          </div>
        ))}
      </div>
    );
  }

  const hasData = !!contextData?.hasCheckedInToday;

  return (
    <div className="hidden md:block w-[220px] flex-shrink-0 p-4 overflow-y-auto" style={{ background: "#fafbfd", borderLeft: "1px solid #f0f4f8" }}>
      <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#b0bec5" }}>Context</p>

      <div className="mb-5">
        <p className="text-xs mb-2" style={{ color: "#8a9ab0" }}>Burnout Level</p>
        {burnoutLabel ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
            {burnoutLabel}
          </div>
        ) : (
          <p className="text-[12px]" style={{ color: "#b0bec5" }}>No check-in yet</p>
        )}
      </div>

      {hasData && contextData?.personalInsight && (
        <div className="mb-5">
          <p className="text-xs mb-2" style={{ color: "#8a9ab0" }}>Today's Insight</p>
          <p className="text-[12px] font-semibold mb-1" style={{ color: "#1a2332" }}>{contextData.personalInsight.title}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: "#8a9ab0" }}>{contextData.personalInsight.description}</p>
        </div>
      )}

      {hasData && contextData?.recommendation && (
        <div className="mb-5">
          <p className="text-xs mb-2" style={{ color: "#8a9ab0" }}>Recommendation</p>
          <div className="rounded-xl p-2.5" style={{ background: "#eef4ff", border: "1px solid rgba(74,144,226,0.15)" }}>
            <p className="text-[11.5px] font-semibold mb-1" style={{ color: "#3b6fd4" }}>{contextData.recommendation.title}</p>
            <p className="text-[11px] leading-relaxed" style={{ color: "#556070" }}>{contextData.recommendation.description}</p>
          </div>
        </div>
      )}

      {contextData?.weeklyTrends?.length > 0 && (
        <div className="mb-5">
          <p className="text-xs mb-2" style={{ color: "#8a9ab0" }}>Weekly Trends</p>
          <div className="flex gap-1 items-end">
            {contextData.weeklyTrends.map((day, i) => {
              const dotColor = day.r === "High" ? "#ef4444" : day.r === "Medium" ? "#f59e0b" : day.r === "Low" ? "#34d399" : "#e2e8f0";
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="h-2 w-2 rounded-full" style={{ background: dotColor }} title={day.r} />
                  <span className="text-[9px]" style={{ color: "#b0bec5" }}>{day.d}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!hasData && (
        <div className="rounded-xl p-3" style={{ background: "#f8f9fb", border: "1px solid #e8eef5" }}>
          <p className="text-[11.5px]" style={{ color: "#8a9ab0", lineHeight: 1.6 }}>
            Complete today's check-in to see your personalized insights here.
          </p>
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function ChatbotBubble() {
  const [mode, setMode] = useState("closed"); // closed | bubble | expanded
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "greeting",
      text: "Hi! I'm your LowCortisol Assistant. I can help you understand your stress patterns and burnout risk. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const [contextData, setContextData] = useState(null);
  const [isLoadingContext, setIsLoadingContext] = useState(false);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchContext() {
      setIsLoadingContext(true);
      try {
        const res = await dashboardService.getDashboardData();
        setContextData(res?.data || res);
      } catch (err) {
        console.error("Failed to fetch context:", err);
        setContextData(null);
      } finally {
        setIsLoadingContext(false);
      }
    }
    fetchContext();
  }, []);

  useEffect(() => {
    if (mode !== "closed") endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mode]);

  useEffect(() => {
    if (mode !== "closed") setTimeout(() => inputRef.current?.focus(), 80);
  }, [mode]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    setMessages((p) => [...p, { id: Date.now(), role: "user", text: msg }]);
    setInput("");
    setIsLoading(true);

    const userId = localStorage.getItem("user_id") || "";

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          user_id: userId,
          message: msg,
          context: {
            burnoutLevel: contextData?.todayStatus?.risk || null,
            insight: contextData?.todayStatus?.insight || null,
          },
        }),
      });
      const data = await res.json();
      const reply = data?.output || data?.text || data?.message || "Tidak ada respons dari server.";
      setMessages((p) => [...p, { id: Date.now() + 1, role: "bot", body: reply, isHtml: true }]);
    } catch {
      setMessages((p) => [...p, { id: Date.now() + 1, role: "bot", body: "Koneksi ke n8n gagal. Cek VITE_N8N_WEBHOOK_URL di .env." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (text) => sendMessage(text);

  const inputProps = {
    value: input,
    onChange: (e) => setInput(e.target.value),
    onSend: () => sendMessage(),
    onKeyDown: (e) => e.key === "Enter" && sendMessage(),
    disabled: !input.trim() || isLoading,
  };

  const headerProps = {
    onExpand: () => setMode("expanded"),
    onCollapse: () => setMode("bubble"),
    onClose: () => setMode("closed"),
  };

  return (
    <>
      {/* ── COMPACT BUBBLE WINDOW ─────────────────────────────────────── */}
      <div
        className={`fixed bottom-[90px] right-6 z-50 flex flex-col bg-white overflow-hidden transition-all duration-300 origin-bottom-right ${mode === "bubble" ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
          }`}
        style={{ 
          width: 360, 
          height: 480, 
          maxWidth: "calc(100vw - 48px)", 
          maxHeight: "calc(100vh - 120px)", 
          borderRadius: 20, 
          border: "1px solid #e8eef5", 
          boxShadow: "0 16px 60px rgba(0,0,0,0.15)" 
        }}
      >
        <Header {...headerProps} isExpanded={false} />
        <MessageList messages={messages} isLoading={isLoading} onSuggestion={handleSuggestion} endRef={endRef} />
        <InputArea {...inputProps} />
      </div>

      {/* ── EXPANDED WINDOW ───────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 p-4 ${mode === "expanded" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      >
        <div
          className={`flex flex-col bg-white overflow-hidden transition-all duration-300 w-full max-w-[820px] ${mode === "expanded" ? "scale-100" : "scale-95"}`}
          style={{ height: 540, maxHeight: "90vh", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}
        >
          <Header {...headerProps} isExpanded={true} />
          <div className="flex flex-1 overflow-hidden min-h-0">
            <div className="flex flex-1 flex-col overflow-hidden min-w-0">
              <MessageList messages={messages} isLoading={isLoading} onSuggestion={handleSuggestion} endRef={endRef} />
              <InputArea {...inputProps} />
            </div>
            <ContextPanel contextData={contextData} isLoadingContext={isLoadingContext} />
          </div>
        </div>
      </div>

      {/* ── BUBBLE BUTTON ─────────────────────────────────────────────── */}
      <button
        onClick={() => setMode((p) => (p === "closed" ? "bubble" : "closed"))}
        className="fixed bottom-6 right-6 z-[60] flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 0 12px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3)",
        }}
        aria-label="Toggle chatbot"
      >
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#6ec6f5,#4a90e2)" }}>
          {mode !== "closed" ? <CloseIcon size={15} /> : <ChatIcon />}
        </div>
        {mode === "closed" && (
          <span
            className="absolute top-[6px] right-[6px] h-[11px] w-[11px] rounded-full bg-emerald-400"
            style={{ border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 0 8px rgba(52,211,153,0.8)" }}
          />
        )}
      </button>
    </>
  );
}