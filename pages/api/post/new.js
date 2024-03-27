import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(요청, 응답){
    let session = await getServerSession(요청, 응답, authOptions);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });



    if(요청.method == 'POST'){
        if(요청.body.title == ''){
            return 응답.status(500).json('제목을 쓰세요.');
        }else if(요청.body.content == ''){
            return 응답.status(500).json('빈칸입니다.');
        }
        if(session){
            요청.body.author = session.user.email;
            요청.body.name = session.user.name;
            요청.body.time = formattedDate;
        }
        const db = (await connectDB).db('forum');
        let result = await db.collection('post').insertOne(요청.body);

        return 응답.status(200).redirect('/list');
    }
}