'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink(){
    let router = useRouter();
    let url = usePathname();
    let a = useSearchParams();
    return (
        <button onClick={()=>{ router.push('/')}}>버튼</button>
    )
}