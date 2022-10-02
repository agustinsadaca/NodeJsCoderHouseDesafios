import url from 'url'
import path from 'path'

export function uploadImageController(req, res) {
  const file = req.file;
console.log(file);
var hostname = req.headers.host; 
var pathname = url.parse(req.url).pathname;
console.log(file);
  if (!file) {
    const error = new Error("Error subiendo archivo");
    error.httpStatusCode = 400;
    return res.send(`error: ${error}`);
  }
  // res.sendFile(file.path.replace('\\', '/'))
  res.send(`Archivo ${file.originalname} subido exitosamente link:${'http://' + hostname+'/api/images/'+file.filename}`);
}
export function getImage(req, res) {

  const root = new URL('../../uploads/', import.meta.url)
  const {fileName} = req.params
  res.sendFile(root.pathname+fileName)
}