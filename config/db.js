import mongoose from 'mongoose'
import { ENV_VARS } from './envVars.js'
import { error } from 'console'
export const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("Mongosss:"+conn.connection.host);

    }catch(error){
        console.error("error:"+error.message)
    process.exit(1);//1=failure 0=sucess
    
}
}
