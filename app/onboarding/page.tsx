"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

export default function OnboardingPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()
  useEffect(() => { const raw = localStorage.getItem("dummyUser"); if (!raw) router.push("/"); else setEmail(JSON.parse(raw).email) }, [router])
  return <main className="serve-shell flex min-h-screen items-center justify-center px-5 py-12"><section className="w-full max-w-xl"><StepLabel number="01" label="Your account" /><div className="mb-9"><p className="eyebrow">Welcome to SERVE</p><h1 className="display-title mt-3 text-5xl">You&apos;re in, {email.split("@")[0] || "there"}.</h1><p className="mt-5 max-w-md text-sm leading-6 text-neutral-500">A few thoughtful details will help us shape SERVE around the way your property works.</p></div><div className="flat-card divide-y divide-black/10"><Checklist label="Account created" done /><Checklist label="Property setup ready" done /><Checklist label="Complete setup" /></div><button onClick={() => router.push("/job-role")} className="serve-button mt-7 w-full">Continue <ArrowRight size={17} /></button></section></main>
}
function StepLabel({ number, label }: { number: string; label: string }) { return <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400"><span className="text-black">{number}</span><span className="h-px w-10 bg-black/20" />{label}</div> }
function Checklist({ label, done = false }: { label: string; done?: boolean }) { return <div className="flex items-center gap-4 p-5 text-sm font-medium"><span className={`flex h-7 w-7 items-center justify-center rounded-full border ${done ? "border-black bg-black text-white" : "border-black/25 text-transparent"}`}><Check size={14} /></span>{label}</div> }
