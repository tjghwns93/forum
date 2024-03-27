import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"


export default async function Write(){


        const session = await getServerSession(authOptions);
        if (!session) {
            return <div className="p-50">사용자 권한 없음.(로그인 해주세요.)</div>
        }


    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="글제목" style={{width:'30%'}}/>
                <textarea name="content" placeholder="글내용"/>
                <button type="submit">글작성</button>
            </form>
        </div>
    )
}
