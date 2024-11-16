const mongoose = require('mongoose')

const mongoConn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mateoperez:mateo123@asesoriadb.k8xwo.mongodb.net/?retryWrites=true&w=majority&appName=asesoriadb', {
            
            dbName: 'asesoriadb'
        })
        console.log('Conexión correcta a Mongo')
    }catch(e){
        console.log('Error', e)
        throw new Error('Error conectando a Mongo')
    }
}

module.exports = { mongoConn } 


