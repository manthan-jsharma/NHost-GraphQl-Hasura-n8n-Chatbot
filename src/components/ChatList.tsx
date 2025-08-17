// "use client";

// import type React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { useUserId } from "@nhost/react";
// import { GET_CHATS } from "../graphql/queries";
// import { CREATE_CHAT } from "../graphql/mutations";
// import { useState } from "react";
// import { PlusIcon } from "@heroicons/react/24/outline";

// interface Chat {
//   id: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   messages: Array<{
//     content: string;
//     role: string;
//   }>;
// }

// interface ChatListProps {
//   selectedChatId: string | null;
//   onSelectChat: (chatId: string) => void;
// }

// export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newChatTitle, setNewChatTitle] = useState("");
//   const userId = useUserId();

//   const { data, loading, refetch } = useQuery(GET_CHATS);
//   const [createChat] = useMutation(CREATE_CHAT);

//   const handleCreateChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newChatTitle.trim() || !userId) return;

//     try {
//       const result = await createChat({
//         variables: { title: newChatTitle, user_id: userId },
//       });

//       if (result.data?.insert_chats_one) {
//         onSelectChat(result.data.insert_chats_one.id);
//         setNewChatTitle("");
//         setIsCreating(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   if (loading) return <div className="p-4">Loading chats...</div>;

//   const chats: Chat[] = data?.chats || [];

//   return (
//     <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <button
//           onClick={() => setIsCreating(true)}
//           className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//         >
//           <PlusIcon className="w-4 h-4 mr-2" />
//           New Chat
//         </button>
//       </div>

//       {isCreating && (
//         <div className="p-4 border-b border-gray-200">
//           <form onSubmit={handleCreateChat}>
//             <input
//               type="text"
//               placeholder="Chat title"
//               value={newChatTitle}
//               onChange={(e) => setNewChatTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//               autoFocus
//             />
//             <div className="mt-2 flex space-x-2">
//               <button
//                 type="submit"
//                 className="px-3 py-1 bg-indigo-600 text-white text-sm rounded"
//               >
//                 Create
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewChatTitle("");
//                 }}
//                 className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             onClick={() => onSelectChat(chat.id)}
//             className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
//               selectedChatId === chat.id ? "bg-indigo-50 border-indigo-200" : ""
//             }`}
//           >
//             <h3 className="font-medium text-gray-900 truncate">{chat.title}</h3>
//             {chat.messages[0] && (
//               <p className="text-sm text-gray-500 truncate mt-1">
//                 {chat.messages[0].content}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import type React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { useUserId } from "@nhost/react";
// import { GET_CHATS } from "../graphql/queries";
// import {
//   CREATE_CHAT,
//   DELETE_CHAT,
//   UPDATE_CHAT_TITLE,
// } from "../graphql/mutations";
// import { useState } from "react";
// import {
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
//   CheckIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// interface Chat {
//   id: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   messages: Array<{
//     content: string;
//     role: string;
//   }>;
// }

// interface ChatListProps {
//   selectedChatId: string | null;
//   onSelectChat: (chatId: string) => void;
// }

// export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newChatTitle, setNewChatTitle] = useState("");
//   const [editingChatId, setEditingChatId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const userId = useUserId();

//   const { data, loading, refetch } = useQuery(GET_CHATS);
//   const [createChat] = useMutation(CREATE_CHAT);
//   const [deleteChat] = useMutation(DELETE_CHAT);
//   const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE);

//   const handleCreateChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newChatTitle.trim() || !userId) return;

//     try {
//       const result = await createChat({
//         variables: { title: newChatTitle, user_id: userId },
//       });

//       if (result.data?.insert_chats_one) {
//         onSelectChat(result.data.insert_chats_one.id);
//         setNewChatTitle("");
//         setIsCreating(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   const handleDeleteChat = async (chatId: string) => {
//     if (!confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await deleteChat({ variables: { id: chatId } });
//       if (selectedChatId === chatId) {
//         onSelectChat("");
//       }
//       refetch();
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   const handleStartEdit = (chatId: string, currentTitle: string) => {
//     setEditingChatId(chatId);
//     setEditTitle(currentTitle);
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim() || !editingChatId) return;

//     try {
//       await updateChatTitle({
//         variables: { id: editingChatId, title: editTitle.trim() },
//       });
//       setEditingChatId(null);
//       setEditTitle("");
//       refetch();
//     } catch (error) {
//       console.error("Error updating chat title:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingChatId(null);
//     setEditTitle("");
//   };

//   if (loading) return <div className="p-4">Loading chats...</div>;

//   const chats: Chat[] = data?.chats || [];

//   return (
//     <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <button
//           onClick={() => setIsCreating(true)}
//           className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//         >
//           <PlusIcon className="w-4 h-4 mr-2" />
//           New Chat
//         </button>
//       </div>

