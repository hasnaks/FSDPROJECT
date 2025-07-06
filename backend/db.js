var mongoose = require ("mongoose")

mongoose.connect("mongodb+srv://user:user@cluster0.gwcd3ct.mongodb.net/petadoption?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Db connected");
    
}).catch((err)=>{
    console.log(err);
    
})
