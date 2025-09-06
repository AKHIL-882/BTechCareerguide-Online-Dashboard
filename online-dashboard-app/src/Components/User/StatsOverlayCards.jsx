// import React, { useEffect, useState } from "react";
// import { getUserDetails } from "../../Api";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// const colorMap = {
//   Viewed: "#10B981",    // green
//   Projects: "#3B82F6",  // blue
//   Tests: "#EC4899",     // pink
//   QA: "#FACC15",        // yellow
// };

// const StatsOverlayCards = () => {
//   const [stats, setStats] = useState([]);

//   const localData = localStorage.getItem("data");
//   const accessToken = JSON.parse(localData)?.access_token;

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const response = await getUserDetails(accessToken);
//         if (response?.header_stats) {
//           setStats(response.header_stats);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user stats:", error);
//       }
//     };

//     fetchUserStats();
//   }, []);

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
//       {stats.map((card, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transform transition duration-300"
//           style={{ height: "130px" }} // slightly increased height
//         >
//           {/* Left side: label + count */}
//           <div>
//             <p className="text-xs text-gray-500">Total Jobs applied</p>
//             <p className="text-lg font-bold text-gray-800">234</p>
//           </div>

//           {/* Right side: circular progress */}
//           <div className="w-16 h-16">
//             <CircularProgressbar
//               value={56}
//               maxValue={1000} // adjust if not percentage
//               text={`${card.value}%`}
//               strokeWidth={8}
//               styles={buildStyles({
//                 textSize: "22px", // smaller inside circle
//                 textColor: colorMap[card.label] || "#4f46e5",
//                 pathColor: colorMap[card.label] || "#4f46e5",
//                 trailColor: "#e5e7eb",
//               })}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsOverlayCards;
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { FaEllipsisV } from "react-icons/fa";
import PromoSlider from "./PromoSlider";

const chartColors = [
  "#7C3AED",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#6366F1",
];

const StatCard = ({ title, data, defaultChart, dataType }) => {
  const [chartType, setChartType] = useState(defaultChart);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if all values are zero
  const allValuesZero = data.values.every((item) => item.value === 0);

  // Function to get the appropriate link based on title
  const getLink = () => {
    switch (title.toLowerCase()) {
      case "jobs":
        return "/jobs";
      case "projects":
        return "/projects";
      case "coding assistance":
        return "/calendar";
      case "articles":
      default:
        return null;
    }
  };

  const renderChart = () => {
    if (allValuesZero) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-2">
          <p className="text-gray-400 text-sm mb-2">No data available</p>
          {getLink() ? (
            <a
              href={getLink()}
              className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
            >
              {title === "Projects"
                ? "Request Project"
                : title === "Coding Assistance"
                  ? "Schedule Interview"
                  : `View ${title}`}
            </a>
          ) : (
            <button className="bg-gray-400 text-white text-xs px-3 py-1 rounded-full cursor-not-allowed">
              Coming Soon
            </button>
          )}
        </div>
      );
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChart
            data={data.values}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#7C3AED"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart
            data={data.values}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22C55E"
              fill="rgba(34, 197, 94, 0.2)"
            />
          </AreaChart>
        );
      case "pie":
        return (
          <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Pie
              data={data.values}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={15}
              outerRadius={25}
              paddingAngle={1}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {data.values.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}`, name]} />
          </PieChart>
        );
      case "radar":
        return (
          <RadarChart
            data={data.values}
            outerRadius="60%"
            margin={{ top: 15, right: 15, left: 15, bottom: 15 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 9, dy: 4 }} />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "auto"]}
              tick={{ fontSize: 8 }}
            />
            <Radar
              name="Value"
              dataKey="value"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        );
      default:
        return null;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col justify-between relative h-44 w-full p-2">
      {/* Dropdown Menu - Only show if there's data */}
      {!allValuesZero && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            className="p-1 rounded hover:bg-gray-100"
          >
            <FaEllipsisV className="text-gray-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md border border-gray-200">
              {dataType === "timeSeries" ? (
                <>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setChartType("bar");
                      setDropdownOpen(false);
                    }}
                  >
                    Bar
                  </div>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setChartType("area");
                      setDropdownOpen(false);
                    }}
                  >
                    Area
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setChartType("pie");
                      setDropdownOpen(false);
                    }}
                  >
                    Pie
                  </div>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setChartType("radar");
                      setDropdownOpen(false);
                    }}
                  >
                    Radar
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div>
        <p className="text-xs text-gray-500 font-medium">{data.subtitle}</p>
        <h3 className="text-md font-bold text-gray-800 mt-1">
          {allValuesZero ? 0 : data.count}
        </h3>
      </div>

      <div className="h-44 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatsOverlayCards = () => {
  // All data is now coming from objects
  const statsData = {
    jobs: {
      title: "Jobs",
      subtitle: "Applied Jobs (Last 3 Months)",
      count: 50, // Changed to 0 to test the no data state
      values: [
        { month: "Jul", value: 10 },
        { month: "Aug", value: 10 },
        { month: "Sep", value: 30 },
      ],
      dataType: "timeSeries",
      defaultChart: "bar",
    },
    projects: {
      title: "Projects",
      subtitle: "Project Status",
      count: 50,
      values: [
        { name: "Requested", value: 15 },
        { name: "Approved", value: 20 },
        { name: "Rejected", value: 5 },
        { name: "Completed", value: 10 },
      ],
      dataType: "categorical",
      defaultChart: "pie",
    },
    coding: {
      title: "Coding Assistance",
      subtitle: "Interview Schedule",
      count: 4, // Changed to 0 to test the no data state
      values: [
        { name: "Accepted", value: 2 },
        { name: "Rejected", value: 1 },
        { name: "Pending", value: 1 },
      ],
      dataType: "categorical",
      defaultChart: "pie",
    },
    articles: {
      title: "Articles",
      subtitle: "Articles Viewed (Last 3 Months)",
      count: 0, // Changed to 0 to test the no data state
      values: [
        { month: "Jul", value: 0 },
        { month: "Aug", value: 0 },
        { month: "Sep", value: 0 },
      ],
      dataType: "timeSeries",
      defaultChart: "bar",
    },
  };

  return (
    <div className="w-full pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-5 w-full mx-auto">
        {/* Left Purple Card */}
        <PromoSlider />

        {/* Right Stats Cards */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <StatCard
            title={statsData.jobs.title}
            data={statsData.jobs}
            defaultChart={statsData.jobs.defaultChart}
            dataType={statsData.jobs.dataType}
          />
          <StatCard
            title={statsData.projects.title}
            data={statsData.projects}
            defaultChart={statsData.projects.defaultChart}
            dataType={statsData.projects.dataType}
          />
          <StatCard
            title={statsData.coding.title}
            data={statsData.coding}
            defaultChart={statsData.coding.defaultChart}
            dataType={statsData.coding.dataType}
          />
          <StatCard
            title={statsData.articles.title}
            data={statsData.articles}
            defaultChart={statsData.articles.defaultChart}
            dataType={statsData.articles.dataType}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsOverlayCards;
