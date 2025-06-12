import connectDb from "../../middleware/mongoose";
import game from "../../models/game";
import fs from "fs";
import path from "path";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let savedgames=[]
    for (let i = 0; i < req.body.length; i++) {
      let item = req.body[i];
      let g = new game({
        slug: item.slug,
        title: item.title,
        img: item.img,
        size: item.size,
        category: item.category,
        desc: item.desc,
        os: item.os,
        processor: item.processor,
        memory: item.memory,
        graphics: item.graphics,
        storage: item.storage,
        ss1: item.ss1,
        ss2: item.ss2,
        ss3: item.ss3,
        price:item.price,
        priceHistory:[{
          value:item.price
        }]
      });
      await g.save();
      console.log(req.body)

      savedgames.push(g)
      
      const fileContent = `
Title: ${item.title}
Category: ${item.category}
Size: ${item.size}
OS: ${item.os}
Processor: ${item.processor}
Memory: ${item.memory}
Graphics: ${item.graphics}
Storage: ${item.storage}
Description: ${item.desc}
      `;

      const filedir = path.join(process.cwd(), "files");

      if (!fs.existsSync(filedir)) {
        fs.mkdirSync(filedir, { recursive: true });
      }

      const filePath = path.join(filedir, `${item.slug}.txt`);
      fs.writeFileSync(filePath, fileContent);
    }

    
    res.status(200).json({games:savedgames, success: "Success" });
  } else {
    res.status(400).json({ error: "Cant use this Method" });
  }
};
export default connectDb(handler);
