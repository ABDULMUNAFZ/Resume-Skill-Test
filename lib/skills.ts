export type SkillKey =
  | "python" | "java" | "javascript" | "react" | "node" | "sql" | "datastructures"
  | "html" | "css" | "git" | "linux" | "aws";

export const SKILL_ALIASES: Record<SkillKey, string[]> = {
  python: ["python", "pandas", "numpy", "flask", "django"],
  java: ["java", "spring", "spring boot"],
  javascript: ["javascript", "typescript", "ecmascript", "js", "ts"],
  react: ["react", "next.js", "nextjs"],
  node: ["node", "express"],
  sql: ["sql", "postgres", "mysql", "sqlite", "mssql", "oracle"],
  datastructures: ["data structures", "algorithms", "dsa"],
  html: ["html", "html5"],
  css: ["css", "tailwind", "sass", "scss"],
  git: ["git", "github", "gitlab", "version control"],
  linux: ["linux", "bash", "shell"],
  aws: ["aws", "amazon web services", "ec2", "s3", "lambda"]
};

export function detectSkills(text: string): SkillKey[] {
  const found = new Set<SkillKey>();
  const lower = text.toLowerCase();
  for (const key of Object.keys(SKILL_ALIASES) as SkillKey[]) {
    const terms = SKILL_ALIASES[key];
    if (terms.some(t => lower.includes(t))) {
      found.add(key);
    }
  }
  return Array.from(found);
}

export type Question = {
  id: string;
  skill: SkillKey;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
};

export const QUESTION_BANK: Question[] = [
  // Python
  { id: "py1", skill: "python", question: "What is the output of len([1, 2, 3])?", options: ["3", "2", "Error", "None"], answerIndex: 0, explanation: "len returns the number of items in a list." },
  { id: "py2", skill: "python", question: "Which keyword creates a generator?", options: ["yield", "return", "async", "lambda"], answerIndex: 0 },
  // Java
  { id: "ja1", skill: "java", question: "Which collection does not allow duplicates?", options: ["List", "Set", "Queue", "Map"], answerIndex: 1 },
  { id: "ja2", skill: "java", question: "What is the default value of an int field in Java?", options: ["0", "null", "undefined", "NaN"], answerIndex: 0 },
  // JavaScript
  { id: "js1", skill: "javascript", question: "Which is NOT a primitive type?", options: ["string", "number", "object", "boolean"], answerIndex: 2 },
  { id: "js2", skill: "javascript", question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference only"], answerIndex: 2 },
  // React
  { id: "re1", skill: "react", question: "State updates in React are:", options: ["Synchronous", "Asynchronous", "Blocking", "Always batched synchronously"], answerIndex: 1 },
  { id: "re2", skill: "react", question: "Which hook is used for side effects?", options: ["useMemo", "useEffect", "useRef", "useId"], answerIndex: 1 },
  // Node
  { id: "no1", skill: "node", question: "Which module handles HTTP servers?", options: ["fs", "http", "path", "url"], answerIndex: 1 },
  { id: "no2", skill: "node", question: "npm stands for:", options: ["Node Package Manager", "New Package Manager", "Node Program Manager", "None"], answerIndex: 0 },
  // SQL
  { id: "sq1", skill: "sql", question: "Which SQL clause filters groups?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], answerIndex: 1 },
  { id: "sq2", skill: "sql", question: "What does INDEX improve primarily?", options: ["Data integrity", "Insert speed", "Read/query speed", "Disk space usage"], answerIndex: 2 },
  // DSA
  { id: "ds1", skill: "datastructures", question: "Average time for hash table lookup?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answerIndex: 0 },
  { id: "ds2", skill: "datastructures", question: "In-order traversal of BST yields:", options: ["Random order", "Ascending order", "Descending order", "Level order"], answerIndex: 1 },
  // HTML
  { id: "ht1", skill: "html", question: "Which tag defines navigation links?", options: ["<nav>", "<section>", "<aside>", "<header>"], answerIndex: 0 },
  // CSS
  { id: "cs1", skill: "css", question: "Specificity highest among:", options: ["Class", "ID", "Type", "Universal"], answerIndex: 1 },
  // Git
  { id: "gi1", skill: "git", question: "Combine multiple commits into one:", options: ["merge", "rebase -i", "reset --hard", "stash"], answerIndex: 1 },
  // Linux
  { id: "li1", skill: "linux", question: "List files including hidden:", options: ["ls -a", "ls -l", "ls -h", "ls -r"], answerIndex: 0 },
  // AWS
  { id: "aw1", skill: "aws", question: "S3 is best described as:", options: ["Block storage", "Object storage", "File system", "Database"], answerIndex: 1 }
];

export function questionsForSkills(skills: SkillKey[], perSkill = 3): Question[] {
  const qs: Question[] = [];
  for (const s of skills) {
    const bank = QUESTION_BANK.filter(q => q.skill === s);
    for (let i = 0; i < Math.min(perSkill, bank.length); i++) {
      qs.push(bank[i]);
    }
  }
  return qs;
}
