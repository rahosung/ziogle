import http from 'node:http'
import { fileURLToPath } from 'node:url'
import { mkdir } from 'node:fs/promises'
import formidable from 'formidable'

const UPLOAD_DIR = new URL("./uploads", import.meta.url)
await mkdir(UPLOAD_DIR, { recursive: true })

http.createServer((req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', //CORS ERROR <- 찾아보기
        'Access-Control-Allow-Method': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, //30일 정도
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers)
        res.end()
    }
    if (req.url == '/upload' && req.method.toLowerCase() === 'post') {
        const form = formidable({
            keepExtensions: true,
            uploadDir: fileURLToPath(UPLOAD_DIR)
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log('some error');
                res.writeHead(200, headers)
                res.writeHead(JSON.stringify(err))
                return res.end()
            }
            const { file: [{ filepath, originalFilename, mimetype, size }] } = files
            console.log('save file', { filepath, originalFilename, mimetype, size })
            res.writeHead(200, headers)
            res.write(JSON.stringify({ fields, files }))
            return res.end()
        })
    }
}).listen(3020, () => {
    console.log('server started');
})
