// src/pages/ChatPage.tsx
import { useState, useEffect } from "react";
import ChatList from "../chat/ChatList.tsx";
import ChatWindow from "../chat/ChatWindow.tsx";
import MessageInput from "../chat/MessageInput.tsx";
import NewChatForm from "../chat/NewChatForm.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import type { Chat } from "../types/chat.ts";
import {
  getAllChats,
  getChatById,
  addMessage,
} from "../services/chatService.ts";

export default function ChatPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Cargar chats del usuario
  useEffect(() => {
    if (!user) return;
    const all = getAllChats();
    const userChats = all.filter((c) => c.members.includes(user.username));
    setChats(userChats);
  }, [user]);

  // seleccionar chat por id (string)
  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  // manejar envío (recibe chatId y texto)
  const handleSendMessage = (chatId: string, text: string) => {
    if (!user) return;
    addMessage(chatId, user.username, text);

    // refrescar estados
    const all = getAllChats();
    const userChats = all.filter((c) => c.members.includes(user.username));
    setChats(userChats);

    // si el chat que estamos viendo fue actualizado, lo dejamos seleccionado
    setSelectedChatId(chatId);
  };

  const refreshChats = () => {
    if (!user) return;
    const all = getAllChats();
    const userChats = all.filter((c) => c.members.includes(user.username));
    setChats(userChats);
  };

  if (!user) return <p>Cargando usuario...</p>;

  // obtener el chat seleccionado (comparación string === string)
  const selectedChat = selectedChatId
    ? chats.find((c) => c.id === selectedChatId) || null
    : null;

  return (
    <div className="flex h-[80vh] bg-gray-800 rounded-lg overflow-hidden">
      {/* Panel izquierdo */}
      <div className="w-1/3 border-r border-gray-700 p-4">
        <NewChatForm onChatCreated={refreshChats} />
        {/* IMPORTANTE: ChatList debe esperar onSelectChat: (id: string) => void */}
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatWindow chat={selectedChat} />
            <MessageInput
              chatId={selectedChat.id}
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center text-gray-400">
            Selecciona un chat para comenzar
          </div>
        )}
      </div>
    </div>
  );
}
