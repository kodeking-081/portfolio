export type Repo = {
  id: string;
  name: string;
  url?: string;
  demo?: string;
};

// Facts only, from github.com/kodeking-081. Alphabetical — no ranking.
const repoList = [
  {
    id: "certificates",
    name: "Certificates",
    url: "https://github.com/kodeking-081/Certificates",
  },
  {
    id: "construction-project-management",
    name: "Construction-Project-Management",
    url: "https://github.com/kodeking-081/Construction-Project-Management",
    demo: "https://construction-project-management-six.vercel.app",
  },
  {
    id: "copilot-transcript-reviewer",
    name: "Copilot_Transcript_Reviewer",
    url: "https://github.com/kodeking-081/Copilot_Transcript_Reviewer",
  },
  {
    id: "e-commerce-website",
    name: "E-commerce-Website",
    url: "https://github.com/kodeking-081/E-commerce-Website",
  },
  {
    id: "facemask-detection-yolov4",
    name: "Facemask-Detection-Yolov4",
    url: "https://github.com/kodeking-081/Facemask-Detection-Yolov4",
  },
  {
    id: "gre-timer-calculator",
    name: "GRE-Timer_Calculator",
    url: "https://github.com/kodeking-081/GRE-Timer_Calculator",
  },
  {
    id: "langchain-chat-with-pdf",
    name: "Langchain-chat_with_pdf",
    url: "https://github.com/kodeking-081/Langchain-chat_with_pdf",
  },
  // No public URL yet — this repo has no remote.
  { id: "portfolio", name: "portfolio (this site)" },
  {
    id: "srgan-image-superresolution",
    name: "SRGAN-Image_Superresolution",
    url: "https://github.com/kodeking-081/SRGAN-Image_Superresolution",
  },
  {
    id: "student-records-management-django",
    name: "StudentRecordsManagement-Django",
    url: "https://github.com/kodeking-081/StudentRecordsManagement-Django",
  },
  {
    id: "ui-ux-figma",
    name: "UI-UX--Figma",
    url: "https://github.com/kodeking-081/UI-UX--Figma",
  },
] as const satisfies readonly Repo[];

export type RepoId = (typeof repoList)[number]["id"];

export const repos: readonly (Repo & { id: RepoId })[] = repoList;
