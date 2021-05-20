import axios from "axios" //Import axios npm package

const api=axios.create({ //Utility to expose and reuse the axios functions to other components , here are the initial settings for the axios package
    baseURL:"https://drivvu-app.herokuapp.com/",
    timeout:5000

});


export default api; //Expose the constant that has the axios methods to other components
