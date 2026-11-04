export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Category =
  | "Corporate Law"
  | "Criminal Law"
  | "Civil Law"
  | "Contract Law"
  | "Intellectual Property"
  | "Family Law";

export type Lesson = { title: string; duration: string };
export type Module = { title: string; lessons: Lesson[] };

export type Course = {
  slug: string;
  title: string;
  summary: string;
  about: string;
  category: Category;
  level: Level;
  price: number;
  compareAt: number;
  modulesCount: number;
  hours: number;
  rating: number;
  reviews: number;
  image: string;
  cover: string;
  badge?: "Bestseller" | "Most Enrolled" | "New";
  outcomes: string[];
  curriculum: Module[];
  featured?: boolean;
};

export type Chapter = { kicker: string; title: string; text: string };

const outline = (titles: string[]): Module[] =>
  titles.map((title) => ({
    title,
    lessons: [
      { title: "Concept briefing", duration: "12 min" },
      { title: "Guided walkthrough", duration: "18 min" },
      { title: "Applied exercise", duration: "15 min" },
    ],
  }));

export const categories: Category[] = [
  "Corporate Law",
  "Criminal Law",
  "Civil Law",
  "Contract Law",
  "Intellectual Property",
  "Family Law",
];

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export const instructor = {
  name: "Imran Shah",
  role: "Senior Partner & Lead Instructor",
  image: "/images/portrait-instructor.jpg",
  bio: "Imran leads the education desk at BYLAW Academy and still advises on live corporate and commercial matters. His classes are built from documents he has negotiated, not from recycled outlines. Learners work through the same questions he asks junior lawyers in the firm.",
};

export const learnerAvatars = [
  "/images/learner-1.jpg",
  "/images/learner-2.jpg",
  "/images/learner-3.jpg",
  "/images/learner-4.jpg",
];

