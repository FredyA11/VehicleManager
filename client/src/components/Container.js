import React from "react"
import Row from "react-bootstrap/Row" //Bootstrap stuff
import Col from "react-bootstrap/Col"
import Canvas from "./Canvas"  //Canvas where vehicle info is displayer
import ButtonsContainer from "./ButtonsContainer" //Button container
import RegisterModal from "./RegisterModal" //Modal to add new vehicle
import api from "./axios" //Axios variable (utility)
import Swal from "sweetalert2" //Package for alerts
import Empty from "./Empty" //Empty component to show when no vehicles in database
import LoadingC from "./LoadingC" //Import the spinner loading component

class Container extends React.Component{ //Component that contains the canvas (vehicle info), the button to add, and the register vehicle modal. Other components like the empty one and the loading will be showed if the conditions are met
    constructor(props){  
        super(props)
        this.state={ //State variables
            showModal:false,
            showModalEdit:false,
            canvasArray:[],
            arrayIndex:0,
            currentKey:"",
            loading:true,
            empty:false
        }
        this.hideModal=this.hideModal.bind(this) //Function bindings 
        this.fetchData=this.fetchData.bind(this)
        this.incrementIndex=this.incrementIndex.bind(this)
        this.decrementIndex=this.decrementIndex.bind(this)
        this.showModal=this.showModal.bind(this)
        this.deleteCar=this.deleteCar.bind(this)
    }

    componentDidMount(){ //Whenever the component loads, fetch the data
        this.fetchData()
    }
    
    incrementIndex(){ //Function to increment the index in the array that contains all the canvas components
        if(this.state.arrayIndex+1>this.state.canvasArray.length-1){
            this.setState({
                arrayIndex:0,
                currentKey:this.state.canvasArray[0].key
            })
        }
        else{
            this.setState({
                arrayIndex:this.state.arrayIndex+1,
                currentKey:this.state.canvasArray[this.state.arrayIndex+1].key
            })
        }
        
    }

    decrementIndex(){ //Funcion to decrement the index in the array that contains all the canvas components
        if(this.state.arrayIndex-1<0){
            this.setState({
                arrayIndex:this.state.canvasArray.length-1,
                currentKey:this.state.canvasArray[this.state.canvasArray.length-1].key
            })
        }
        else{
            this.setState({
                arrayIndex:this.state.arrayIndex-1,
                currentKey:this.state.canvasArray[this.state.arrayIndex-1].key
            })
        }
    }

    //Function to show the register modal
    showModal = (e)=>{
        this.setState({
            showModal:true
        })
    }

    //Function to hide the register modal
    hideModal = (e) =>{
        this.setState({
            showModal:false
        })
    }

    //Function that gets the data from the server , whenever we get data, we populate an array of components that can be looped through by clicking the next and previous icons
    async fetchData(){
        var canvasItems=[]
        let res = await api.get('/getCars',{
            headers:{
                authorization: "Bearer "+localStorage.getItem("authToken")
            }
        });
        let data = await res.data;
        if(data.length!==0){
            data.forEach((vehicle) => {
                console.log(vehicle.img);
                canvasItems.push(<Canvas key={vehicle.key} vehicle={vehicle} increment={this.incrementIndex} refreshData={this.fetchData} deleteFunc={this.deleteCar} decrement={this.decrementIndex} />)
                });
            this.setState({
                canvasArray:canvasItems,
                arrayIndex:0,
                currentKey:canvasItems[0].key,
                loading:false,
                empty:false
            })
        }
        else{
            this.setState({
                canvasArray:canvasItems,
                arrayIndex:0,
                currentKey:"",
                empty:true
            })
        }
    }

    //Function that deletes a vehicle from the database
    deleteCar(){
        Swal.fire({
            title: 'Delete Vehicle',
            text: 'You will not be able to undo this action',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.isConfirmed) {
                api.delete('/deleteVehicle/'+this.state.currentKey,{
                    headers:{
                        authorization: "Bearer "+localStorage.getItem("authToken")
                    }
                }).then((response)=>{
                    Swal.fire(
                        'Deleted!',
                        'Your vehicle has been deleted.',
                        'success'
                    )
                    this.fetchData()
                    
                }).catch((err)=>{
                    
                });
            } 
        });
        
    }

    render(){ //While data is still being fetched, return a spinner to show that it is loading, otherwise show the canvas with the buttons (if there is no data, show the empty component to indicate theres still no data registered)
        if(this.state.loading && !this.state.empty){
            return <LoadingC />
        }else{
            return(
                <Row className="justify-content-center ">
                    <Col lg={11} xl={11} md={11} sm={8} xs={12} >
                        {this.state.empty ? <Empty /> : this.state.canvasArray[this.state.arrayIndex]} 
                        <ButtonsContainer showModal={this.showModal} showModalEdit={this.showEditModal} deleteFunc={this.deleteCar}  />
                        <RegisterModal  show={this.state.showModal} onHide={this.hideModal}  refreshData={this.fetchData} />
                        
                    </Col>
                </Row>
            )
        }
    }
}

export default Container;