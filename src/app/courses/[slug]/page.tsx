import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/courses/CourseDetail";
import { courses, getCourse } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course" };
  return { title: course.title, description: course.summary };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
