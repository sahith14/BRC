export type Issue = {
  slug: string;
  number: string;
  title: string;
  punch: string;
  description: string;
  demands?: string[];
  accent: "crimson" | "pink" | "amber";
};

export const ISSUES: Issue[] = [
  {
    slug: "education-is-not-a-business",
    number: "01",
    title: "Education is not a business",
    punch: "Students are becoming customers. Education became a business.",
    description:
      "Not every building should become a school or engineering college. Strict national standards for schools, colleges and universities. Fake education destroys youth futures.",
    demands: [
      "Strict national accreditation standards",
      "Audit of fake colleges & universities",
      "Caps on commercial exploitation of education"
    ],
    accent: "crimson"
  },
  {
    slug: "zero-tolerance-paper-leaks",
    number: "02",
    title: "Zero tolerance for paper leaks",
    punch: "Students should not suffer for government incompetence.",
    description:
      "One leak destroys years of student sacrifice. BRC demands direct accountability, digital security, public investigation reports, and resignations after repeated failures.",
    demands: [
      "Direct accountability for officials",
      "Digital exam security systems",
      "Public investigation reports",
      "Resignations after repeated failures"
    ],
    accent: "pink"
  },
  {
    slug: "time-limit-recruitment",
    number: "03",
    title: "Time-limit law for government recruitment",
    punch: "Youth cannot pause life waiting for results.",
    description:
      "Recruitment cannot take years. Fixed timelines, transparent tracking, compensation for extreme delays, and no endless postponements.",
    demands: [
      "Statutory recruitment timelines",
      "Public live status tracking",
      "Compensation for delays beyond limit"
    ],
    accent: "crimson"
  },
  {
    slug: "taxes-match-development",
    number: "04",
    title: "Taxes should match development",
    punch: "People are funding the system. The system should visibly work.",
    description:
      "Income tax, road tax, GST, fuel tax, tolls — citizens pay endlessly. Where is the matching infrastructure?",
    demands: [
      "Visible infrastructure outcomes per tax rupee",
      "Public dashboards for every state",
      "Audits of unfinished promised projects"
    ],
    accent: "amber"
  },
  {
    slug: "transparency-public-money",
    number: "05",
    title: "Full transparency for public money",
    punch: "Public money should not move in darkness.",
    description:
      "Every citizen should see who got contracts, project cost, progress, delays and failures.",
    demands: [
      "Open contracts registry",
      "Real-time project tracker",
      "Mandatory public delay reports"
    ],
    accent: "pink"
  },
  {
    slug: "farmers-national-priority",
    number: "06",
    title: "Farmers deserve national priority",
    punch: "A country that ignores farmers eventually weakens itself.",
    description:
      "Faster compensation, fair pricing, irrigation transparency, and protection from exploitation.",
    demands: [
      "Faster crop & disaster compensation",
      "Transparent procurement & pricing",
      "Irrigation funds tracker"
    ],
    accent: "crimson"
  },
  {
    slug: "digital-governance",
    number: "07",
    title: "Digital governance to end small-scale corruption",
    punch: "If technology can deliver food instantly, governance can deliver documents honestly.",
    description:
      "Certificates, land registration, government approvals — why should citizens still depend on middlemen and bribes in 2026?",
    demands: [
      "Default-digital certificates & approvals",
      "Public service SLAs with refunds",
      "Bribe-free middleman elimination"
    ],
    accent: "pink"
  },
  {
    slug: "police-accountability",
    number: "08",
    title: "Police & public officers must follow the law too",
    punch: "Authority without accountability becomes fear.",
    description:
      "No abuse. No bribery. No intimidation. Body cameras, digital complaint systems, recorded interactions, strict anti-corruption monitoring.",
    demands: [
      "Mandatory body cameras",
      "Digital complaint & FIR systems",
      "Independent anti-corruption monitoring"
    ],
    accent: "crimson"
  },
  {
    slug: "government-hospitals",
    number: "09",
    title: "Government hospitals must actually function",
    punch: "Healthcare should not bankrupt ordinary families.",
    description:
      "Public healthcare jobs are public responsibility. Functioning equipment, doctors and dignity for every citizen.",
    demands: [
      "Live hospital readiness dashboards",
      "Independent quality audits",
      "Free essential medicines stock guarantee"
    ],
    accent: "amber"
  },
  {
    slug: "roads-last-longer",
    number: "10",
    title: "Roads should last longer than election campaigns",
    punch: "Roads are not temporary decoration projects.",
    description:
      "Citizens already pay enough taxes and tolls. Roads should be engineered, not painted.",
    demands: [
      "Multi-year quality guarantees",
      "Contractor blacklist registry",
      "Citizen pothole reporting with SLAs"
    ],
    accent: "pink"
  },
  {
    slug: "stop-vip-politics",
    number: "11",
    title: "Stop VIP politics",
    punch: "Public servants should live closer to public reality.",
    description:
      "No special treatment culture. No convoy chaos. No untouchable elite class of politicians.",
    accent: "crimson"
  },
  {
    slug: "anti-defection",
    number: "12",
    title: "Anti-defection & political accountability",
    punch: "Votes are not transferable property.",
    description:
      "People vote for parties, not political jumping every six months.",
    accent: "pink"
  },
  {
    slug: "youth-representation",
    number: "13",
    title: "Youth representation in policy",
    punch: "Policies about youth should include youth.",
    description:
      "Young people should help shape education, technology, jobs and internet laws.",
    accent: "amber"
  },
  {
    slug: "quality-public-projects",
    number: "14",
    title: "Strict quality checks for public projects",
    punch: "Cheap corruption becomes expensive disaster.",
    description:
      "Bridges, roads, housing, drainage. If poor-quality work collapses, somebody must be accountable.",
    accent: "crimson"
  },
  {
    slug: "real-development",
    number: "15",
    title: "Real development, not only advertisements",
    punch: "Development should be visible without a campaign video.",
    description:
      "Citizens experience reality daily. No amount of promotion can hide broken systems forever.",
    accent: "pink"
  }
];

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  caption: string;
};

