
export default function Register() {
    return (
      <div className="register_wrap">
          <form method="POST" action="/api/auth/signup">
            <input name="name" type="text" placeholder="아이디" /> 
            <input name="email" type="text" placeholder="이메일" />
            <input name="password" type="password" placeholder="비번" />
            <button type="submit">id/pw 가입요청</button>
          </form>
      </div>
    )
  }