// "use client";

// import { useState } from "react";
// import { useSignOut } from "@nhost/react";
// import { ChatList } from "./ChatList";
// import { ChatWindow } from "./ChatWindow";

// export function ChatApp() {
//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const { signOut } = useSignOut();

//   return (
//     <div className="h-screen flex flex-col">
//       <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
//         <h1 className="text-xl font-semibold text-gray-900">AI Chatbot</h1>
//         <button
//           onClick={signOut}
//           className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
//         >
//           Sign Out
//         </button>
//       </header>

//       <div className="flex-1 flex">
//         <ChatList
//           selectedChatId={selectedChatId}
//           onSelectChat={setSelectedChatId}
//         />

//         {selectedChatId ? (
//           <ChatWindow chatId={selectedChatId} />
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useSignOut } from "@nhost/react";
// import { ChatList } from "./ChatList";
// import { ChatWindow } from "./ChatWindow";
// import { ThemeToggle } from "./ThemeToggle";
// import { LogOut, MessageCircle, Bot, Menu, ArrowLeft } from "lucide-react";

// export function ChatApp() {
//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const { signOut } = useSignOut();

//   const handleSelectChat = (chatId: string) => {
//     setSelectedChatId(chatId);
//     setShowSidebar(false); // Close sidebar on mobile when chat is selected
//   };

//   const handleBackToChats = () => {
//     setSelectedChatId(null);
//     setShowSidebar(true); // Show sidebar when going back on mobile
//   };

//   return (
//     <div className="h-screen flex flex-col bg-background">
//       <header className="bg-card border-b border-border px-4 py-3 flex justify-between items-center shadow-sm">
//         <div className="flex items-center space-x-3">
//           {selectedChatId ? (
//             <button
//               onClick={handleBackToChats}
//               className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowSidebar(!showSidebar)}
//               className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
//             >
//               <Menu className="h-5 w-5" />
//             </button>
//           )}
//           <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
//             <Bot className="h-5 w-5 text-primary" />
//           </div>
//           <h1 className="text-xl font-semibold text-foreground">AI Chatbot</h1>
//         </div>
//         <div className="flex items-center space-x-2 md:space-x-3">
//           <div className="hidden sm:block">
//             <ThemeToggle />
//           </div>
//           <button
//             onClick={signOut}
//             className="flex items-center space-x-2 px-2 md:px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
//           >
//             <LogOut className="h-4 w-4" />
//             <span className="hidden sm:inline">Sign Out</span>
//           </button>
//         </div>
//       </header>

//       <div className="flex-1 flex overflow-hidden relative">
//         {showSidebar && (
//           <div
//             className="fixed inset-0 bg-black/50 z-40 md:hidden"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         <div
//           className={`${
//             showSidebar ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0 fixed md:relative z-50 md:z-auto transition-transform duration-300 ease-in-out`}
//         >
//           <ChatList
//             selectedChatId={selectedChatId}
//             onSelectChat={handleSelectChat}
//           />
//         </div>

//         <div className="flex-1 flex flex-col md:ml-0">
//           {selectedChatId ? (
//             <ChatWindow chatId={selectedChatId} />
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-background p-4">
//               <div className="text-center space-y-4 max-w-md mx-auto">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
//                   <MessageCircle className="h-8 w-8 text-primary" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-foreground">
//                   Welcome to AI Chatbot
//                 </h2>
//                 <p className="text-muted-foreground text-sm md:text-base">
//                   <span className="md:hidden">
//                     Tap the menu to view your chats or create a new one to
//                     begin.
//                   </span>
//                   <span className="hidden md:inline">
//                     Select a chat from the sidebar to start a conversation, or
//                     create a new chat to begin.
//                   </span>
//                 </p>
//                 <button
//                   onClick={() => setShowSidebar(true)}
//                   className="md:hidden mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
//                 >
//                   View Chats
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="sm:hidden fixed bottom-4 right-4 z-30">
//         <div className="bg-card border border-border rounded-lg shadow-lg">
//           <ThemeToggle />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSignOut } from "@nhost/react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { ThemeToggle } from "./ThemeToggle";
import {
  LogOut,
  MessageCircle,
  Bot,
  Menu,
  X,
  Sparkles,
  Zap,
} from "lucide-react";

