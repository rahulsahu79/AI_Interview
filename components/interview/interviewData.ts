export type InterviewQuestion = {
  id: number;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  prompt: string;
  feedback: string;
  followUps: string[];
  idealAnswer: string;
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    title: "Design the architecture for a scalable customer-facing web application.",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["architecture", "scalability", "cloud"],
    prompt:
      "Walk me through the architecture of a platform that can handle 10,000 concurrent users with low latency and fast failover.",
    feedback:
      "Focus on service separation, fault tolerance, and the data flow between components. Make sure to highlight monitoring and observability.",
    followUps: [
      "How would you minimize deployment risk for a major architecture change?",
      "What caching strategy would you use for high-read endpoints?",
    ],
    idealAnswer:
      "A strong answer explains service boundaries, load balancing, database scaling, and resilience patterns such as retries and circuit breakers.",
  },
  {
    id: 2,
    title: "Optimize a slow SQL query in a production database.",
    category: "Database",
    difficulty: "Advanced",
    tags: ["sql", "performance", "optimization"],
    prompt:
      "Describe your process for diagnosing and optimizing a query that is causing a performance bottleneck.",
    feedback:
      "Highlight how you identify slow operations, verify indexing, and measure improvements before and after changes.",
    followUps: [
      "How do you ensure your fix does not create regression in other queries?",
      "What role does query plan analysis play in your approach?",
    ],
    idealAnswer:
      "A compelling response covers execution plans, index coverage, join strategies, and test validation in staging.",
  },
  {
    id: 3,
    title: "Explain your strategy for debugging a production incident.",
    category: "Operations",
    difficulty: "Intermediate",
    tags: ["incident response", "monitoring", "debugging"],
    prompt:
      "Tell me how you would approach a production outage affecting multiple customers.",
    feedback:
      "Good answers include quick containment, root cause analysis, and communication with stakeholders.",
    followUps: [
      "How do you avoid burning out during high-pressure incident response?",
      "What postmortem practices do you recommend?",
    ],
    idealAnswer:
      "The best answer describes prioritizing customer impact, reducing blast radius, and then investigating metrics/logs to restore service.",
  },
  {
    id: 4,
    title: "Share a time you led a team through a technical challenge.",
    category: "Behavioral",
    difficulty: "Beginner",
    tags: ["leadership", "communication", "collaboration"],
    prompt:
      "Describe a real-world example of a technical challenge and how you guided the team to a solution.",
    feedback:
      "Use the STAR framework and include your role, the decisions you made, and the outcome.",
    followUps: [
      "What did you learn from that experience?",
      "How did you measure the impact of your solution?",
    ],
    idealAnswer:
      "An effective response frames the problem clearly, highlights team coordination, and shows measurable outcomes.",
  },
  {
    id: 5,
    title: "Discuss the security implications of storing user credentials.",
    category: "Security",
    difficulty: "Advanced",
    tags: ["authentication", "data protection", "compliance"],
    prompt:
      "Explain the best practices for storing and handling user authentication data securely.",
    feedback:
      "Mention hashing algorithms, key management, and how you validate the security posture of the implementation.",
    followUps: [
      "How would you design a secure password reset flow?",
      "When would you choose passwordless authentication?",
    ],
    idealAnswer:
      "A strong answer covers salted hashing, least privilege, secure secret storage, and auditability.",
  },
  {
    id: 6,
    title: "Structure APIs for a high-traffic product.",
    category: "Engineering",
    difficulty: "Intermediate",
    tags: ["api design", "scalability", "performance"],
    prompt:
      "How would you design and version APIs to support rapid growth and maintainability?",
    feedback:
      "Focus on consistency, backward compatibility, and error handling contracts.",
    followUps: [
      "What strategies do you use for API pagination and rate limiting?",
      "How do you document API changes for external consumers?",
    ],
    idealAnswer:
      "A good answer explains versioning strategy, smooth migration paths, and developer-friendly error contracts.",
  },
  {
    id: 7,
    title: "Design a caching strategy for an analytics dashboard.",
    category: "Performance",
    difficulty: "Advanced",
    tags: ["caching", "latency", "data freshness"],
    prompt:
      "Describe a caching design that balances speed and accurate analytics reporting.",
    feedback:
      "The strongest responses differentiate hot data, cache invalidation, and fallback mechanisms.",
    followUps: [
      "How would you handle stale cache during peak traffic?",
      "What metrics matter most for cache efficiency?",
    ],
    idealAnswer:
      "A clear answer covers caching tiers, TTL policies, and strategies for invalidation and refresh.",
  },
  {
    id: 8,
    title: "Explain your approach to unit testing and CI/CD.",
    category: "Quality",
    difficulty: "Beginner",
    tags: ["testing", "automation", "reliability"],
    prompt:
      "How do you build a high-quality release pipeline with automated tests?",
    feedback:
      "Include how you balance test coverage, speed, and developer feedback loops.",
    followUps: [
      "What types of tests do you run before a production deployment?",
      "How do you keep build pipelines maintainable?",
    ],
    idealAnswer:
      "An effective response shows automated checks, gating by quality metrics, and quick iteration through feedback.",
  },
  {
    id: 9,
    title: "Prioritize technical debt versus new feature work.",
    category: "Product",
    difficulty: "Intermediate",
    tags: ["roadmap", "tradeoffs", "strategy"],
    prompt:
      "Explain how you decide when to invest in technical debt versus shipping new product value.",
    feedback:
      "Good answers weigh customer impact, risk, and long-term maintainability.",
    followUps: [
      "How do you communicate this tradeoff to product stakeholders?",
      "What criteria do you use to measure technical debt?",
    ],
    idealAnswer:
      "A strong answer balances customer outcomes, engineering velocity, and risk mitigation.",
  },
  {
    id: 10,
    title: "Measure application reliability in production.",
    category: "Analytics",
    difficulty: "Advanced",
    tags: ["slo", "observability", "metrics"],
    prompt:
      "What metrics and processes do you use to ensure a reliable production application?",
    feedback:
      "Focus on SLOs, incident analytics, and how you turn metrics into action.",
    followUps: [
      "How would you improve mean time to recovery?",
      "What dashboard metrics would you share with engineering leadership?",
    ],
    idealAnswer:
      "A strong response mentions uptime, error budgets, latency targets, and incident learning.",
  },
];
