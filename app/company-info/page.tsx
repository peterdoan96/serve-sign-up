"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

const roomRanges = ["1-20", "21-50", "51-100", "101-250", "250+"]
export default function CompanyInfoPage() {
  const [name, setName] = useState(""); const [location, setLocation] = useState(""); const [rooms, setRooms] = useState(0); const router = useRouter()
  useEffect(() => { if (!localStorage.getItem("dummyUser")) router.push("/") }, [router])
  function next() { if (!name || !location) return; const user = JSON.parse(localStorage.getItem("dummyUser") || "{}"); localStorage.setItem("dummyUser", JSON.stringify({ ...user, propertyName: name, location, roomCount: roomRanges[rooms] })); router.push("/plan") }
  return <main className="serve-shell flex min-h-screen items-center justify-center px-5 py-12"><section className="w-full max-w-2xl"><Meta /><p className="eyebrow">Your property</p><h1 className="display-title mt-3 text-5xl">Tell us about your property</h1><div className="flat-card mt-10 space-y-6 p-7"><label className="field-label">Property name<input className="serve-input mt-2" placeholder="The Grand Hotel" value={name} onChange={(e) => setName(e.target.value)} /></label><label className="field-label">Location (city, state)<input className="serve-input mt-2" placeholder="Austin, Texas" value={location} onChange={(e) => setLocation(e.target.value)} /></label><div className="pt-3"><div className="flex items-end justify-between"><label className="field-label">How many rooms does your property have?</label><span className="text-sm font-semibold">{roomRanges[rooms]}</span></div><input aria-label="Room count" type="range" min="0" max="4" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="serve-range mt-6 w-full" /><div className="mt-3 flex justify-between text-[10px] text-neutral-400">{roomRanges.map((range) => <span key={range}>{range}</span>)}</div></div></div><div className="mt-10 flex items-center justify-between"><button onClick={() => router.push("/job-role")} className="text-sm font-semibold text-neutral-500"><ArrowLeft size={16} className="mr-2 inline" />Back</button><button onClick={next} disabled={!name || !location} className="serve-button">Continue <ArrowRight size={17} /></button></div></section></main>
}
function Meta() { return <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400"><span className="text-black">03</span><span className="h-px w-10 bg-black/20" />Property details</div> }
