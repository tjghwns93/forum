import { connectDB } from "@/util/database";

export default async function handler2(요청, 응답){
    if( 요청.method == 'GET'){
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').find().toArray();

        return 응답.status(200).json(result)
    }
}