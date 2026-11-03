import type { RepoId } from "./repos";
import type { TrackId } from "./tracks";

export type Status = "done" | "now" | "next";

export type Milestone = {
  /** URL segment: lowercase letters, digits, hyphens. */
  slug: string;
  track: TrackId;
  /** The capability, in your words: "Built JWT auth with refresh tokens". */
  title: string;
  status: Status;
  /** Repos that prove it. A `done` milestone needs at least one. */
  evidence: readonly RepoId[];
  /** What you built. Blank lines start new paragraphs. */
  what?: string;
  /** What clicked — the idea you didn't have before. */
  learned?: string;
  /** What you'd do differently now. */
  wouldChange?: string;
};

// Order within a track is status first (done → now → next), then this order.
export const milestones: readonly Milestone[] = [
  // Track: Public Systems & Digital Initiatives
  {
    slug: "sials-analytics-system",
    track: "systems",
    title: "SIALS: Institutional School Analytics & Performance Tracking",
    status: "now",
    evidence: ["sials"],
    what: "SIALS is an ongoing school analytics initiative aimed at aggregating institutional academic metrics, student performance, and operational records into a unified reporting structure.\n\nThe project is in its exploratory and prototyping phase, focusing on data model definitions and reporting workflows to provide actionable administrative insights without burdening everyday school operations.",
    learned: "Designing analytics systems for educational institutions requires establishing clean data contracts before attempting automated aggregation. When data sources vary across academic terms, keeping raw event streams separate from computed metrics prevents cascading recalculation bugs.",
    wouldChange: "Finalize standard reporting schema contracts with administrative stakeholders earlier in the project lifecycle to avoid restructuring reporting queries during pilot testing.",
  },
  {
    slug: "ndess-energy-storage-system",
    track: "systems",
    title: "NDESS: National Distributed Energy Storage System",
    status: "now",
    evidence: ["ndess"],
    what: "An ongoing initiative focused on the architecture and monitoring systems for distributed energy storage and grid synchronization across Nepal.\n\nThe project addresses data collection, distributed telemetry, and storage performance tracking for decentralized renewable energy installations.",
    learned: "Handling distributed energy and telemetry data requires fault-tolerant synchronization that reliably buffers sensor feeds during intermittent field connectivity.",
    wouldChange: "Implement lightweight binary protocols and edge compaction early to handle high-frequency telemetry and inverter metrics efficiently.",
  },
  {
    slug: "nepal-pin-system",
    track: "systems",
    title: "Nepal PIN: Standardized Addressing & Geographic Indexing Structure",
    status: "now",
    evidence: ["nepal-pin"],
    what: "An ongoing digital initiative to structure and standardize location and personal identification numbering across Nepal's federal administrative tiers (provinces, districts, local levels, and wards).\n\nThe project models hierarchical PIN code indexing for civic service delivery, logistics, and digital public records.",
    learned: "Hierarchical numeric encoding maps naturally to administrative boundaries and enables fast prefix-based search queries and geospatial indexing without requiring heavy GIS lookups for every transaction.",
    wouldChange: "Build offline-capable validation utilities and lightweight client libraries so postal and municipal systems can verify PIN checksums even with intermittent network connectivity.",
  },

  // Track: Frontend & Web Applications
  {
    slug: "construction-project-management",
    track: "frontend",
    title: "Built Construction Project Management Application in TypeScript",
    status: "done",
    evidence: ["construction-project-management"],
    what: "Engineered an interactive construction management platform deployed live on Vercel. Features a responsive project dashboard, task scheduling, resource tracking, and stage-by-stage milestone visualization built with TypeScript.\n\nThe application helps project managers coordinate field activities, monitor progress against deadlines, and maintain structured audit logs for ongoing works.",
    learned: "Strict TypeScript typing across project entities (tasks, workers, milestones, budgets) eliminated an entire class of runtime state bugs and made refactoring complex state transitions straightforward.",
    wouldChange: "Implement optimistic UI updates with client-side rollback to make field entries on mobile devices feel instantaneous even on patchy site network connections.",
  },
  {
    slug: "copilot-transcript-reviewer",
    track: "frontend",
    title: "Built AI Interaction & Transcript Reviewer Tool",
    status: "done",
    evidence: ["copilot-transcript-reviewer"],
    what: "Developed a specialized log review and inspection interface to analyze AI developer assistant transcripts. The application parses structured session exports, provides instant filtering across prompts and responses, and highlights interaction patterns.\n\nDesigned to help developers evaluate prompt effectiveness, identify recurring code generation errors, and audit assistant interactions.",
    learned: "Structuring log streams into clean conversation turn models makes auditing and qualitative review dramatically faster for engineering teams analyzing LLM performance.",
    wouldChange: "Add exportable metrics and side-by-side prompt diffing to evaluate the effectiveness of prompt refinements over time.",
  },
  {
    slug: "ecommerce-web-platform",
    track: "frontend",
    title: "Developed Responsive E-Commerce Frontend with Dynamic Catalog",
    status: "done",
    evidence: ["e-commerce-website"],
    what: "Built a responsive e-commerce web interface using modern web standards (HTML5, CSS3, JavaScript). Implemented product catalog filtering, interactive cart state management, checkout simulation, and responsive layouts across viewports.\n\nFocused on clean DOM manipulation, zero framework overhead, and accessible semantic markup.",
    learned: "Direct DOM manipulation and native browser event listeners provide an invaluable foundation for understanding performance bottlenecks, layout thrashing, and how modern reactive frameworks work under the hood.",
    wouldChange: "Extract cart and filter state into a lightweight Pub/Sub store pattern to avoid passing state updates through deep DOM hierarchies.",
  },

  // Track: Backend & Systems
  {
    slug: "student-records-django",
    track: "backend",
    title: "Engineered Student Record Management System with Django & Relational DB",
    status: "done",
    evidence: ["student-records-management-django"],
    what: "Designed and implemented a backend web system using Python and Django for comprehensive student record management. Features relational schema modeling for students, courses, and grades, complete CRUD workflows, and administrative dashboards.\n\nHandles form validation, database migrations, and role-based views for academic administrators.",
    learned: "Django's built-in ORM, form validation, and migration engine drastically accelerate backend delivery while enforcing referential integrity and security standards like CSRF and SQL injection prevention by default.",
    wouldChange: "Expose RESTful endpoints using Django REST Framework (DRF) alongside session auth to enable decoupled client architectures.",
  },

  // Track: Machine Learning & AI
  {
    slug: "facemask-detection-yolov4",
    track: "ml",
    title: "Trained Real-Time Face Mask Detection System with YOLOv4",
    status: "done",
    evidence: ["facemask-detection-yolov4"],
    what: "Trained and evaluated a YOLOv4 deep learning object detection pipeline in Python using OpenCV and Darknet/PyTorch to recognize face mask compliance in real-time camera video streams with high frame rates.\n\nImplemented custom dataset preprocessing, bounding box annotation parsing, and inference pipelines for multi-face detection.",
    learned: "Dataset augmentation (rotation, illumination shifts, occlusion) and careful anchor box tuning are crucial for computer vision models to generalize across varied real-world camera angles and lighting environments.",
    wouldChange: "Quantize the model using ONNX / TensorRT to lower latency for real-time edge deployment on cost-effective embedded hardware.",
  },
  {
    slug: "srgan-image-superresolution",
    track: "ml",
    title: "Implemented Photo-Realistic Image Super-Resolution using SRGAN",
    status: "done",
    evidence: ["srgan-image-superresolution"],
    what: "Implemented a Super-Resolution Generative Adversarial Network (SRGAN) in Python to upscale low-resolution images by 4x, utilizing perceptual loss functions (content loss from VGG feature maps combined with adversarial loss) to generate realistic high-frequency textures.\n\nDemonstrated the advantages of adversarial training over traditional interpolation algorithms.",
    learned: "Minimizing Mean Squared Error (MSE) produces overly smooth, blurry outputs because it averages potential high-frequency solutions. Using perceptual loss coupled with an adversarial discriminator forces the generator to synthesize sharp, plausible high-frequency details.",
    wouldChange: "Incorporate modern ESRGAN improvements or residual-in-residual dense blocks (RRDB) to eliminate minor checkerboard artifacts in high-contrast regions.",
  },
  {
    slug: "langchain-pdf-rag",
    track: "ml",
    title: "Engineered RAG-Based Conversational PDF System with LangChain",
    status: "done",
    evidence: ["langchain-chat-with-pdf"],
    what: "Developed a retrieval-augmented generation (RAG) conversational pipeline in Python using LangChain, text splitters, vector embeddings, and large language models to enable semantic question-answering over uploaded PDF documents.\n\nImplemented document ingestion, semantic chunking, vector store indexing, and contextual query prompting.",
    learned: "Chunking strategy and overlap size are the single most decisive factor in RAG accuracy. Splitting text too finely loses contextual meaning, while chunks that are too large dilute semantic embedding similarity.",
    wouldChange: "Add re-ranking (Cross-Encoder) on retrieved chunks before passing context to the LLM to filter out borderline embeddings and improve answer precision.",
  },
];

