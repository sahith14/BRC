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
  },
  {
    slug: "direct-democratic-power",
    number: "16",
    title: "Citizens deserve direct democratic power",
    punch: "Democracy should not end after voting day.",
    description:
      "India is a representative democracy. Once every five years, citizens vote — and then largely watch from the gallery. There is no national mechanism for ballot initiatives or citizen-led referendums. BRC will responsibly explore reforms that increase citizen participation between elections — without promising unconstitutional change.",
    demands: [
      "Public consultation portals for major national & state policies",
      "Statutory thresholds — once X verified citizens support a proposal, Parliament must publicly discuss it",
      "Transparent digital tracking of every public petition",
      "Explore ballot-initiative & referendum frameworks within constitutional limits"
    ],
    accent: "crimson"
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

export type VoiceCategory =
  | "Education"
  | "Unemployment"
  | "Corruption"
  | "Farmers"
  | "Healthcare"
  | "Police"
  | "Caste discrimination"
  | "Women safety"
  | "Infrastructure"
  | "Poverty";

export const VOICE_CATEGORIES: VoiceCategory[] = [
  "Education",
  "Unemployment",
  "Corruption",
  "Farmers",
  "Healthcare",
  "Police",
  "Caste discrimination",
  "Women safety",
  "Infrastructure",
  "Poverty"
];

export type Voice = {
  id: string;
  name: string;
  role: string;
  state: string;
  story: string;
  highlighted?: boolean;
  category?: VoiceCategory;
  supports?: number;
  comments?: number;
  createdAt?: string;
};

export const VOICES: Voice[] = [
  {
    id: "v1",
    name: "Anonymous",
    role: "Aspirant",
    state: "Uttar Pradesh",
    story:
      "I cleared three exams in three years. Each result was cancelled because of paper leaks. My family sold land. I sold my dreams.",
    highlighted: true,
    category: "Unemployment",
    supports: 18420,
    comments: 612,
    createdAt: "2026-04-22"
  },
  {
    id: "v2",
    name: "Anonymous",
    role: "Farmer's daughter",
    state: "Maharashtra",
    story:
      "My father waited 4 years for crop compensation. He never received it. He is no longer with us. The file is still pending.",
    category: "Farmers",
    supports: 22130,
    comments: 1041,
    createdAt: "2026-04-15"
  },
  {
    id: "v3",
    name: "Anonymous",
    role: "Engineering student",
    state: "Telangana",
    story:
      "They built a college in a shop. No labs. No teachers. Just a signboard. My degree is real. My education is fake.",
    category: "Education",
    supports: 14980,
    comments: 487,
    createdAt: "2026-05-02"
  },
  {
    id: "v4",
    name: "Anonymous",
    role: "Daily wage worker",
    state: "Bihar",
    story:
      "I paid a bribe to get my own ration card. The government calls it digital. The middleman calls it business.",
    category: "Corruption",
    supports: 9870,
    comments: 392,
    createdAt: "2026-04-28"
  },
  {
    id: "v5",
    name: "Anonymous",
    role: "Government hospital patient",
    state: "Odisha",
    story:
      "They told us the machine is broken. For 11 months. We were asked to buy it from outside. We could not.",
    category: "Healthcare",
    supports: 11240,
    comments: 318,
    createdAt: "2026-04-10"
  },
  {
    id: "v6",
    name: "Anonymous",
    role: "Commuter",
    state: "Karnataka",
    story:
      "The road was inaugurated in March. By July it had craters. My friend died on it in October.",
    highlighted: true,
    category: "Infrastructure",
    supports: 24180,
    comments: 1112,
    createdAt: "2026-03-26"
  },
  {
    id: "v7",
    name: "Anonymous",
    role: "Unemployed graduate",
    state: "West Bengal",
    story:
      "I have a B.Tech, an MBA, and zero offers. I drive for an app to feed my parents. I don't tell them about the rejections.",
    category: "Unemployment",
    supports: 16470,
    comments: 803,
    createdAt: "2026-04-04"
  },
  {
    id: "v8",
    name: "Anonymous",
    role: "Tribal cultivator",
    state: "Chhattisgarh",
    story:
      "Three crop cycles failed. Three compensation forms filed. Three years of silence. My block shows zero payouts on the dashboard.",
    category: "Farmers",
    supports: 8240,
    comments: 256,
    createdAt: "2026-05-08"
  },
  {
    id: "v9",
    name: "Anonymous",
    role: "Woman commuter",
    state: "Delhi",
    story:
      "The bus stop has no light. The CCTV is fake. The complaint number is real but it never picks up.",
    category: "Women safety",
    supports: 19770,
    comments: 924,
    createdAt: "2026-04-19"
  },
  {
    id: "v10",
    name: "Anonymous",
    role: "Dalit graduate",
    state: "Tamil Nadu",
    story:
      "I cleared every interview round. They asked my surname at the last one. The offer was withdrawn the next day.",
    category: "Caste discrimination",
    supports: 12890,
    comments: 678,
    createdAt: "2026-04-12"
  },
  {
    id: "v11",
    name: "Anonymous",
    role: "FIR filer",
    state: "Rajasthan",
    story:
      "I was told the FIR could not be lodged without a 'fee'. I refused. I was sent home. The case never moved.",
    category: "Police",
    supports: 13420,
    comments: 542,
    createdAt: "2026-04-30"
  },
  {
    id: "v12",
    name: "Anonymous",
    role: "Slum resident",
    state: "Maharashtra",
    story:
      "The promised housing flat was never given. The eviction was instant. We sleep on the same footpath we have voted from for fifteen years.",
    category: "Poverty",
    supports: 17230,
    comments: 711,
    createdAt: "2026-04-08"
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

/* ─────────────────────────────────────────────────────────────────────────
 * PEOPLE'S DEMANDS — community-submitted proposals.
 * Used by /demands. Upvotes are stored client-side in localStorage so the
 * static export still feels alive without a backend.
 * ───────────────────────────────────────────────────────────────────────── */

export type ProposalCategory =
  | "Education"
  | "Corruption"
  | "Farmers"
  | "Jobs"
  | "Healthcare"
  | "Women Safety"
  | "Environment"
  | "Infrastructure";

export type ProposalStatus =
  | "Under Review"
  | "Community Supported"
  | "Added To Manifesto"
  | "Investigating"
  | "Rejected";

export type Proposal = {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  state: string;
  supporters: number;
  comments: number;
  status: ProposalStatus;
  submittedBy: string;
  submittedAt: string;
};

export const PROPOSALS: Proposal[] = [
  {
    id: "p1",
    title: "Mandatory placement disclosure for every college",
    description:
      "Colleges must publicly publish actual placement numbers, average packages, and dropout rates — audited by an independent body. Brochures lie. Spreadsheets cannot.",
    category: "Education",
    state: "Telangana",
    supporters: 18420,
    comments: 612,
    status: "Community Supported",
    submittedBy: "Anonymous engineering student",
    submittedAt: "2026-04-22"
  },
  {
    id: "p2",
    title: "60-day cap on FIR processing — or auto-escalation",
    description:
      "If a complaint sits with the police for more than 60 days without action, it should auto-escalate to a state-level oversight portal that the public can read. No more invisible files.",
    category: "Corruption",
    state: "Bihar",
    supporters: 22890,
    comments: 1043,
    status: "Added To Manifesto",
    submittedBy: "Anonymous citizen",
    submittedAt: "2026-04-15"
  },
  {
    id: "p3",
    title: "Single-window crop loss compensation, settled in 90 days",
    description:
      "One portal. One application. Real-time status. Compensation released within 90 days of verified damage — or the officer answers to a public delay tracker.",
    category: "Farmers",
    state: "Maharashtra",
    supporters: 14210,
    comments: 487,
    status: "Under Review",
    submittedBy: "Anonymous farmer's daughter",
    submittedAt: "2026-05-02"
  },
  {
    id: "p4",
    title: "Public live-tracker for every government recruitment",
    description:
      "Notification → exam → result → joining. Every step on a public dashboard with dates, delays and reasons. If a stage misses its deadline, citizens see it. So does the press.",
    category: "Jobs",
    state: "Uttar Pradesh",
    supporters: 31560,
    comments: 1820,
    status: "Community Supported",
    submittedBy: "Anonymous aspirant",
    submittedAt: "2026-03-30"
  },
  {
    id: "p5",
    title: "Zero-bribe certificate guarantee with refund",
    description:
      "Caste, income, residence, birth — every basic certificate must be deliverable digitally, free, in fixed time. If any official demands a bribe, the citizen receives a state-paid refund and the officer is named.",
    category: "Corruption",
    state: "Madhya Pradesh",
    supporters: 19770,
    comments: 802,
    status: "Investigating",
    submittedBy: "Anonymous worker",
    submittedAt: "2026-04-10"
  },
  {
    id: "p6",
    title: "Government hospital readiness dashboard, updated daily",
    description:
      "Every district hospital publishes — daily — which machines are working, which medicines are in stock, how many doctors are present. Patients should not discover broken systems at the emergency gate.",
    category: "Healthcare",
    state: "Odisha",
    supporters: 12640,
    comments: 391,
    status: "Under Review",
    submittedBy: "Anonymous patient",
    submittedAt: "2026-04-28"
  },
  {
    id: "p7",
    title: "Women safety audit for every public transport route",
    description:
      "Routes graded A–D on lighting, CCTV coverage, response time, and complaint resolution. Grades published, refreshed quarterly. No grade, no funding.",
    category: "Women Safety",
    state: "Delhi",
    supporters: 17320,
    comments: 924,
    status: "Community Supported",
    submittedBy: "Anonymous student",
    submittedAt: "2026-04-05"
  },
  {
    id: "p8",
    title: "Citizen pothole portal with statutory repair SLAs",
    description:
      "Geotag a pothole. The civic body has 14 days to act on arterial roads, 30 on others. Miss the SLA — contractors blacklisted, public dashboard updated.",
    category: "Infrastructure",
    state: "Karnataka",
    supporters: 24180,
    comments: 1112,
    status: "Added To Manifesto",
    submittedBy: "Anonymous commuter",
    submittedAt: "2026-03-18"
  },
  {
    id: "p9",
    title: "Mandatory tree audit before any urban project",
    description:
      "No urban project starts without an independent tree census, public hearings, and a verified replacement plan. Concrete is not progress when air is the price.",
    category: "Environment",
    state: "Tamil Nadu",
    supporters: 9810,
    comments: 247,
    status: "Under Review",
    submittedBy: "Anonymous citizen",
    submittedAt: "2026-05-08"
  },
  {
    id: "p10",
    title: "Open contracts portal — every rupee, every signature",
    description:
      "Every public contract above ₹10 lakh on a single open portal: who got it, at what cost, what timeline, what penalty for delay. Public money should not move in darkness.",
    category: "Corruption",
    state: "Rajasthan",
    supporters: 27450,
    comments: 1530,
    status: "Community Supported",
    submittedBy: "Anonymous taxpayer",
    submittedAt: "2026-03-26"
  },
  {
    id: "p11",
    title: "National student debt registry & rescue fund",
    description:
      "A public registry of how much students owe, why, and to whom. A rescue fund for cases where colleges shut down mid-degree without refund. Education shouldn't trap families for life.",
    category: "Education",
    state: "Kerala",
    supporters: 15890,
    comments: 678,
    status: "Investigating",
    submittedBy: "Anonymous parent",
    submittedAt: "2026-04-19"
  },
  {
    id: "p12",
    title: "Apprenticeship-or-stipend guarantee for every graduate",
    description:
      "If a degree didn't lead to work within 6 months, the state guarantees either a paid apprenticeship or a transition stipend — funded by recovering wasted scheme money.",
    category: "Jobs",
    state: "West Bengal",
    supporters: 21070,
    comments: 956,
    status: "Under Review",
    submittedBy: "Anonymous unemployed graduate",
    submittedAt: "2026-04-12"
  }
];

export const PROPOSAL_CATEGORIES: ProposalCategory[] = [
  "Education",
  "Corruption",
  "Farmers",
  "Jobs",
  "Healthcare",
  "Women Safety",
  "Environment",
  "Infrastructure"
];

/* ─────────────────────────────────────────────────────────────────────────
 * BLACK FILES — investigative archive of broken promises & money trails.
 * Strictly educational / documentary tone. No naming of private individuals.
 * ───────────────────────────────────────────────────────────────────────── */

export type BlackFileLabel =
  | "Pending Investigation"
  | "Contradiction Found"
  | "Public Funds Missing"
  | "Promise Unfulfilled";

export type BlackFile = {
  id: string;
  code: string; // file code, e.g. "BF-014/A"
  title: string;
  category: string;
  timeline: string;
  moneyInvolved: string;
  status: string;
  evidence: string[]; // generic references — RTI, gazette, audit, etc.
  publicImpact: string;
  unanswered: string[];
  label: BlackFileLabel;
};

export const BLACK_FILES: BlackFile[] = [
  {
    id: "bf1",
    code: "BF-001/A",
    title: "The flyover that was inaugurated four times",
    category: "Infrastructure",
    timeline: "Foundation 2017 · Inaugurations 2019, 2021, 2023, 2024",
    moneyInvolved: "≈ ₹620 Cr",
    status: "Still partially open. Service road missing.",
    evidence: ["State PWD progress reports", "Local press coverage", "Citizen RTI replies"],
    publicImpact:
      "Daily commuters routed through chronic bottleneck. Two reported road-rage deaths in detour zone.",
    unanswered: [
      "Why was the project re-inaugurated without certified completion?",
      "Where did the cost overrun go?",
      "Who signed off the second inauguration?"
    ],
    label: "Promise Unfulfilled"
  },
  {
    id: "bf2",
    code: "BF-014/C",
    title: "Smart classroom scheme — ₹400 Cr, 60% rooms unfit",
    category: "Education",
    timeline: "Announced 2019 · Phase rollout 2020–2024",
    moneyInvolved: "≈ ₹400 Cr (state share)",
    status: "Audit pending after 18 months.",
    evidence: ["State CAG draft observations", "Field surveys by independent NGOs", "Public RTI bundle"],
    publicImpact:
      "Lakhs of rural students promised digital learning rooms; many sat in front of broken or missing screens.",
    unanswered: [
      "Why were vendors paid before equipment audits?",
      "Why were warranty extensions not enforced?",
      "Where are the maintenance contracts?"
    ],
    label: "Public Funds Missing"
  },
  {
    id: "bf3",
    code: "BF-027/B",
    title: "Recruitment notification → joining: 47 months",
    category: "Jobs",
    timeline: "Notification 2020 · Final result 2023 · Joining still partial in 2026",
    moneyInvolved: "Loss of life-years, not rupees",
    status: "Court directions issued; implementation incomplete.",
    evidence: ["Public service commission communications", "High Court orders", "Petitioner testimonies"],
    publicImpact:
      "An entire batch of aspirants lost the productive years of their twenties. Several reported bankruptcy. Some lost relatives waiting.",
    unanswered: [
      "Why was the post-result process paused for 11 months?",
      "Who is the named officer responsible for the file?",
      "Why was no compensation framework even discussed?"
    ],
    label: "Pending Investigation"
  },
  {
    id: "bf4",
    code: "BF-039/D",
    title: "Hospital MRI tendered four times, never functional",
    category: "Healthcare",
    timeline: "First tender 2018 · Final installation 2022 · Down since Jul 2023",
    moneyInvolved: "≈ ₹38 Cr (capital + AMC)",
    status: "AMC vendor 'unreachable'.",
    evidence: ["District hospital procurement records", "AMC contract scans (RTI)", "Patient grievance log"],
    publicImpact:
      "Patients in three districts referred 200+ km for basic imaging. Many simply went home untreated.",
    unanswered: [
      "Was the AMC contract clause for downtime enforced?",
      "Why was the vendor not blacklisted?",
      "Who recommended the same vendor across two tenders?"
    ],
    label: "Contradiction Found"
  },
  {
    id: "bf5",
    code: "BF-052/A",
    title: "Crop compensation portal — 4 years, 0% payout to a tribal block",
    category: "Farmers",
    timeline: "Portal launched 2022 · Field block silent in records",
    moneyInvolved: "Estimated ₹74 Cr unreleased",
    status: "Block reportedly 'pending verification' for three crop cycles.",
    evidence: ["State agriculture dashboards", "Block-level RTI replies", "Field interviews"],
    publicImpact:
      "Tribal cultivators across 200+ villages report zero received compensation despite registered losses.",
    unanswered: [
      "Why does the block show 0% payout while neighbouring blocks show 60%+?",
      "Where are the verification reports for three cycles?",
      "Who is the verifying officer, and how many cases have they closed?"
    ],
    label: "Public Funds Missing"
  },
  {
    id: "bf6",
    code: "BF-068/E",
    title: "Public works contractor blacklisted in one state, hired in another",
    category: "Corruption",
    timeline: "Blacklist 2021 · Re-engaged 2023 (different state)",
    moneyInvolved: "≈ ₹180 Cr in overlapping contracts",
    status: "Cross-state coordination claimed 'in progress'.",
    evidence: ["State works dept blacklist orders", "Tender award notifications", "Press archives"],
    publicImpact:
      "Two new bridges by the same contractor showed structural defects within a year.",
    unanswered: [
      "Why is there no national blacklist registry yet?",
      "Who signed the second-state award knowing the first-state blacklist?",
      "What is the SLA for inter-state due-diligence?"
    ],
    label: "Contradiction Found"
  }
];

/* ─────────────────────────────────────────────────────────────────────────
 * MANIFESTO_DETAILS — per-demand cinematic deep dive.
 * Keyed by ISSUES[].slug. Used by /manifesto/[slug].
 * ───────────────────────────────────────────────────────────────────────── */

export type ManifestoDetail = {
  reality: string[];
  realImpact: { label: string; value: string; caption: string }[];
  brcProposes: string[];
  expectedOutcome: string;
  humanStories: { role: string; state: string; quote: string }[];
  why: string;
};

export const MANIFESTO_DETAILS: Record<string, ManifestoDetail> = {
  "education-is-not-a-business": {
    reality: [
      "Colleges have quietly turned into balance-sheet machines — every empty seat is a business problem, not an education problem.",
      "Students sign loans before they understand interest. Parents mortgage land for a brochure.",
      "Placement numbers are decorated, not audited. 'Average package' often means one outlier and a hundred no-shows.",
      "Labs exist on websites. Faculty is borrowed across departments. Infrastructure caves in after the inauguration photograph."
    ],
    realImpact: [
      { label: "Avg. engineering cost", value: "₹6–10 L", caption: "for a 4-year B.Tech, before living costs" },
      { label: "Graduates employed in field", value: "~ 38%", caption: "of those who graduate every year" },
      { label: "Family debt for one degree", value: "8–14 yrs", caption: "of repayment in low-income homes" }
    ],
    brcProposes: [
      "National accreditation audits with public scorecards for every institution",
      "Mandatory, audited placement disclosure — not brochures, but spreadsheets",
      "Hard cap on fee inflation tied to verified infrastructure outcomes",
      "Independent student grievance ombudsman with statutory power",
      "Blacklist registry of fake or non-functional institutions, refreshed quarterly"
    ],
    expectedOutcome:
      "Education stops being a debt trap. Colleges compete on outcomes, not on signboards. Students become learners again — not customers.",
    humanStories: [
      {
        role: "Engineering student",
        state: "Telangana",
        quote: "They built a college in a shop. No labs. No teachers. Just a signboard. My degree is real. My education is fake."
      },
      {
        role: "Parent",
        state: "Andhra Pradesh",
        quote: "I sold three acres so my son could study. He waits tables now. Nobody refunded the land."
      }
    ],
    why:
      "Because a country that sells education to its own youth eventually has nothing left to sell."
  },

  "zero-tolerance-paper-leaks": {
    reality: [
      "A single leaked exam destroys years of preparation, family money, and mental health.",
      "Officials respond with vague reviews, fresh dates, and silence on accountability.",
      "Aspirants are told to 'try again' as if their twenties are renewable resources.",
      "The same security failures repeat — across exams, across states, across years."
    ],
    realImpact: [
      { label: "Reported leaks (5 yrs)", value: "70+", caption: "publicly logged incidents" },
      { label: "Lives paused per leak", value: "Lakhs", caption: "candidates per major exam" },
      { label: "Officers publicly named", value: "Few", caption: "across all incidents" }
    ],
    brcProposes: [
      "Direct, named accountability — every exam has an owner, and the public knows who",
      "Independent digital exam security audits before every attempt",
      "Public investigation reports within 90 days of any leak",
      "Statutory resignation policy after repeat failures, not committee theatre",
      "Compensation framework for affected aspirants — financial and academic"
    ],
    expectedOutcome:
      "Exam integrity becomes a non-negotiable promise. Aspirants get their years back, or at least the truth.",
    humanStories: [
      {
        role: "Aspirant",
        state: "Uttar Pradesh",
        quote: "I cleared three exams in three years. Each result was cancelled because of paper leaks. My family sold land. I sold my dreams."
      }
    ],
    why:
      "Because a country that fails its students at the gate cannot expect them to defend it later."
  },

  "time-limit-recruitment": {
    reality: [
      "Notification → exam → result → joining can stretch across 3–4 years for a single post.",
      "Aspirants pause life — relationships, jobs, savings — waiting on a process nobody is responsible for finishing.",
      "Court orders intervene. The file still moves slowly.",
      "By the time the joining letter arrives, the youth in 'youth recruitment' is gone."
    ],
    realImpact: [
      { label: "Avg. recruitment delay", value: "26 months", caption: "from notification to joining" },
      { label: "Years lost per cycle", value: "2–4", caption: "of productive working life" },
      { label: "Compensation framework", value: "None", caption: "across most major exams" }
    ],
    brcProposes: [
      "Statutory recruitment timelines — codified, not aspirational",
      "Public live-status tracker for every active recruitment",
      "Compensation for delays beyond statutory limits — funded by departmental budgets",
      "Named officer-in-charge for every exam cycle with public bio"
    ],
    expectedOutcome:
      "Aspirants can plan their lives. Departments cannot bury delays. Recruitment becomes a process, not a punishment.",
    humanStories: [
      {
        role: "Aspirant",
        state: "Madhya Pradesh",
        quote: "I started preparing at 22. I joined at 28. I have nothing to show for those six years except a joining letter."
      }
    ],
    why:
      "Because the state cannot ask for the best years of citizens' lives and refuse to give them a date."
  },

  "transparency-public-money": {
    reality: [
      "Public money flows through invisible channels — contracts, sub-contracts, change orders, delays.",
      "By the time a scheme reaches the citizen, half the money is paperwork and the other half is missing.",
      "Auditing reports arrive years late, redacted, and unread.",
      "Citizens fund the system; the system gates them from the receipt."
    ],
    realImpact: [
      { label: "Open-data public contracts", value: "<10%", caption: "of total tender value" },
      { label: "Avg. audit delay", value: "2–4 yrs", caption: "before public release" },
      { label: "Citizens with budget access", value: "Few", caption: "outside specialists" }
    ],
    brcProposes: [
      "Open contracts portal: every contract above a threshold, in plain language",
      "Real-time project tracker per state, with citizen-flag buttons",
      "Mandatory public delay reports with named officers",
      "Audit reports published within 12 months, unredacted where lawful"
    ],
    expectedOutcome:
      "Public money becomes traceable. Corruption becomes structurally harder. Citizens become co-auditors.",
    humanStories: [
      {
        role: "Taxpayer",
        state: "Rajasthan",
        quote: "I pay GST. I pay road tax. I pay tolls. I cannot find a single road my money built."
      }
    ],
    why:
      "Because public money in darkness is private money in disguise."
  },

  "direct-democratic-power": {
    reality: [
      "India is a representative democracy: citizens elect MPs and MLAs; only Parliament and State Legislatures can make laws.",
      "There is no national mechanism for ballot initiatives, citizen-led referendums, or signature-driven public votes.",
      "Once every five years, citizens are heard at the polling booth. In between, they are mostly an audience.",
      "Switzerland holds binding citizen-led referendums multiple times a year. Several US states allow ballot initiatives. India currently does not."
    ],
    realImpact: [
      { label: "Direct citizen lawmaking", value: "None", caption: "no constitutional pathway today" },
      { label: "Average gap between heard moments", value: "5 yrs", caption: "polling day to polling day" },
      { label: "Public consultation portals", value: "Sparse", caption: "few mandatory, fewer public" }
    ],
    brcProposes: [
      "Mandatory public consultation portals for major national & state policies",
      "Statutory threshold model: once X verified citizens support a proposal, Parliament must publicly discuss it",
      "Transparent digital tracking of every public petition, with timelines",
      "Responsibly explore ballot-initiative & referendum frameworks within constitutional limits — no reckless promises"
    ],
    expectedOutcome:
      "Democracy stops being an event held every five years. Citizens become participants, not spectators. Power is forced to listen between elections, not just before them.",
    humanStories: [
      {
        role: "Citizen",
        state: "Across India",
        quote: "We are told we are the largest democracy. We rarely feel like we are heard between two votes."
      }
    ],
    why:
      "Because democracy should not end after voting day."
  }
};

/* ─────────────────────────────────────────────────────────────────────────
 * EDUCATION_REALITY_STATS — used by the "THEY PAID FOR DREAMS" home section.
 * ───────────────────────────────────────────────────────────────────────── */

export type EducationStat = {
  big: string;
  label: string;
  caption: string;
};

export const EDUCATION_REALITY_STATS: EducationStat[] = [
  { big: "₹8 L", label: "Avg. engineering cost", caption: "for a 4-year B.Tech, before living costs" },
  { big: "1.5 Cr+", label: "Graduates every year", caption: "across colleges and universities" },
  { big: "~ 38%", label: "Employed in their field", caption: "within a year of graduating" },
  { big: "10+ yrs", label: "Avg. family debt cycle", caption: "for one private-college degree" },
  { big: "70%", label: "Skill mismatch rate", caption: "graduates vs. industry-needed skills" },
  { big: "0", label: "Refunds for fake colleges", caption: "in most documented closures" }
];

/* ─────────────────────────────────────────────────────────────────────────
 * CITIZEN_QUOTES — short cinematic quote pool used across emotional sections.
 * ───────────────────────────────────────────────────────────────────────── */

export const CITIZEN_QUOTES: string[] = [
  "A nation changes when citizens stop acting like audiences.",
  "The future should not be decided by the loudest influencer.",
  "There is nobody coming to change your fate except you.",
  "Question everyone. Even us.",
  "The government should fear the people again.",
  "Democracy dies when citizens become fans.",
  "You are not here to support a leader. You are here to become one."
];

/* ─────────────────────────────────────────────────────────────────────────
 * DEMOCRACY_COMPARISON — used by /demands to explain how India differs.
 * ───────────────────────────────────────────────────────────────────────── */

export type DemocracyCard = {
  country: string;
  flagAccent: string;
  citizenLawmaking: "Yes" | "Partial" | "No";
  mechanism: string;
  detail: string;
};

export const DEMOCRACY_COMPARISON: DemocracyCard[] = [
  {
    country: "Switzerland",
    flagAccent: "#dc143c",
    citizenLawmaking: "Yes",
    mechanism: "Federal initiatives & referendums",
    detail:
      "Citizens can collect signatures to force a binding national vote on laws and constitutional amendments — multiple times a year."
  },
  {
    country: "Some U.S. states",
    flagAccent: "#3a6df0",
    citizenLawmaking: "Partial",
    mechanism: "Ballot initiatives",
    detail:
      "States like California allow citizens to put proposed laws directly on the ballot if they gather enough signatures. Voters decide."
  },
  {
    country: "India",
    flagAccent: "#ff8a3c",
    citizenLawmaking: "No",
    mechanism: "Representative-only model",
    detail:
      "Only Parliament and State Legislatures can make laws. Citizens vote once every five years, and then largely watch from the gallery."
  }
];



/* ─────────────────────────────────────────────────────────────────────────
 * BLACK FILES — categorised expansion.
 * Used by the new categorised /black-files view.
 * ───────────────────────────────────────────────────────────────────────── */

export type BlackFileCategory =
  | "Promise vs Reality"
  | "Education Files"
  | "Corruption Map"
  | "Media Manipulation"
  | "Silenced Voices"
  | "Dynasty Machine";

export const BLACK_FILE_CATEGORIES: BlackFileCategory[] = [
  "Promise vs Reality",
  "Education Files",
  "Corruption Map",
  "Media Manipulation",
  "Silenced Voices",
  "Dynasty Machine"
];

export type PromiseRealityRow = {
  id: string;
  area: string;
  promise: string;
  reality: string;
  timeline: string;
  publicImpact: string;
};

export const PROMISE_VS_REALITY: PromiseRealityRow[] = [
  {
    id: "pr1",
    area: "Jobs",
    promise: "Crores of new jobs through skill-development schemes.",
    reality:
      "Lakhs of graduates remain underemployed. Many delivery and gig workers hold engineering and post-graduate degrees.",
    timeline: "2014 → ongoing",
    publicImpact: "Wage stagnation, mass migration for low-paying work, family debt cycles."
  },
  {
    id: "pr2",
    area: "Roads",
    promise: "World-class highways and pothole-free cities.",
    reality:
      "Roads inaugurated multiple times remain partially built. Annual monsoon damage exposes substandard contractor work.",
    timeline: "2017 → ongoing",
    publicImpact: "Daily commuter accidents, life loss, and silent recurring repairs paid by taxpayers."
  },
  {
    id: "pr3",
    area: "Black money",
    promise: "All black money brought back; corruption uprooted.",
    reality:
      "Independent reports show no significant inflows. Periodic shocks (demonetisation) hurt the informal economy more than the corrupt.",
    timeline: "2014 → ongoing",
    publicImpact: "Small businesses, farmers and daily-wage workers absorbed the cost of policy turbulence."
  },
  {
    id: "pr4",
    area: "Farmers",
    promise: "Doubling farmer income.",
    reality:
      "Real income gains are uneven. Crop loss compensation cycles still run for years. Tribal and rain-fed regions remain badly served.",
    timeline: "2016 → ongoing",
    publicImpact: "Distress migration, family debt, and continued reliance on middlemen."
  },
  {
    id: "pr5",
    area: "Healthcare",
    promise: "World-class government hospitals; affordable insurance for all.",
    reality:
      "Government hospital equipment downtime in months. Insurance schemes report reimbursement delays. Out-of-pocket spending remains high.",
    timeline: "2018 → ongoing",
    publicImpact: "Families pushed below the poverty line by a single hospital visit."
  },
  {
    id: "pr6",
    area: "Exam integrity",
    promise: "Tamper-proof recruitment and entrance exams.",
    reality:
      "70+ publicly reported leak incidents in five years across multiple states. Repeated cancellations and unending rescheduling.",
    timeline: "2020 → ongoing",
    publicImpact: "Years of preparation and family savings lost to procedural failure."
  }
];

/* India corruption heat-map data — public-perception based, illustrative only.
 * Values are 0–100 (higher = more reported issues by citizens).
 * Used for the SVG heat-map fill on Black Files / Corruption Map.
 */
export type StateHeat = {
  code: string; // 2-letter ISO code used by our SVG paths
  name: string;
  score: number; // 0–100
  topCategory: string;
  reports: number; // illustrative count
};

export const STATE_CORRUPTION_HEAT: StateHeat[] = [
  { code: "UP", name: "Uttar Pradesh", score: 86, topCategory: "Recruitment & exam leaks", reports: 4_120 },
  { code: "BR", name: "Bihar", score: 82, topCategory: "Bribery & FIR refusal", reports: 3_540 },
  { code: "MP", name: "Madhya Pradesh", score: 74, topCategory: "Recruitment delays", reports: 2_810 },
  { code: "RJ", name: "Rajasthan", score: 71, topCategory: "Police & certification bribery", reports: 2_410 },
  { code: "JH", name: "Jharkhand", score: 70, topCategory: "Tribal compensation gaps", reports: 1_980 },
  { code: "OR", name: "Odisha", score: 68, topCategory: "Healthcare equipment downtime", reports: 1_870 },
  { code: "WB", name: "West Bengal", score: 66, topCategory: "Local civic bribery", reports: 2_240 },
  { code: "MH", name: "Maharashtra", score: 64, topCategory: "Infrastructure quality", reports: 3_010 },
  { code: "AP", name: "Andhra Pradesh", score: 60, topCategory: "Education accreditation", reports: 1_540 },
  { code: "TS", name: "Telangana", score: 59, topCategory: "Fake colleges", reports: 1_710 },
  { code: "KA", name: "Karnataka", score: 58, topCategory: "Roads & potholes", reports: 2_680 },
  { code: "TN", name: "Tamil Nadu", score: 52, topCategory: "Caste-based discrimination", reports: 1_890 },
  { code: "GJ", name: "Gujarat", score: 51, topCategory: "Land record bribery", reports: 1_440 },
  { code: "PB", name: "Punjab", score: 50, topCategory: "Drug & policing complaints", reports: 1_220 },
  { code: "HR", name: "Haryana", score: 49, topCategory: "Recruitment delays", reports: 1_080 },
  { code: "DL", name: "Delhi", score: 57, topCategory: "Women safety reporting", reports: 2_450 },
  { code: "KL", name: "Kerala", score: 38, topCategory: "Hospital appointment delays", reports: 770 },
  { code: "CG", name: "Chhattisgarh", score: 67, topCategory: "Tribal compensation", reports: 1_330 },
  { code: "AS", name: "Assam", score: 56, topCategory: "Citizenship paperwork", reports: 1_140 },
  { code: "UK", name: "Uttarakhand", score: 47, topCategory: "Disaster compensation", reports: 690 },
  { code: "HP", name: "Himachal Pradesh", score: 35, topCategory: "Tourism contract opacity", reports: 480 },
  { code: "GA", name: "Goa", score: 41, topCategory: "Land use opacity", reports: 320 }
];

/* MEDIA MANIPULATION — educational explainers (not accusations).
 * Each item is a recognisable narrative pattern, with a neutral description.
 */
export type MediaPattern = {
  id: string;
  name: string;
  description: string;
  example: string;
  defense: string;
};

export const MEDIA_PATTERNS: MediaPattern[] = [
  {
    id: "mp1",
    name: "Outrage cycles",
    description:
      "A high-emotion story dominates feeds for 48–72 hours, then disappears completely without follow-up or resolution.",
    example:
      "A scam breaks. Hashtag trends. New crisis arrives. Nobody returns to ask what happened to the original investigation.",
    defense:
      "Bookmark the story on day 1. Revisit it on day 30. Reality is in the follow-up, not the trend."
  },
  {
    id: "mp2",
    name: "Influencer alignment",
    description:
      "Multiple influencers hit the same talking points within the same week, often around upcoming votes or budget cycles.",
    example:
      "A fortnight before a state election, dozens of unrelated accounts post identical 'achievement' lists with identical phrasing.",
    defense:
      "Notice synchronisation. Coordinated content is rarely organic. Search for the same phrase across handles."
  },
  {
    id: "mp3",
    name: "Distraction events",
    description:
      "Major decisions or unfavourable reports are released alongside loud unrelated cultural events.",
    example:
      "An important audit goes public on the same day a big match or controversy dominates every news channel.",
    defense:
      "Always ask 'what got buried this week?' The boring 4 PM headline is often the real story."
  },
  {
    id: "mp4",
    name: "Personal-cult framing",
    description:
      "Coverage centres on a single leader's personality, decisions, and image rather than on systems, ministries, or policies.",
    example:
      "Policy success or failure is reported as 'X did' / 'X delivered', not 'this department implemented' or 'this law caused'.",
    defense:
      "Translate every 'leader' headline into 'department / law / policy'. Strip away the face. The system reveals itself."
  },
  {
    id: "mp5",
    name: "Communal redirection",
    description:
      "Economic, civic and governance failures are redirected into communal or identity-driven public arguments.",
    example:
      "A jobs report shows weakness. Within hours, the conversation shifts to a culture-war flashpoint.",
    defense:
      "Notice the swap. If a policy story disappears overnight under an identity story, watch which side benefits."
  }
];

/* DYNASTY MACHINE — neutral, structural analysis.
 * No naming of individuals. Just patterns of inherited political power.
 */
export type DynastyPattern = {
  id: string;
  pattern: string;
  description: string;
};

export const DYNASTY_PATTERNS: DynastyPattern[] = [
  {
    id: "dp1",
    pattern: "Inherited tickets",
    description:
      "Political tickets passed within families across multiple generations, regardless of party. Selection by surname, not by service record."
  },
  {
    id: "dp2",
    pattern: "Concentrated decision-making",
    description:
      "Major party decisions taken by small inner circles, often related by blood, marriage, or long personal association."
  },
  {
    id: "dp3",
    pattern: "Insulated wealth",
    description:
      "Significant wealth changes within political families remain difficult to verify against publicly disclosed assets."
  },
  {
    id: "dp4",
    pattern: "Local fiefdoms",
    description:
      "Specific constituencies dominated by the same family across decades, often with the next generation entering politics by default rather than by candidacy contest."
  },
  {
    id: "dp5",
    pattern: "Cross-party continuity",
    description:
      "Political families switching parties without losing influence — a sign that loyalty is to power continuation, not to ideology."
  }
];

/* QUESTION_EVERYTHING — line pool for the philosophical core.
 * Used in /black-files and selected home/closing sections.
 */
export const QUESTION_EVERYTHING: string[] = [
  "Question speeches.",
  "Question statistics.",
  "Question promises.",
  "Question viral trends.",
  "Question fear.",
  "Question anger.",
  "Question us too.",
  "Blind support creates untouchable power.",
  "A healthy democracy requires uncomfortable questions."
];

/* PUBLIC MEMORY — line pool for the Public Memory section. */
export const PUBLIC_MEMORY_LINES: string[] = [
  "Every election resets the conversation.",
  "Every scandal disappears.",
  "Every promise gets rewritten.",
  "Power survives when memory dies.",
  "Black Files exists so memory cannot be erased."
];

/* EDUCATION_REALITY_BY_STATE — illustrative state-level breakdown
 * for the dedicated /education-reality page.
 */
export type EducationStateRow = {
  state: string;
  graduatesPerYear: string;
  unemployedRate: string; // % of recent graduates
  avgFee: string; // private engineering/MBA approx total
  fakeColleges: string; // ballpark count of unaccredited / under-investigation
};

export const EDUCATION_REALITY_BY_STATE: EducationStateRow[] = [
  { state: "Uttar Pradesh", graduatesPerYear: "18 L+", unemployedRate: "32%", avgFee: "₹6.5 L", fakeColleges: "120+" },
  { state: "Maharashtra", graduatesPerYear: "14 L+", unemployedRate: "26%", avgFee: "₹9.0 L", fakeColleges: "80+" },
  { state: "Tamil Nadu", graduatesPerYear: "11 L+", unemployedRate: "24%", avgFee: "₹7.2 L", fakeColleges: "55+" },
  { state: "Telangana", graduatesPerYear: "6 L+", unemployedRate: "29%", avgFee: "₹8.1 L", fakeColleges: "70+" },
  { state: "Andhra Pradesh", graduatesPerYear: "7 L+", unemployedRate: "30%", avgFee: "₹7.8 L", fakeColleges: "65+" },
  { state: "Karnataka", graduatesPerYear: "9 L+", unemployedRate: "23%", avgFee: "₹9.4 L", fakeColleges: "45+" },
  { state: "West Bengal", graduatesPerYear: "8 L+", unemployedRate: "31%", avgFee: "₹5.9 L", fakeColleges: "50+" },
  { state: "Bihar", graduatesPerYear: "10 L+", unemployedRate: "38%", avgFee: "₹4.8 L", fakeColleges: "90+" },
  { state: "Madhya Pradesh", graduatesPerYear: "7 L+", unemployedRate: "33%", avgFee: "₹6.0 L", fakeColleges: "60+" },
  { state: "Rajasthan", graduatesPerYear: "6 L+", unemployedRate: "28%", avgFee: "₹6.4 L", fakeColleges: "40+" },
  { state: "Kerala", graduatesPerYear: "5 L+", unemployedRate: "27%", avgFee: "₹6.7 L", fakeColleges: "20+" },
  { state: "Delhi", graduatesPerYear: "4 L+", unemployedRate: "22%", avgFee: "₹8.5 L", fakeColleges: "15+" }
];

/* AFTER_GRADUATION_STAGES — used by the "WHAT HAPPENS AFTER GRADUATION" arc. */
export type GraduationStage = {
  stage: string;
  share: string; // approx %
  reality: string;
};

export const AFTER_GRADUATION_STAGES: GraduationStage[] = [
  {
    stage: "Got an offer in their field",
    share: "~ 38%",
    reality:
      "Average package is well below the marketing brochure. A meaningful share of these offers are revoked or downgraded before joining."
  },
  {
    stage: "Took an unrelated job to survive",
    share: "~ 24%",
    reality:
      "BPO, sales, gig delivery, app driving. The degree sits in a folder. The skill mismatch is generational."
  },
  {
    stage: "Preparing for government exams",
    share: "~ 18%",
    reality:
      "Coaching fees, hostel, exam fees. Years pass. Paper leaks reset the cycle. Family savings drain quietly."
  },
  {
    stage: "Higher studies (often abroad-funded by family debt)",
    share: "~ 12%",
    reality:
      "Education loans, FX exposure, no guarantee of return. Many never come back, and that is its own statement."
  },
  {
    stage: "Unemployed and uncounted",
    share: "~ 8%+",
    reality:
      "Drop out of the labour-force statistics. Especially women, especially small towns. Officially invisible."
  }
];
