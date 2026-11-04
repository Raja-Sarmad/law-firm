import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/checkout/Checkout";
import { courses, getCourse } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return { title: course ? `Enroll in ${course.title}` : "Checkout" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <Checkout course={course} />;
}
