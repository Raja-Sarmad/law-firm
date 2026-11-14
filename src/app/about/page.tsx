import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { AboutVideo } from "@/components/about/AboutVideo";
import { GoldLink } from "@/components/site/Buttons";

export const metadata: Metadata = {
  title: "About George and Roberta",
  description:
    "George and Roberta Sperry created The Solo Firm Blueprint to help owners of solo and small law firms run more confident businesses.",
};

const values = [
  {
    title: "Practical Systems",
    text: "We believe a process should be clear enough for the people doing the work to understand, use, and improve. It should help deliver consistent results.",
    image: "/images/about/practical-systems.png",
  },
  {
    title: "Staff Involvement",
    text: "We value the insight of the people closest to the work. Their experience helps identify problems and develop workable solutions.",
    image: "/images/about/staff-involvement.png",
  },
  {
    title: "Informed Decisions",
    text: "Our combined accounting, legal, and process design and implementation allow us to consider all the consequences before acting.",
    image: "/images/about/informed-decisions.png",
  },
];

export default function Page() {
  return (
    <>
      <section className="shell relative overflow-hidden py-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            About Us
            <span className="h-px w-14 bg-gold" />
          </div>
          <h1 className="mt-4 font-serif text-[36px] font-medium leading-[1.08] tracking-[-0.03em] text-ivory sm:text-5xl">
            <span data-split>About George and Roberta</span>
          </h1>
          <p className="mt-3 text-[15px] font-semibold uppercase tracking-[0.18em] text-gold">George and Roberta Sperry</p>
        </div>
      </section>

      <section className="shell grid gap-6 pb-8 sm:grid-cols-2 lg:gap-8">
        <figure data-rise className="overflow-hidden rounded-[28px] border border-gold/25 bg-[#12161e]">
          <div className="relative aspect-square">
            <Image
              src="/images/about/george-headshot.jpg"
              alt="George Sperry"
              fill
              priority
              sizes="(min-width: 640px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="px-5 py-4 text-center">
            <p className="font-serif text-[22px] text-ivory">George Sperry</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">Attorney · CPA · Firm builder</p>
          </figcaption>
        </figure>
        <figure data-rise className="overflow-hidden rounded-[28px] border border-gold/25 bg-[#12161e]">
          <div className="relative aspect-square">
            <Image
              src="/images/about/roberta.jpg"
              alt="Roberta Sperry"
              fill
              priority
              sizes="(min-width: 640px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="px-5 py-4 text-center">
            <p className="font-serif text-[22px] text-ivory">Roberta Sperry</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">Process design · Banking systems</p>
          </figcaption>
        </figure>
      </section>

      <section className="shell grid items-start gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-10">
        <div data-rise className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-gold/25 sm:min-h-[420px]">
          <Image
            src="/images/george.jpg"
            alt="George Sperry at his desk"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[center_22%]"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" />
            George Sperry
          </div>
          <h2 className="mt-3 font-serif text-[30px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[38px]">
            <span data-split>Attorney, CPA, and firm builder</span>
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-ink">
            <p data-rise>
              George started his own law firm in 2002 and grew it from a solo practice into a multi-million dollar business with multiple attorneys and staff. Until retiring from practice in 2024, George spent his days dealing with both the legal work and the responsibilities of ownership: hiring, managing people, serving clients, overseeing finances, and keeping work moving.
            </p>
            <p data-rise>
              Before he became an attorney he earned his CPA license and worked in public accounting. This shaped how he approached the responsibilities of owning his own business. George understands how a business works, finds where a process breaks down, and explains how practical systems can help people do their jobs.
            </p>
            <p data-rise>
              Over the years, he experienced growth, difficult markets, and the need to change direction. Those experiences taught him to pay attention to the everyday details of running a firm—how work is assigned, how staff communicate, how clients are kept informed, and how decisions affect the business.
            </p>
          </div>
        </div>
      </section>

      <section className="shell grid items-start gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-10">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Roberta Sperry
          </div>
          <h2 className="mt-3 font-serif text-[30px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[38px]">
            <span data-split>Process design from the bank floor up</span>
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-ink">
            <p data-rise>
              Roberta began her legal career in public practice then went to work for a large bank. Her position at the bank was to find diverse businesses and ensure they had the appropriate processes and procedures in place to meet the bank’s rigid requirements.
            </p>
            <p data-rise>
              She also spent a significant amount of time as an executive overseeing the development of processes and procedures internal to the bank. Her experience gives her a clear insight into how business systems should be used to make businesses more efficient and profitable.
            </p>
          </div>
        </div>
        <div data-rise className="relative order-1 min-h-[320px] overflow-hidden rounded-[28px] border border-gold/25 sm:min-h-[420px] lg:order-2">
          <Image
            src="/images/about/roberta.jpg"
            alt="Roberta Sperry"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </section>

      <section className="shell py-8 lg:py-10">
        <div data-rise className="rounded-[28px] border border-gold/25 bg-[#12161e] px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">The Blueprint</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.03em] text-ivory sm:text-[36px]">
            <span data-split>Built from what they lived</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-ink">
            George and Roberta created The Solo Firm Blueprint to share what they learned through that experience. The goal is to help owners of solo and small law firms become more confident in running their businesses, with useful tools and a clearer understanding of what needs their attention.
          </p>
        </div>
      </section>

      <section className="shell py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-14 bg-gold" />
            How we work
            <span className="h-px w-14 bg-gold" />
          </div>
          <h2 className="mt-4 font-serif text-[32px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[42px]">
            <span data-split>What we bring to every firm</span>
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} data-rise className="rounded-[24px] border border-gold/25 bg-[#10131a]/80 px-5 py-6 text-center sm:px-6">
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-2xl bg-ivory/95">
                <Image src={item.image} alt="" fill sizes="80px" className="object-contain p-2" />
              </div>
              <h3 className="mt-4 font-serif text-[22px] text-ivory">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-ink">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell grid items-center gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:py-10">
        <div data-rise className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-gold/25 sm:min-h-[340px]">
          <Image
            src="/images/about/headshot-blue.jpg"
            alt="George Sperry"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Watch
          </div>
          <h2 className="mt-3 font-serif text-[30px] font-medium leading-[1.12] tracking-[-0.03em] text-ivory sm:text-[38px]">
            <span data-split>Hear how the Blueprint came together</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink">
            A short look at the work behind The Solo Firm Blueprint—and why solo and small-firm owners need systems that run without them.
          </p>
        </div>
      </section>

      <section className="shell py-4 lg:py-6">
        <div data-rise className="mx-auto max-w-4xl">
          <AboutVideo />
        </div>
      </section>

      <section className="shell pb-12 pt-8 sm:pb-14">
        <div data-rise className="overflow-hidden rounded-[28px] border border-gold/25 bg-[#12161e]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Join the free challenge</p>
              <h2 className="mt-3 font-serif text-[28px] leading-[1.15] text-ivory sm:text-[36px]">
                Ready to put systems around the work that still lands on your desk?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink">
                Start with the free 5-day challenge, or book the Firm Audit if you want a closer look at where your time and profit go.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <GoldLink href="/#challenge">Join the Free Challenge</GoldLink>
                <Link href="/audit" className="inline-flex items-center gap-2 text-sm font-semibold text-ivory hover:text-gold">
                  Book the Firm Audit
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[220px] lg:min-h-full">
              <Image
                src="/images/about/blueprint-banner.png"
                alt="The Solo Firm Blueprint"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
