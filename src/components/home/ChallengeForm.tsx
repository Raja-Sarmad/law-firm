"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export function ChallengeForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-6 text-[15px] leading-7 text-ivory">
        You’re on the list. Free. No credit card. No spam. Unsubscribe anytime.
      </p>
    );
  }

  return (
    <form
      className="mt-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">First name</span>
          <input
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="First name"
            className="h-11 w-full rounded-full border border-gold/30 bg-white/5 px-4 text-sm text-ivory outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="min-w-0 flex-1">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="h-11 w-full rounded-full border border-gold/30 bg-white/5 px-4 text-sm text-ivory outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-[#e0c06e] to-[#b8923f] px-5 text-sm font-semibold text-[#0f1218] transition-[filter] hover:brightness-110"
      >
        Join the Free Challenge
      </button>
      <p className="mt-3 text-[13px] leading-5 text-muted">Free. No credit card. No spam. Unsubscribe anytime.</p>
      <Link href="/audit" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-gold">
        Or book the Firm Audit
        <ArrowIcon className="h-4 w-4" />
      </Link>
    </form>
  );
}
