const express = require('express') //Express
const {db}= require("./firebase") //Import the db module from our firebase config
const cors = require('cors'); //Cors
const Vehicle = require('./Classes/Vehicle'); //Import the vehicle class
const port=5000; //Define default port
const app=express() //Define app

//Initial settings
app.set("port",process.env.PORT || port) //Definition of the port the server will use, for development it will be port 5000, otherwise use the port in the context where hosted

//Middlewares
app.use(cors()) 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes

// GETS

app.get("/getCar/:key",(req,res)=>{ //Route that will give the user a dynamic vehicle based on the key
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

app.get("/getCars",async (req,res)=>{ //Route that will give the user all the vehicles stored in the database
    const vehicles=[];
    var car;
    db.ref("Vehicles").once("value").then((snapshot)=>{
        if(snapshot.exists()){ //Check if there is data in the snapshot
            
            snapshot.forEach((vehicle)=>{
                car=new Vehicle(vehicle.val().brand,vehicle.val().plates,vehicle.val().year,vehicle.val().currentState,vehicle.val().model,
                                vehicle.val().type,vehicle.val().color,vehicle.val().niv,vehicle.val().gasoline,vehicle.val().circulation)
                car.setVehicleKey(vehicle.key);
                vehicles.push(car);
            })
        }       
    }).catch((err)=>{
        console.log(err)
        res.json(vehicles);
    }).finally(()=>{
        res.json(vehicles);
    });

    

})

//POSTS

app.post("/createVehicle",(req,res)=>{ //Route that will create a new vehicle
    
    const data=req.body; //Get the request body data
    const vehicle= new Vehicle(data.brand,data.plates,data.year,data.currentState,data.model,data.type,data.color,data.niv,data.gasoline,data.circulation) //Create a new instance of vehicle and populate it with the request info
    db.ref("Vehicles/").push(vehicle) //Push the vehicle object directly into firebase
    res.status(200) //OK
    res.send("New Vehicle Added"); //New Vehicle added
})

//Delete

app.delete('/deleteVehicle/:key',(req,res)=>{ //Route that will delete a dynamically created vehicle based on its key
    const key=req.params.key; //Get the key from the params
    db.ref("Vehicles/"+key).remove(); //Remove from firebase
    res.status(200) //OK
    res.sendStatus(res.statusCode) //OK
});

//UPDATE
app.put('/updateVehicle/:key',(req,res)=>{ //Route that will update a dynamically created vehicle based on its key
    const key=req.params.key; //Get the key from the params
    const data=req.body; //Get the req body
    const vehicle= new Vehicle(data.brand,data.plates,data.year,data.currentState,data.model,data.type,data.color,data.niv,data.gasoline,data.circulation) //Create new vehicle instance and populate it with that data from the request
    db.ref("Vehicles/"+key).update(vehicle); //Update directly to firebase with the new object
    res.status(200) //OK
    res.send(vehicle); //Send vehicle
});

app.listen(app.get("port")); //Start receiving request through the port
console.log("Server listening on port:",app.get("port")); //Dev log

