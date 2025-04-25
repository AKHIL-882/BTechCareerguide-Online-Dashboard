import React from 'react';

const SectionHeading = ({ text }) => {
  return (
    <div className="inline-block bg-violet-100 text-violet-800 px-3 py-1 rounded-md font-semibold text-sm mb-4">
      {text.toUpperCase()}
    </div>
  );
};

export default SectionHeading;

// import React from 'react';

// const SectionHeading = ({ text }) => {
//   return (
//     <div className="flex items-center space-x-3 mb-4">
//       <div className="w-1 h-6 bg-violet-600 rounded-sm"></div>
//       <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
//         {text.toUpperCase()}
//       </h2>
//     </div>
//   );
// };

// export default SectionHeading;
