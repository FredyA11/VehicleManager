require('dotenv').config();
const express = require('express') //Express
const db= require("./firebase") //Import the db module from our firebase config
const cors = require('cors'); //Cors
const Vehicle = require('./Classes/Vehicle'); //Import the vehicle class
const port=5000; //Define default port
const app=express() //Define app
const bcrypt=require('bcrypt'); //Used to hash the passwords of the users
const jwt= require('jsonwebtoken');
const path=require('path');

//Initial settings
app.set("port",process.env.PORT || port) //Definition of the port the server will use, for development it will be port 5000, otherwise use the port in the context where hosted
//Production
app.use(express.static(path.join(__dirname,"client/build")));


//Middlewares
app.use(cors()) 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Function to protect all the routes to prevent unauthorized access , json web tokens used
function verifyToken(req,res,next){ 
    const bearHeader=req.headers['authorization'];
    if(typeof bearHeader !== 'undefined'){
        const bearer= bearHeader.split(' ');
        const token=bearer[1];
        req.token=token;
        jwt.verify(req.token,'key',(err,authData)=>{ //Check the token from the client, from the authorization header
            if(err){
                res.sendStatus(403);
            }
            else{
                next(); 
            }
        });
        
    }else{
        res.sendStatus(403);
    }
}

async function encryptPassword(req,res,next){ //Funcion para encriptar la contraseña del usuario
    const data=req.body; //obtenemos body y luego la contraseña
    var password=data.password;
    const salt=await bcrypt.genSalt();
    password= await bcrypt.hash(password,salt); //hash de la contraseña
    req.body.password=password; //reemplazamos la contraseña del request body
    next(); //seguimos la ejecucion de donde la llamen
}


//Routes

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html",'index.html'));

});
// GETS


app.get("/getCar/:key",verifyToken,(req,res)=>{ //Route that will give the user a dynamic vehicle based on the key
    var vehicle;
    const key=req.params.key;
    db.ref("Vehicles/"+key).once("value").then((snapshot)=>{
        if(snapshot.exists()){
            vehicle=new Vehicle(snapshot.val().brand,snapshot.val().plates,snapshot.val().year,snapshot.val().currentState,snapshot.val().model,
                    snapshot.val().type,snapshot.val().color,snapshot.val().niv,snapshot.val().gasoline,snapshot.val().circulation);
            
        }
        else{

        }
    });
    res.status(200)
    res.send(vehicle);
});

app.get("/getCars",verifyToken,(req,res)=>{ //Route that will give the user all the vehicles stored in the database
   
    const vehicles=[];
    var car;
    db.ref("Vehicles").once("value").then((snapshot)=>{
        if(snapshot.exists()){ //Check if there is data in the snapshot and iterate each child to populate an array
            
            snapshot.forEach((vehicle)=>{
                car=new Vehicle(vehicle.val().brand,vehicle.val().plates,vehicle.val().year,vehicle.val().currentState,vehicle.val().model,
                                vehicle.val().type,vehicle.val().color,vehicle.val().niv,vehicle.val().gasoline,vehicle.val().circulation)
                car.setVehicleKey(vehicle.key);
                vehicles.push(car);
            })
        }       
    }).catch((err)=>{
        res.json(vehicles);
    }).finally(()=>{
        res.json(vehicles);
    });
        

})

//POSTS

app.post("/createVehicle",verifyToken,(req,res)=>{ //Route that will create a new vehicle
    
    const data=req.body; //Get the request body data
    const vehicle= new Vehicle(data.brand,data.plates,data.year,data.currentState,data.model,data.type,data.color,data.niv,data.gasoline,data.circulation) //Create a new instance of vehicle and populate it with the request info
    db.ref("Vehicles/").push(vehicle) //Push the vehicle object directly into firebase
    res.status(200) //OK
    res.send("New Vehicle Added"); //New Vehicle added
})


app.post("/loginUser",async (req,res)=>{ //Route to  login the user, if the password and username matches, we generate a new token that will be used for authorized access to the api routes
    const data=req.body;
    const username=data.userName; //Get the username and the password
    const password=data.password;
    var user=null;
    db.ref("Users/"+username).once("value").then((snapshot)=>{ //Search the user list with the username key
        if(snapshot.exists()){ //If the record exsist then we compare the encrypted password with the password from the request, if they match then let the user in
            bcrypt.compare(password,snapshot.val().password,(err,result)=>{
                if(result){
                    user={
                        username:snapshot.key,
                        email:snapshot.val().email,
                        password:snapshot.val().password  
                    }
                    jwt.sign({user:user},'key',(err,token)=>{ //
                        res.json({token:token})
                    });  
                }
                else{
                    res.json({token:"failure"});
                }
            })
        }
        else{
            res.json({
                token:"failure"
            })
        }
    }).catch((err)=>{
        res.json({
            token:"failure"
        })
    });
    
});

app.post("/createUser",encryptPassword,async (req,res)=>{ //route to create a new user, before entering , ecnrypt the password to store it in the database
    const data=req.body;
    const email=data.email;
    const username=data.username;
    const password=data.password;
    db.ref("Users/"+username).once("value").then((snapshot)=>{ //First check if user exists
        if(snapshot.exists()){ //This means someone already has that username, (repeated email are posible)
            if(snapshot.val().email === email){
                res.send("Username and email already exists");
            }
            else{
                res.send("Username already exists");
            }
        }
        else{ //If user doesnt exist, create a new one and store it with data from the request
            db.ref("Users/"+username).set({
                email:email,
                password:password
            })
            res.json({ //return success
                success:true
            });
        }
    })

})


//Delete

app.delete('/deleteVehicle/:key',verifyToken,(req,res)=>{ //Route that will delete a dynamically created vehicle based on its key
    const key=req.params.key; //Get the key from the params
    db.ref("Vehicles/"+key).remove(); //Remove from firebase
    res.status(200) //OK
    res.sendStatus(res.statusCode) //OK
});

//UPDATE
app.put('/updateVehicle/:key',verifyToken,(req,res)=>{ //Route that will update a dynamically created vehicle based on its key
    const key=req.params.key; //Get the key from the params
    const data=req.body; //Get the req body
    const vehicle= new Vehicle(data.brand,data.plates,data.year,data.currentState,data.model,data.type,data.color,data.niv,data.gasoline,data.circulation) //Create new vehicle instance and populate it with that data from the request
    db.ref("Vehicles/"+key).update(vehicle); //Update directly to firebase with the new object
    res.status(200) //OK
    res.send(vehicle); //Send vehicle
});





app.listen(app.get("port")); //Start receiving request through the port
console.log("Server listening on port:",app.get("port")); //Dev log