export const courses: Course[] = [
  {
    slug: "contract-law-mastery",
    title: "Contract Law Mastery",
    summary: "Learn the principles, drafting and enforcement of contracts.",
    about:
      "This course provides a comprehensive understanding of contract law, from fundamental principles to advanced drafting and enforcement techniques.",
    category: "Contract Law",
    level: "Intermediate",
    price: 99,
    compareAt: 149,
    modulesCount: 12,
    hours: 6,
    rating: 4.9,
    reviews: 1240,
    image: "/images/course-contract.jpg",
    cover: "/images/course-detail.jpg",
    badge: "Bestseller",
    featured: true,
    outcomes: [
      "Key principles of contract law",
      "Drafting clear and enforceable contracts",
      "Rights, obligations and remedies",
      "Contract breach and legal enforcement",
      "Real-world case studies and practical examples",
    ],
    curriculum: outline([
      "Foundations of a binding contract",
      "Offer, acceptance and consideration",
      "Drafting clauses that hold up",
      "Breach, remedies and enforcement",
    ]),
  },
  {
    slug: "corporate-law-essentials",
    title: "Corporate Law Essentials",
    summary: "Understand business law, compliance and corporate governance.",
    about:
      "A practical corporate course for students and counsel who need to read a company clearly: formation, directors’ duties, compliance, and the governance habits that keep a board out of trouble.",
    category: "Corporate Law",
    level: "Intermediate",
    price: 129,
    compareAt: 199,
    modulesCount: 14,
    hours: 8,
    rating: 4.8,
    reviews: 980,
    image: "/images/course-corporate.jpg",
    cover: "/images/course-corporate.jpg",
    badge: "Most Enrolled",
    featured: true,
    outcomes: [
      "How companies are formed and owned",
      "Directors’ duties and board process",
      "Compliance programs that actually run",
      "Reading constitutional documents",
      "Governance issues in growing companies",
    ],
    curriculum: outline([
      "The company as a legal person",
      "Shares, owners and control",
      "The board and its duties",
      "Compliance in daily operations",
    ]),
  },
  {
    slug: "criminal-law-procedure",
    title: "Criminal Law & Procedure",
    summary: "A practical guide to criminal law, procedure and case handling.",
    about:
      "Follow a criminal matter from the first instruction through charge, evidence, and hearing prep. The course stays close to procedure, files, and the decisions defense and prosecution teams actually make.",
    category: "Criminal Law",
    level: "Intermediate",
    price: 109,
    compareAt: 169,
    modulesCount: 10,
    hours: 7,
    rating: 4.9,
    reviews: 860,
    image: "/images/course-criminal.jpg",
    cover: "/images/course-criminal.jpg",
    badge: "New",
    featured: true,
    outcomes: [
      "Elements of common criminal offences",
      "Procedure from arrest to hearing",
      "Reading a charge and a brief",
      "Evidence that does and does not travel",
      "Case handling with a clear file",
    ],
    curriculum: outline([
      "Offences and elements",
      "The life of a criminal file",
      "Evidence and disclosure",
      "Hearings and advocacy notes",
    ]),
  },
  {
    slug: "civil-litigation-studio",
    title: "Civil Litigation Studio",
    summary: "Pleadings, interim relief, and the rhythm of a civil file.",
    about:
      "A beginner-friendly studio for civil disputes. You will map a claim, draft the spine of a pleading, and learn how interim applications change the life of a case.",
    category: "Civil Law",
    level: "Beginner",
    price: 89,
    compareAt: 139,
    modulesCount: 9,
    hours: 6,
    rating: 4.7,
    reviews: 640,
    image: "/images/course-civil.jpg",
    cover: "/images/course-civil.jpg",
    outcomes: [
      "Spotting a viable civil claim",
      "Structure of pleadings",
      "Interim applications and urgency",
      "Evidence bundles that a court can use",
      "Settlement without losing the file",
    ],
    curriculum: outline([
      "Is there a claim?",
      "Pleadings with a spine",
      "Interim relief",
      "Hearing prep",
    ]),
  },
  {
    slug: "intellectual-property-foundations",
    title: "Intellectual Property Foundations",
    summary: "Trade marks, copyright and the deals that protect a brand.",
    about:
      "Learn how brands, creative work, and confidential know-how are protected, licensed, and enforced, with examples taken from real commercial instructions.",
    category: "Intellectual Property",
    level: "Beginner",
    price: 119,
    compareAt: 179,
    modulesCount: 11,
    hours: 7,
    rating: 4.8,
    reviews: 540,
    image: "/images/course-ip.jpg",
    cover: "/images/course-ip.jpg",
    outcomes: [
      "What each IP right actually covers",
      "Clearance before a launch",
      "Licensing without giving the asset away",
      "Enforcement letters that stay credible",
      "Working with creators and founders",
    ],
    curriculum: outline([
      "The map of IP rights",
      "Trade marks and brands",
      "Copyright in practice",
      "Licenses and enforcement",
    ]),
  },
  {
    slug: "family-law-in-practice",
    title: "Family Law in Practice",
    summary: "Care, separation, and the documents families actually sign.",
    about:
      "A measured introduction to family practice: jurisdiction, children, financial relief, and the tone of a file where the client’s life is the subject of the order.",
    category: "Family Law",
    level: "Beginner",
    price: 95,
    compareAt: 145,
    modulesCount: 8,
    hours: 5,
    rating: 4.7,
    reviews: 480,
    image: "/images/course-family.jpg",
    cover: "/images/course-family.jpg",
    outcomes: [
      "First meetings and conflict checks",
      "Children arrangements",
      "Financial disclosure",
      "Consent orders and undertakings",
      "Writing to the other side with care",
    ],
    curriculum: outline([
      "The family file",
      "Children",
      "Money and disclosure",
      "Resolving without a trial",
    ]),
  },
  {
    slug: "mergers-and-governance",
    title: "Mergers & Governance",
    summary: "Advanced corporate work: deals, diligence, and board control.",
    about:
      "For lawyers who already know the company basics and want the pace of a transaction: diligence lists, risk memos, and the governance decisions that sit beside a signing.",
    category: "Corporate Law",
    level: "Advanced",
    price: 179,
    compareAt: 249,
    modulesCount: 12,
    hours: 9,
    rating: 4.9,
    reviews: 410,
    image: "/images/gavel-dark.jpg",
    cover: "/images/gavel-dark.jpg",
    outcomes: [
      "Running a diligence workstream",
      "Issue lists a partner will trust",
      "Deal protections and conditions",
      "Board approvals that are actually valid",
      "Closing mechanics",
    ],
    curriculum: outline([
      "How a deal is staffed",
      "Diligence with judgment",
      "The agreement’s pressure points",
      "Approval and closing",
    ]),
  },
  {
    slug: "constitutional-remedies",
    title: "Constitutional Remedies",
    summary: "Public law remedies, standing, and how a petition is built.",
    about:
      "Study constitutional litigation as a craft: who can file, what the court can order, and how a petition is structured so the remedy is thinkable.",
    category: "Civil Law",
    level: "Advanced",
    price: 139,
    compareAt: 199,
    modulesCount: 10,
    hours: 8,
    rating: 4.8,
    reviews: 390,
    image: "/images/courthouse.jpg",
    cover: "/images/courthouse.jpg",
    outcomes: [
      "Standing and jurisdiction",
      "Choosing a remedy",
      "Petition structure",
      "Interim orders in public law",
      "Reading a constitutional judgment",
    ],
    curriculum: outline([
      "The public law toolkit",
      "Standing",
      "Drafting the petition",
      "The hearing",
    ]),
  },
  {
    slug: "contract-drafting-workshop",
    title: "Contract Drafting Workshop",
    summary: "A beginner’s workshop for clean, modern commercial drafting.",
    about:
      "Shorter than Contract Law Mastery and aimed at first drafts: operative clauses, definitions, and the habits that keep a document readable under pressure.",
    category: "Contract Law",
    level: "Beginner",
    price: 79,
    compareAt: 119,
    modulesCount: 8,
    hours: 5,
    rating: 4.8,
    reviews: 720,
    image: "/images/course-civil.jpg",
    cover: "/images/course-detail.jpg",
    outcomes: [
      "A repeatable drafting order",
      "Definitions that do real work",
      "Risk clauses in plain language",
      "Mark-ups that partners can follow",
      "Version control on a live draft",
    ],
    curriculum: outline([
      "Before you draft",
      "Operative clauses",
      "Boilerplate with intent",
      "Mark-up and close",
    ]),
  },
  {
    slug: "white-collar-investigations",
    title: "White-Collar Investigations",
    summary: "Internal investigations, interviews, and regulatory exposure.",
    about:
      "An advanced criminal and regulatory course on how companies investigate themselves, when to escalate, and how counsel keeps the record straight.",
    category: "Criminal Law",
    level: "Advanced",
    price: 159,
    compareAt: 219,
    modulesCount: 11,
    hours: 8,
    rating: 4.9,
    reviews: 300,
    image: "/images/gavel-dark.jpg",
    cover: "/images/course-criminal.jpg",
    outcomes: [
      "Scoping an investigation",
      "Interview notes that hold",
      "Privilege and its edges",
      "Reporting to a board",
      "When a regulator is already in the room",
    ],
    curriculum: outline([
      "The first 72 hours",
      "Documents and interviews",
      "Privilege",
      "Findings and reporting",
    ]),
  },
  {
    slug: "trademark-brand-protection",
    title: "Trademark & Brand Protection",
    summary: "Filing strategy, watches, and enforcement for growing brands.",
    about:
      "Go deeper on trade marks: specification drafting, oppositions, and the enforcement rhythm for a brand that is starting to travel.",
    category: "Intellectual Property",
    level: "Intermediate",
    price: 129,
    compareAt: 189,
    modulesCount: 9,
    hours: 6,
    rating: 4.7,
    reviews: 260,
    image: "/images/course-ip.jpg",
    cover: "/images/course-ip.jpg",
    outcomes: [
      "Specification drafting",
      "Clearance searches with judgment",
      "Oppositions and replies",
      "Online enforcement",
      "Brand guidelines counsel can live with",
    ],
    curriculum: outline([
      "Filing with a strategy",
      "Conflicts",
      "Oppositions",
      "Living with the registration",
    ]),
  },
  {
    slug: "negotiation-for-lawyers",
    title: "Negotiation for Lawyers",
    summary: "Prepare, concede, and close without losing the client’s brief.",
    about:
      "A practical negotiation course for corporate and disputes lawyers. You will plan a concession path, run a meeting, and write the follow-up the same day.",
    category: "Corporate Law",
    level: "Beginner",
    price: 99,
    compareAt: 149,
    modulesCount: 7,
    hours: 4,
    rating: 4.8,
    reviews: 510,
    image: "/images/course-detail.jpg",
    cover: "/images/course-detail.jpg",
    outcomes: [
      "Preparing a negotiation brief",
      "Opening without giving the case away",
      "Concession paths",
      "Breaking deadlock",
      "Writing the deal you actually made",
    ],
    curriculum: outline([
      "The brief before the room",
      "The meeting",
      "Deadlock",
      "The paper afterwards",
    ]),
  },
];

