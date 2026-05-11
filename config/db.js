import mongoose, { mongoosePopulatedDocumentMarker } from "mongoose";

let cached =global.mongoose

if(!cached){
    cached = global.mongoose ={ conn: null, Promise: null}

}
async function connectDB() {

    if (cached.conn){
        return cached.conn

        if (!chached.Promise){
            const opts ={
                buffercommands:false
            }
        }
        cached.promise =(await mongoose.connect('${process.env.MONGODB_URI}/quickcart',opts)).then(mongoose=> {return mongoose})
    }
    cached.conn = await chached.Promise
    return cached.conn
}

export default connectDB