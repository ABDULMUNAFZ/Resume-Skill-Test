import { SkillKey } from "@/lib/skills";

function suggestionForSkill(skill: SkillKey) {
  const map: Record<SkillKey, string> = {
    python: "Quantify Python projects: add libs (Pandas/Flask), performance metrics, and testing.",
    java: "Emphasize OOP, Spring Boot, REST APIs, and unit tests with JUnit.",
    javascript: "Showcase ES6+, async patterns, and tooling (Vite/Webpack).",
    react: "Add hooks usage, performance (memoization), accessibility, and tests.",
    node: "Mention Express/NestJS, middleware, and production practices (logging, PM2).",
    sql: "Add schema design, indexing strategies, and query optimization examples.",
    datastructures: "List problem-solving frequency, Big-O awareness, and example problems solved.",
    html: "Include semantic HTML, landmarks, and SEO basics.",
    css: "Demonstrate responsive design and modern layout (Flexbox/Grid).",
    git: "Show workflow (Git Flow), code reviews, and CI/CD integration.",
    linux: "Add shell automation, permissions, and process/network tools.",
    aws: "Highlight core services used (S3/EC2/Lambda) and cost/security best practices."
  };
  return map[skill];
}

export default function SuggestionsPanel({ skills, rawText }: { skills: SkillKey[]; rawText: string; }) {
  if (skills.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-xl font-semibold">2) Suggestions</h2>
        <p className="text-slate-300">We couldn't detect specific skills. Make sure your resume lists key technologies explicitly.</p>
      </div>
    );
  }
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-2">2) Targeted suggestions</h2>
      <ul className="space-y-2 list-disc pl-6">
        {skills.map(s => (
          <li key={s}><span className="font-semibold uppercase">{s}</span>: {suggestionForSkill(s)}</li>
        ))}
      </ul>
    </div>
  );
}
