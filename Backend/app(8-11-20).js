const express=require('express');
const bodyParser=require('body-parser');
var connection=require('express-myconnection')
var cors=require('cors');
var mysql=require('mysql');

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  connection(mysql,{
    host: 'localhost', //'localhost',
    user: 'root',
    password : '********',
    port : 3306, //port mysql
    database:'Philos'
  },'single')
);

var insert=(data,res,req)=>{
  
  req.getConnection((err,connection)=> {
    if (err) throw err;

    connection.query("select * from users where email ='"+data.email+"'",(err,result)=>{
      if(err){
        res.status(400).json("Failed");
        console.log("search failed : %s ",err)        
      }
      else{
        if(result.length===0){
          console.log(data);
          connection.query("INSERT INTO unmatched set ? ",data,(err, rows)=>{
            if (err){
              //If error
              res.status(400).json('Sorry!!Unable To Add');
              console.log("Error inserting : %s ",err );
            }
            else{
              //If success
              res.status(200).json('Data recieved!!');
              connection.query("select count(*) from unmatched",(err,result)=>{
                if (err){
                  console.log(err);
                }
                else {
                  console.log(result[0]['count(*)']);
                  console.log(result[0]['count(*)']>=4);

                  if (result[0]['count(*)']>=4){
                    console.log("grouping started");
                    connection.query("call kmean4((select count(*) from unmatched)/5)",(err,res)=>{
                      if(err){
                        console.log(err);
                        console.log('error while running query');
                      }
                      else{
                        console.log("grouping succesfull");
                      }
                    })
                    connection.query("call tra2((select max(grp_id) from unmatched));",(err,res)=>{
                      if(err){
                        console.log(err);

                      }
                      else{
                        console.log("tra2 finished");
                      }
                    })
                    connection.query("call reset_1((select max(grp_id) from unmatched));",(err,res)=>{
                      if(err){
                        console.log(err);

                      }
                      else{
                        console.log("reset finished");
                      }
                    })
                  }
                }
              })
            }
          });
        }
        else{
          res.status(400).json('Account already exists');
        }
      }
    });
  });
}



//pushing data to the db
app.post('/',(req,res)=>{
    let {fname,lname,age,pno,email,about,password,lat,lng,q1,q2,q3,q4,profession}=req.body;


    var data={
        fname:fname,
        lname:lname,
        age: age,
        pno:pno,
        email:email,
        about:about,
        password:password,
        lat:lat,
        lng:lng,
        q1:q1,
        q2:q2,
        q3:q3,
        q4:q4,
        profession:profession,
        grp_id:0
    };


    insert(data,res,req);
});


//validating login
app.post('/login',(req,res)=>{
  let {email,pass}=req.body;
  var args={
    email:email,
    pass:pass
  };
  req.getConnection((err,connection)=>{
    if(err) throw err;
    connection.query("select * from users where email = '"+args.email+"'",(err,result)=>{
      if(err)
      {
        res.status(400).json('Sorry!! Unable To Login');
      }
      else{
        if(result.length===0){
          res.status(404).json('Could not find your Philos Account');
        }
        else{
          if(result[0].password===args.pass){
            res.status(200).json('Successfully logged-in!!!');
          }
          else{
            res.status(400).json('Incorrect Password!!');
          }
        }
      }
    })
  })
})

//fetch details of user
app.post('/fetchdet',(req,res)=>{
  let {email}=req.body;
  var args={email:email};
  req.getConnection((err,connection)=>{
    if (err) throw err;
    connection.query("select * from users where email = '"+args.email+"'",(err,result)=>{
      if(err){
        res.status(404).json('Failed to fetch details');
      }
      else{
        user=result[0];
        data={
          fname:user.fname,
          lname:user.lname,
          email:user.email,
          age:user.age,
          q1:user.q1,
          q2:user.q2,
          q3:user.q3,
          q4:user.q4,
          about:user.about
        }
        res.json(data);
      }
    })
  })
})

//fetching grp_id
app.post('/chatinit',(req,res)=>{
  let {email}=req.body;
  var args={email:email};
  req.getConnection((err,connection)=>{
    if (err) throw err;
    connection.query("select * from users where email = '"+args.email+"'",(err,result)=>{
      if(err){
        console.log("failed to get details while fetching details for chat");
      }
      else{
        user=result[0];
        console.log(user);
        data={
          grp_id:user.grp_id,
          created:user.created
        }
        res.json(data);
      }
    })

  })
})


app.post('/pushchat',(req,res)=>{
  let{email,message,grp_id,created,dt}=req.body;
  var args={
    email:email,
    message:message,
    grp_id:grp_id,
    created:created,
    dt:dt
  }
  req.getConnection((err,connection)=>{
    if (err) throw err;
    connection.query("insert into chat values ('"+args.email+"','"+args.message+"',"+args.grp_id+",'"+args.created+"','"+args.dt+"')",(err,rows)=>{
      if(err){
        res.status(400).json('Sorry unable to send message');
        console.log("Error inserting message to chat table : %s ",err );
      }
      else{
        res.status(200).json('message recieved to server!!');
      }
    })
  })
})


app.listen(5000,()=>{
console.log('on port 5000');
});
