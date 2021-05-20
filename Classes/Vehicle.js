class Vehicle { //Class that represents a vehicle, this will be used to send to the client
    constructor(brand,plates,year,currentState,model,type,color,niv,gasoline,circulation){ //Constructor that populates the class attributes with the values given
        this.brand=brand;
        this.plates=plates;
        this.year=year;
        this.currentState=currentState;
        this.model=model;
        this.type=type;
        this.color=color;
        this.niv=niv;
        this.gasoline=gasoline;
        this.circulation=circulation;
        this.key="";
        this.img=null;
    }

    setVehicleKey(keyVal){ //Setter of this vehicle object
        this.key=keyVal;
    }


}

module.exports= Vehicle; //Export the class 