import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection : ConnectionObject = {}

async function dbconnect(): Promise<void>{

if(connection.isConnected){
    console.log('Already Database Connected');
    return 
}

try {
    const db = await mongoose.connect(process.env.MONGODB_URI! || '',{})

    console.log('MongoDb Connect Successfully✨', db);
    console.log(db.connection);
    
} catch (error) {
    console.log('Database Connection Faild', error);
    process.exit(1)
}
}

export default dbconnect;