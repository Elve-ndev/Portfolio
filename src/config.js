// CyberFolio — Open Source Template
// ─────────────────────────────────────────────────────────────
// Modifie UNIQUEMENT ce fichier pour personnaliser ton portfolio.
// C'est la SEULE source de vérité : l'UI ET le chatbot RAG lisent ici.
// Toutes les images vivent dans /public/assets et se référencent en /assets/...
// ─────────────────────────────────────────────────────────────

const CONFIG = {
  // ═══════════════════════════════
  // IDENTITÉ
  // ═══════════════════════════════
  name: 'Hiba Boutahir',
  title: 'Élève Ingénieure Intelligence Artificielle & Data Science // Cycle Ingénierie',
  year: 'YEAR 01 — Cycle Ingénierie',
  school: 'ENSAM Meknès',
  photo: '/assets/bou.jpeg',
  status: 'OPEN TO OPPORTUNITIES',
  bio: 'Ambitious AI engineering student — fast learner, driven by curiosity and a hunger for real-world impact.',
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Bilingual' },
    { name: 'English', level: 'Professional working (B2/C1)' },
  ],

  // ═══════════════════════════════
  // LIENS
  // ═══════════════════════════════
  links: {
    github: 'https://github.com/Elve-ndev',
    linkedin: 'https://linkedin.com/in/hiba-boutahir-b37344359',
    huggingface: 'https://huggingface.co/Hbya',
    kaggle: 'https://www.kaggle.com/hibabou',
    email: 'hiba88boutahir@gmail.com',
  },

  // ═══════════════════════════════
  // PROJETS
  // ═══════════════════════════════
  projects: [
    {
      title: 'Assembly Error Detector',
      type: 'Computer Vision Pipeline',
      featured: true,
      description:
        'Camera-based cobot supervision system that detects irreversible assembly errors from an egocentric view in real time.',
      description_rag:
        'End-to-end computer vision pipeline for real-time assembly error detection from egocentric video, designed to guide collaborative robots (cobots) in industrial environments. Built on IndustReal (WACV 2024, 84 recordings, 27 operators), the system combines: SlowFast R50 (MECCANO pre-trained) for 2304-dim temporal feature extraction (discriminability ratio 2.75); BiGRU Dual-Head with temporal attention and residual blocks for action classification (F1=0.663) and continuous anomaly scoring; Semi-supervised Logistic Regression + Prototype Ratio + Mahalanobis multimodal detection (gaze, hands); Temporal smoothing (W=20) achieving AUC-ROC=0.853, 7.5× lift over random baseline; 4-level cobot decision engine (NORMAL/WATCH/MONITOR/PAUSE/STOP) detecting 75% of assembly errors; Live visualization with Rerun.io.',
      stack: ['Computer Vision', 'Python', 'BiGRU', 'SlowFast', 'Rerun.io'],
      demo: 'https://youtu.be/ok_JJgtiEhM',
      github: 'https://github.com/Elve-ndev/assembly-error-detector',
      documentation: 'https://assembly-error-detector.readthedocs.io/en/latest/',
      year: '2026',
    },
    {
      title: 'Library Management System',
      type: 'Platform',
      description:
        'Full-stack platform digitizing library workflows (loans, reservations, notifications) for ENSAM Meknès.',
      description_rag:
        'Development of a complete library management system for ENSAM Meknès, enabling the digitization of loans, reservations, and communication between students and administrators. MVC architecture with clear separation between business logic, user interface, and database. Administrator dashboard with book management, loan approval, penalty processing, and PDF report generation. Student portal including interactive search, online reservation, real-time notifications, integrated messaging, and activity tracking.',
      stack: ['PHP 7.4+', 'MySQL', 'JavaScript', 'CSS3', 'HTML5', 'Apache (XAMPP)'],
      demo: '',
      github: 'https://github.com/Elve-ndev/bibliotheque',
      media: [
        // data-modeling diagrams (MCD / MLD) — the data-management showcase
        '/assets/Screenshot 2026-06-01 025021.png',
        '/assets/Screenshot 2026-06-01 025059.png',
        '/assets/Screenshot 2026-06-01 025140.png',
        '/assets/uml/uml/class Diagram.png',
        '/assets/uml/uml/use case diagram .png',
        "/assets/uml/uml/Diagramme d'activité .svg",
        '/assets/uml/uml/diagramme de sequence/Diagramme global du système — Bibliothèque ENSAM Meknès.png',
        '/assets/uml/uml/diagramme de sequence/Authentification — Étudiant.png',
        "/assets/uml/uml/diagramme de sequence/Demande d'emprunt étudiant.png",
      ],
      report: '/assets/Rapport (14).pdf',
      year: '2025',
    },
    {
      title: 'StudyBuddy',
      type: 'RAG',
      description:
        'RAG that answers questions about your course material, cites its sources, and generates tailored quizzes.',
      description_rag:
        'Modular Retrieval-Augmented Generation (RAG) system that transforms unstructured PDF course material into context-aware, auto-generated quizzes with reduced hallucination and optimized latency. PDF ingestion pipeline: parsing and structuring course documents into usable text. Semantic chunking: custom structure-aware chunker (paragraph-based) to preserve context integrity. Efficient retrieval: FAISS vector store for fast similarity search over embedded chunks. Context-grounded generation: LLM generates quiz questions strictly based on retrieved context. Low-latency inference: integration with Groq for near real-time response generation. Interactive interface: Streamlit-based UI with dynamic quiz generation and user control. Used paraphrase-multilingual-MiniLM-L12-v2 embeddings with L2 normalization for better semantic similarity. Reduced hallucination by improving chunk coherence and retrieval precision.',
      stack: ['NLP', 'Ollama', 'LangChain', 'FAISS', 'Groq API', 'ChromaDB', 'Streamlit'],
      demo: 'https://youtu.be/TKmKhg6G6ao',
      github: 'https://github.com/Elve-ndev/StudyBuddy',
      year: '2026',
    },
    {
      title: 'AvoRubyCash',
      type: 'ML Platform',
      description:
        'Platform where agriculturalists enter crop and financial data to receive an AI-powered credit score and loan eligibility assessment.',
      description_rag:
        'AvoRuby Cash features a sequential machine learning pipeline: dual market price XGBoost regressors use calendar, monthly lags, and competitor season flags to estimate pricing; a 25-feature agronomic XGBoost regressor predicts crop yield (kg/ha) using regional climate data, soil profiles, and equipment metrics. These outputs feed a 44-feature XGBoost v6 credit scoring model—rebalanced via SMOTE-NC—to calculate a composite SABC score and output a primary credit decision. A backend financial feasibility module recalculates against the requested credit amount, automatically downgrading or refusing loans based on strict DCR and RCR thresholds. A LangChain + ChromaDB RAG engine queries a localized seven-domain Moroccan agronomic knowledge base to feed a local Ollama LLM (gemma:4b) with contextual data. Exposed via a Streamlit dashboard with data entry forms, risk gauges, financial analysis charts, and an on-demand AI advisory chat interface.',
      stack: ['ML', 'Time Series', 'XGBoost', 'RAG', 'Ollama', 'ChromaDB', 'LangChain', 'Streamlit'],
      demo: '',
      github: 'https://github.com/ayaouakka-hub/AvoRuby_Cash',
      collaborative: true,
      collaborators: ['Hiba Boutahir', 'Aya Ouakka'],
      media: ['/assets/ragavoruby.jpeg', '/assets/rragavoruby.jpeg'],
      year: '2026',
    },
  ],

  // ═══════════════════════════════
  // COMPÉTENCES  (tags HUD — pas de pourcentages inventés)
  // ═══════════════════════════════
  skills: {
    languages: [
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'SQL' },
      { name: 'Java' },
    ],
    aiml: [
      { name: 'TensorFlow' },
      { name: 'PyTorch' },
      { name: 'Deep Learning' },
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'Machine Learning' },
    ],
    frameworks: [{ name: 'LangChain' }, { name: 'Streamlit' }, { name: 'FastAPI' }],
    tools: [
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'Ollama' },
      { name: 'Git' },
      { name: 'MySQL' },
      { name: 'Roboflow' },
      { name: 'FAISS' },
      { name: 'ChromaDB' },
    ],
  },

  // ═══════════════════════════════
  // ALGORITHMES — LEETCODE (vraies valeurs → gauge SVG)
  // ═══════════════════════════════
  leetcode: {
    solved: 5,
    easy: 1,
    medium: 4,
    hard: 0,
    skills: ['Divide & Conquer', 'Hash Table', 'Sliding Window'],
  },

  // ═══════════════════════════════
  // KNOWLEDGE BASE — LIVRES (barres de progression RÉELLES)
  // ═══════════════════════════════
  books: [
    {
      title: 'Hands-On Large Language Models',
      author: "O'Reilly",
      progress: 100,
      status: 'DONE',
      image: '/assets/oreilly1.jpg',
    },
    {
      title: 'AI Engineering',
      author: "O'Reilly",
      progress: 40,
      status: 'READING',
      image: '/assets/download.jpg',
    },
  ],

  // ═══════════════════════════════
  // CERTIFICATIONS
  // ═══════════════════════════════
  certifications: [
    {
      title: 'Supervised Machine Learning',
      issuer: 'DeepLearning.AI',
      year: '2025',
      link: 'https://www.coursera.org/account/accomplishments/verify/SYGW8HWVS2X1',
      image: '/assets/coursera.jpg',
    },
    {
      title: 'Prep Course — Linux Foundation Certified System Administrator (LFCS)',
      issuer: 'KodeKloud',
      year: '2026',
      link: 'https://learn.kodekloud.com/certificate/c7ceccbf-9dec-40e6-b142-c32ab2d6c02b',
      image: '/assets/kodekloud.jpg',
    },
  ],

  // ═══════════════════════════════
  // HACKATHONS — empty state thématique (SCANNING…)
  // ═══════════════════════════════
  hackathons: [],

  // ═══════════════════════════════
  // RAG — BASE DE CONNAISSANCE  (le chatbot lit ce bloc)
  // Plus c'est détaillé, meilleures sont les réponses.
  // ═══════════════════════════════
  rag: {
    whoami: `
      I am Hiba Boutahir, a first-year engineering cycle student at ENSAM Meknès, specializing in Artificial Intelligence and Data Science.
      I am passionate about applied AI, computer vision, NLP, and end-to-end RAG systems.
      I build real, production-grade systems — from data pipelines to deployed interfaces.
      I am ambitious, a fast learner, and motivated by real-world impact.
      Languages: Arabic (native), French (fluent), English (very good).
    `,
    education: `
      Currently: 1st year Cycle Ingénierie — AI & Data Science at ENSAM Meknès (2025–present).
      Institution: École Nationale Supérieure d'Arts et Métiers de Meknès (ENSAM Meknès), Université Moulay Ismail.
    `,
    projects_detail: `
      My flagship project is an end-to-end computer vision pipeline (Assembly Error Detector) that detects assembly errors in real time from egocentric video using SlowFast + BiGRU, achieving AUC-ROC=0.853 on the IndustReal dataset (WACV 2024).
      I built StudyBuddy, a full RAG system that ingests PDF course material and generates contextual quizzes using FAISS, LangChain, Groq, and Streamlit with paraphrase-multilingual-MiniLM-L12-v2 embeddings.
      I co-developed AvoRubyCash equally with Aya Ouakka — an ML-powered agricultural credit scoring platform combining XGBoost regressors, SMOTE-NC rebalancing, and a RAG advisory chatbot powered by Ollama (gemma:4b) for Moroccan farmers.
      I built a full-stack Library Management System for ENSAM Meknès in PHP/MySQL with MVC architecture, admin dashboard, and student portal.
      All projects are open source: https://github.com/Elve-ndev
    `,
    technical_profile: `
      Core stack: Python, TensorFlow, PyTorch, LangChain, FAISS, ChromaDB, Streamlit.
      Strong in: computer vision (SlowFast, BiGRU, Roboflow), NLP/RAG pipelines, ML (XGBoost, SMOTE-NC), SQL/MySQL.
      DevOps: Docker, Linux (LFCS prep), Git.
      Web: PHP, Java, JavaScript, HTML, CSS.
      Tools: Ollama (local LLMs), Groq API, Rerun.io, XAMPP.
    `,
    goals: `
      I am looking for an internship (stage) in AI engineering, MLOps, computer vision, or NLP — ideally starting summer 2026.
      I want to specialize in production-grade AI systems and LLM applications.
      In 5 years I aim to be a senior AI engineer contributing to impactful, large-scale AI products.
    `,
    availability: `
      Available for internship starting summer 2026.
      Based in Meknès, Morocco.
      Open to remote, hybrid, or on-site opportunities (nationally and internationally).
      Email: hiba88boutahir@gmail.com
      LinkedIn: https://linkedin.com/in/hiba-boutahir-b37344359
    `,
    personality: `
      I am someone who builds first and asks questions after — I learn by doing.
      What differentiates me is my ability to go from research paper to working prototype quickly.
      I thrive in ambiguous, high-complexity problems that require both technical depth and creative thinking.
    `,
  },

  // Questions suggérées (chips cliquables dans le chatbot)
  suggestedQuestions: [
    'Who are you?',
    'Tell me about your flagship project',
    'What is your tech stack?',
    'Are you available for an internship?',
    'What makes you different?',
  ],

  // Prompts proposés par le Sentinel selon la section visible (scrollspy).
  // Cliquer un prompt ouvre le chat et le RAG répond.
  sectionPrompts: {
    home: ['Who are you?', 'What are you looking for?'],
    about: ['What is your background?', 'What languages do you speak?'],
    projects: ['What is your flagship project?', 'Can I see a demo video?'],
    skills: ['What is your core tech stack?', 'How strong is your computer vision?'],
    algorithms: ['How is your LeetCode progress?', 'Which algorithm patterns do you know?'],
    knowledge: ['What are you reading?', 'What certifications do you have?'],
    hackathons: ['Have you done any hackathons?'],
    ecosystem: ['Where can I find your AI models?', 'What is on your Kaggle?'],
    github: ['What is on your GitHub?'],
    contact: ['Are you available for an internship?', 'How can I reach you?'],
  },

  // ═══════════════════════════════
  // CHATBOT / IA
  // ═══════════════════════════════
  // ⚠️ AUCUNE clé API ici. La clé Gemini vit dans une variable
  // d'environnement Vercel (GEMINI_API_KEY) lue par /api/chat.js côté serveur.
  // Si la clé est absente, le chatbot bascule sur un RAG local (mots-clés).
  chatbot: {
    model: 'gemini-2.5-flash',
    enabled: true,
  },
}

export default CONFIG
