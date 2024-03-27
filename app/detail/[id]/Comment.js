'use client'

import { useEffect, useState } from "react"


export default function Comment(props){
    let [comment, setComment] = useState('');
    let [data, setData] = useState([]);

    useEffect(()=>{
        fetch(`/api/comment/commentList?id=${props._id}`).then(r=>r.json())
        .then((result)=>{
            if (Array.isArray(result)) {
                setData(result);
            } else {
                setData([]); 
            }
        })
    },[])


    return (
     <div>
        <hr></hr>
        {
            data.length > 0
            ? data.map((a, i)=>{
                return (
                    <div className="comment_wrap">
                        <div className="comment_title">
                        <span>{a.name}</span>
                        <span>({a.time})</span>
                        </div>
                        <div>
                        <p>{a.content}</p>
                        </div>
                    </div>
                )
            })
            : null
        }
        <input style={{marginTop : '40px'}} onChange={(e)=>{setComment(e.target.value)}} placeholder={props.session ? '빈칸입니다.' : '로그인하세요.'}/>
        <button onClick={()=>{
                    if (!props.session) {
                        alert('로그인하세요.');
                    } else if (!comment.trim()) {
                        // 로그인은 되어있지만, 댓글이 비어있는 경우
                        alert('빈칸입니다.');
                    } else {
                        // 로그인도 되어있고, 댓글도 채워져 있는 경우
                        fetch('/api/comment/new', {
                            method: 'POST', 
                            body: JSON.stringify({ comment: comment, _id: props._id })
                        }).then(r => r.json())
                        .then((result) => {
                            setData(result);
                        });
                    }
        }}>댓글전송</button>
     </div>
    )
}