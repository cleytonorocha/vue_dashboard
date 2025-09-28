import axios from 'axios';

const API_URL = 'http://localhost:8080' + '/reports';

export const generateProductsReport = async (request, type = 1) => {
    try {
      const response = await axios.post(
        `${API_URL}/listProductReport/${type}`,
        request,
        { responseType: 'arraybuffer' }
      );
  
      // extrai o nome do arquivo do header
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'report';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match.length > 1) filename = match[1];
      }
  
      const contentType = response.headers['content-type'] || 'application/octet-stream';
  
      downloadFile(response.data, filename, contentType);
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  };
  
  export function downloadFile(byteArray, filename, type) {
    const blob = new Blob([byteArray], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  