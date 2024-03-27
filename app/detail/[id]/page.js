import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Comment from "./Comment";

export default async function Detail(props){
    const db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)});
    let session = await getServerSession(authOptions);


    return (
        <div className="detail-wrap">
            <div className="container">
            <div className="detail_header">
                <div className="container">
                <p className="detail_header_name">{result.name}</p>
                <p>{result.time}</p>
                <Link className="detail_header_list" href={'/list'}>목록</Link>
                </div>
            </div>

            <div className="detail_content"> 
                <h4>{result.title}</h4> 
                <p>{result.content}</p>
            </div>
            <Comment _id={result._id.toString()} session={session}/>

            </div>
        </div>
    )
}