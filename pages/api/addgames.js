import connectDb from "../../middleware/mongoose";
import game from "../../models/game";
import fs from "fs";
import path from "path";

const handler = async (req, res) => {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      // const req.body[i]=req.body[i]
      // const folderpath=path.join(process.cwd(),'public','games',req.body[i].slug)  //process.cwd() gives current working root directory
      //     if(!fs.existsSync(folderpath)){
      //         fs.mkdirSync(folderpath,{recursive:true})
      //     }
let item=req.body[i]
      let g = new game({
        slug: item.title,
        title: item.title,
        img: item.img,
        size: item.size,
        category: item.category,
        desc: item.desc,
        OS: item.OS,
        Processor:item.Processor,
        Memory: item.Memory,
        Graphics: item.Graphics,
        Storage: item.Storage,
        ss1: item.ss1,
        ss2: item.ss2,
        ss3: item.ss3,
      });
      await g.save();
      const fileContent = `
Title: ${item.title}
Category: ${item.category}
Size: ${item.size}
OS: ${item.OS}
Processor: ${item.Processor}
Memory: ${item.Memory}
Graphics: ${item.Graphics}
Storage: ${item.Storage}
Description: ${item.desc}
      `;


      const filedir=path.join(process.cwd(),"files")

      if(!fs.existsSync(filedir)){
        fs.mkdirSync(filedir,{recursive:true})
      }

      const filePath=path.join(filedir,`${item.slug}.txt`)
      fs.writeFileSync(filePath,fileContent)


    }
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "Cant use this Method" });
  }
};
export default connectDb(handler);
