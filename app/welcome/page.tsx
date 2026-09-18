"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

interface User { propertyName?: string; jobRole?: string; roomCount?: string; plan?: string }
export default function WelcomePage() { const [user, setUser] = useState<User | null>(null); const router = useRouter(); useEffect(() => { const raw = localStorage.getItem("dummyUser"); if (!raw) router.push("/"); else setUser(JSON.parse(raw)) }, [router]); if (!user) return null; return <main className="serve-shell flex min-h-screen items-center justify-center px-5 py-12"><section className="w-full max-w-xl"><p className="eyebrow">05 / All set</p><div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"><Check size={25} /></div><h1 className="display-title mt-8 text-6xl">Welcome aboard!</h1><p className="mt-5 text-lg text-neutral-500">{user.propertyName || "Your property"} is ready for a better way to operate.</p><div className="mt-10 flex flex-wrap gap-2">{[user.jobRole, user.roomCount && `${user.roomCount} rooms`, user.plan].filter(Boolean).map((item) => <span key={item} className="summary-chip">{item}</span>)}</div><button onClick={() => alert("Welcome to SERVE. Your dashboard is ready.")} className="serve-button mt-10">Enter Dashboard <ArrowRight size={17} /></button></section></main> }
