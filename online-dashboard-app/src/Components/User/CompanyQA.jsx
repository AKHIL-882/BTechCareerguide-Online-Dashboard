import React, { useState } from "react";
import SectionHeading from "./SectionHeading";

const CompanyQA = ({ handleLogout }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const companyData = [
    { projectName: "IBM", techTBU: "12-22-2024", payment: "Paid" },
    { projectName: "TCS", techTBU: "12-22-2024", payment: "Paid" },
    { projectName: "Wipro", techTBU: "12-22-2024", payment: "Paid" },
  ];

  return (
    <div className="m-2 flex-1 pt-14 lg:relative py-2 min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 overflow-auto h-screen">
        <SectionHeading text="Company Coding Round Solutions" />
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4 font-sans">
          Coming soon...
        </p>

        <div className="overflow-x-auto">
          {/* <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Project Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Tech TBU
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {row.projectName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.techTBU}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <i className="fas fa-money-bill-wave"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>

        {/* <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`py-2 px-4 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CompanyQA;
