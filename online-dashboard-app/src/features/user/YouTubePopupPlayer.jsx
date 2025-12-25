import { useState } from "react";
import { FaPlay, FaTimes, FaWindowMinimize, FaExpand } from "react-icons/fa";

function YouTubePopupPlayer({ videoUrl, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMini, setIsMini] = useState(false);

  // Extract YouTube ID
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  return (
    <>
      {/* Play Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMini(false);
        }}
        className="absolute bottom-[-24px] right-0 transform -translate-x-1/2"
      >
        <div className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-white to-gray-100 shadow-lg hover:shadow-[0_0_25px_10px_rgba(255,0,102,0.5)] hover:from-pink-100 hover:to-purple-200 transition-all duration-500 ease-in-out">
          <div className="absolute w-full h-full rounded-full bg-pink-400 opacity-20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
          <FaPlay className="relative text-violet-600 text-2xl group-hover:text-black transition duration-300" />
        </div>
      </button>

      {/* Video Popup */}
      {videoId && isOpen && (
        <>
          {/* Dim / Blur background */}
          {!isMini && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => {
                setIsOpen(false);
                setIsMini(false);
              }}
            />
          )}

          <div
            className={`fixed transition-all duration-500 ease-in-out z-50 shadow-xl rounded-lg
            ${isMini ? "bottom-4 right-4 w-72" : "inset-0 flex items-center justify-center p-4"}
            `}
          >
            <div
              className={`flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ${
                isMini ? "w-72" : "w-full max-w-3xl"
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {title}
                </span>
                <div className="flex gap-2">
                  {isMini ? (
                    <button
                      onClick={() => setIsMini(false)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-1 rounded"
                    >
                      <FaExpand />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsMini(true)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-1 rounded"
                    >
                      <FaWindowMinimize />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsMini(false);
                      setIsOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Video */}
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default YouTubePopupPlayer;
