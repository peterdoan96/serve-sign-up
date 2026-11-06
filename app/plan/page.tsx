"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

type Plan = {
  name: string
  price: string
  perMonth: boolean
  detail: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    name: "Standard",
    price: "$59",
    perMonth: true,
    detail: "For boutique properties",
    features: ["Up to 50 rooms", "Up to 25 staff", "Real-time staff alerts", "Bell, valet & room service"],
    popular: true,
  },
  {
    name: "Premium",
    price: "$99",
    perMonth: true,
    detail: "For growing properties",
    features: ["51–100 rooms", "Up to 100 staff", "Real-time staff alerts", "Scheduled requests"],
  },
  {
    name: "Supreme",
    price: "$139",
    perMonth: true,
    detail: "For larger hotels",
    features: ["101+ rooms", "Unlimited staff", "Real-time staff alerts", "Priority support"],
  },
  {
    name: "Custom",
    price: "Let's talk",
    perMonth: false,
    detail: "For multi-property groups",
    features: ["Multiple properties", "Unlimited staff", "Custom setup", "Dedicated onboarding"],
  },
]

// Map the room range chosen on the property step to the matching plan.
function planForRooms(roomCount?: string): string {
  switch (roomCount) {
    case "51-100":
      return "Premium"
    case "101-250":
    case "250+":
      return "Supreme"
    default:
      return "Standard"
  }
}

export default function PlanPage() {
  const [selected, setSelected] = useState("Standard")
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem("dummyUser")
    if (!raw) {
      router.push("/")
      return
    }
    const user = JSON.parse(raw)
    setSelected(planForRooms(user.roomCount))
  }, [router])

  function next() {
    const user = JSON.parse(localStorage.getItem("dummyUser") || "{}")
    localStorage.setItem("dummyUser", JSON.stringify({ ...user, plan: selected }))
    router.push("/welcome")
  }

  return (
    <main className="serve-shell flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-6xl">
        <div className="mb-10 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
          <span className="text-black">04</span>
          <span className="h-px w-10 bg-black/20" />
          Your plan
        </div>
        <p className="eyebrow">Simple, transparent pricing</p>
        <h1 className="display-title mt-3 text-5xl">Choose your plan</h1>
        <p className="mt-4 text-sm text-neutral-500">Billed monthly. Cancel anytime.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const isSelected = selected === plan.name
            return (
              <button
                key={plan.name}
                onClick={() => setSelected(plan.name)}
                className={`relative text-left flat-card p-6 ${isSelected ? "border-black bg-black text-white" : ""}`}
              >
                {plan.popular && (
                  <span
                    className={`absolute right-5 top-5 text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-amber-300" : "text-amber-700"}`}
                  >
                    Most Popular
                  </span>
                )}
                <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-neutral-500"}`}>{plan.name}</p>
                <p className="mt-5 text-4xl font-semibold tracking-tight">
                  {plan.price}
                  {plan.perMonth && (
                    <span className={`text-sm font-normal ${isSelected ? "text-white/60" : "text-neutral-400"}`}>/mo</span>
                  )}
                </p>
                <p className={`mt-3 text-sm ${isSelected ? "text-white/65" : "text-neutral-500"}`}>{plan.detail}</p>
                <div className={`my-6 h-px ${isSelected ? "bg-white/20" : "bg-black/10"}`} />
                {plan.features.map((feature) => (
                  <p key={feature} className="mb-3 flex items-center gap-2 text-sm">
                    <Check size={15} />
                    {feature}
                  </p>
                ))}
              </button>
            )
          })}
        </div>
        <div className="mt-10 flex items-center justify-between">
          <button onClick={() => router.push("/company-info")} className="text-sm font-semibold text-neutral-500">
            <ArrowLeft size={16} className="mr-2 inline" />
            Back
          </button>
          <button onClick={next} className="serve-button">
            Continue <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  )
}
