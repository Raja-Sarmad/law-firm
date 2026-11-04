"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "@/lib/gsap";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  wide?: boolean;
};

export function InquiryForm({
  fields,
  submitLabel,
  successTitle,
  successText,
}: {
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successText: string;
}) {
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const node = event.currentTarget;
    if (!node.checkValidity()) {
      node.reportValidity();
      gsap.fromTo(node, { x: -8 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" });
      return;
    }
    setDone(true);
  };

  if (done) return <SuccessMark title={successTitle} text={successText} />;

  return (
    <form ref={form} onSubmit={onSubmit} className="lift grid gap-4 rounded-[24px] bg-paper p-6 sm:grid-cols-2 sm:p-8">
      {fields.map((field) => (
        <label key={field.name} className={`block text-sm ${field.wide || field.type === "textarea" || field.options ? "sm:col-span-2" : ""}`}>
          <span className="mb-1.5 block font-medium text-ink">{field.label}</span>
          {field.options ? (
            <select name={field.name} required className={control} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea name={field.name} required rows={5} placeholder={field.placeholder} className={`${control} h-auto py-3`} />
          ) : (
            <input
              name={field.name}
              required
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className={control}
            />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button
          type="submit"
          data-magnetic
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gold text-sm font-semibold text-white hover:bg-gold-deep sm:w-auto sm:px-8"
        >
          <span className="magnetic-inner">{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}

const control = "h-12 w-full rounded-xl border border-line bg-cream/50 px-4 text-sm text-navy outline-none";

function SuccessMark({ title, text }: { title: string; text: string }) {
  const svg = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const circle = svg.current?.querySelector(".check-circle") as SVGGeometryElement | null;
    const path = svg.current?.querySelector(".check-path") as SVGGeometryElement | null;
    if (!circle || !path) return;
    const circleLength = circle.getTotalLength();
    const pathLength = path.getTotalLength();
    gsap.set(circle, { strokeDasharray: circleLength, strokeDashoffset: circleLength });
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.to(circle, { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" });
    gsap.to(path, { strokeDashoffset: 0, duration: 0.4, delay: 0.3, ease: "power2.out" });
  }, []);
  return (
    <div className="lift rounded-[24px] bg-paper px-8 py-12 text-center">
      <svg ref={svg} viewBox="0 0 52 52" className="mx-auto h-14 w-14 text-gold">
        <circle cx="26" cy="26" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="check-circle" />
        <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.4" className="check-path" />
      </svg>
      <h2 className="mt-5 font-serif text-3xl text-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

export function LoginView() {
  const [name, setName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setName(sessionStorage.getItem("bylaw-learner"));
    setReady(true);
  }, []);

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const label = email.split("@")[0]?.replace(/[._-]/g, " ") || "Learner";
    const pretty = label.replace(/\b\w/g, (char) => char.toUpperCase());
    sessionStorage.setItem("bylaw-learner", pretty);
    window.dispatchEvent(new Event("bylaw-auth"));
    setName(pretty);
  };

  const signOut = () => {
    sessionStorage.removeItem("bylaw-learner");
    window.dispatchEvent(new Event("bylaw-auth"));
    setName(null);
  };

  return (
    <div className="shell grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
      <div className="relative hidden min-h-[520px] overflow-hidden rounded-[28px] lg:block" data-clip>
        <img src="/images/courthouse.jpg" alt="Courthouse columns" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-banner/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Student desk</p>
          <p className="mt-2 font-serif text-4xl">Pick up the course where you left the file.</p>
        </div>
      </div>
      <div>
        <h1 className="font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
          {name ? `Welcome back, ${name}` : "Login"}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          Sign in to the academy preview. Your password is not stored.
        </p>
        {ready && name ? (
          <button
            type="button"
            onClick={signOut}
            className="mt-8 h-12 rounded-full border border-line bg-paper px-6 text-sm font-semibold"
          >
            Sign out
          </button>
        ) : (
          <form onSubmit={signIn} className="mt-8 grid max-w-md gap-4">
            <label className="text-sm">
              <span className="mb-1.5 block font-medium">Email</span>
              <input name="email" type="email" required placeholder="you@firm.com" className={control} />
            </label>
            <label className="text-sm">
              <span className="mb-1.5 block font-medium">Password</span>
              <input name="password" type="password" required minLength={4} placeholder="••••••••" className={control} />
            </label>
            <button
              type="submit"
              data-magnetic
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-white"
            >
              <span className="magnetic-inner">Sign in</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
