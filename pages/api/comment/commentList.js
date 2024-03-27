import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function handler(요청, 응답){
    if(요청.method == "GET"){
        const db = (await connectDB).db('forum');
        let result = await db.collection('comment').find({ parent : new ObjectId(요청.query.id)}).toArray();
        응답.status(200).json(result);
    }
}