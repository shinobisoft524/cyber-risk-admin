import { type NextRequest } from 'next/server';
import { BPostApi } from '@/app/api/instance';
import formidable, { errors as formidableErrors } from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js's default body parser
//   },
// };

export const config = { runtime: 'multipart/form-data' };

// export async function POST(req, res) {
//   const form = formidable({});
//   let fields;
//   let files;
//   try {
//     [fields, files] = await form.parse(req);
//   } catch (err) {
//     // example to check for a very specific error
//     if (err.code === formidableErrors.maxFieldsExceeded) {
//     }
//     console.error(err);
//     res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
//     res.end(String(err));
//     return;
//   }
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({ fields, files }, null, 2));
//   return;
// }

// async function getRawBody(readable: Request) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

// export async function POST(req: Request) {
//   console.log(req.body);
//   // const { headers, method } = req;

//   // const rawBody = await getRawBody(req);
//   // const data = Buffer.from(rawBody).toString('utf8');

//   // const formData = new FormData();
//   // formData.append('file', data);

//   // const reqData = req.body;
//   // return await BPostApi(req, 'file/uploadOrganisationLogo', reqData, true);
// }

// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false, // Disables the default body parser to handle FormData
//   },
// };

export async function POST(req, res) {
  let data = await req.formData();
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: 'Method not allowed' });
  // }

  // try {
  //   // Parse the incoming FormData request
  //   const data = await new Promise((resolve, reject) => {
  //     const form = new formidable.IncomingForm({
  //       uploadDir: path.join(process.cwd(), '/public/uploads'),
  //       keepExtensions: true,
  //     });

  //     form.parse(req, (err, fields, files) => {
  //       if (err) return reject(err);
  //       resolve({ fields, files });
  //     });
  //   });

  //   const file = data.files.file;
  //   res.status(200).json({ message: 'File uploaded successfully', file });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'File upload failed' });
  // }
}
