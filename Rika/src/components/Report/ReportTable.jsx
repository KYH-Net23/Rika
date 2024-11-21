// import React from "react";
// import PropTypes from "prop-types";

// const ReportTable = ({ data }) => {
//   if (!data.length) {
//     return <p>No reports available.</p>;
//   }

//   return (
//     <table className="table-auto w-full border-collapse border border-gray-300">
//       <thead>
//         <tr>
//           {Object.keys(data[0]).map((key) => (
//             <th key={key} className="border border-gray-300 p-2">
//               {key}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {Object.values(row).map((value, i) => (
//               <td key={i} className="border border-gray-300 p-2">
//                 {value}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// ReportTable.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export default ReportTable;


import React from "react";
import PropTypes from "prop-types";

const ReportTable = ({ data }) => {
  if (!data.length) {
    return <p>No reports available.</p>;
  }

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Description</th>
          <th className="border border-gray-300 p-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((report) => (
          <tr key={report.id}>
            <td className="border border-gray-300 p-2">{report.id}</td>
            <td className="border border-gray-300 p-2">{report.title}</td>
            <td className="border border-gray-300 p-2">{report.description}</td>
            <td className="border border-gray-300 p-2">{report.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ReportTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReportTable;
