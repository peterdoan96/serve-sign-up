"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email || !password || !email.includes("@")) return
    localStorage.setItem("dummyUser", JSON.stringify({ email, loginTime: new Date().toISOString() }))
    router.push("/onboarding")
  }

  return (
    <main className="serve-shell flex min-h-screen w-full items-center justify-center px-5 py-12">
      <section className="w-full max-w-md">
        <div className="mb-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          <span className="text-lg tracking-[0.16em] text-black">SERVE</span>
          <span>Property operations, simplified</span>
        </div>
        <div className="mb-8">
          <p className="eyebrow">Get started</p>
          <h1 className="display-title mt-3 text-5xl leading-[0.98]">Create your account</h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-500">Everything your property needs to run beautifully, in one calm workspace.</p>
        </div>
        <form onSubmit={handleSubmit} className="flat-card space-y-5 p-7 sm:p-9">
          <label className="field-label">Email<input className="serve-input mt-2" type="email" placeholder="you@property.com" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="field-label">Password<div className="relative mt-2"><input className="serve-input pr-12" type={showPassword ? "text" : "password"} placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
          <button className="serve-button mt-2 w-full" type="submit">Sign Up</button>
          <p className="pt-2 text-center text-sm text-neutral-500">Already have an account? <button type="button" className="font-semibold text-black underline underline-offset-4">Log in</button></p>
        </form>
        <p className="mt-7 text-center text-xs text-neutral-400">By continuing, you agree to SERVE&apos;s terms and privacy policy.</p>
      </section>
    </main>
  )
}
