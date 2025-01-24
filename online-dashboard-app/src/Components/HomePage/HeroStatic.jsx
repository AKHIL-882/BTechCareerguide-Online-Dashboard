import React from "react";

function HeroStatic() {
  return (
    <div className="rounded-lg p-5 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-32">
        {/* Card 1 */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-red-600"
            >
              <path d="M19.615 3.184C21.021 3.537 22 4.813 22 6.267v11.466c0 1.455-.979 2.73-2.385 3.083C17.382 21.5 12 21.5 12 21.5s-5.382 0-7.615-.684C2.979 20.463 2 19.188 2 17.733V6.267c0-1.455.979-2.73 2.385-3.083C6.618 2.5 12 2.5 12 2.5s5.382 0 7.615.684zM10 15.5l6-3.5-6-3.5v7z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold">Youtube</p>
            <p className="text-sm text-gray-500">2.5K+ Subscribers</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-blue-500"
            >
              <path d="M21.732 4.863L3.492 11.254c-.664.24-.668 1.154-.011 1.407l4.74 1.853 2.371 6.377c.234.622.998.628 1.271.01l1.983-4.621 4.324 4.004c.522.482 1.433.26 1.649-.431L22 5.982c.27-.89-.554-1.633-1.268-1.119l-11.24 6.416 7.24-2.37c.38-.124.69-.45.618-.92-.071-.472-.488-.73-.864-.606l-9.938 3.188c-.378.121-.729.566-.609 1.051l.005.021z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold">Telegram</p>
            <p className="text-sm text-gray-500">600+ Follwers</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-green-500"
            >
              <path d="M12.001 2.002c-5.512 0-9.994 4.481-9.994 9.994 0 1.761.463 3.476 1.36 4.987l-1.48 5.424 5.596-1.462c1.46.765 3.086 1.155 4.83 1.155 5.512 0 9.994-4.481 9.994-9.994-.003-5.512-4.485-9.994-9.996-9.994zm0 17.484c-1.538 0-3.021-.417-4.304-1.205l-.308-.184-3.317.865.887-3.252-.198-.31C3.826 13.791 3.4 12.457 3.4 11.014c0-4.744 3.859-8.604 8.601-8.604 4.744 0 8.601 3.859 8.601 8.601-.001 4.744-3.857 8.601-8.601 8.601zm5.022-6.522c-.292-.146-1.727-.854-1.996-.954-.27-.097-.468-.146-.667.146-.195.292-.769.953-.943 1.146-.173.195-.346.219-.638.073-.292-.146-1.232-.455-2.348-1.445-.867-.771-1.453-1.725-1.625-2.018-.173-.292-.018-.449.129-.595.133-.132.292-.345.438-.517.146-.174.195-.292.292-.487.097-.195.048-.365-.024-.512-.073-.146-.667-1.612-.913-2.207-.238-.572-.48-.494-.668-.494-.17-.014-.365-.018-.567-.018-.194 0-.511.073-.777.365-.266.292-1.01.986-1.01 2.403s1.036 2.785 1.182 2.98c.146.195 2.022 3.127 4.93 4.387.691.298 1.23.474 1.648.608.693.221 1.324.19 1.822.116.556-.083 1.727-.704 1.973-1.385.238-.682.238-1.27.165-1.39-.073-.121-.27-.195-.562-.34z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold">Whatsapp</p>
            <p className="text-sm text-gray-500">2500+ Members</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-blue-700"
            >
              <path d="M19 0H5C2.243 0 0 2.243 0 5v14c0 2.757 2.243 5 5 5h14c2.757 0 5-2.243 5-5V5c0-2.757-2.243-5-5-5zM8.335 18.666H5.875V9.708h2.46v8.958zM7.104 8.333H7.081C6.155 8.333 5.5 7.675 5.5 6.79c0-.898.673-1.542 1.628-1.542.955 0 1.6.644 1.624 1.542 0 .884-.673 1.543-1.648 1.543zm11.562 10.333h-2.45v-4.646c0-1.153-.02-2.634-1.625-2.634-1.623 0-1.873 1.207-1.873 2.556v4.724H9.92V9.708h2.353v1.227h.031c.328-.621 1.131-1.272 2.334-1.272 2.494 0 2.952 1.641 2.952 3.77v5.233z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold">Linkedin</p>
            <p className="text-sm text-gray-500">++</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroStatic;