export const practiceAreas: {
  name: Category;
  image: string;
  text: string;
}[] = [
  {
    name: "Corporate Law",
    image: "/images/course-corporate.jpg",
    text: "Companies, governance, and the transactions that change who controls them. Built for counsel who read boards and cap tables for a living.",
  },
  {
    name: "Criminal Law",
    image: "/images/course-criminal.jpg",
    text: "Offences, procedure, and investigations. The work is file-based: charges, disclosure, interviews, and hearings.",
  },
  {
    name: "Civil Law",
    image: "/images/course-civil.jpg",
    text: "Claims, pleadings, public-law remedies, and the long middle of a civil dispute where most cases are actually won.",
  },
  {
    name: "Contract Law",
    image: "/images/course-contract.jpg",
    text: "Formation, drafting, and enforcement. Every course in this area ends with language a client could sign.",
  },
  {
    name: "Intellectual Property",
    image: "/images/course-ip.jpg",
    text: "Brands, copyright, and the licenses that let a business use what it does not wholly own.",
  },
  {
    name: "Family Law",
    image: "/images/course-family.jpg",
    text: "Children, separation, and financial relief, taught with the pace and tone a family file demands.",
  },
];

export const testimonials = [
  {
    quote:
      "The courses are practical, well-structured and taught by real legal professionals. Highly recommended!",
    name: "Aneba Khan",
    role: "Law Student",
    image: "/images/portrait-aneba.jpg",
  },
  {
    quote:
      "A great learning experience! The content is detailed, up-to-date and very relevant to real legal practice.",
    name: "Bilal Ahmed",
    role: "Legal Associate",
    image: "/images/portrait-bilal.jpg",
  },
  {
    quote:
      "BYLAW Academy helped me strengthen my legal knowledge and advance my career.",
    name: "Sara Nawaz",
    role: "Corporate Counsel",
    image: "/images/portrait-sara.jpg",
  },
  {
    quote:
      "I took the drafting workshop between filings. The mark-ups alone changed how I send a first draft.",
    name: "Hina Raza",
    role: "Trainee Solicitor",
    image: "/images/learner-3.jpg",
  },
  {
    quote:
      "Clear, serious teaching. It respects that most of us are already in practice and short on time.",
    name: "Omar Farooq",
    role: "In-house Counsel",
    image: "/images/learner-2.jpg",
  },
];

