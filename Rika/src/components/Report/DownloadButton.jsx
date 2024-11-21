import React from "react";
import PropTypes from "prop-types";
//import { downloadReport } from "../../services/reportService";

// const DownloadButton = ({ format }) => {
//   const handleDownload = async () => {
//     try {
//       await downloadReport(format);
//       alert(`Report downloaded as ${format.toUpperCase()}`);
//     } catch (err) {
//         console.log ("Failed to download report.", err)
//       alert("Failed to download report. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//     >
//       Download as {format.toUpperCase()}
//     </button>
//   );
// };

// DownloadButton.propTypes = {
//   format: PropTypes.oneOf(["pdf", "csv"]).isRequired,
// };

// export default DownloadButton;

const DownloadButton = ({ format }) => {
    const handleDownload = () => {
      // Simulate a download
      alert(`Simulated download as ${format.toUpperCase()}`);
    };
  
    return (
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download as {format.toUpperCase()}
      </button>
    );
  };
  
  DownloadButton.propTypes = {
    format: PropTypes.oneOf(["pdf", "csv"]).isRequired,
  };
  
  export default DownloadButton;