export const REALITY_STATS: Stat[] = [
  { label: "Youth unemployment", value: 23, suffix: "%", caption: "of educated youth are jobless" },
  { label: "Reported corruption cases", value: 1_60_000, caption: "logged complaints per year" },
  { label: "Farmer households in debt", value: 50, suffix: "%", caption: "of agricultural families" },
  { label: "Exam paper leaks (last 5 yrs)", value: 70, caption: "publicly reported incidents" },
  { label: "Average recruitment delay", value: 26, suffix: " months", caption: "from notification to joining" },
  { label: "Roads needing repair", value: 40, suffix: "%", caption: "of national highway stretches" }
];

export type Voice = {
  id: string;
  name: string;
  role: string;
  state: string;
  story: string;
  highlighted?: boolean;
};

export const VOICES: Voice[] = [
  {
    id: "v1",
    name: "Anonymous",
    role: "Aspirant",
    state: "Uttar Pradesh",
    story:
      "I cleared three exams in three years. Each result was cancelled because of paper leaks. My family sold land. I sold my dreams.",
    highlighted: true
  },
  {
    id: "v2",
    name: "Anonymous",
    role: "Farmer's daughter",
    state: "Maharashtra",
    story:
      "My father waited 4 years for crop compensation. He never received it. He is no longer with us. The file is still pending."
  },
  {
    id: "v3",
    name: "Anonymous",
    role: "Engineering student",
    state: "Telangana",
    story:
      "They built a college in a shop. No labs. No teachers. Just a signboard. My degree is real. My education is fake."
  },
  {
    id: "v4",
    name: "Anonymous",
    role: "Daily wage worker",
    state: "Bihar",
    story:
      "I paid a bribe to get my own ration card. The government calls it digital. The middleman calls it business."
  },
  {
    id: "v5",
    name: "Anonymous",
    role: "Government hospital patient",
    state: "Odisha",
    story:
      "They told us the machine is broken. For 11 months. We were asked to buy it from outside. We could not."
  },
  {
    id: "v6",
    name: "Anonymous",
    role: "Commuter",
    state: "Karnataka",
    story:
      "The road was inaugurated in March. By July it had craters. My friend died on it in October.",
    highlighted: true
  }
];

export type Member = {
  id: string;
  name: string;
  state: string;
  email: string;
  reason: string;
  joinedAt: string;
  role: "Citizen" | "Volunteer" | "Coordinator";
};

