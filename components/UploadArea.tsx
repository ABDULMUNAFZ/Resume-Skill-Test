"use client";
import { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { extractTextFromPDF, extractFields } from "@/lib/parser";
import { detectSkills } from "@/lib/skills";

type Props = {
  onText: (text: string, fields: ReturnType<typeof extractFields>, skills: string[]) => void;
};

export default function UploadArea({ onText }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(file: File) {
    setError(null);
    setLoading(true);
    try {
      let text = "";
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/") || /\.(png|jpg|jpeg)$/i.test(file.name)) {
        const result = await Tesseract.recognize(file, "eng");
        text = result.data.text;
      } else if (/\.(txt)$/i.test(file.name)) {
        text = await file.text();
      } else {
        throw new Error("Unsupported file type. Use PDF, PNG, or JPG.");
      }
      const fields = extractFields(text);
      const skills = detectSkills(text);
      onText(text, fields, skills);
    } catch (e: any) {
      setError(e.message || "Failed to read file");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">1) Upload your resume</h2>
          <p className="text-sm text-slate-300">PDF preferred. Images (PNG/JPG) are OCR’d with Tesseract.</p>
        </div>
        <button className="btn btn-primary" onClick={() => inputRef.current?.click()} disabled={loading}>
          {loading ? "Processing..." : "Choose File"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFiles(f);
          }}
        />
      </div>
      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
}
