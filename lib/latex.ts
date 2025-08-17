import type { ParsedFields } from "./parser";

export function latexEscape(s: string) {
  return s
    .replace(/&/g, "\\&").replace(/%/g, "\\%").replace(/\$/g, "\\$")
    .replace(/#/g, "\\#").replace(/_/g, "\\_").replace(/{/g, "\\{")
    .replace(/}/g, "\\}").replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}").replace(/\\/g, "\\textbackslash{}");
}

export function buildATSLaTeX(fields: ParsedFields, rawSkills: string[], rawText: string) {
  const name = fields.name || "Your Name";
  const email = fields.email || "email@example.com";
  const phone = fields.phone || "0000000000";
  const edu = (fields.education || [""]).join(" \\ ");
  const exp = (fields.experience || [""]).join(" \\ ");
  const skills = rawSkills.join(", ");

  return `
\\documentclass[11pt]{article}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\setlist[itemize]{noitemsep, topsep=0pt}
\\pagenumbering{gobble}
\\begin{document}
\\begin{center}
  {\\LARGE ${latexEscape(name)}} \\[4pt]
  ${latexEscape(phone)} \\ ${latexEscape(email)} \\[6pt]
\\end{center}

\\section*{Summary}
ATS-optimized resume auto-generated from your uploaded resume. Tailor this to the job description.

\\section*{Skills}
${latexEscape(skills || "Add relevant keywords here.")}

\\section*{Education}
${latexEscape(edu || "Add your degrees, institutions, and years.")}

\\section*{Experience}
${latexEscape(exp || "Add roles, companies, dates, and achievements with metrics.")}

\\section*{Keywords Extracted}
${latexEscape(rawText.slice(0, 1000))}

\\end{document}
`.trim();
}
