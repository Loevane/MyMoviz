var mongoose = require('mongoose');

var user = 'Loevane';
var password= 'BTtbtWYF2k5qhWYt';


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0-nde5z.mongodb.net/movies?retryWrites=true&w=majority`,
    options,    
    function(error) {
        if (error){
            console.log(error);
        }else{
            console.log("Connexion BDD OK")
        }
    }
);