//       {isCreating && (
//         <div className="p-4 border-b border-gray-200">
//           <form onSubmit={handleCreateChat}>
//             <input
//               type="text"
//               placeholder="Chat title"
//               value={newChatTitle}
//               onChange={(e) => setNewChatTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//               autoFocus
//             />
//             <div className="mt-2 flex space-x-2">
//               <button
//                 type="submit"
//                 className="px-3 py-1 bg-indigo-600 text-white text-sm rounded"
//               >
//                 Create
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewChatTitle("");
//                 }}
//                 className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`group border-b border-gray-200 hover:bg-gray-50 ${
//               selectedChatId === chat.id ? "bg-indigo-50 border-indigo-200" : ""
//             }`}
//           >
//             {editingChatId === chat.id ? (
//               <div className="p-4">
//                 <input
//                   type="text"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                   className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
//                   autoFocus
//                 />
//                 <div className="mt-2 flex space-x-1">
//                   <button
//                     onClick={handleSaveEdit}
//                     className="p-1 text-green-600 hover:bg-green-100 rounded"
//                   >
//                     <CheckIcon className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={handleCancelEdit}
//                     className="p-1 text-gray-600 hover:bg-gray-100 rounded"
//                   >
//                     <XMarkIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center">
//                 <div
//                   onClick={() => onSelectChat(chat.id)}
//                   className="flex-1 p-4 cursor-pointer"
//                 >
//                   <h3 className="font-medium text-gray-900 truncate">
//                     {chat.title}
//                   </h3>
//                   {chat.messages[0] && (
//                     <p className="text-sm text-gray-500 truncate mt-1">
//                       {chat.messages[0].content}
//                     </p>
//                   )}
//                 </div>
//                 <div className="opacity-0 group-hover:opacity-100 flex space-x-1 pr-2 transition-opacity">
//                   <button
//                     onClick={() => handleStartEdit(chat.id, chat.title)}
//                     className="p-1 text-gray-600 hover:bg-gray-200 rounded"
//                   >
//                     <PencilIcon className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteChat(chat.id)}
//                     className="p-1 text-red-600 hover:bg-red-100 rounded"
//                   >
//                     <TrashIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// // }
// "use client";

// import type React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { useUserId } from "@nhost/react";
// import { GET_CHATS } from "../graphql/queries";
// import {
//   CREATE_CHAT,
//   DELETE_CHAT,
//   UPDATE_CHAT_TITLE,
// } from "../graphql/mutations";
// import { useState } from "react";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   Check,
//   X,
//   MessageCircle,
//   Loader2,
// } from "lucide-react";

// interface Chat {
//   id: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   messages: Array<{
//     content: string;
//     role: string;
//   }>;
// }

// interface ChatListProps {
//   selectedChatId: string | null;
//   onSelectChat: (chatId: string) => void;
// }

// export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newChatTitle, setNewChatTitle] = useState("");
//   const [editingChatId, setEditingChatId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const userId = useUserId();

//   const { data, loading, refetch } = useQuery(GET_CHATS);
//   const [createChat] = useMutation(CREATE_CHAT);
//   const [deleteChat] = useMutation(DELETE_CHAT);
//   const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE);

//   const handleCreateChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newChatTitle.trim() || !userId) return;

//     try {
//       const result = await createChat({
//         variables: { title: newChatTitle, user_id: userId },
//       });

//       if (result.data?.insert_chats_one) {
//         onSelectChat(result.data.insert_chats_one.id);
//         setNewChatTitle("");
//         setIsCreating(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   const handleDeleteChat = async (chatId: string) => {
//     if (!confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await deleteChat({ variables: { id: chatId } });
//       if (selectedChatId === chatId) {
//         onSelectChat("");
//       }
//       refetch();
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   const handleStartEdit = (chatId: string, currentTitle: string) => {
//     setEditingChatId(chatId);
//     setEditTitle(currentTitle);
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim() || !editingChatId) return;

//     try {
//       await updateChatTitle({
//         variables: { id: editingChatId, title: editTitle.trim() },
//       });
//       setEditingChatId(null);
//       setEditTitle("");
//       refetch();
//     } catch (error) {
//       console.error("Error updating chat title:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingChatId(null);
//     setEditTitle("");
//   };

//   const chats: Chat[] = data?.chats || [];

//   return (
//     <div className="w-80 sm:w-80 md:w-80 bg-card border-r border-border flex flex-col h-full">
//       <div className="p-3 md:p-4 border-b border-border">
//         <button
//           onClick={() => setIsCreating(true)}
//           className="w-full flex items-center justify-center px-3 md:px-4 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm text-sm md:text-base"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           New Chat
//         </button>
//       </div>