export function ChatApp() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { signOut } = useSignOut();

  console.log("[v0] ChatApp rendered, showSidebar:", showSidebar);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    console.log("[v0] Toggling sidebar from", showSidebar, "to", !showSidebar);
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-full blur-3xl animate-float animate-morphing-bg"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 rounded-full blur-3xl animate-float animate-morphing-bg"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <header className="relative z-50 bg-card/95 backdrop-blur-2xl border-b border-border/50 px-4 py-4 flex justify-between items-center shadow-2xl flex-shrink-0 animate-in slide-in-from-top duration-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="group relative p-3 hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/15 rounded-2xl transition-all duration-400 hover:scale-110 active:scale-95 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"></div>
            <div className="relative z-10">
              {showSidebar ? (
                <X className="h-6 w-6 transition-all duration-400 group-hover:rotate-180 group-hover:scale-110" />
              ) : (
                <Menu className="h-6 w-6 transition-all duration-400 group-hover:scale-125" />
              )}
            </div>
          </button>

          <div className="relative group">
            <div className="h-12 w-12 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-400 group-hover:shadow-3xl group-hover:scale-110 animate-glow">
              <Bot className="h-6 w-6 text-primary-foreground transition-transform duration-400 group-hover:rotate-12" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-400 blur-lg animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              AI Chatbot Pro
            </h1>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <Zap className="h-4 w-4 text-accent animate-bounce-gentle" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={signOut}
            className="group relative flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-red-500/15 hover:to-red-600/15 rounded-2xl transition-all duration-400 hover:scale-105 active:scale-95 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"></div>
            <div className="relative z-10 flex items-center space-x-2">
              <LogOut className="h-5 w-5 transition-transform duration-400 group-hover:-translate-x-1" />
              <span className="hidden sm:inline font-medium">Sign Out</span>
            </div>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative min-h-0">
        <div
          className={`relative z-40 transition-all duration-500 ease-out flex-shrink-0 overflow-hidden ${
            showSidebar ? "w-80" : "w-0"
          }`}
        >
          <div
            className={`h-full w-80 ${
              showSidebar ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <ChatList
              selectedChatId={selectedChatId}
              onSelectChat={handleSelectChat}
            />
          </div>
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-30 md:hidden transition-all duration-500 animate-in fade-in"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex-1 flex flex-col transition-all duration-500 min-w-0 relative">
          {selectedChatId ? (
            <ChatWindow chatId={selectedChatId} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background/50 via-background/30 to-accent/5 p-6 relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-float"></div>
                <div
                  className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-3xl animate-float"
                  style={{ animationDelay: "3s" }}
                ></div>
              </div>

              <div className="text-center space-y-8 max-w-lg mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="relative group">
                  <div className="h-24 w-24 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-2xl border border-primary/30 shadow-3xl transition-all duration-600 group-hover:scale-115 group-hover:shadow-4xl animate-float glass-morphism">
                    <MessageCircle className="h-12 w-12 text-primary transition-transform duration-600 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-bounce-gentle shadow-xl">
                    <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-600 blur-2xl"></div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                    Welcome to AI Chatbot Pro
                  </h2>
                  <p
                    className="text-muted-foreground text-lg leading-relaxed animate-in fade-in duration-1000 max-w-md mx-auto"
                    style={{ animationDelay: "600ms" }}
                  >
                    Experience the future of AI conversation with our
                    intelligent assistant. Create a new chat or select an
                    existing one to begin your journey.
                  </p>
                </div>

                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: "1000ms" }}
                >
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl hover:shadow-3xl transition-all duration-400 hover:scale-110 active:scale-95 font-bold text-lg overflow-hidden interactive-scale"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Explore Chats</span>
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
