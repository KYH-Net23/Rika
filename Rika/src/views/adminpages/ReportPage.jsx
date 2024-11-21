// import React, { useState, useEffect } from "react";
// import ReportTable from "../../components/Report/ReportTable";
// import DownloadButton from "../../components/Report/DownloadButton";
// import ErrorMessage from "../../common/Report/ErrorMessage";
// import { fetchReportData } from "../../services/reportService";

// const ReportPage = () => {
//   const [reportData, setReportData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchReportData();
//         setReportData(data);
//       } catch (err) {
//         console.log ("Failed to fetch reports. ", err )
//         setError("Failed to fetch reports. Please try again.");
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="report-page">
//       <h1 className="text-xl font-semibold mb-4">Reports</h1>
//       <ReportTable data={reportData} />
//       <div className="mt-4">
//         <DownloadButton format="pdf" />
//         <DownloadButton format="csv" />
//       </div>
//     </div>
//   );
// };

// export default ReportPage;

import React, { useEffect, useState } from "react";
import ReportTable from "../../components/Report/ReportTable";
import DownloadButton from "../../components/Report/DownloadButton";
import ErrorMessage from "../../common/Report/ErrorMessage";
import axios from "axios";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch placeholder data
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const simulatedReports = response.data.slice(0, 10).map((post) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          createdAt: new Date().toLocaleDateString(), // Mock created date
        }));

        setReports(simulatedReports);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="report-page">
      <h1 className="text-xl font-semibold mb-4">Reports</h1>
      <ReportTable data={reports} />
      <div className="mt-4 flex space-x-4">
        <DownloadButton format="pdf" />
        <DownloadButton format="csv" />
      </div>
    </div>
  );
};

export default ReportPage;
