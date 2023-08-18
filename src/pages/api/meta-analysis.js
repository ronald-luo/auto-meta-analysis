import formidable from 'formidable';
const pdfParse = require('pdf-parse');
const fs = require('fs');

export const config = {
  api: {
    bodyParser: false,
  },
};

export const middleware = (handler) => async (req, res) => {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    req.body = data.fields;
    req.files = data.files;
  }
  return handler(req, res);
};
export default middleware(async (req, res) => {
    if (req.method === 'POST') {
      // console.log('Files:', req.files);
      // console.log('Fields:', req.body);
  
      // Map over the uploaded files and extract their text content
      const textContentPromises = Object.values(req.files).map((file) => {
        const dataBuffer = fs.readFileSync(file.filepath);
        return pdfParse(dataBuffer)
          .then((pdfData) => pdfData.text)
          .catch((error) => {
            console.error('Error parsing PDF:', error);
            return '';
          });
      });
  
      // Wait for all text extraction promises to resolve
      const textContent = await Promise.all(textContentPromises);
      
      // console.log(textContent)
      // Construct an array of objects, where each object represents a PDF file with its extracted text
      const extractedTexts = Object.values(req.files).map((file, index) => ({
        fileName: file.originalFilename,
        extractedText: textContent[index],
      }));
  
      res.status(200).json({ extractedTexts });
    }
    res.end();
  });