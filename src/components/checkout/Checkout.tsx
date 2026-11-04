"use client";

import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BankIcon, CardIcon, LockIcon, PayPalIcon } from "@/components/icons";
import { GoldButton } from "@/components/site/Buttons";
import { Crumb } from "@/components/site/Crumb";
import type { Course } from "@/lib/data";
import { money, offPercent, savedAmount } from "@/lib/format";
import { gsap } from "@/lib/gsap";

type Method = "card" | "paypal" | "bank";

export function Checkout({ course }: { course: Course }) {
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypal, setPaypal] = useState("");
  const [account, setAccount] = useState("");
  const [done, setDone] = useState(false);
  const percent = offPercent(course.price, course.compareAt);
  const saved = savedAmount(course.price, course.compareAt);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" });
      return;
    }
    setCard("");
    setCvv("");
    setDone(true);
  };

  return (
    <div className="shell pb-20 pt-10">
      <Crumb items={[{ href: "/", label: "Home" }, { label: "Checkout" }]} />
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-[-0.03em] text-navy sm:text-5xl" data-split>
        Complete Your Enrollment
      </h1>

      {done ? (
        <Success course={course} />
      ) : (
        <form onSubmit={submit} className="mt-8">
          <div className="grid items-start gap-6 lg:grid-cols-2">
          <section className="lift rounded-[24px] bg-paper p-6">
            <h2 className="text-base font-semibold text-navy">Course Summary</h2>
            <div className="mt-5 flex gap-4">
              <div className="relative h-[84px] w-[112px] shrink-0 overflow-hidden rounded-xl">
                <Image src={course.image} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-navy">{course.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {course.modulesCount} Modules • {course.hours} Hours
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-navy">{money(course.price)}</span>{" "}
                  <span className="text-muted line-through">{money(course.compareAt)}</span>
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm font-semibold text-pine">
              You Save {money(saved)} ({percent}% OFF)
            </p>
          </section>

          <section className="lift rounded-[24px] bg-paper p-6">
            <h2 className="text-base font-semibold text-navy">Payment Details</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <MethodButton current={method} id="card" label="Card" icon={<CardIcon />} onSelect={setMethod} />
              <MethodButton current={method} id="paypal" label="PayPal" icon={<PayPalIcon />} onSelect={setMethod} />
              <MethodButton current={method} id="bank" label="Bank Transfer" icon={<BankIcon />} onSelect={setMethod} />
            </div>

            {method === "card" ? (
              <div className="mt-5 grid gap-4">
                <Field label="Card Number">
                  <div className="relative">
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={card}
                      onChange={(event) =>
                        setCard(
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16)
                            .replace(/(\d{4})(?=\d)/g, "$1 "),
                        )
                      }
                      pattern="(?:\d{4} ){3}\d{4}"
                      className={fieldClass}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                      <CardMark kind="visa" />
                      <CardMark kind="mc" />
                    </span>
                  </div>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Expiry Date">
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                        setExpiry(digits.length < 3 ? digits : `${digits.slice(0, 2)} / ${digits.slice(2)}`);
                      }}
                      pattern="(?:0[1-9]|1[0-2]) / \d{2}"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="CVV">
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
                      pattern="\d{3,4}"
                      className={fieldClass}
                    />
                  </Field>
                </div>
              </div>
            ) : null}

            {method === "paypal" ? (
              <div className="mt-5">
                <Field label="PayPal email">
                  <input
                    required
                    type="email"
                    value={paypal}
                    onChange={(event) => setPaypal(event.target.value)}
                    placeholder="name@email.com"
                    className={fieldClass}
                  />
                </Field>
              </div>
            ) : null}

            {method === "bank" ? (
              <div className="mt-5">
                <Field label="Account name">
                  <input
                    required
                    value={account}
                    onChange={(event) => setAccount(event.target.value)}
                    placeholder="Name on the transfer"
                    className={fieldClass}
                  />
                </Field>
                <p className="mt-3 text-sm leading-6 text-muted">
                  After you confirm, admissions shares the transfer reference for this enrollment. Nothing is sent to a bank from this page.
                </p>
              </div>
            ) : null}
          </section>
          </div>

          <div className="mt-8 grid items-center gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm text-muted">Total</p>
            <p className="font-serif text-5xl text-navy">{money(course.price)}</p>
          </div>
          <div>
            <GoldButton arrow className="h-12 w-full">
              Pay {money(course.price)} & Enroll Now
            </GoldButton>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
              <LockIcon className="h-3.5 w-3.5" />
              Secure & encrypted payment
            </p>
          </div>
          </div>
        </form>
      )}
    </div>
  );
}

