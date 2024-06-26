import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import DarkMode from "./DarkMode";
import "./globals.css";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  let res = cookies().get('mode');

  return (
    <html lang="en">
      <body className={
        res != undefined && res.value == 'dark' 
        ? 'dark-mode' 
        : ''
        }>
        <div className="navbar">
          <Link href={'/list'} className='logo'>서호준 Next.js 게시판</Link>
          <Link href={'/write'}>글작성</Link>
          {
            session
            ? <p className="loginBar">{session.user.name}님 <LogoutBtn/> </p>
            : <div><Link href={'/register'}>회원가입 </Link> <LoginBtn/> </div>
          }
          <DarkMode/>
        </div>
        {children}
      </body>
    </html>
  );
}
