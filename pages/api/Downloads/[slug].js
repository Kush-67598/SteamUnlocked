import path from 'path'
import fs from 'fs'

export default function handler(req,res){
    const {slug}=req.query
    const filePath=path.resolve(`./files/${slug}.txt`);
    try{
        const stats=fs.statSync(filePath)

        res.writeHead(200,{
            'Content-Type':'text/plain',
            'Content-Length':stats.size,
            'Content-Disposition': `attachment; filename=${slug}.txt`,

        })

        const readstream=fs.createReadStream(filePath)
        readstream.pipe(res)
    }catch(err){
        console.log(err)
            res.status(500).json({ error: 'File not found' });

    
    }

}