export const MEMBERS: Member[] = [
  { id: "m1", name: "Arjun K.", state: "Telangana", email: "arjun@example.com", reason: "For my brother's exam.", joinedAt: "2026-05-12", role: "Volunteer" },
  { id: "m2", name: "Priya S.", state: "Maharashtra", email: "priya@example.com", reason: "Education must be free of fraud.", joinedAt: "2026-05-12", role: "Citizen" },
  { id: "m3", name: "Rohan M.", state: "Karnataka", email: "rohan@example.com", reason: "Roads killed my friend.", joinedAt: "2026-05-11", role: "Coordinator" },
  { id: "m4", name: "Sneha R.", state: "Andhra Pradesh", email: "sneha@example.com", reason: "My father is a farmer.", joinedAt: "2026-05-10", role: "Citizen" },
  { id: "m5", name: "Imran A.", state: "Uttar Pradesh", email: "imran@example.com", reason: "Police should follow law too.", joinedAt: "2026-05-10", role: "Volunteer" },
  { id: "m6", name: "Devi N.", state: "Tamil Nadu", email: "devi@example.com", reason: "For honest governance.", joinedAt: "2026-05-09", role: "Citizen" },
  { id: "m7", name: "Karthik V.", state: "Kerala", email: "karthik@example.com", reason: "Public hospitals must work.", joinedAt: "2026-05-08", role: "Coordinator" },
  { id: "m8", name: "Aisha B.", state: "West Bengal", email: "aisha@example.com", reason: "Where do our taxes go?", joinedAt: "2026-05-08", role: "Citizen" }
];

export type Complaint = {
  id: string;
  category: "Corruption" | "Infrastructure" | "Education" | "Healthcare" | "Recruitment" | "Police";
  location: string;
  summary: string;
  status: "New" | "Verified" | "Escalated" | "Resolved";
  createdAt: string;
};

export const COMPLAINTS: Complaint[] = [
  { id: "c1", category: "Corruption", location: "Patna, BR", summary: "Bribe demanded for land record copy.", status: "Verified", createdAt: "2026-05-12" },
  { id: "c2", category: "Infrastructure", location: "Bengaluru, KA", summary: "ORR pothole zone caused 4 accidents this week.", status: "Escalated", createdAt: "2026-05-11" },
  { id: "c3", category: "Education", location: "Lucknow, UP", summary: "Unaffiliated engineering college operating openly.", status: "New", createdAt: "2026-05-11" },
  { id: "c4", category: "Healthcare", location: "Bhubaneswar, OD", summary: "Government hospital MRI down for 11 months.", status: "Verified", createdAt: "2026-05-10" },
  { id: "c5", category: "Recruitment", location: "Bhopal, MP", summary: "MPPSC delays — 2-year wait post-exam.", status: "New", createdAt: "2026-05-09" },
  { id: "c6", category: "Police", location: "Jaipur, RJ", summary: "FIR refused without bribe.", status: "Escalated", createdAt: "2026-05-09" },
  { id: "c7", category: "Corruption", location: "Hyderabad, TS", summary: "Contractor blacklist circumvented.", status: "New", createdAt: "2026-05-08" },
  { id: "c8", category: "Infrastructure", location: "Mumbai, MH", summary: "Bridge inaugurated 4 times. Still under construction.", status: "Resolved", createdAt: "2026-05-07" }
];

export const ANALYTICS = {
  visitors7d: [820, 1320, 1190, 2450, 3210, 4820, 6200],
  signups7d: [12, 28, 31, 64, 92, 140, 215],
  topIssues: [
    { slug: "transparency-public-money", title: "Transparency for public money", views: 12450 },
    { slug: "zero-tolerance-paper-leaks", title: "Paper leaks", views: 11820 },
    { slug: "roads-last-longer", title: "Roads", views: 9670 },
    { slug: "digital-governance", title: "Digital governance", views: 8430 },
    { slug: "education-is-not-a-business", title: "Education is not a business", views: 7710 }
  ],
  engagement: {
    avgTime: "3m 42s",
    bounce: "28%",
    shares: 5820
  }
};

export const MOVEMENT = {
  name: "Bharata Rashtra Cockroaches",
  short: "BRC",
  tagline: "The ignored are speaking.",
  subTagline: "Farmers. Students. Workers. Citizens.",
  manifesto:
    "We are the ones the system forgot to count. The aspirants whose results were leaked. The farmers whose files were lost. The patients whose machines were broken. The workers whose taxes built someone else's empire. They called us insignificant. We will outlive them. Cockroaches survive what kings cannot. This is not a party. This is a reckoning."
};
