'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function DarkMode(){
    let router = useRouter()
    let [modeicon, setModeicon] = useState('');
    
    useEffect(()=>{
        let modename = (`; ${document.cookie}`).split('; mode=').pop().split(';')[0];
        if(modename == ''){
            document.cookie = 'mode=light; max-age=' + (3600 * 24 *400)
        }else if(modename == 'light'){
            setModeicon('🌙')
        }else{
            setModeicon('🌞')
        }
        
    },[])

    return (
        <span onClick={()=>{
            let modename = (`; ${document.cookie}`).split('; mode=').pop().split(';')[0];
            if(modename == 'light'){
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                setModeicon('🌞')
                router.refresh()
            }else{
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                setModeicon('🌙')
                router.refresh()
            }
            
            
        }}>{modeicon}</span>
    )
}