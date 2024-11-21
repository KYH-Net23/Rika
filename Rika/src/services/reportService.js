import axios from "axios";

const API_BASE_URL = "https://your-backend-api.com"; // use real enpoint

export const fetchReportData = async () => {
  const response = await axios.get(`${API_BASE_URL}/reports`);
  return response.data;
};

export const downloadReport = async (format) => {
  const response = await axios.get(`${API_BASE_URL}/reports/download`, {
    params: { format },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `report.${format}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
