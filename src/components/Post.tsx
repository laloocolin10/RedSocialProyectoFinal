import React, { useState } from "react";

// --- (Los Iconos SVG y la función formatTimeAgo van aquí... son iguales que antes) ---
const CommentIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <g>
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.488c4.42 0 8.005 3.58 8.005 8s-3.585 8-8.005 8h-4.488C5.335 18 1.751 14.42 1.751 10zm8.005-6c-3.317 0-6.005 2.683-6.005 6s2.688 6 6.005 6h4.488c3.317 0 6.005-2.683 6.005-6s-2.688-6-6.005-6H9.756z"></path>
    </g>
  </svg>
);
const RetweetIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
    <g>
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L2 5.38V16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5.197L4.5 3.88zM6 7h14v10H6V7zm12 12v2h-2v-2h2zm-4 0v2h-2v-2h2zm-4 0v2h-2v-2h2z"></path>
    </g>
  </svg>
);
const LikeIcon = ({ isLiked }: { isLiked: boolean }) =>
  isLiked ? (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-5 h-5 fill-current text-red-500"
    >
      <g>
        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 4.234 1.465 5.094 3.419C13.23 4.19 15.176 2.724 17.466 2.724c2.878 0 5.403 2.69 5.403 5.754 0 6.376-7.454 13.11-10.036 13.158H12z"></path>
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
      <g>
        <path d="M12.01 18.638C6.103 15.21 2 11.23 2 7.478c0-2.17 1.835-3.754 3.99-3.754 1.51 0 2.91.85 3.647 2.146.737-1.296 2.137-2.146 3.647-2.146 2.155 0 3.99 1.583 3.99 3.754 0 3.75-4.104 7.73-10.01 11.16zM6 5.724c-1.07 0-1.99.78-1.99 1.754 0 2.19 2.784 5.05 8.01 8.64 5.227-3.59 8.01-6.45 8.01-8.64 0-.973-.92-1.754-1.99-1.754-1.296 0-2.43.9-2.885 2.126h-2.25C10.43 6.625 9.297 5.726 8 5.726z"></path>
      </g>
    </svg>
  );

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "a";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " min";
  return Math.floor(seconds) + "s";
}

interface PostData {
  id: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorPic: string;
  text: string;
  timestamp: string;
}

interface PostProps {
  postData: PostData;
  currentUserId: string;
  onDeletePost: (id: string) => void;
  onUpdatePost: (id: string, newText: string) => void;
}

export default function Post({
  postData,
  currentUserId,
  onDeletePost,
  onUpdatePost,
}: PostProps) {
  const {
    id,
    authorId,
    authorName,
    authorUsername,
    authorPic,
    text,
    timestamp,
  } = postData;
  const canEdit = currentUserId === authorId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50));

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro?")) onDeletePost(id);
  };
  const handleSave = () => {
    if (!editedText.trim()) return;
    onUpdatePost(id, editedText);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="p-4 flex space-x-4 border-b border-gray-700">
      {/* Columna de Avatar (no se encoge) */}     {" "}
      <div className="flex-shrink-0">
               {" "}
        <img
          src={authorPic}
          alt={`${authorName}'s profile pic`}
          className="w-12 h-12 rounded-full"
        />
             {" "}
      </div>
      {/* Columna de Contenido (ocupa el resto y se puede encoger) */}     {" "}
      <div className="flex-1 min-w-0">
        {" "}
        {/* <-- ¡min-w-0 ARREGLA EL OVERFLOW! */}       {" "}
        <div className="flex justify-between items-start">
          {/* Info de usuario (se encoge y trunca el texto) */}         {" "}
          <div className="flex items-baseline space-x-2 flex-shrink min-w-0">
                       {" "}
            <span className="font-bold text-white truncate">{authorName}</span> 
                     {" "}
            <span className="text-gray-400 truncate">@{authorUsername}</span>   
                    <span className="text-gray-500">·</span>           {" "}
            <span className="text-gray-400 text-sm flex-shrink-0">
              {formatTimeAgo(timestamp)}
            </span>
                     {" "}
          </div>
          {/* Botones de Editar/Eliminar (no se encogen) */}
          {canEdit && (
            <div className="flex space-x-2 flex-shrink-0 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-500 p-1 rounded-full text-xs"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 p-1 rounded-full text-xs"
              >
                Eliminar
              </button>
            </div>
          )}
                 {" "}
        </div>
        {/* Cuerpo del Post */}
        {isEditing ? (
          <div>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full mt-2 px-3 py-2 bg-gray-700 rounded-md text-white"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white font-semibold py-1 px-3 rounded-full text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white font-semibold py-1 px-3 rounded-full text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white mt-2 whitespace-pre-wrap break-words">
            {text}
          </p>
        )}
                {/* Botones de Interacción */}
        <div className="flex justify-between max-w-sm mt-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 -ml-2 p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-20 transition-colors duration-200">
            <CommentIcon />
            <span className="text-sm">{Math.floor(Math.random() * 10)}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 -ml-2 p-2 rounded-full hover:bg-green-900 hover:bg-opacity-20 transition-colors duration-200">
            <RetweetIcon />
            <span className="text-sm">{Math.floor(Math.random() * 20)}</span>
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 -ml-2 p-2 rounded-full hover:bg-red-900 hover:bg-opacity-20 transition-colors duration-200`}
          >
            <LikeIcon isLiked={isLiked} />
            <span className="text-sm">{likeCount}</span>
          </button>
        </div>
             {" "}
      </div>
    </article>
  );
}