//       {isCreating && (
//         <div className="p-3 md:p-4 border-b border-border bg-muted/30 animate-in slide-in-from-top-2 duration-200">
//           <form onSubmit={handleCreateChat} className="space-y-3">
//             <input
//               type="text"
//               placeholder="Enter chat title..."
//               value={newChatTitle}
//               onChange={(e) => setNewChatTitle(e.target.value)}
//               className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
//               autoFocus
//             />
//             <div className="flex space-x-2">
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
//               >
//                 Create
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewChatTitle("");
//                 }}
//                 className="flex-1 px-3 py-2 bg-muted text-muted-foreground text-sm rounded-lg hover:bg-muted/80 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <div className="flex items-center justify-center p-6 md:p-8">
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               <span className="text-sm">Loading chats...</span>
//             </div>
//           </div>
//         ) : chats.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
//             <MessageCircle className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mb-3" />
//             <p className="text-sm text-muted-foreground">No chats yet</p>
//             <p className="text-xs text-muted-foreground/70 mt-1">
//               Create your first chat to get started
//             </p>
//           </div>
//         ) : (
//           chats.map((chat, index) => (
//             <div
//               key={chat.id}
//               className={`group border-b border-border hover:bg-muted/50 transition-all animate-in slide-in-from-left-2 duration-300 ${
//                 selectedChatId === chat.id
//                   ? "bg-muted border-l-4 border-l-primary"
//                   : ""
//               }`}
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               {editingChatId === chat.id ? (
//                 <div className="p-3 md:p-4 space-y-3">
//                   <input
//                     type="text"
//                     value={editTitle}
//                     onChange={(e) => setEditTitle(e.target.value)}
//                     className="w-full px-2 py-1 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
//                     autoFocus
//                   />
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={handleSaveEdit}
//                       className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-md transition-colors"
//                     >
//                       <Check className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <div
//                     onClick={() => onSelectChat(chat.id)}
//                     className="flex-1 p-3 md:p-4 cursor-pointer"
//                   >
//                     <h3 className="font-medium text-foreground truncate mb-1 text-sm md:text-base">
//                       {chat.title}
//                     </h3>
//                     {chat.messages[0] && (
//                       <p className="text-xs md:text-sm text-muted-foreground truncate">
//                         {chat.messages[0].content}
//                       </p>
//                     )}
//                     <p className="text-xs text-muted-foreground/70 mt-1">
//                       {new Date(chat.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 flex space-x-1 pr-2 md:pr-3 transition-opacity">
//                     <button
//                       onClick={() => handleStartEdit(chat.id, chat.title)}
//                       className="p-1.5 md:p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
//                       title="Edit chat title"
//                     >
//                       <Edit3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteChat(chat.id)}
//                       className="p-1.5 md:p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
//                       title="Delete chat"
//                     >
//                       <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// "use client";

// import type React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { useUserId } from "@nhost/react";
// import { GET_CHATS } from "../graphql/queries";
// import {
//   CREATE_CHAT,
//   DELETE_CHAT,
//   UPDATE_CHAT_TITLE,
// } from "../graphql/mutations";
// import { useState, useMemo } from "react";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   Check,
//   X,
//   MessageCircle,
//   Loader2,
//   Search,
//   Calendar,
//   Sparkles,
// } from "lucide-react";

// interface Chat {
//   id: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   messages: Array<{
//     content: string;
//     role: string;
//   }>;
// }

// interface ChatListProps {
//   selectedChatId: string | null;
//   onSelectChat: (chatId: string) => void;
// }

// export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newChatTitle, setNewChatTitle] = useState("");
//   const [editingChatId, setEditingChatId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const userId = useUserId();

//   const { data, loading, refetch } = useQuery(GET_CHATS);
//   const [createChat] = useMutation(CREATE_CHAT);
//   const [deleteChat] = useMutation(DELETE_CHAT);
//   const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE);

//   const chats: Chat[] = data?.chats || [];

//   // Filter and group chats
//   const { filteredChats, groupedChats } = useMemo(() => {
//     const filtered = chats.filter(
//       (chat) =>
//         chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         chat.messages.some((msg) =>
//           msg.content.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//     );

//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
//     const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

//     const grouped = {
//       today: [] as Chat[],
//       yesterday: [] as Chat[],
//       thisWeek: [] as Chat[],
//       older: [] as Chat[],
//     };

//     filtered.forEach((chat) => {
//       const chatDate = new Date(chat.created_at);
//       if (chatDate >= today) {
//         grouped.today.push(chat);
//       } else if (chatDate >= yesterday) {
//         grouped.yesterday.push(chat);
//       } else if (chatDate >= weekAgo) {
//         grouped.thisWeek.push(chat);
//       } else {
//         grouped.older.push(chat);
//       }
//     });

//     return { filteredChats: filtered, groupedChats: grouped };
//   }, [chats, searchQuery]);

//   const handleCreateChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newChatTitle.trim() || !userId) return;

//     try {
//       const result = await createChat({
//         variables: { title: newChatTitle, user_id: userId },
//       });

//       if (result.data?.insert_chats_one) {
//         onSelectChat(result.data.insert_chats_one.id);
//         setNewChatTitle("");
//         setIsCreating(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   const handleDeleteChat = async (chatId: string) => {
//     if (!confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await deleteChat({ variables: { id: chatId } });
//       if (selectedChatId === chatId) {
//         onSelectChat("");
//       }
//       refetch();
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   const handleStartEdit = (chatId: string, currentTitle: string) => {
//     setEditingChatId(chatId);
//     setEditTitle(currentTitle);
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim() || !editingChatId) return;

//     try {
//       await updateChatTitle({
//         variables: { id: editingChatId, title: editTitle.trim() },
//       });
//       setEditingChatId(null);
//       setEditTitle("");
//       refetch();
//     } catch (error) {
//       console.error("Error updating chat title:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingChatId(null);
//     setEditTitle("");
//   };

//   const renderChatGroup = (
//     title: string,
//     chats: Chat[],
//     icon: React.ReactNode
//   ) => {
//     if (chats.length === 0) return null;

//     return (
//       <div className="mb-4">
//         <div className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//           {icon}
//           <span>{title}</span>
//         </div>
//         {chats.map((chat, index) => (
//           <ChatItem
//             key={chat.id}
//             chat={chat}
//             index={index}
//             selectedChatId={selectedChatId}
//             editingChatId={editingChatId}
//             editTitle={editTitle}
//             onSelectChat={onSelectChat}
//             onStartEdit={handleStartEdit}
//             onSaveEdit={handleSaveEdit}
//             onCancelEdit={handleCancelEdit}
//             onDeleteChat={handleDeleteChat}
//             setEditTitle={setEditTitle}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="w-80 bg-sidebar-background border-r border-sidebar-border flex flex-col h-full backdrop-blur-xl">
//       {/* Header */}
//       <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
//         <button
//           onClick={() => setIsCreating(true)}
//           className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium group"
//         >
//           <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
//           New Chat
//         </button>
//       </div>

//       {/* Search */}
//       <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <input
//             type="text"
//             placeholder="Search chats..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-sidebar-accent/50 border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 focus:border-sidebar-primary transition-all duration-200"
//           />
//         </div>
//       </div>

//       {/* Create Chat Form */}
//       {isCreating && (
//         <div className="p-4 border-b border-sidebar-border/50 bg-sidebar-accent/30 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
//           <form onSubmit={handleCreateChat} className="space-y-3">
//             <input
//               type="text"
//               placeholder="Enter chat title..."
//               value={newChatTitle}
//               onChange={(e) => setNewChatTitle(e.target.value)}
//               className="w-full px-3 py-2.5 bg-sidebar-background border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 transition-all duration-200"
//               autoFocus
//             />
//             <div className="flex space-x-2">
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-2 bg-sidebar-primary text-sidebar-primary-foreground text-sm rounded-lg hover:bg-sidebar-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//               >
//                 Create
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewChatTitle("");
//                 }}
//                 className="flex-1 px-3 py-2 bg-sidebar-accent text-sidebar-accent-foreground text-sm rounded-lg hover:bg-sidebar-accent/80 transition-all duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent min-h-0">
//         {loading ? (
//           <div className="flex items-center justify-center p-8">
//             <div className="flex items-center space-x-3 text-muted-foreground">
//               <div className="relative">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 <div className="absolute inset-0 h-5 w-5 animate-ping rounded-full bg-sidebar-primary/20"></div>
//               </div>
//               <span className="text-sm font-medium">Loading chats...</span>
//             </div>
//           </div>
//         ) : filteredChats.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-8 text-center">
//             <div className="relative mb-4">
//               <div className="h-16 w-16 bg-gradient-to-br from-sidebar-primary/20 to-sidebar-accent/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-sidebar-primary/20">
//                 <MessageCircle className="h-8 w-8 text-sidebar-primary" />
//               </div>
//               <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-sidebar-primary animate-pulse" />
//             </div>
//             <p className="text-sm font-medium text-sidebar-foreground mb-1">
//               {searchQuery ? "No chats found" : "No chats yet"}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               {searchQuery
//                 ? "Try a different search term"
//                 : "Create your first chat to get started"}
//             </p>
//           </div>
//         ) : (
//           <div className="py-2">
//             {renderChatGroup(
//               "Today",
//               groupedChats.today,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "Yesterday",
//               groupedChats.yesterday,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "This Week",
//               groupedChats.thisWeek,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "Older",
//               groupedChats.older,
//               <Calendar className="h-3 w-3" />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Chat Item Component
// function ChatItem({
//   chat,
//   index,
//   selectedChatId,
//   editingChatId,
//   editTitle,
//   onSelectChat,
//   onStartEdit,
//   onSaveEdit,
//   onCancelEdit,
//   onDeleteChat,
//   setEditTitle,
// }: {
//   chat: Chat;
//   index: number;
//   selectedChatId: string | null;
//   editingChatId: string | null;
//   editTitle: string;
//   onSelectChat: (chatId: string) => void;
//   onStartEdit: (chatId: string, title: string) => void;
//   onSaveEdit: () => void;
//   onCancelEdit: () => void;
//   onDeleteChat: (chatId: string) => void;
//   setEditTitle: (title: string) => void;
// }) {
//   return (
//     <div
//       className={`group mx-2 mb-1 rounded-xl transition-all duration-300 chat-item-hover animate-in slide-in-from-left-2 relative overflow-hidden ${
//         selectedChatId === chat.id
//           ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent/30 border-2 border-sidebar-primary/50 shadow-lg shadow-sidebar-primary/20"
//           : "hover:bg-gradient-to-r hover:from-sidebar-accent/30 hover:to-sidebar-primary/10 border-2 border-transparent"
//       }`}
//       style={{ animationDelay: `${index * 50}ms` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/5 to-sidebar-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 floating-bg"></div>

//       {editingChatId === chat.id ? (
//         <div className="p-3 space-y-3 relative z-10">
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="w-full px-3 py-2 text-sm bg-sidebar-background/80 backdrop-blur-sm border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 transition-all duration-300 focus:shadow-lg hover-glow"
//             autoFocus
//           />
//           <div className="flex space-x-2">
//             <button
//               onClick={onSaveEdit}
//               className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover-glow"
//             >
//               <Check className="w-4 h-4" />
//             </button>
//             <button
//               onClick={onCancelEdit}
//               className="p-2 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex items-center relative z-10">
//           <div
//             onClick={() => onSelectChat(chat.id)}
//             className="flex-1 p-3 cursor-pointer"
//           >
//             <h3 className="font-medium text-sidebar-foreground truncate mb-1 text-sm group-hover:bg-gradient-to-r group-hover:from-sidebar-primary group-hover:to-sidebar-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
//               {chat.title}
//             </h3>
//             {chat.messages[0] && (
//               /* Fixed overflow with proper truncation and added color coding */
//               <p className="text-xs text-muted-foreground truncate leading-relaxed max-w-full overflow-hidden text-ellipsis whitespace-nowrap pr-2">
//                 <span
//                   className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                     chat.messages[0].role === "user"
//                       ? "bg-gradient-to-r from-green-400 to-emerald-500"
//                       : "bg-gradient-to-r from-blue-400 to-cyan-500"
//                   }`}
//                 ></span>
//                 {chat.messages[0].content}
//               </p>
//             )}
//             <p className="text-xs text-muted-foreground/70 mt-1.5 group-hover:text-sidebar-primary/70 transition-colors duration-300">
//               {new Date(chat.created_at).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="opacity-0 group-hover:opacity-100 flex space-x-1 pr-2 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//             <button
//               onClick={() => onStartEdit(chat.id, chat.title)}
//               className="p-2 text-muted-foreground hover:text-sidebar-primary hover:bg-sidebar-primary/20 rounded-lg transition-all duration-300 hover:scale-110 hover-glow"
//               title="Edit chat title"
//             >
//               <Edit3 className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => onDeleteChat(chat.id)}
//               className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover-glow"
//               title="Delete chat"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import type React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { useUserId } from "@nhost/react";
// import { GET_CHATS } from "../graphql/queries";
// import {
//   CREATE_CHAT,
//   DELETE_CHAT,
//   UPDATE_CHAT_TITLE,
// } from "../graphql/mutations";
// import { useState, useMemo } from "react";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   Check,
//   X,
//   MessageCircle,
//   Loader2,
//   Search,
//   Calendar,
//   Sparkles,
// } from "lucide-react";

// interface Chat {
//   id: string;
//   title: string;
//   created_at: string;
//   updated_at: string;
//   messages: Array<{
//     content: string;
//     role: string;
//   }>;
// }

// interface ChatListProps {
//   selectedChatId: string | null;
//   onSelectChat: (chatId: string) => void;
// }

// export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newChatTitle, setNewChatTitle] = useState("");
//   const [editingChatId, setEditingChatId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const userId = useUserId();

//   const { data, loading, refetch } = useQuery(GET_CHATS);
//   const [createChat] = useMutation(CREATE_CHAT);
//   const [deleteChat] = useMutation(DELETE_CHAT);
//   const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE);

//   const chats: Chat[] = data?.chats || [];

//   // Filter and group chats
//   const { filteredChats, groupedChats } = useMemo(() => {
//     const filtered = chats.filter(
//       (chat) =>
//         chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         chat.messages.some((msg) =>
//           msg.content.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//     );

//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
//     const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

//     const grouped = {
//       today: [] as Chat[],
//       yesterday: [] as Chat[],
//       thisWeek: [] as Chat[],
//       older: [] as Chat[],
//     };

//     filtered.forEach((chat) => {
//       const chatDate = new Date(chat.created_at);
//       if (chatDate >= today) {
//         grouped.today.push(chat);
//       } else if (chatDate >= yesterday) {
//         grouped.yesterday.push(chat);
//       } else if (chatDate >= weekAgo) {
//         grouped.thisWeek.push(chat);
//       } else {
//         grouped.older.push(chat);
//       }
//     });

//     return { filteredChats: filtered, groupedChats: grouped };
//   }, [chats, searchQuery]);

//   const handleCreateChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newChatTitle.trim() || !userId) return;

//     try {
//       const result = await createChat({
//         variables: { title: newChatTitle, user_id: userId },
//       });

//       if (result.data?.insert_chats_one) {
//         onSelectChat(result.data.insert_chats_one.id);
//         setNewChatTitle("");
//         setIsCreating(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   const handleDeleteChat = async (chatId: string) => {
//     if (!confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await deleteChat({ variables: { id: chatId } });
//       if (selectedChatId === chatId) {
//         onSelectChat("");
//       }
//       refetch();
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   const handleStartEdit = (chatId: string, currentTitle: string) => {
//     setEditingChatId(chatId);
//     setEditTitle(currentTitle);
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim() || !editingChatId) return;

//     try {
//       await updateChatTitle({
//         variables: { id: editingChatId, title: editTitle.trim() },
//       });
//       setEditingChatId(null);
//       setEditTitle("");
//       refetch();
//     } catch (error) {
//       console.error("Error updating chat title:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingChatId(null);
//     setEditTitle("");
//   };

//   const renderChatGroup = (
//     title: string,
//     chats: Chat[],
//     icon: React.ReactNode
//   ) => {
//     if (chats.length === 0) return null;

//     return (
//       <div className="mb-4">
//         <div className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//           {icon}
//           <span>{title}</span>
//         </div>
//         {chats.map((chat, index) => (
//           <ChatItem
//             key={chat.id}
//             chat={chat}
//             index={index}
//             selectedChatId={selectedChatId}
//             editingChatId={editingChatId}
//             editTitle={editTitle}
//             onSelectChat={onSelectChat}
//             onStartEdit={handleStartEdit}
//             onSaveEdit={handleSaveEdit}
//             onCancelEdit={handleCancelEdit}
//             onDeleteChat={handleDeleteChat}
//             setEditTitle={setEditTitle}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="w-80 bg-sidebar-background border-r border-sidebar-border flex flex-col h-full backdrop-blur-xl">
//       {/* Header */}
//       <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
//         <button
//           onClick={() => setIsCreating(true)}
//           className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium group"
//         >
//           <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
//           New Chat
//         </button>
//       </div>

//       {/* Search */}
//       <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <input
//             type="text"
//             placeholder="Search chats..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-sidebar-accent/50 border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 focus:border-sidebar-primary transition-all duration-200"
//           />
//         </div>
//       </div>

//       {/* Create Chat Form */}
//       {isCreating && (
//         <div className="p-4 border-b border-sidebar-border/50 bg-sidebar-accent/30 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
//           <form onSubmit={handleCreateChat} className="space-y-3">
//             <input
//               type="text"
//               placeholder="Enter chat title..."
//               value={newChatTitle}
//               onChange={(e) => setNewChatTitle(e.target.value)}
//               className="w-full px-3 py-2.5 bg-sidebar-background border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 transition-all duration-200"
//               autoFocus
//             />
//             <div className="flex space-x-2">
//               <button
//                 type="submit"
//                 className="flex-1 px-3 py-2 bg-sidebar-primary text-sidebar-primary-foreground text-sm rounded-lg hover:bg-sidebar-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
//               >
//                 Create
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewChatTitle("");
//                 }}
//                 className="flex-1 px-3 py-2 bg-sidebar-accent text-sidebar-accent-foreground text-sm rounded-lg hover:bg-sidebar-accent/80 transition-all duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent min-h-0">
//         {loading ? (
//           <div className="flex items-center justify-center p-8">
//             <div className="flex items-center space-x-3 text-muted-foreground">
//               <div className="relative">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 <div className="absolute inset-0 h-5 w-5 animate-ping rounded-full bg-sidebar-primary/20"></div>
//               </div>
//               <span className="text-sm font-medium">Loading chats...</span>
//             </div>
//           </div>
//         ) : filteredChats.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-8 text-center">
//             <div className="relative mb-4">
//               <div className="h-16 w-16 bg-gradient-to-br from-sidebar-primary/20 to-sidebar-accent/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-sidebar-primary/20">
//                 <MessageCircle className="h-8 w-8 text-sidebar-primary" />
//               </div>
//               <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-sidebar-primary animate-pulse" />
//             </div>
//             <p className="text-sm font-medium text-sidebar-foreground mb-1">
//               {searchQuery ? "No chats found" : "No chats yet"}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               {searchQuery
//                 ? "Try a different search term"
//                 : "Create your first chat to get started"}
//             </p>
//           </div>
//         ) : (
//           <div className="py-2">
//             {renderChatGroup(
//               "Today",
//               groupedChats.today,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "Yesterday",
//               groupedChats.yesterday,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "This Week",
//               groupedChats.thisWeek,
//               <Calendar className="h-3 w-3" />
//             )}
//             {renderChatGroup(
//               "Older",
//               groupedChats.older,
//               <Calendar className="h-3 w-3" />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Chat Item Component
// function ChatItem({
//   chat,
//   index,
//   selectedChatId,
//   editingChatId,
//   editTitle,
//   onSelectChat,
//   onStartEdit,
//   onSaveEdit,
//   onCancelEdit,
//   onDeleteChat,
//   setEditTitle,
// }: {
//   chat: Chat;
//   index: number;
//   selectedChatId: string | null;
//   editingChatId: string | null;
//   editTitle: string;
//   onSelectChat: (chatId: string) => void;
//   onStartEdit: (chatId: string, title: string) => void;
//   onSaveEdit: () => void;
//   onCancelEdit: () => void;
//   onDeleteChat: (chatId: string) => void;
//   setEditTitle: (title: string) => void;
// }) {
//   return (
//     <div
//       className={`group mx-2 mb-1 rounded-xl transition-all duration-300 chat-item-hover animate-in slide-in-from-left-2 relative overflow-hidden ${
//         selectedChatId === chat.id
//           ? "bg-gradient-to-r from-sidebar-primary/20 to-sidebar-accent/30 border-2 border-sidebar-primary/50 shadow-lg shadow-sidebar-primary/20"
//           : "hover:bg-gradient-to-r hover:from-sidebar-accent/30 hover:to-sidebar-primary/10 border-2 border-transparent"
//       }`}
//       style={{ animationDelay: `${index * 50}ms` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-sidebar-primary/5 to-sidebar-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 floating-bg"></div>

//       {editingChatId === chat.id ? (
//         <div className="p-3 space-y-3 relative z-10">
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="w-full px-3 py-2 text-sm bg-sidebar-background/80 backdrop-blur-sm border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebar-primary/50 transition-all duration-300 focus:shadow-lg hover-glow"
//             autoFocus
//           />
//           <div className="flex space-x-2">
//             <button
//               onClick={onSaveEdit}
//               className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover-glow"
//             >
//               <Check className="w-4 h-4" />
//             </button>
//             <button
//               onClick={onCancelEdit}
//               className="p-2 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 rounded-lg transition-all duration-300 hover:scale-110"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex items-center relative z-10 min-h-0">
//           <div
//             onClick={() => onSelectChat(chat.id)}
//             className="flex-1 p-3 cursor-pointer min-w-0 pr-16"
//           >
//             <h3 className="font-medium text-sidebar-foreground truncate mb-1 text-sm group-hover:text-sidebar-primary transition-colors duration-300">
//               {chat.title}
//             </h3>
//             {chat.messages[0] && (
//               /* Fixed message preview overflow with better truncation */
//               <p className="text-xs text-muted-foreground leading-relaxed max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
//                 <span
//                   className={`inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
//                     chat.messages[0].role === "user"
//                       ? "bg-gradient-to-r from-green-400 to-emerald-500"
//                       : "bg-gradient-to-r from-blue-400 to-cyan-500"
//                   }`}
//                 ></span>
//                 <span className="truncate">{chat.messages[0].content}</span>
//               </p>
//             )}
//             <p className="text-xs text-muted-foreground/70 mt-1.5 group-hover:text-sidebar-primary/70 transition-colors duration-300">
//               {new Date(chat.created_at).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-1 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-sidebar-background/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-sidebar-border/50">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onStartEdit(chat.id, chat.title);
//               }}
//               className="p-1.5 text-muted-foreground hover:text-sidebar-primary hover:bg-sidebar-primary/20 rounded-md transition-all duration-300 hover:scale-110 hover-glow"
//               title="Edit chat title"
//             >
//               <Edit3 className="w-3.5 h-3.5" />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDeleteChat(chat.id);
//               }}
//               className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-500/20 rounded-md transition-all duration-300 hover:scale-110 hover-glow"
//               title="Delete chat"
//             >
//               <Trash2 className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import type React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { GET_CHATS } from "../graphql/queries";
import {
  CREATE_CHAT,
  DELETE_CHAT,
  UPDATE_CHAT_TITLE,
} from "../graphql/mutations";
import { useState, useMemo } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  MessageCircle,
  Loader2,
  Search,
  Calendar,
  Sparkles,
} from "lucide-react";

interface Chat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Array<{
    content: string;
    role: string;
  }>;
}