export const storyChapters: Chapter[] = [
  {
    kicker: "The firm",
    title: "An academy inside a practice",
    text: "BYLAW Academy is the education arm of a working law firm. The courses exist because clients already ask these questions.",
  },
  {
    kicker: "The classroom",
    title: "Taught by people with open files",
    text: "Instructors are practicing lawyers. Lessons use the documents, hearings, and board papers they touched that month.",
  },
  {
    kicker: "The standard",
    title: "A certificate you can stand behind",
    text: "Completion means the applied work was done. The credential is meant to be shown to a partner, a client, or a hiring board.",
  },
];

export const posts = [
  {
    slug: "practicing-lawyers-teach-differently",
    title: "Why practicing lawyers teach differently",
    category: "Academy",
    date: "12 March 2026",
    read: "6 min",
    image: "/images/courthouse.jpg",
    excerpt:
      "A lecturer can explain the rule. A lawyer who still has the file open can tell you which sentence in the draft actually moved the other side.",
    paragraphs: [
      "Most legal education is built at a distance from the work. The outline is clean, the hypothetical is tidy, and nobody has to send the email before six. BYLAW started from the opposite end: a firm that kept answering the same training request from clients, trainees, and its own juniors.",
      "When a practicing lawyer teaches, the examples have friction. A clause is not only valid or void. It is the clause the other side rejected on Tuesday, rewritten on Wednesday, and signed with a concession nobody put in the first draft. That friction is the lesson.",
      "It also changes the pace. Our modules are short because the people taking them are already in hearings, closings, and client calls. A lesson has to earn the next twenty minutes. If it cannot be used on a live matter, it does not stay in the course.",
      "The certificate at the end is not a souvenir. It means the exercises were finished: a draft, a memo, a hearing note. That is the standard we wanted when we were hiring, and it is the standard we teach to.",
    ],
  },
  {
    slug: "contracts-that-survive-the-first-dispute",
    title: "Drafting contracts that survive the first dispute",
    category: "Contract Law",
    date: "2 February 2026",
    read: "8 min",
    image: "/images/course-contract.jpg",
    excerpt:
      "The first dispute is a poor time to discover that the operative clause and the schedule describe two different deals.",
    paragraphs: [
      "Contracts fail in ordinary ways. The defined term is used three different ways. The liability cap quietly excludes the only loss the client actually fears. The schedule was pasted from the last deal and nobody changed the dates.",
      "In Contract Law Mastery we make learners read a draft the way a dispute lawyer will read it later: out of order, in a hurry, looking for the sentence that decides the argument. If that sentence is missing, the draft is not finished.",
      "Plain language is not a style preference. A clause the client’s operator cannot follow will not be performed, and a clause the other side can misread will be misread. Precision and readability are the same task.",
      "Before anything is signed, we ask for a one-page deal story: who must do what, by when, and what happens if they do not. If the contract cannot be retold that way, it is not ready for a dispute. It is barely ready for a signature.",
    ],
  },
  {
    slug: "study-rhythm-for-working-lawyers",
    title: "A study rhythm for lawyers who already have a docket",
    category: "Study",
    date: "18 January 2026",
    read: "5 min",
    image: "/images/course-civil.jpg",
    excerpt:
      "The lawyers who finish are not the ones with the emptiest calendars. They are the ones who protected two short sittings a week.",
    paragraphs: [
      "A full docket will always offer a reason to delay a module. The trick is to stop treating study as a weekend project and start treating it as a short, immovable sitting: forty minutes, twice a week, on the calendar under the same rules as a client call.",
      "We built the academy around that constraint. Lessons are paced so one sitting can finish a walkthrough and leave a single exercise, not a pile of reading that only grows.",
      "Keep a paper note of one thing you will use on a live file. When the course touches your actual work, it stops competing with it. The drafting workshop is the clearest example: the exercise is the draft you already owe.",
      "If a week collapses, resume at the next sitting rather than restarting. Progress in this catalog is measured in finished exercises. The certificate can wait. The rhythm should not.",
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function relatedCourses(slug: string, count = 3) {
  const current = getCourse(slug);
  if (!current) return courses.slice(0, count);
  const same = courses.filter(
    (course) => course.slug !== slug && course.category === current.category,
  );
  const rest = courses.filter(
    (course) => course.slug !== slug && course.category !== current.category,
  );
  return [...same, ...rest].slice(0, count);
}

export function courseIncludes(modulesCount: number) {
  return [
    `${modulesCount} On-Demand Video Lessons`,
    "Downloadable Resources",
    "Certificate of Completion",
    "Lifetime Access",
    "Mobile & Desktop Access",
  ];
}

export const features = [
  {
    title: "Expert-Led Courses",
    text: "Learn from practicing lawyers and legal experts.",
    icon: "cap" as const,
  },
  {
    title: "Certificate of Completion",
    text: "Recognized and shareable credentials.",
    icon: "medal" as const,
  },
  {
    title: "Learn at Your Pace",
    text: "Flexible, 100% online learning.",
    icon: "laptop" as const,
  },
  {
    title: "Practical Legal Skills",
    text: "Real-world knowledge for a successful legal career.",
    icon: "case" as const,
  },
];
