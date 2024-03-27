import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';



export default async function handler(요청, 응답){
    if(요청.method == 'POST'){
        for(let key in 요청.body){
            if(!요청.body[key]){
                return 응답.status(500).json('빈칸이 있습니다.');
            }
        }
        let db = (await connectDB).db('forum');
        let result = await db.collection('user_cred');
        let loginEmail = 요청.body.email;
        let loginOk = await result.findOne({email: loginEmail});
        

        if(loginOk){
            return 응답.status(500).json('이미 존재하는 이메일입니다.');
        }

        let hash = await bcrypt.hash(요청.body.password, 10);
        요청.body.password = hash;
        await db.collection('user_cred').insertOne(요청.body);
        응답.status(200).redirect('/');
    }
}
