import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function Home() {
  
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className="home_banner">
      <p>프론트엔드 Next.js 게시판 포트폴리오입니다.</p>
      <Link href={'/list'}>게시판가기</Link>
    </div>
  );
}
