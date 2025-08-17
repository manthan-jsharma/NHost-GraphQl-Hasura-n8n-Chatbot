"use client";

import type React from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { SUBSCRIBE_TO_MESSAGES } from "../graphql/queries";
import { CREATE_MESSAGE, UPDATE_MESSAGE } from "../graphql/mutations";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  Send,
  Edit3,
  Check,
  X,
  Bot,
  User,
  Copy,
  Loader2,
  Search,
  Download,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { useUserData } from "@nhost/react";

interface Message {
  id: string;
  content: string;
  role: string;
  created_at: string;
}

interface ChatWindowProps {
  chatId: string;
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  // --- STATE MANAGEMENT ---
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasInitiallyScrolled, setHasInitiallyScrolled] = useState(false);

  // --- REFS ---
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- DATA FETCHING & MUTATIONS ---
  const user = useUserData();
  const {
    data,
    loading,
    error: subscriptionError,
  } = useSubscription(SUBSCRIBE_TO_MESSAGES, {
    variables: { chatId },
  });
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  const messages: Message[] = useMemo(
    () =>
      data?.messages
        .slice()
        .sort(
          (a: Message, b: Message) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ) || [],
    [data?.messages]
  );

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const query = searchQuery.toLowerCase().trim();
    return messages.filter((msg) => msg.content.toLowerCase().includes(query));
  }, [messages, searchQuery]);

  // --- EFFECTS ---
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !hasInitiallyScrolled) {
      scrollToBottom(false);
      setHasInitiallyScrolled(true);
    }
  }, [messages.length, hasInitiallyScrolled, scrollToBottom]);

  // --- NEW SCROLL EFFECT: This is the robust solution ---
  useLayoutEffect(() => {
    if (messages.length === 0 || !hasInitiallyScrolled) return;

    const lastMessage = messages[messages.length - 1];

    // If the user just sent a message, always scroll to the bottom.
    if (lastMessage.role === "user") {
      scrollToBottom(true);
    }
    // If the AI just responded, only scroll if the user was already near the bottom.
    else if (isNearBottom) {
      scrollToBottom(true);
    }
  }, [messages, hasInitiallyScrolled, isNearBottom, scrollToBottom]);

  useEffect(() => {
    if (isAiThinking && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role !== "user") {
        setIsAiThinking(false);
      }
    }
  }, [messages, isAiThinking]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { scrollTop, scrollHeight, clientHeight } = container;
          const isScrolledToBottom =
            scrollHeight - scrollTop - clientHeight < 100;
          setIsNearBottom(isScrolledToBottom);
          setShowScrollButton(
            scrollHeight > clientHeight && !isScrolledToBottom
          );
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages.length]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // --- HANDLERS ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending || !user?.id) return;

    setIsSending(true);
    let messageSentSuccessfully = false;

    try {
      await createMessage({
        variables: {
          chatId,
          content: trimmedMessage,
          role: "user",
          user_id: user.id,
        },
      });
      setMessage("");
      messageSentSuccessfully = true;
    } catch (error) {
      console.error("Error sending user message:", error);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }

    if (messageSentSuccessfully) {
      setIsAiThinking(true);
      // The new useLayoutEffect now handles scrolling, so the setTimeout is removed.
    }
  };

  const handleSaveEdit = useCallback(
    async (messageId: string) => {
      const trimmedContent = editContent.trim();
      if (!trimmedContent) return;
      try {
        await updateMessage({
          variables: { id: messageId, content: trimmedContent },
        });
        setEditingMessageId(null);
        setEditContent("");
        setIsAiThinking(true);
      } catch (error) {
        console.error("Error updating message:", error);
        setIsAiThinking(false);
      }
    },
    [editContent, updateMessage]
  );

  const copyToClipboard = useCallback(
    async (text: string, messageId: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedMessageId(messageId);
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(
          () => setCopiedMessageId(null),
          2000
        );
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    },
    []
  );

  const exportChat = useCallback(() => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${new Date(msg.created_at).toLocaleTimeString()}] ${
            msg.role === "user" ? "You" : "AI"
          }: ${msg.content}`
      )
      .join("\n\n");
    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${chatId}-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }, [messages, chatId]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditContent("");
  }, []);

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
    if (showSearch) setSearchQuery("");
  }, [showSearch]);

  const formatTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // --- RENDER LOGIC ---
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Loading messages...</span>
      </div>
    );
  }
  if (subscriptionError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background text-red-500">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>Failed to load messages</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-background/50">
      <div className="border-b border-border/50 bg-card/90 backdrop-blur-xl px-3 md:px-4 py-2 flex-shrink-0 shadow-sm flex items-center justify-between h-[60px] transition-all duration-300">
        {showSearch ? (
          <div className="w-full flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search in conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm"
              autoFocus
            />
            <button
              onClick={toggleSearch}
              className="p-1 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between animate-in fade-in duration-300">
            <h2 className="font-semibold text-lg">Chat</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSearch}
                className="group p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-primary/10"
                title="Search messages"
              >
                <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </button>
              <button
                onClick={exportChat}
                className="group p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-primary/10"
                title="Export chat"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 md:p-4 scroll-smooth min-h-0 relative"
      >
        <div className="space-y-3 md:space-y-4">
          {searchQuery && (
            <div className="text-center text-xs text-muted-foreground sticky top-2 z-10">
              {filteredMessages.length} results for "{searchQuery}"
            </div>
          )}
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              id={`message-${msg.id}`}
              className={`flex items-start space-x-2 md:space-x-3 transition-all duration-300 hover:scale-[1.01] ${
                msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              } ${
                searchQuery &&
                msg.content.toLowerCase().includes(searchQuery.toLowerCase())
                  ? "bg-gradient-to-r from-yellow-50/50 to-yellow-100/50 dark:from-yellow-900/10 dark:to-yellow-800/10 rounded-lg p-2 -m-2 shadow-lg"
                  : ""
              }`}
            >
              <div
                className={`flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[85%] md:max-w-[70%] flex flex-col group ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`relative px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover-glow ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : "bg-gradient-to-br from-blue-50/90 to-cyan-50/90 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30 text-foreground"
                  }`}
                >
                  {editingMessageId === msg.id ? (
                    <div className="space-y-2 md:space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 text-sm bg-background/80 backdrop-blur-sm border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                        autoFocus
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          handleSaveEdit(msg.id)
                        }
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEdit(msg.id)}
                          disabled={!editContent.trim()}
                          className="p-1.5 text-green-400 hover:text-green-300"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1.5 text-red-400 hover:text-red-300"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p
                      className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "text-white font-medium"
                          : "text-foreground"
                      }`}
                    >
                      {msg.content}
                    </p>
                  )}
                </div>
                <div
                  className={`relative w-full h-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100 flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`absolute bottom-0 flex items-center gap-1 rounded-full p-1 bg-background/50 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 transition-all duration-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0`}
                  >
                    {msg.role === "user" && (
                      <button
                        onClick={() => {
                          setEditingMessageId(msg.id);
                          setEditContent(msg.content);
                        }}
                        className="p-1.5 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="p-1.5 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      title="Copy"
                    >
                      {copiedMessageId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`px-1 text-xs text-muted-foreground ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(msg.created_at)}
                </div>
              </div>
            </div>
          ))}

          {isAiThinking && (
            <div className="flex items-start space-x-2 md:space-x-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <div className="max-w-[85%] md:max-w-[70%] flex flex-col items-start">
                <div className="px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-gradient-to-br from-blue-50/90 to-cyan-50/90 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={() => scrollToBottom(true)}
          className="fixed bottom-24 right-6 z-10 p-3 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
          title="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      <div className="border-t border-border/50 bg-card/90 backdrop-blur-xl p-3 md:p-4 flex-shrink-0 shadow-lg">
        <form
          onSubmit={handleSendMessage}
          className="flex space-x-2 md:space-x-3"
        >
          <div className="flex-1 relative group">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-background/80 backdrop-blur-sm border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:bg-background/90 hover:shadow-lg group-hover:border-primary/30"
              disabled={isSending}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="group relative px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center">
              {isSending ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              )}
            </div>
          </button>
        </form>
      </div>

      <style>{`
        .hover-glow:hover { box-shadow: 0 0 20px rgba(var(--primary), 0.3); }
        .typing-indicator { display: flex; align-items: center; justify-content: center; gap: 4px; height: 20px; }
        .typing-indicator span { width: 6px; height: 6px; border-radius: 50%; background-color: currentColor; opacity: 0.7; animation: typing-bounce 1.2s infinite ease-in-out; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-4px); } }
        @media (prefers-reduced-motion: reduce) { .animate-spin, .animate-pulse, .transition-all, .transition-opacity, .transition-transform, .typing-indicator span { animation: none !important; transition: none !important; } }
      `}</style>
    </div>
  );
}
