let express = require("express");

let app = express();

app.use(express.json());

app.use(function (req, res, next) {

res.header("Access-Control-Allow-Origin","*");

res.header(

"Access-Control-Allow-Methods",

"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"

);

res.header(

"Access-Control-Allow-Headers",

"Origin, X-Requested-With, Content-Type, Accept"

);

next();

});
var port=process.env.port || 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));

let {mobiles}=require("./mobileDatatask8.js");
// console.log(mobiles);
const {Client} =require("pg");
const client =new Client({
    user:"postgres",
    password:"RaghavSatyam@123",
    database:"postgres",
    port:5432,
    host:"db.umnxbvgodcgisciyjqir.supabase.co",
    ssl:{rejectUnauthorized:false},
});
    client.connect(function(res,error){
    console.log(`Connected!!!`);
});

var format = require('pg-format');

app.get("/resetData",function(req,res,next){
    const query1="DELETE FROM mobiles";
    client.query(query1,function(err,result){
        if(err) {res.status(400).send(err);}
        else {
            console.log("Successfully daleted. Affected rows", result.rowCount);
            var values=mobiles.map((k,index)=>[k.name,k.price,k.brand,k.RAM,k.ROM,k.OS]);
            client.query(format("INSERT INTO mobiles(name,price,brand,RAM,ROM,OS) VALUES %L",values),[],(err,result)=>{
             if(err)console.log(err)
             else{
                console.log(result)
             res.send(result.rows);}
            });
        }
    });
});
app.get("/mobiles",function(req,res,next){
    let brand=req.query.brand;
    let brandArr=brand?brand.split(","):[];
    let RAM=req.query.ram;
    let RAMArr=RAM?RAM.split(","):[];
    let ROM=req.query.rom;
    let ROMArr=ROM?ROM.split(","):[];
    let OS=req.query.os;
    let OSArr=OS?OS.split(","):[];
    const query="SELECT * FROM mobiles";
    client.query(query,function(err,result){
         if(err){res.status(400).send(err)}
         else{
            
            if(brand){
                result.rows=result.rows.filter(k=>brandArr.find(j=>j===k.brand));
            }
            if(RAM){
                result.rows=result.rows.filter(k=>RAMArr.find(j=>j===k.ram));
            }
            if(ROM){
                result.rows=result.rows.filter(k=>ROMArr.find(j=>j===k.rom));
            }
            if(OS){
                result.rows=result.rows.filter(k=>OSArr.find(j=>j===k.os));
            }
            // console.log(result.rows);
            res.send(result.rows);
        }
    })
    // client.end();
});
app.get("/mobiles/brand/:brand",function(req,res,next){
    let brand=req.params.brand;
    // console.log(department);
    const sql="SELECT * FROM mobiles WHERE  brand=($1)";
    client.query(sql,[brand],function(err,result){
         if(err){res.status(400).send(err)}
         else{
            // console.log(result);
            res.send(result.rows);
         }
    })
});
app.get("/mobiles/RAM/:ram",function(req,res,next){
    let ram=req.params.ram;
    const sql="SELECT * FROM mobiles WHERE  ram=($1)";
    client.query(sql,[ram],function(err,result){
          if(err){res.status(400).send(err)}
         else{
            // console.log(result);
            res.send(result.rows);
         }
    })
});
app.get("/mobiles/ROM/:rom",function(req,res,next){
    let rom=req.params.rom;
    const sql="SELECT * FROM mobiles WHERE rom=($1)";
    client.query(sql,[rom],function(err,result){
          if(err){res.status(400).send(err)}
         else{
            // console.log(result);
            res.send(result.rows);
         }
    });
});
app.get("/mobiles/OS/:os",function(req,res,next){
    let os=req.params.os;
    const sql="SELECT * FROM mobiles WHERE os=($1)";
    client.query(sql,[os],function(err,result){
          if(err){res.status(400).send(err)}
         else{
            // console.log(result);
            res.send(result.rows);
         }
    });
});
app.get("/mobiles/:name",function(req,res,next){
    let name=req.params.name;
    const sql="SELECT * FROM mobiles WHERE name=($1)";
    client.query(sql,[name],function(err,result){
        if(err){res.status(400).send(err)}
        else{
            // console.log(result);
            res.send(result.rows);
        }
    });
});
app.post("/mobiles",function(req,res,next){
    var values =Object.values(req.body);
    // console.log(values);
    const sql="INSERT INTO mobiles(name,price,brand,ram,rom,os) VALUES ($1,$2,$3,$4,$5,$6)";
    client.query(sql, values, function (err, result)
     {  if(err){res.status(400).send(err)}

     else{
        // console.log(result);
        res.send(` insertion successful`)};
      });
});
app.put("/mobiles/:name",function(req,res,next){
    let name=req.params.name;
    let body=req.body;
    const sql=`UPDATE mobiles SET price=$1,brand=$2,RAM=$3,ROM=$4,OS=$5 WHERE name=$6`;
    let values=[body.price,body.brand,body.ram,body.rom,body.os,name];
    client.query(sql,values,function(err,result){
       if(err){res.status(400).send(err)}
        else{
            // console.log(result);
            res.send("Updated Successfully");
        }
    });

});
app.delete("/mobiles/:name",function(req,res,next){
    let name=req.params.name;
    const sql="DELETE FROM mobiles WHERE name=($1)";
    client.query(sql,[name],function(err,result){
         if(err){res.status(400).send(err)}
        else{
            // console.log(result);
            res.send("DELETED Successfully");
        }
    });

});
