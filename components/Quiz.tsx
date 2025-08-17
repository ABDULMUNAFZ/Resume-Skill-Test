"use client";
import { useMemo, useState } from "react";
import { questionsForSkills, SkillKey, Question } from "@/lib/skills";

export default function Quiz({ skills }: { skills: SkillKey[] }) {
  const questions = useMemo(() => questionsForSkills(skills, 2), [skills]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (skills.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-xl font-semibold">3) Skill MCQ Quiz</h2>
        <p className="text-slate-300">No skills detected. Add skills to your resume for a relevant quiz.</p>
      </div>
    );
  }

  const correctCount = questions.reduce((acc, q) => acc + ((answers[q.id] ?? -1) === q.answerIndex ? 1 : 0), 0);
  const score = Math.round((correctCount / Math.max(questions.length, 1)) * 100);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">3) Skill MCQ Quiz</h2>
        {submitted && <div className="text-lg">Score: <span className="font-bold">{score}%</span></div>}
      </div>
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="border border-white/10 rounded-xl p-4">
            <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
            <div className="grid gap-2">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                const correct = submitted && i === q.answerIndex;
                const wrongSel = submitted && selected && i !== q.answerIndex;
                return (
                  <button
                    key={i}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}
                    className={`text-left px-3 py-2 rounded-lg border
                      ${selected ? "border-brand-500" : "border-white/10"}
                      ${correct ? "bg-green-700/30" : ""}
                      ${wrongSel ? "bg-red-700/30" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && q.explanation && <p className="mt-2 text-sm text-slate-300">Why: {q.explanation}</p>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {!submitted ? (
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit</button>
        ) : (
          <>
            <p className="text-slate-300">Badge: <span className="font-semibold">
              {score >= 90 ? "Platinum" : score >= 75 ? "Gold" : score >= 60 ? "Silver" : "Bronze"}
            </span></p>
            <a
              className="btn"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ score, skills, date: new Date().toISOString() }))}`}
              download="result.json"
            >
              Download Result
            </a>
          </>
        )}
      </div>
    </div>
  );
}