const fieldClass =
  "h-12 w-full rounded-xl border border-line bg-cream/60 px-4 text-sm text-navy outline-none placeholder:text-muted/80";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function MethodButton({
  current,
  id,
  label,
  icon,
  onSelect,
}: {
  current: Method;
  id: Method;
  label: string;
  icon: ReactNode;
  onSelect: (id: Method) => void;
}) {
  const active = current === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl border text-xs font-semibold ${
        active ? "border-gold bg-gold/10 text-navy" : "border-line bg-cream/40 text-muted"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function CardMark({ kind }: { kind: "visa" | "mc" }) {
  if (kind === "visa") {
    return <span className="rounded bg-white px-1 text-[10px] font-bold italic tracking-tight text-[#1a1f71]">VISA</span>;
  }
  return (
    <span className="relative h-4 w-6" aria-hidden="true">
      <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#eb001b]" />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
    </span>
  );
}

function Success({ course }: { course: Course }) {
  const svg = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const node = svg.current;
    if (!node) return;
    const circle = node.querySelector(".check-circle") as SVGGeometryElement | null;
    const path = node.querySelector(".check-path") as SVGGeometryElement | null;
    if (!circle || !path) return;
    const circleLength = circle.getTotalLength();
    const pathLength = path.getTotalLength();
    gsap.set(circle, { strokeDasharray: circleLength, strokeDashoffset: circleLength });
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.to(circle, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" });
    gsap.to(path, { strokeDashoffset: 0, duration: 0.45, delay: 0.35, ease: "power2.out" });

    const origin = node.getBoundingClientRect();
    const layer = document.createElement("div");
    layer.className = "pointer-events-none fixed inset-0 z-40";
    document.body.appendChild(layer);
    for (let index = 0; index < 16; index += 1) {
      const bit = document.createElement("span");
      bit.className = "absolute h-1.5 w-1.5 rounded-sm bg-gold";
      bit.style.left = `${origin.left + origin.width / 2}px`;
      bit.style.top = `${origin.top + origin.height / 2}px`;
      layer.appendChild(bit);
      const angle = (Math.PI * 2 * index) / 16;
      const distance = 70 + (index % 4) * 18;
      gsap.to(bit, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        rotation: index * 20,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }
    const timer = window.setTimeout(() => layer.remove(), 1200);
    return () => {
      window.clearTimeout(timer);
      layer.remove();
    };
  }, []);

  return (
    <div className="lift mx-auto mt-10 max-w-xl rounded-[28px] bg-paper px-8 py-12 text-center">
      <svg ref={svg} viewBox="0 0 52 52" className="mx-auto h-16 w-16 text-gold">
        <circle cx="26" cy="26" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="check-circle" />
        <path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.4" className="check-path" />
      </svg>
      <h2 className="mt-6 font-serif text-4xl text-navy">You’re enrolled</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        {course.title} is ready whenever you are. This preview confirms the seat and does not send a payment.
      </p>
      <Link href={`/courses/${course.slug}`} className="mt-6 inline-flex text-sm font-semibold text-gold-deep">
        Back to the course →
      </Link>
    </div>
  );
}
