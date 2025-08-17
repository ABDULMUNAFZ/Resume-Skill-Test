# Resume Skill Test — Next.js + Tailwind

All-in-browser implementation:
- Upload resume (`.pdf`, `.png`, `.jpg`, `.txt`).
- PDF text extraction via `pdfjs-dist` and OCR for images using `tesseract.js`.
- Skill detection to tailor suggestions.
- Auto-generated MCQ quiz from detected skills, with scoring and badges.
- Generate ATS-friendly LaTeX resume for download (.tex).

## Run locally
```bash
npm i
npm run dev
```
Open http://localhost:3000

## Deploy
- **Vercel**: Import the repo. No special configuration required.
- **Netlify**: Build command `next build`, Publish directory `.next` and enable Next.js runtime.

> Note: LaTeX compilation is not performed here. Use Overleaf or local `pdflatex` to compile the downloaded `.tex`.
