import React from "react";

// 1. Define la "forma" de los datos que espera este componente
interface PostData {
  id: string;
  authorUsername: string;
  authorName: string;
  authorPic: string;
  text: string;
  timestamp: string;
}

// 2. Define las 'props'
interface PostProps {
  postData: PostData;
}

// Función simple para formatear la fecha
function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "a"; // Años
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m"; // Meses
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d"; // Días
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h"; // Horas
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " min"; // Minutos
  return Math.floor(seconds) + "s"; // Segundos
}

export default function Post({ postData }: PostProps) {
  // 3. Desestructura los datos del post para usarlos fácil
  const { authorName, authorUsername, authorPic, text, timestamp } = postData;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex space-x-4">
      {/* Columna de la foto de perfil */}
      <div>
        <img
          src={authorPic}
          alt={`${authorName}'s profile pic`}
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Columna del contenido del post */}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">{authorName}</span>
          <span className="text-gray-400">@{authorUsername}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400 text-sm">
            {formatTimeAgo(timestamp)}
          </span>
        </div>

        <p className="text-white mt-2">{text}</p>

        {/* Aquí podrías agregar botones de Like, Comentar, etc. */}
      </div>
    </div>
  );
}
