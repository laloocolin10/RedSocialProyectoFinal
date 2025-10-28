// src/pages/ChatPage.tsx
import { useState } from "react";
import ChatList from "../chat/ChatList";
import ChatWindow from "../chat/ChatWindow";
import MessageInput from "../chat/MessageInput";
import rawChats from "../data/chats.json";
import { useAuth } from "../contexts/AuthContext";
import type { Chat } from "../types/chat";

export default function ChatPage() {
  const { user } = useAuth();
  // casteo seguro del JSON a nuestro tipo
  const chatsData = rawChats as unknown as Chat[];

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const userChats = chatsData.filter((c) =>
    c.members.includes(user?.username ?? "")
  );

  const selectedChat = userChats.find((c) => c.id === selectedChatId) ?? null;

  return (
    <div className="flex h-[80vh] bg-gray-800 rounded-lg overflow-hidden">
      <div className="w-1/3 border-r border-gray-700">
        <ChatList
          chats={userChats}
          onSelectChat={(id: number) => setSelectedChatId(id)}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatWindow chat={selectedChat} />
            <MessageInput chatId={selectedChat.id} />
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