interface ChatListProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const userId = useUserId();

  const { data, loading, refetch } = useQuery(GET_CHATS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [deleteChat] = useMutation(DELETE_CHAT);
  const [updateChatTitle] = useMutation(UPDATE_CHAT_TITLE);

  const chats: Chat[] = data?.chats || [];

  // Filter and group chats
  const { filteredChats, groupedChats } = useMemo(() => {
    const filtered = chats.filter(
      (chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some((msg) =>
          msg.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const grouped = {
      today: [] as Chat[],
      yesterday: [] as Chat[],
      thisWeek: [] as Chat[],
      older: [] as Chat[],
    };

    filtered.forEach((chat) => {
      const chatDate = new Date(chat.created_at);
      if (chatDate >= today) {
        grouped.today.push(chat);
      } else if (chatDate >= yesterday) {
        grouped.yesterday.push(chat);
      } else if (chatDate >= weekAgo) {
        grouped.thisWeek.push(chat);
      } else {
        grouped.older.push(chat);
      }
    });

    return { filteredChats: filtered, groupedChats: grouped };
  }, [chats, searchQuery]);

  const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatTitle.trim() || !userId) return;

    try {
      const result = await createChat({
        variables: { title: newChatTitle, user_id: userId },
      });

      if (result.data?.insert_chats_one) {
        onSelectChat(result.data.insert_chats_one.id);
        setNewChatTitle("");
        setIsCreating(false);
        refetch();
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;

    try {
      await deleteChat({ variables: { id: chatId } });
      if (selectedChatId === chatId) {
        onSelectChat("");
      }
      refetch();
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editingChatId) return;

    try {
      await updateChatTitle({
        variables: { id: editingChatId, title: editTitle.trim() },
      });
      setEditingChatId(null);
      setEditTitle("");
      refetch();
    } catch (error) {
      console.error("Error updating chat title:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const renderChatGroup = (
    title: string,
    chats: Chat[],
    icon: React.ReactNode
  ) => {
    if (chats.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {icon}
          <span>{title}</span>
        </div>
        {chats.map((chat, index) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            index={index}
            selectedChatId={selectedChatId}
            editingChatId={editingChatId}
            editTitle={editTitle}
            onSelectChat={onSelectChat}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDeleteChat={handleDeleteChat}
            setEditTitle={setEditTitle}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-80 bg-sidebar-background border-r border-sidebar-border flex flex-col h-full backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
        <button
          onClick={() => setIsCreating(true)}
          className="w-full relative group flex items-center justify-center px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium overflow-hidden transform hover:-translate-y-0.5"
        >
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

          {/* Floating particles effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-2 left-6 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-100" />
            <div className="absolute top-4 right-8 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-3 left-12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-500" />
          </div>

          <Plus className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300 z-10 relative" />
          <span className="relative z-10">New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-sidebar-border/50 flex-shrink-0">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-cyan-500 transition-all duration-300 group-hover:scale-110" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-sidebar-accent/50 border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 hover:bg-sidebar-accent/70 hover:shadow-xl hover:shadow-cyan-500/10 focus:shadow-xl focus:shadow-cyan-500/20 hover:border-cyan-300/50"
          />
          {/* Animated search glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Create Chat Form */}
      {isCreating && (
        <div className="p-4 border-b border-sidebar-border/50 bg-gradient-to-br from-sidebar-accent/30 to-sidebar-primary/10 animate-in slide-in-from-top-2 duration-300 flex-shrink-0 backdrop-blur-sm">
          <form onSubmit={handleCreateChat} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter chat title..."
                value={newChatTitle}
                onChange={(e) => setNewChatTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-sidebar-background/80 backdrop-blur-sm border border-sidebar-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 focus:shadow-xl focus:shadow-emerald-500/20"
                autoFocus
              />
              {/* Input glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 relative group px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30 font-medium overflow-hidden"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative z-10">Create</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setNewChatTitle("");
                }}
                className="flex-1 relative group px-3 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-gray-500/30 font-medium overflow-hidden"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative z-10">Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent min-h-0">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <div className="relative">
                <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />
                <div className="absolute inset-0 h-5 w-5 animate-ping rounded-full bg-cyan-500/30"></div>
              </div>
              <span className="text-sm font-medium">Loading chats...</span>
            </div>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-violet-400/20 shadow-xl shadow-violet-500/10">
                <MessageCircle className="h-8 w-8 text-violet-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-400 animate-pulse" />
              {/* Floating sparkles */}
              <div className="absolute -top-2 -left-2 h-2 w-2 bg-pink-400 rounded-full animate-bounce delay-300" />
              <div className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce delay-700" />
            </div>
            <p className="text-sm font-medium text-sidebar-foreground mb-1">
              {searchQuery ? "No chats found" : "No chats yet"}
            </p>
            <p className="text-xs text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Create your first chat to get started"}
            </p>
          </div>
        ) : (
          <div className="py-2">
            {renderChatGroup(
              "Today",
              groupedChats.today,
              <Calendar className="h-3 w-3 text-emerald-500" />
            )}
            {renderChatGroup(
              "Yesterday",
              groupedChats.yesterday,
              <Calendar className="h-3 w-3 text-amber-500" />
            )}
            {renderChatGroup(
              "This Week",
              groupedChats.thisWeek,
              <Calendar className="h-3 w-3 text-violet-500" />
            )}
            {renderChatGroup(
              "Older",
              groupedChats.older,
              <Calendar className="h-3 w-3 text-gray-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Chat Item Component
function ChatItem({
  chat,
  index,
  selectedChatId,
  editingChatId,
  editTitle,
  onSelectChat,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteChat,
  setEditTitle,
}: {
  chat: Chat;
  index: number;
  selectedChatId: string | null;
  editingChatId: string | null;
  editTitle: string;
  onSelectChat: (chatId: string) => void;
  onStartEdit: (chatId: string, title: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteChat: (chatId: string) => void;
  setEditTitle: (title: string) => void;
}) {
  return (
    <div
      className={`group mx-2 mb-1 rounded-xl transition-all duration-300 chat-item-hover animate-in slide-in-from-left-2 relative overflow-hidden ${
        selectedChatId === chat.id
          ? "bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-cyan-500/20 border-2 border-violet-400/50 shadow-xl shadow-violet-500/20"
          : "hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:via-violet-500/10 hover:to-cyan-500/10 border-2 border-transparent hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/10"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Enhanced floating background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 floating-bg"></div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

      {editingChatId === chat.id ? (
        <div className="p-3 space-y-3 relative z-10">
          <div className="relative">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-sidebar-background/90 backdrop-blur-sm border border-sidebar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 focus:shadow-xl hover-glow hover:shadow-blue-500/20"
              autoFocus
            />
            {/* Input focus glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onSaveEdit}
              className="group/btn p-2.5 text-emerald-400 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 rounded-lg transition-all duration-300 hover:scale-110 hover-glow hover:shadow-lg hover:shadow-emerald-500/30 relative overflow-hidden"
            >
              {/* Button shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <Check className="w-4 h-4 relative z-10" />
            </button>
            <button
              onClick={onCancelEdit}
              className="group/btn p-2.5 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 rounded-lg transition-all duration-300 hover:scale-110 relative overflow-hidden hover:shadow-lg hover:shadow-gray-500/30"
            >
              {/* Button shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <X className="w-4 h-4 relative z-10" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center relative z-10 min-h-0">
          <div
            onClick={() => onSelectChat(chat.id)}
            className="flex-1 p-3 cursor-pointer min-w-0 pr-20 group/content"
          >
            <h3 className="font-medium text-sidebar-foreground truncate mb-1 text-sm group-hover:text-violet-400 transition-colors duration-300 relative z-20">
              {chat.title}
            </h3>
            {chat.messages[0] && (
              <p className="text-xs text-muted-foreground leading-relaxed max-w-full overflow-hidden text-ellipsis whitespace-nowrap relative z-20">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 transition-all duration-300 ${
                    chat.messages[0].role === "user"
                      ? "bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:shadow-lg group-hover:shadow-emerald-400/50"
                      : "bg-gradient-to-r from-blue-400 to-cyan-500 group-hover:shadow-lg group-hover:shadow-blue-400/50"
                  } group-hover:scale-125`}
                ></span>
                <span className="truncate group-hover/content:text-violet-300 transition-colors duration-300">
                  {chat.messages[0].content}
                </span>
              </p>
            )}
            <p className="text-xs text-muted-foreground/70 mt-1.5 group-hover:text-violet-400/70 transition-colors duration-300 relative z-20">
              {new Date(chat.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-1 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 bg-sidebar-background/95 backdrop-blur-md rounded-lg p-1.5 shadow-xl border border-sidebar-border/80 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit(chat.id, chat.title);
              }}
              className="group/edit p-2 text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 rounded-md transition-all duration-300 hover:scale-110 hover-glow relative overflow-hidden hover:shadow-lg hover:shadow-blue-500/30"
              title="Edit chat title"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/edit:translate-x-full transition-transform duration-500" />
              <Edit3 className="w-4 h-4 relative z-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="group/delete p-2 text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-md transition-all duration-300 hover:scale-110 hover-glow relative overflow-hidden hover:shadow-lg hover:shadow-red-500/30"
              title="Delete chat"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/delete:translate-x-full transition-transform duration-500" />
              <Trash2 className="w-4 h-4 relative z-10" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
