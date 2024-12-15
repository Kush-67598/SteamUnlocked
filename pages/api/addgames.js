import connectDb from "../../middleware/mongoose";
import game from "../../models/game";



const handler=async(req,res)=>{
    if(req.method==="POST"){
        for(let i=0;i<req.body.length;i++){

            // const req.body[i]=req.body[i]
            // const folderpath=path.join(process.cwd(),'public','games',req.body[i].slug)  //process.cwd() gives current working root directory
            //     if(!fs.existsSync(folderpath)){ 
            //         fs.mkdirSync(folderpath,{recursive:true})
            //     }
            
            let g=new game({
                slug:req.body[i].title,
                title:req.body[i].title,
                img:req.body[i].img,
                size:req.body[i].size,
                category:req.body[i].category,
                desc:req.body[i].desc,
                OS:req.body[i].OS,
                Processor:req.body[i].Processor,
                Memory:req.body[i].Memory,
                Graphics:req.body[i].Graphics,
                Storage:req.body[i].Storage,
                ss1:req.body[i].ss1,
                ss2:req.body[i].ss2,
                ss3:req.body[i].ss3
                
            })
            await g.save()

        }
        res.status(200).json({success:"Success"})

    }
    else{
        res.status(400).json({error:"Cant use this Method"})
    }

    
}
export default connectDb(handler)