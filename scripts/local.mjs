import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
const {default:api}=await import('../api/registration.js');
const port=Number(process.env.PORT||3000);
createServer(async(req,res)=>{
 try{
  const path=new URL(req.url,'http://localhost').pathname;
  if(path==='/api/registration'){
   const chunks=[];let size=0;
   for await(const chunk of req){size+=chunk.length;if(size>20000){res.writeHead(413,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,message:'Přihláška je příliš dlouhá.'}));return}chunks.push(chunk)}
   const headers=new Headers();for(const [name,value]of Object.entries(req.headers)){if(value!==undefined)headers.set(name,Array.isArray(value)?value.join(','):value)}
   const request=new Request('http://'+req.headers.host+req.url,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
   const response=await api.fetch(request);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  const files={'/':['index.html','text/html; charset=utf-8'],'/index.html':['index.html','text/html; charset=utf-8'],'/styles.css':['styles.css','text/css; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/favicon.png':['favicon.png','image/png']};
  if(files[path]&&['GET','HEAD'].includes(req.method)){const [file,type]=files[path];res.writeHead(200,{'Content-Type':type});res.end(req.method==='HEAD'?undefined:await readFile(new URL('../'+file,import.meta.url)));return}
  res.writeHead(404);res.end('Nenalezeno');
 }catch{res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,message:'Serverová chyba.'}))}
}).listen(port,'127.0.0.1',()=>console.log('Vědoliga: http://localhost:'+port));
