'use client'


import Link from "next/link"

export default function ListItem (props){
  console.log(props.session)

    return (
        <div>
          <div className="container">
            <div className="list-item">
              <div className="list-item-num"><strong>번호</strong></div>
              <div className="list-item-title"><strong>제목</strong></div>
              <div className="list-item-name"><strong>글쓴이</strong></div>
              <div className="list-item-time"><strong>등록일</strong></div>
              <div className="list-item-edit"><strong>수정</strong></div>
              <div className="list-item-delete"><strong>삭제</strong></div>
            </div>
            {
                    props.result.map((a, i)=>
                        <div className="list-item" key={i}>
                          <p className="list-item-num">{props.result.length - i}</p>
                          <div className="list-item-title">
                          <Link href={`/detail/${a._id}`}>
                            <h4>{a.title}</h4>
                          </Link>
                          <p>&#91;{props.comment.filter(x=>x.parent == a._id).length}&#93;</p>
                          </div>
                          <p className="list-item-name">{a.name}</p>
                          <p className="list-item-time">{a.time.split(' ')[1].replace('.','')}-{a.time.split(' ')[2].replace('.','')}</p>
                          <Link className="list-item-edit" href={`/edit/${a._id}`}>✏️</Link>
                          <p className="list-item-delete" onClick={(e)=>{
                            fetch('/api/post/delete', {
                                method : 'DELETE',
                                body : a._id
                            })
                            .then(response=>{
                              if(response.ok){
                                e.target.parentElement.style.opacity = 0
                                setTimeout(()=>{
                                  e.target.parentElement.style.display = 'none'
                                },1000)
                              }else{
                                alert('삭제권한이 없습니다.')
                              }
                            })
                          }}>🗑️</p>
                        </div>
                    )
                }
          </div>
        </div>
    )
}