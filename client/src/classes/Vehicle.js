class Vehicle{ //Class that represents a vehicle in the database, this will be used to send it to the server, the server will create a vehicle instance as well and push it to the database
    constructor(brand,plates,year,currentState,model,type,color,niv,gasoline,circulation){ //Constructor that will populate the class attributes
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

    }

}

export default Vehicle; //Export the class so other components can make instances of it