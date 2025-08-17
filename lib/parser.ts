import * as pdfjsLib from "pdfjs-dist";
import { ZodError } from "zod";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const uint8 = new Uint8Array(await file.arrayBuffer());
  const pdf = await (pdfjsLib as any).getDocument({ data: uint8 }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((it: any) => it.str).join(" ");
    text += "\n" + pageText;
  }
  return text;
}

// Lightweight field extraction using regex heuristics.
export type ParsedFields = {
  name?: string;
  email?: string;
  phone?: string;
  education?: string[];
  skillsText?: string;
  experience?: string[];
};

export function extractFields(text: string): ParsedFields {
  const out: ParsedFields = {};
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) out.email = emailMatch[0];

  const phoneMatch = text.match(/(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){10,13}/);
  if (phoneMatch) out.phone = phoneMatch[0].replace(/\s|-/g, "");

  // Naive name: first line with 2+ words starting with capitals
  const firstLine = text.trim().split(/\n|\r/).find(l => l.trim().length > 0) || "";
  const nameMatch = firstLine.match(/^[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z.]+){1,3}/);
  if (nameMatch) out.name = nameMatch[0].trim();

  const eduMatches = text.match(/(B\.?E\.?|B\.?Tech\.?|BSc|MSc|M\.?Tech\.?|MBA|Diploma|Bachelor|Master)[^\n]{0,80}/gi);
  if (eduMatches) out.education = Array.from(new Set(eduMatches.map(s => s.trim())));

  const skillsSection = text.match(/skills?[:\-]?([^\n]{0,200})/i);
  if (skillsSection) out.skillsText = skillsSection[1];

  const expMatches = text.match(/(\d+\+?\s*years?|Intern|Engineer|Developer|Project)[^\n]{0,120}/gi);
  if (expMatches) out.experience = Array.from(new Set(expMatches.map(s => s.trim())));

  return out;
}
