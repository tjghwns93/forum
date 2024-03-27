import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";



export default async function handler(요청, 응답){
    let session = await getServerSession(요청, 응답, authOptions);
    요청.body = JSON.parse(요청.body);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    
    if(요청.method == 'POST'){
        
        if(!session || !session.user){
            return 응답.status(500).json('로그인하세요.');
        }

        if(요청.body.comment == ''){
           return 응답.status(500).json('빈칸입니다.');
        }

        let commentOJ = {
            content : 요청.body.comment,
            parent : new ObjectId(요청.body._id),
            author : session.user.email,
            name : session.user.name,
            time : formattedDate
        }
        
            const db = (await connectDB).db('forum');
            await db.collection('comment').insertOne(commentOJ);
                let result = await db.collection('comment').find({ parent : new ObjectId(요청.body._id)}).toArray();
                응답.status(200).json(result);

        }
        


}