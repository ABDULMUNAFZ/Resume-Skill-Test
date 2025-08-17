"use client";
import { useState } from "react";
import UploadArea from "@/components/UploadArea";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import Quiz from "@/components/Quiz";
import LatexGenerator from "@/components/LatexGenerator";
import Badge from "@/components/Badge";
import { extractFields } from "@/lib/parser";
import { SkillKey } from "@/lib/skills";

export default function Page() {
  const [rawText, setRawText] = useState<string>("");
  const [skills, setSkills] = useState<SkillKey[]>([]);
  const [fields, setFields] = useState<ReturnType<typeof extractFields>>({});

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Resume Skill Test</h1>
        <a className="btn" href="https://vercel.com/templates?framework=nextjs" target="_blank" rel="noreferrer">Deploy Guide</a>
      </header>

      <p className="text-slate-300">Upload your resume (PDF/PNG/JPG). We'll extract skills, give tailored suggestions, auto-generate a relevant MCQ quiz, and produce an ATS-friendly LaTeX resume.</p>

      <UploadArea
        onText={(text, f, s) => {
          setRawText(text);
          setFields(f);
          setSkills(s as SkillKey[]);
        }}
      />

      <SuggestionsPanel skills={skills} rawText={rawText} />

      <Quiz skills={skills} />

      <LatexGenerator fields={fields} skills={skills} rawText={rawText} />

      <footer className="text-center text-slate-400 pt-6">
        <p>Made with Next.js, pdf.js, and Tesseract.js. No data leaves your browser.</p>
      </footer>
    </main>
  );
}
