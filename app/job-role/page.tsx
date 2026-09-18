"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

const roles = ["Owner", "General Manager", "Operations Manager", "Front Desk Lead", "Other"]
export default function JobRolePage() {
  const [selected, setSelected] = useState(""); const router = useRouter()
  useEffect(() => { if (!localStorage.getItem("dummyUser")) router.push("/") }, [router])
  function next() { if (!selected) return; const user = JSON.parse(localStorage.getItem("dummyUser") || "{}"); localStorage.setItem("dummyUser", JSON.stringify({ ...user, jobRole: selected })); router.push("/company-info") }
  return <main className="serve-shell flex min-h-screen items-center justify-center px-5 py-12"><section className="w-full max-w-2xl"><StepMeta number="02" label="Your role" /><p className="eyebrow">Let&apos;s get oriented</p><h1 className="display-title mt-3 text-5xl">What&apos;s your role at the property?</h1><p className="mt-5 text-sm text-neutral-500">We&apos;ll tailor the experience to your day-to-day.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{roles.map((role) => <button key={role} onClick={() => setSelected(role)} className={`option-card ${selected === role ? "option-card-active" : ""}`}>{role}<span className="text-xs text-neutral-400">{selected === role ? "Selected" : "Choose"}</span></button>)}</div><NavButtons back={() => router.push("/onboarding")} next={next} disabled={!selected} /></section></main>
}
function StepMeta({ number, label }: { number: string; label: string }) { return <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400"><span className="text-black">{number}</span><span className="h-px w-10 bg-black/20" />{label}</div> }
function NavButtons({ back, next, disabled }: { back: () => void; next: () => void; disabled: boolean }) { return <div className="mt-10 flex items-center justify-between"><button onClick={back} className="text-sm font-semibold text-neutral-500"><ArrowLeft size={16} className="mr-2 inline" />Back</button><button onClick={next} disabled={disabled} className="serve-button" >Continue <ArrowRight size={17} /></button></div> }
