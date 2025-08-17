"use client";
import { buildATSLaTeX } from "@/lib/latex";
import type { ParsedFields } from "@/lib/parser";
import { SkillKey } from "@/lib/skills";
import { useMemo } from "react";

export default function LatexGenerator({ fields, skills, rawText }: { fields: ParsedFields; skills: SkillKey[]; rawText: string; }) {
  const tex = useMemo(() => buildATSLaTeX(fields, skills, rawText), [fields, skills, rawText]);
  const blob = useMemo(() => new Blob([tex], { type: "text/plain" }), [tex]);
  const href = useMemo(() => URL.createObjectURL(blob), [blob]);

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-2">4) Download ATS LaTeX Resume</h2>
      <p className="text-slate-300 mb-3">Download the .tex file and compile with Overleaf or a local LaTeX toolchain.</p>
      <div className="flex gap-3">
        <a className="btn btn-primary" href={href} download="ATS-Resume.tex">Download .tex</a>
        <details className="flex-1">
          <summary className="cursor-pointer select-none">Preview .tex</summary>
          <pre className="mt-3 whitespace-pre-wrap text-sm bg-black/30 p-3 rounded-lg border border-white/10">{tex}</pre>
        </details>
      </div>
    </div>
  );
}
