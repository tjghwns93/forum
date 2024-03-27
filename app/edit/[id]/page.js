import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";


export default async function Edit(props){
    let session = await getServerSession(authOptions); 
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)});
    // await db.collection('post').updateOne({_id : result._id}, {$set : { title : '',content : ''}})

    if(session){

        if(session.user.email == result.author){
            return (
                <div className="p-20">
                    <h4>수정 페이지</h4>
                    <form action="/api/post/edit" method="POST">
                        <input name="title" defaultValue={result.title}/>
                        <input name="content" defaultValue={result.content}/>
                        <input style={{display : 'none'}} name="_id" defaultValue={result._id.toString()}></input>
                        <button type="submit">버튼</button>
                    </form>
                </div>
            )
        }else{
            return <div>편집권한이 없습니다.</div>
    }
}else{
    return <div>편집권한이 없습니다.</div>
}

}