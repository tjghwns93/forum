import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export default async function List(){

    const db = (await connectDB).db('forum');
    let result = await db.collection('post').find({ title: { $exists: true } }).toArray();
    result.reverse();

    const comment = await db.collection('comment').find({ content: { $exists: true } }).toArray();


        return (
            <div className="list-bg">
              <ListItem result={result} comment={comment}/>   
            </div>
        )
}