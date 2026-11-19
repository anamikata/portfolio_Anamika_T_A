/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;
// ─── Scroll position hook ───────────────────────────────────
function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const h = () => setY(window.scrollY);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);
    return y;
}
// ─── IntersectionObserver hook ──────────────────────────────
function useInView(ref, threshold = 0.2) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setVisible(true); }, { threshold });
        if (ref.current)
            obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}
// ════════════════════════════════════════════════════════════
// PRELOADER
// ════════════════════════════════════════════════════════════
function Preloader({ onDone }) {
    const [phase, setPhase] = useState("fill");
    const [fillH, setFillH] = useState(0);
    useEffect(() => {
        let start = null;
        const duration = 1600;
        function step(ts) {
            if (!start)
                start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            setFillH(ease * 100);
            if (p < 1)
                requestAnimationFrame(step);
            else
                setTimeout(() => setPhase("exit"), 400);
        }
        requestAnimationFrame(step);
    }, []);
    useEffect(() => {
        if (phase === "exit")
            setTimeout(onDone, 800);
    }, [phase, onDone]);
    return (React.createElement("div", { className: `preloader${phase === "exit" ? " exit" : ""}` },
        React.createElement("div", { className: "preloader-inner" },
            React.createElement("span", { className: "preloader-shadow" }, "Anamika."),
            React.createElement("span", { className: `preloader-fill${phase === "exit" ? " fading" : ""}`, style: { clipPath: `inset(${100 - fillH}% 0 0 0)` } }, "Anamika."))));
}
// ════════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════════
function Navbar() {
    const scrollY = useScrollY();
    const [open, setOpen] = useState(false);
    const scrolled = scrollY > 60;
    const links = ["Home", "About", "Skills", "Projects", "Experience", "Education", "Certifications", "Contact"];
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: `navbar${scrolled ? " scrolled" : ""}` },
            React.createElement("span", { className: "nav-logo" },
                "Anamika",
                React.createElement("span", null, ".")),
            React.createElement("div", { className: "nav-links" }, links.map(l => (React.createElement("a", { key: l, href: `#${l.toLowerCase()}` }, l)))),
            React.createElement("a", { href: "#contact", className: "hire-btn" }, "Hire Me"),
            React.createElement("button", { className: `hamburger${open ? " open" : ""}`, onClick: () => setOpen(!open), "aria-label": "Toggle menu" },
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null))),
        React.createElement("div", { className: `mobile-menu${open ? " open" : ""}` }, links.map(l => (React.createElement("a", { key: l, href: `#${l.toLowerCase()}`, onClick: () => setOpen(false) }, l))))));
}
// ════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════
function Hero() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    return (React.createElement("section", { id: "home", className: "hero", ref: ref },
        React.createElement("div", { className: "hero-gold-line" }),
        React.createElement("div", { className: "hero-content" },
            React.createElement("div", { className: `hero-left${vis ? " visible" : ""}` },
                React.createElement("p", { className: "hero-eyebrow" }, "Portfolio \u00B7 2026 \u00B7 CSE \u00B7 Toc H IST"),
                React.createElement("h1", { className: "hero-h1" }, "Hi, I'm Anamika \u2014"),
                React.createElement("h1", { className: "hero-h1-stroke" }, "CS Engineering Student"),
                React.createElement("p", { className: "hero-sub" }, "B.Tech Computer Science student at Toc H Institute of Science & Technology \u2014 building software, AI-powered applications, and practical web experiences through projects, internships, and hackathons."),
                React.createElement("div", { className: "hero-btns" },
                    React.createElement("a", { href: "#projects", className: "btn-primary" }, "View My Work"),
                    React.createElement("a", { href: "#contact", className: "btn-secondary" }, "Contact Me"))),
            React.createElement("div", { className: `hero-right${vis ? " visible" : ""}` },
                React.createElement("div", { className: "hero-photo-frame" },
                    React.createElement("img", { src: "assets/profile.jpg", alt: "Anamika T A", loading: "eager", className: "hero-photo" }),
                    React.createElement("div", { className: "hero-photo-ring" })))),
        React.createElement("div", { className: "scroll-ind" },
            React.createElement("span", { className: "scroll-ind-label" }, "Scroll"),
            React.createElement("div", { className: "scroll-ind-line" }))));
}
// ════════════════════════════════════════════════════════════
// ABOUT
// ════════════════════════════════════════════════════════════
function About() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.15);
    const dots = [[8, 12], [85, 20], [15, 65], [90, 55], [50, 8], [70, 80]];
    const pills = [
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "⚡" },
        { name: "HTML/CSS", icon: "🌐" },
        { name: "ML & AI", icon: "🤖" },
    ];
    return (React.createElement("section", { id: "about", className: "about-section", ref: ref },
        dots.map(([x, y], i) => (React.createElement("div", { key: i, className: "about-dot", style: { left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.5}s` } }))),
        React.createElement("div", { className: "about-grid" },
            React.createElement("div", { className: `badge-wrap${vis ? " visible" : ""}` },
                React.createElement("div", { className: "badge-container" },
                    React.createElement("div", { className: "badge-lanyard" },
                        React.createElement("div", { className: "lanyard-line" }),
                        React.createElement("div", { className: "lanyard-clip" })),
                    React.createElement("div", { className: "badge-card" },
                        React.createElement("div", { className: "badge-avatar" },
                            React.createElement("img", { src: "data:image/jpeg;base64,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", alt: "Anamika T A", style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "0.75rem" } })),
                        React.createElement("p", { className: "badge-name" }, "ANAMIKA T A"),
                        React.createElement("p", { className: "badge-role" }, "CS ENGINEERING STUDENT"),
                        React.createElement("p", { className: "badge-inst" }, "Toc H Institute of Science & Technology"),
                        React.createElement("p", { className: "badge-prog" }, "NxtWave CCBP 4.0 Fellow"),
                        React.createElement("div", { className: "badge-barcode" }, Array.from({ length: 18 }, (_, i) => (React.createElement("div", { key: i, className: "badge-bar", style: {
                                background: i % 2 === 0 ? "#8B5CF6" : "#1a1a1a",
                                opacity: i % 2 === 0 ? 0.7 : 1,
                            } }))))))),
            React.createElement("div", { className: `about-text${vis ? " visible" : ""}` },
                React.createElement("h2", { className: "about-hello" }, "Hello!"),
                React.createElement("p", { className: "about-p main" },
                    "I'm ",
                    React.createElement("strong", { className: "gold" }, "Anamika T A"),
                    " \u2014 a B.Tech Computer Science student from Kottayam, Kerala, driven by the idea of using technology to address real-world challenges."),
                React.createElement("p", { className: "about-p sec" }, "Currently in my second year of B.Tech CSE, while building industry-relevant skills through NxtWave CCBP 4.0, AI-focused learning, internships, and hands-on projects."),
                React.createElement("p", { className: "about-p ter" }, "Focused on clean code, thoughtful UI, practical AI, and collaborative problem-solving \u2014 actively preparing for software development and AI internships."),
                React.createElement("div", { className: "about-pills" }, pills.map((p, i) => (React.createElement("div", { key: p.name, className: "pill", style: { animationDelay: `${i * 0.4}s` } },
                    React.createElement("span", { className: "pill-icon" }, p.icon),
                    React.createElement("span", { className: "pill-name" }, p.name))))))),
        React.createElement("div", { className: "torn-divider" },
            React.createElement("svg", { viewBox: "0 0 1440 80", preserveAspectRatio: "none" },
                React.createElement("path", { d: "M0,80 L0,30 C60,55 120,10 200,35 C280,60 320,15 400,30 C480,45 520,5 620,20\n               C720,35 760,8 860,25 C960,42 1000,10 1100,28 C1200,46 1280,5 1360,22 L1440,18 L1440,80 Z", fill: "#F5F0E8" })))));
}
// ════════════════════════════════════════════════════════════
// SKILLS
// ════════════════════════════════════════════════════════════
function Skills() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.15);
    const categories = [
        { title: "Programming", icon: "💻", skills: ["Python", "C", "C++", "JavaScript"] },
        { title: "Web Development", icon: "🌐", skills: ["HTML", "CSS", "Responsive Design", "UI/UX Fundamentals"] },
        { title: "AI & Data", icon: "🤖", skills: ["Machine Learning", "Data Analytics", "AI Concepts", "Model Evaluation"] },
        { title: "Tools", icon: "🛠", skills: ["Git", "VS Code", "Figma", "Jupyter Notebook"] },
        { title: "Top Skills", icon: "✦", skills: ["Critical Thinking", "Prompt Patterns", "AI Integrations"] },
    ];
    return (React.createElement("section", { id: "skills", className: "skills-section", ref: ref },
        React.createElement("div", { className: "section-inner" },
            React.createElement("div", { className: `section-header${vis ? " visible" : ""}` },
                React.createElement("span", { className: "section-badge" }, "Technical Strengths"),
                React.createElement("h2", { className: "section-title" }, "Skills & Technologies"),
                React.createElement("p", { className: "section-subtitle" }, "A growing toolkit built through coursework, certifications, and real project work.")),
            React.createElement("div", { className: "skills-grid" }, categories.map((cat, i) => (React.createElement("div", { key: cat.title, className: `skill-card${vis ? " visible" : ""}`, style: { transitionDelay: `${i * 0.1}s` } },
                React.createElement("span", { className: "skill-icon" }, cat.icon),
                React.createElement("h3", { className: "skill-title" }, cat.title),
                React.createElement("div", { className: "skill-tags" }, cat.skills.map(s => (React.createElement("span", { key: s, className: "skill-tag" }, s)))))))))));
}
// ════════════════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════════════════
function Projects() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    const projects = [
        {
            emoji: "🤖", title: "FreshLogic AI",
            desc: "AI-driven platform demonstrating intelligent decision-making and automation capabilities. Built to explore real-world AI integrations and smart workflow automation.",
            tags: ["AI", "Automation", "Web App"],
            url: "https://extraordinary-praline-18162e.netlify.app/",
            github: "https://github.com/anamikata/freshlogic_AI"
        },
        {
            emoji: "☂️", title: "Google Umbrella",
            desc: "Modern responsive interface reflecting contemporary design principles and cloud-inspired usability. A clean, functional UI built with web fundamentals.",
            tags: ["UI/UX", "Responsive", "Web Design"],
            url: "https://google-umbrella.lovable.app/",
            github: "https://github.com/anamikata/Google_umbrella"
        },
        {
            emoji: "🌍", title: "The Art of Understanding Everywhere",
            desc: "A language learning experience designed to enhance communication across cultures — intuitive design meets multilingual utility.",
            tags: ["EdTech", "UX", "Language"],
            url: "https://lingualive.lovable.app/",
            github: "https://github.com/anamikata/LinguaLive"
        },
        {
            emoji: "🧏", title: "Sign Language Detector",
            desc: "Real-time sign language recognition app powered by a custom image classification model trained with Google Teachable Machine. Reads live webcam input and predicts gestures instantly, right in the browser — no installation required.",
            tags: ["AI", "Computer Vision", "Accessibility"],
            url: "https://anamikata.github.io/sign_language/",
            github: "https://github.com/anamikata/sign_language"
        },
        {
            emoji: "📝", title: "GPT-2 Text Generator",
            desc: "Interactive text-generation app built with GPT-2 and Hugging Face Transformers. Generates coherent, context-aware text from user prompts, with adjustable length and creativity, through a Streamlit interface.",
            tags: ["AI", "NLP", "Generative AI"],
            url: "https://text-generator-gpt-2.streamlit.app/",
            github: "https://github.com/anamikata/GPT-2-Text-Generator"
        },
        {
            emoji: "🚀", title: "AI Venture Studio",
            desc: "An AI-assisted venture-building platform that turns startup ideas into structured venture blueprints through a multi-agent workflow, with human approval, boardroom-style analysis, health scoring, analytics, and exportable reports.",
            tags: ["AI", "React", "Vite", "Express", "MongoDB"],
            context: "Group Project · Placement Training",
            github: "https://github.com/anamikata/AI-Venture-Studio"
        },
        {
            emoji: "📸", title: "SnapStudy AI",
            desc: "An AI study assistant for students that accepts text questions or images of textbook questions, notes, diagrams, code, and MCQs, then provides personalized explanations and interactive study actions.",
            tags: ["Python", "Streamlit", "Google Gemini", "Gmail SMTP"],
            url: "https://snap-study-students.streamlit.app/",
            github: "https://github.com/anamikata/Snap_Study",
            context: "Deployed AI Study Application"
        },
        {
            emoji: "🏛️", title: "SchemeShift AI",
            desc: "An AI-powered government-scheme intelligence and policy research concept focused on analyzing scheme notifications and helping users understand changes in eligibility, benefits, and application requirements. Implemented and planned capabilities are intentionally kept distinct.",
            tags: ["AI", "Policy Research", "Information Intelligence"],
            context: "Research / Product Development"
        },
        {
            emoji: "📊", title: "SkillTrace AI",
            desc: "A web-based AI education prototype focused on structured skill tracking and interpretation, presented through a modern React interface with a Supabase-backed application stack.",
            tags: ["React", "TypeScript", "Vite", "Supabase"],
            url: "https://anamikata.github.io/SkillTrace-AI/",
            github: "https://github.com/anamikata/SkillTrace-AI",
            context: "Deployed AI Education Prototype"
        },
        {
            emoji: "💻", title: "SmartCode Tutor",
            desc: "A Java-based intelligent coding assistant developed as a group placement-training project, combining a Spring Boot backend and frontend application structure for coding-focused learning and assistance.",
            tags: ["Java", "Spring Boot", "Frontend", "Backend"],
            context: "Group Project · Placement Training",
            github: "https://github.com/anamikata/SmartCode-Tutor"
        },
        {
            emoji: "📚", title: "Library Management System",
            desc: "A Java desktop library-management project with login and registration flows, book records, database connectivity, and a searchable book-viewing interface for basic library operations.",
            tags: ["Java", "Swing", "JDBC", "MySQL"],
            context: "Group Project · Placement Training",
            github: "https://github.com/anamikata/LIBRARY_MANAGEMENT_SYSTEM"
        }
    ];
    return (React.createElement("section", { id: "projects", className: "projects-section", ref: ref },
        React.createElement("div", { className: "section-inner" },
            React.createElement("div", { className: `section-header${vis ? " visible" : ""}` },
                React.createElement("span", { className: "section-badge" }, "Work"),
                React.createElement("h2", { className: "section-title" }, "Featured Projects"),
                React.createElement("p", { className: "section-subtitle" }, "A selection of builds that put ideas into production.")),
            React.createElement("div", { className: "projects-grid" }, projects.map((p, i) => (React.createElement("div", { key: p.title, className: `project-card${vis ? " visible" : ""}`, style: { transitionDelay: `${i * 0.12}s` } },
                React.createElement("div", { className: "project-card-topline" },
                    React.createElement("span", { className: "project-emoji" }, p.emoji),
                    p.context && React.createElement("span", { className: "project-context" }, p.context)),
                React.createElement("h3", { className: "project-title" }, p.title),
                React.createElement("p", { className: "project-desc" }, p.desc),
                React.createElement("div", { className: "project-tags" }, p.tags.map(t => React.createElement("span", { key: t, className: "project-tag" }, t))),
                (p.url || p.github) && (React.createElement("div", { className: "project-links" },
                    p.url && (React.createElement("a", { href: p.url, target: "_blank", rel: "noopener noreferrer", className: "project-link" },
                        "Live Demo ",
                        React.createElement("span", { "aria-hidden": "true" }, "\u2197"))),
                    p.github && (React.createElement("a", { href: p.github, target: "_blank", rel: "noopener noreferrer", className: "project-link-github", "aria-label": `${p.title} GitHub Repository` },
                        React.createElement("svg", { className: "github-icon", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })),
                        React.createElement("span", null, "GitHub Repository"))))))))))));
}
// ════════════════════════════════════════════════════════════
// EXPERIENCE
// ════════════════════════════════════════════════════════════
function Experience() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    const experiences = [
        {
            role: "Cyber First Responder Team Member",
            company: "Kerala CLICK – Community-Led Initiative for Cyber-Resilient Keralam",
            start: "October 2026 – Present", end: "Ongoing", featured: true,
            points: [
                "Selected as a member of the Kerala CLICK Cyber First Responder Team under the Community-Led Initiative for Cyber-Resilient Keralam, associated with Kerala Police.",
                "Participated in the Cyber First Responder Awareness Programme, completed the introductory awareness session, and took the Cyber Safety Pledge.",
                "Attended the inauguration of CLICK on 31 October 2026 at Rajiv Gandhi Indoor Stadium, Kochi.",
                "Building awareness of common cyber threats, digital risks, responsible digital practices, and safe online behaviour through community engagement.",
                "Supporting the vision of a cyber-resilient society and contributing to the initiative’s broader goal of a cyber-resilient Kerala by 2027.",
                "Institutional context: TIST, a recognised Cyber Resilience Centre, hosted a CLICK Cyber Crime Capacity Building Training Programme for Police Officers from 27–29 October 2026; TIST student volunteers also attended a session on cybercrimes faced by students. This context is separate from my individual role and does not represent police training or professional incident-response certification."
            ],
            certificate: null, lor: null
        },
        {
            role: "AI-Powered Full Stack & Intelligent Application Development Intern",
            company: "Lifosys Digital Systems & AiiLab",
            start: "3 Jun – 3 Jul 2026", end: "Completed",
            points: [
                "Worked through guided industry sessions and project-based learning in AI-powered application development.",
                "Built and presented intelligent application concepts using modern AI and full-stack workflows.",
                "Collaborated with peers and applied practical software-development and problem-solving skills."
            ],
            certificate: "assets/experience/lifosys-internship.jpeg", lor: null
        },
        {
            role: "Generative AI Intern",
            company: "Prodigy InfoTech",
            start: "1 – 30 Jun 2026", end: "Completed",
            points: [
                "Completed a one-month project-based internship in Generative AI.",
                "Worked on tasks involving generative-AI workflows including neural style transfer and image-to-image translation.",
                "Maintained project repositories and documented work for technical demonstration."
            ],
            certificate: "assets/experience/prodigy-completion.pdf", lor: "assets/experience/prodigy-lor.pdf"
        },
    ];
    const CredentialButton = ({ href, children }) => href ? (React.createElement("a", { className: "credential-btn", href: href, target: "_blank", rel: "noopener noreferrer" }, children)) : null;
    return (React.createElement("section", { id: "experience", className: "experience-section", ref: ref },
        React.createElement("div", { className: "section-inner" },
            React.createElement("div", { className: `section-header${vis ? " visible" : ""}` },
                React.createElement("span", { className: "section-badge" }, "Career"),
                React.createElement("h2", { className: "section-title" }, "Experience"),
                React.createElement("p", { className: "section-subtitle" }, "Practical experience applying AI, software development, and collaborative problem-solving to real projects.")),
            React.createElement("div", { className: "exp-timeline" }, experiences.map((exp, i) => (React.createElement("div", { key: exp.company, className: `exp-item${exp.featured ? " featured" : ""}${vis ? " visible" : ""}`, style: { transitionDelay: `${i * 0.15}s` } },
                React.createElement("div", { className: "exp-icon-wrap" },
                    React.createElement("svg", { className: "exp-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                        React.createElement("rect", { x: "2", y: "7", width: "20", height: "14", rx: "2" }),
                        React.createElement("path", { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }))),
                React.createElement("div", { className: "exp-card" },
                    exp.featured && (React.createElement("div", { className: "exp-featured-label" }, "ONGOING \u00B7 COMMUNITY CYBERSECURITY")),
                    React.createElement("div", { className: "exp-card-top" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "exp-role" }, exp.role),
                            React.createElement("p", { className: "exp-company" }, exp.company)),
                        React.createElement("div", { className: "exp-dates" },
                            React.createElement("svg", { className: "exp-date-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
                                React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
                                React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
                                React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })),
                            React.createElement("span", null, exp.start),
                            React.createElement("span", { className: "exp-present-badge" }, exp.end))),
                    React.createElement("ul", { className: "exp-points" }, exp.points.map(p => React.createElement("li", { key: p }, p))),
                    React.createElement("div", { className: "exp-credentials" },
                        React.createElement(CredentialButton, { href: exp.certificate }, "View Certificate"),
                        React.createElement(CredentialButton, { href: exp.lor }, "View LOR"))))))))));
}
// ════════════════════════════════════════════════════════════
// EDUCATION
// ════════════════════════════════════════════════════════════
function Education() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    const education = [
        {
            icon: "🎓",
            institution: "Toc H Institute of Science & Technology",
            degree: "B.Tech — Computer Science & Engineering",
            period: "2025 – 2029",
            featured: true,
        },
    ];
    const development = [
        {
            icon: "🚀",
            title: "CCBP 4.0 Academy",
            organization: "NxtWave",
            meta: "Industry-aligned software development learning pathway",
            status: "Ongoing",
            skills: "Programming · Web Development · DSA · Projects",
        },
        {
            icon: "💼",
            title: "Digital Edge 101",
            organization: "NASSCOM FutureSkills Prime",
            meta: "30-hour digital-skills course · Assessment certified at Silver level (69%)",
            status: "Completed",
            skills: "Digital Fluency · Workplace Technology · Industry Readiness",
            credential: "assets/credentials/nasscom-digital-edge-assessment.pdf",
            secondaryCredential: "assets/credentials/nasscom-digital-edge-course.jpg",
        },
        {
            icon: "☕",
            title: "Programming in Java / Object-Oriented Programming",
            organization: "NPTEL",
            meta: "NPTEL 12-week course · 99/100 · 4 credits recommended",
            status: "Completed",
            skills: "Java · OOP · Classes & Objects · Inheritance · Polymorphism",
            credential: "assets/credentials/nptel-java-99.pdf",
        },
    ];
    return (React.createElement("section", { id: "education", className: "education-section", ref: ref },
        React.createElement("div", { className: "section-inner" },
            React.createElement("div", { className: `section-header${vis ? " visible" : ""}` },
                React.createElement("span", { className: "section-badge" }, "Learning Journey"),
                React.createElement("h2", { className: "section-title" }, "Education & Professional Development"),
                React.createElement("p", { className: "section-subtitle" }, "Formal education alongside structured, industry-focused programs that strengthen my technical and professional skills.")),
            React.createElement("p", { className: `subsection-kicker${vis ? " visible" : ""}` }, "Education"),
            React.createElement("div", { className: "edu-grid single" }, education.map((d, i) => (React.createElement("div", { key: d.institution, className: `edu-card${d.featured ? " featured" : ""}${vis ? " visible" : ""}`, style: { transitionDelay: `${i * 0.12}s` } },
                React.createElement("span", { className: "edu-icon" }, d.icon),
                React.createElement("p", { className: "edu-inst" }, d.institution),
                React.createElement("p", { className: "edu-degree" }, d.degree),
                React.createElement("p", { className: "edu-period" }, d.period))))),
            React.createElement("div", { className: `academic-highlights${vis ? " visible" : ""}` },
                React.createElement("div", { className: "academic-highlight-label" }, "Academic Highlights"),
                React.createElement("div", { className: "academic-highlight-grid" },
                    React.createElement("div", null,
                        React.createElement("span", null, "Semester 1 SGPA"),
                        React.createElement("strong", null, "9.26"),
                        React.createElement("small", null, "Completed")),
                    React.createElement("div", null,
                        React.createElement("span", null, "Semester 2 SGPA"),
                        React.createElement("strong", null, "9.48"),
                        React.createElement("small", null, "Completed")),
                    React.createElement("div", null,
                        React.createElement("span", null, "NPTEL Java"),
                        React.createElement("strong", null, "99/100"),
                        React.createElement("small", null, "12-week course \u00B7 4 credits recommended")))),
            React.createElement("p", { className: `subsection-kicker dev-kicker${vis ? " visible" : ""}` }, "Academic & Professional Development"),
            React.createElement("div", { className: "development-grid" }, development.map((item, i) => (React.createElement("article", { key: item.title, className: `development-card${vis ? " visible" : ""}`, style: { transitionDelay: `${0.12 + i * 0.08}s` } },
                React.createElement("div", { className: "development-top" },
                    React.createElement("span", { className: "development-icon" }, item.icon),
                    React.createElement("span", { className: `status-badge ${item.status.toLowerCase()}` }, item.status)),
                React.createElement("p", { className: "development-org" }, item.organization),
                React.createElement("h3", { className: "development-title" }, item.title),
                React.createElement("p", { className: "development-meta" }, item.meta),
                React.createElement("p", { className: "development-skills" }, item.skills),
                (item.credential || item.secondaryCredential) && (React.createElement("div", { className: "development-actions" },
                    item.credential && React.createElement("a", { href: item.credential, target: "_blank", rel: "noopener noreferrer", className: "credential-btn" }, "View Assessment"),
                    item.secondaryCredential && React.createElement("a", { href: item.secondaryCredential, target: "_blank", rel: "noopener noreferrer", className: "credential-btn secondary" }, "Course Certificate"))))))))));
}
// ════════════════════════════════════════════════════════════
// PROCESS
// ════════════════════════════════════════════════════════════
function Process() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    const [active, setActive] = useState(-1);
    const steps = [
        { num: "01", title: "Define", side: "right", rot: 2, desc: "Understanding the problem space deeply — researching requirements, user needs, and technical constraints before writing a single line." },
        { num: "02", title: "Design", side: "left", rot: -2, desc: "Wireframes to high-fidelity interfaces in Figma — every layout choice driven by clarity, usability, and the user's actual goals." },
        { num: "03", title: "Build", side: "right", rot: 3, desc: "Clean, readable code in Python, JavaScript, or HTML/CSS — with Git version control, responsive layouts, and AI integrations where they add value." },
        { num: "04", title: "Launch", side: "left", rot: -3, desc: "Deploying to production, testing across devices, iterating based on feedback. I stay invested until the solution actually works." },
    ];
    useEffect(() => {
        if (!vis)
            return;
        let i = 0;
        const iv = setInterval(() => {
            setActive(i++);
            if (i >= steps.length)
                clearInterval(iv);
        }, 500);
        return () => clearInterval(iv);
    }, [vis]);
    return (React.createElement("section", { className: "process-section", ref: ref },
        React.createElement("div", { className: "process-grid-bg" }),
        React.createElement("div", { className: "process-inner" },
            React.createElement("div", { className: `section-header${vis ? " visible" : ""} process-header`, style: { marginBottom: "5rem" } },
                React.createElement("span", { className: "section-badge" }, "How I work"),
                React.createElement("h2", { className: "section-title" }, "From idea to working product \u2014 my process"),
                React.createElement("p", { className: "section-subtitle" }, "A four-stage approach I apply to every project \u2014 from college assignments to deployed web applications.")),
            React.createElement("div", { className: "process-cards" }, steps.map((s, i) => (React.createElement("div", { key: i, className: `process-row ${s.side}${vis ? " visible" : ""}`, style: { transitionDelay: `${i * 0.15}s` } },
                React.createElement("div", { className: `process-card${active >= i ? " active" : ""}`, style: { transform: `rotate(${s.rot}deg)` } },
                    React.createElement("div", { className: "process-dot" }),
                    React.createElement("p", { className: "process-num" }, s.num),
                    React.createElement("h3", { className: "process-title" }, s.title),
                    React.createElement("p", { className: "process-desc" }, s.desc)))))),
            React.createElement("span", { className: "process-sign" }, "Ready to be delivered! \u2713"))));
}
// ════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════
function Footer() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.1);
    return (React.createElement("footer", { id: "contact", className: "footer", ref: ref },
        React.createElement("div", { className: "footer-inner" },
            React.createElement("div", { className: `footer-grid${vis ? " visible" : ""}` },
                React.createElement("div", null,
                    React.createElement("p", { className: "footer-col-label" }, "Skills"),
                    ["Python · C · C++", "JavaScript · HTML · CSS", "Machine Learning", "Git · Canva · Jupyter"].map(s => (React.createElement("p", { key: s, className: "footer-col-item" }, s)))),
                React.createElement("div", null,
                    React.createElement("p", { className: "footer-col-label" }, "Education"),
                    React.createElement("p", { className: "footer-col-h" }, "Toc H Institue of Science & Technology"),
                    React.createElement("p", { className: "footer-col-sub" }, "B.Tech CSE \u00B7 2025\u20132029"),
                    React.createElement("a", { href: "https://github.com/anamikata", target: "_blank", rel: "noopener noreferrer", className: "footer-link-gold" }, "View GitHub \u2192")),
                React.createElement("div", null,
                    React.createElement("p", { className: "footer-col-label" }, "Availability"),
                    React.createElement("p", { className: "footer-avail" }, "Open to Internships & Hackathon Collaborations"),
                    React.createElement("p", { className: "footer-loc" }, "Kottayam, Kerala, India"),
                    React.createElement("p", { className: "footer-copy-sm" }, "\u00A9 2026")),
                React.createElement("div", null,
                    React.createElement("p", { className: "footer-col-label" }, "Contact"),
                    React.createElement("a", { href: "mailto:anamikata07@gmail.com", className: "footer-link-muted" }, "anamikata07@gmail.com"),
                    React.createElement("a", { href: "tel:+917994294931", className: "footer-link-muted" }, "+91 7994294931"),
                    React.createElement("a", { href: "https://www.linkedin.com/in/anamikata", target: "_blank", rel: "noopener noreferrer", className: "footer-link-gold" }, "linkedin.com/in/anamikata"),
                    React.createElement("a", { href: "https://github.com/anamikata", target: "_blank", rel: "noopener noreferrer", className: "footer-link-gold" }, "github.com/anamikata"))),
            React.createElement("div", { className: "footer-brand-wrap" },
                React.createElement("h2", { className: `footer-brand${vis ? " visible" : ""}` }, "anamika")),
            React.createElement("div", { className: `footer-bottom${vis ? " visible" : ""}` },
                React.createElement("p", { className: "footer-bottom-copy" }, "Built with React \u00B7 \u00A9 Anamika T A 2026"),
                React.createElement("a", { href: "mailto:anamikata07@gmail.com", className: "footer-bottom-email" }, "anamikata07@gmail.com"),
                React.createElement("a", { href: "https://www.linkedin.com/in/anamikata", target: "_blank", rel: "noopener noreferrer", className: "footer-bottom-li" }, "LinkedIn")))));
}
// ════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ════════════════════════════════════════════════════════════
const MILESTONE = {
    "id": "iict-ai-readiness",
    "title": "Foundation Course on AI Readiness",
    "issuer": "Indian Institute of Creative Technologies (IICT)",
    "date": "31 Jul 2026",
    "href": "assets/credentials/iict-ai-readiness.pdf",
    "thumb": "assets/thumbnails/iict-ai-readiness.jpg"
};
const CERTS = [
    {
        "id": "google-ai",
        "title": "Google AI Essentials",
        "issuer": "Google / Coursera",
        "category": "AI & GenAI",
        "type": "Specialization",
        "date": "20 May 2026",
        "featured": true,
        "href": "assets/credentials/google-ai.pdf",
        "thumb": "assets/thumbnails/google-ai.jpg"
    },
    {
        "id": "google-prompting",
        "title": "Google Prompting Essentials",
        "issuer": "Google / Coursera",
        "category": "AI & GenAI",
        "type": "Specialization",
        "date": "21 May 2026",
        "featured": true,
        "href": "assets/credentials/google-prompting.pdf",
        "thumb": "assets/thumbnails/google-prompting.jpg"
    },
    {
        "id": "claude-code",
        "title": "Claude Code 101",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "featured": true,
        "href": "assets/credentials/claude-code.pdf",
        "thumb": "assets/thumbnails/claude-code.jpg"
    },
    {
        "id": "mcp",
        "title": "Introduction to Model Context Protocol",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "featured": true,
        "href": "assets/credentials/mcp.pdf",
        "thumb": "assets/thumbnails/mcp.jpg"
    },
    {
        "id": "mvp-project",
        "title": "Build and Launch Your MVP — Project Completion",
        "issuer": "NxtWave Academy",
        "category": "AI & GenAI",
        "type": "Project Completion",
        "date": "20 May 2026",
        "featured": true,
        "href": "assets/credentials/mvp-project.png",
        "thumb": "assets/thumbnails/mvp-project.png"
    },
    {
        "id": "ai-fluency-students",
        "title": "AI Fluency for Students",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/ai-fluency-students.pdf",
        "thumb": "assets/thumbnails/ai-fluency-students.jpg"
    },
    {
        "id": "ai-capabilities",
        "title": "AI Fluency: AI Capabilities & Limitations",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/ai-capabilities.pdf",
        "thumb": "assets/thumbnails/ai-capabilities.jpg"
    },
    {
        "id": "ai-frameworks",
        "title": "AI Fluency: Framework & Foundations",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/ai-frameworks.pdf",
        "thumb": "assets/thumbnails/ai-frameworks.jpg"
    },
    {
        "id": "claude-101",
        "title": "Claude 101",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/claude-101.pdf",
        "thumb": "assets/thumbnails/claude-101.jpg"
    },
    {
        "id": "claude-cowork",
        "title": "Introduction to Claude Cowork",
        "issuer": "Anthropic",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/claude-cowork.pdf",
        "thumb": "assets/thumbnails/claude-cowork.jpg"
    },
    {
        "id": "infosys-chatgpt-ds",
        "title": "ChatGPT for Data Science and Machine Learning",
        "issuer": "Infosys Springboard",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "25 Jun 2026",
        "href": "assets/credentials/infosys-chatgpt-ds.pdf",
        "thumb": "assets/thumbnails/infosys-chatgpt-ds.jpg"
    },
    {
        "id": "infosys-intro-ai",
        "title": "Introduction to Artificial Intelligence",
        "issuer": "Infosys Springboard",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "15 Jul 2026",
        "href": "assets/credentials/infosys-intro-ai.pdf",
        "thumb": "assets/thumbnails/infosys-intro-ai.jpg"
    },
    {
        "id": "infosys-nlp",
        "title": "Introduction to Natural Language Processing",
        "issuer": "Infosys Springboard",
        "category": "AI & GenAI",
        "type": "Course Completion",
        "date": "17 Jul 2026",
        "href": "assets/credentials/infosys-nlp.pdf",
        "thumb": "assets/thumbnails/infosys-nlp.jpg"
    },
    {
        "id": "infosys-data-python",
        "title": "Data Analysis with Python",
        "issuer": "Infosys Springboard",
        "category": "Data & Analytics",
        "type": "Course Completion",
        "date": "28 Jun 2026",
        "href": "assets/credentials/infosys-data-python.pdf",
        "thumb": "assets/thumbnails/infosys-data-python.jpg"
    },
    {
        "id": "infosys-statistics",
        "title": "Statistics for Data Science",
        "issuer": "Infosys Springboard",
        "category": "Data & Analytics",
        "type": "Course Completion",
        "date": "27 Jun 2026",
        "href": "assets/credentials/infosys-statistics.pdf",
        "thumb": "assets/thumbnails/infosys-statistics.jpg"
    },
    {
        "id": "infosys-creative",
        "title": "Building Creative Confidence",
        "issuer": "Infosys Springboard",
        "category": "Professional Skills",
        "type": "Course Completion",
        "date": "26 Jul 2026",
        "href": "assets/credentials/infosys-creative.pdf",
        "thumb": "assets/thumbnails/infosys-creative.jpg"
    },
    {
        "id": "infosys-confidence",
        "title": "Unleashing Your Self-confidence",
        "issuer": "Infosys Springboard",
        "category": "Professional Skills",
        "type": "Course Completion",
        "date": "3 Aug 2026",
        "href": "assets/credentials/infosys-confidence.pdf",
        "thumb": "assets/thumbnails/infosys-confidence.jpg"
    },
    {
        "id": "infosys-leadership",
        "title": "Women in Leadership: Mastering Key Leadership Competencies",
        "issuer": "Infosys Springboard",
        "category": "Professional Skills",
        "type": "Course Completion",
        "date": "4 Aug 2026",
        "href": "assets/credentials/infosys-leadership.pdf",
        "thumb": "assets/thumbnails/infosys-leadership.jpg"
    },
    {
        "id": "nxt-mvp-participation",
        "title": "Build and Launch Your MVP Workshop",
        "issuer": "NxtWave Academy",
        "category": "Workshops & Participation",
        "type": "Workshop Participation",
        "date": "20 May 2026",
        "href": "assets/credentials/nxt-mvp-participation.png",
        "thumb": "assets/thumbnails/nxt-mvp-participation.png"
    },
    {
        "id": "nxt-job-ready",
        "title": "Building Job-Ready Skills in the AI Era",
        "issuer": "NxtWave Academy",
        "category": "Professional Skills",
        "type": "Masterclass",
        "date": "27 Jan 2026",
        "href": "assets/credentials/nxt-job-ready.png",
        "thumb": "assets/thumbnails/nxt-job-ready.png"
    },
    {
        "id": "nxt-engineering-cheat",
        "title": "The Engineering Cheat Sheet",
        "issuer": "NxtWave Academy",
        "category": "Professional Skills",
        "type": "Industry Podcast",
        "date": "23 Jul 2026",
        "href": "assets/credentials/nxt-engineering-cheat.jpeg",
        "thumb": "assets/thumbnails/nxt-engineering-cheat.jpeg"
    },
    {
        "id": "nxt-startup",
        "title": "Inside the Startup Ecosystem",
        "issuer": "NxtWave Academy",
        "category": "Professional Skills",
        "type": "Industry Podcast",
        "date": "17 Mar 2026",
        "href": "assets/credentials/nxt-startup.png",
        "thumb": "assets/thumbnails/nxt-startup.png"
    },
    {
        "id": "nxt-rpa",
        "title": "AI and Robotic Process Automation Workshop",
        "issuer": "NxtWave Academy",
        "category": "AI & GenAI",
        "type": "Workshop Participation",
        "date": "27 Feb 2026",
        "href": "assets/credentials/nxt-rpa.png",
        "thumb": "assets/thumbnails/nxt-rpa.png"
    },
    {
        "id": "deloitte-data",
        "title": "Data Analytics Job Simulation",
        "issuer": "Deloitte / Forage",
        "category": "Data & Analytics",
        "type": "Job Simulation",
        "date": "2 Apr 2026",
        "featured": true,
        "href": "assets/credentials/deloitte-data.jpg",
        "thumb": "assets/thumbnails/deloitte-data.jpg"
    },
    {
        "id": "hp-data",
        "title": "Data Science & Analytics",
        "issuer": "HP LIFE / HP Foundation",
        "category": "Data & Analytics",
        "type": "Course Completion",
        "date": "2026",
        "href": "assets/credentials/hp-data.jpg",
        "thumb": "assets/thumbnails/hp-data.jpg"
    },
    {
        "id": "tathva-data",
        "title": "Data Mining Workshop — Tathva '25",
        "issuer": "NIT Calicut",
        "category": "Data & Analytics",
        "type": "Technical Workshop",
        "date": "24–26 Oct 2025",
        "href": "assets/credentials/tathva-data.jpg",
        "thumb": "assets/thumbnails/tathva-data.jpg"
    },
    {
        "id": "gcloud-trust",
        "title": "Trust and Security with Google Cloud",
        "issuer": "Simplilearn SkillUp",
        "category": "Cloud & Tools",
        "type": "Course Completion",
        "date": "4 Apr 2026",
        "href": "assets/credentials/gcloud-trust.jpg",
        "thumb": "assets/thumbnails/gcloud-trust.jpg"
    },
    {
        "id": "excel",
        "title": "Introduction to MS Excel",
        "issuer": "Microsoft / Simplilearn SkillUp",
        "category": "Cloud & Tools",
        "type": "Course Completion",
        "date": "9 Apr 2026",
        "href": "assets/credentials/excel.jpg",
        "thumb": "assets/thumbnails/excel.jpg"
    },
    {
        "id": "tata-cyber",
        "title": "Cybersecurity Analyst Job Simulation",
        "issuer": "Tata / Forage",
        "category": "Cybersecurity",
        "type": "Job Simulation",
        "date": "4 Apr 2026",
        "featured": true,
        "href": "assets/credentials/tata-cyber.jpg",
        "thumb": "assets/thumbnails/tata-cyber.jpg"
    },
    {
        "id": "cyber-verse",
        "title": "Cyber Verse: Blue Teaming",
        "issuer": "IEEE Computer Society Kerala Chapter",
        "category": "Cybersecurity",
        "type": "Technical Workshop",
        "date": "26 Jun 2026",
        "href": "assets/credentials/cyber-verse.png",
        "thumb": "assets/thumbnails/cyber-verse.png"
    },
    {
        "id": "hacklab",
        "title": "HACKLAB.exe: Cyber Security Workshop",
        "issuer": "TECHFOSS 2026 · Toc H / IEEE CS",
        "category": "Cybersecurity",
        "type": "Technical Workshop",
        "date": "27 Feb 2026",
        "href": "assets/credentials/hacklab.png",
        "thumb": "assets/thumbnails/hacklab.png"
    },
    {
        "id": "guvi-fullstack",
        "title": "AI Powered Full Stack Development",
        "issuer": "GUVI / HCL",
        "category": "AI & GenAI",
        "type": "Technical Workshop",
        "date": "9 Jul 2026",
        "href": "assets/credentials/guvi-fullstack.png",
        "thumb": "assets/thumbnails/guvi-fullstack.png"
    },
    {
        "id": "be10x",
        "title": "AI Tools & ChatGPT Workshop",
        "issuer": "be10x",
        "category": "AI & GenAI",
        "type": "Workshop Completion",
        "date": "19 Jul 2026",
        "href": "assets/credentials/be10x.pdf",
        "thumb": "assets/thumbnails/be10x.jpg"
    },
    {
        "id": "gfg-interview",
        "title": "Interview Preparation Workshop",
        "issuer": "GeeksforGeeks Campus Body",
        "category": "Professional Skills",
        "type": "Workshop Participation",
        "date": "2026",
        "href": "assets/credentials/gfg-interview.png",
        "thumb": "assets/thumbnails/gfg-interview.png"
    },
    {
        "id": "career-roadmap",
        "title": "Career Roadmap After B.Tech",
        "issuer": "Korvet.in / TIME",
        "category": "Professional Skills",
        "type": "Training",
        "date": "2026",
        "href": "assets/credentials/career-roadmap.jpg",
        "thumb": "assets/thumbnails/career-roadmap.jpg"
    },
    {
        "id": "ieee-xplore",
        "title": "VTU – IEEE Xplore Training",
        "issuer": "EBSCO / IEEE",
        "category": "Workshops & Participation",
        "type": "Training Participation",
        "date": "13 Jan 2026",
        "href": "assets/credentials/ieee-xplore.jpg",
        "thumb": "assets/thumbnails/ieee-xplore.jpg"
    },
    {
        "id": "resonance",
        "title": "The Resonance Series — Edition 1",
        "issuer": "IEEE Signal Processing Society · Toc H",
        "category": "Workshops & Participation",
        "type": "Industry Session",
        "date": "17 Jul 2026",
        "href": "assets/credentials/resonance.jpeg",
        "thumb": "assets/thumbnails/resonance.jpeg"
    },
    {
        "id": "tedx",
        "title": "TEDxTIST 2026 — Clarity in Chaos",
        "issuer": "TEDxTIST",
        "category": "Workshops & Participation",
        "type": "Event Participation",
        "date": "18 Mar 2026",
        "href": "assets/credentials/tedx.jpg",
        "thumb": "assets/thumbnails/tedx.jpg"
    },
    {
        "id": "ndli-library",
        "title": "Integrating NDLI with TIST Library",
        "issuer": "NDLI Club / IIT Kharagpur",
        "category": "Workshops & Participation",
        "type": "Session Participation",
        "date": "29 Oct 2025",
        "href": "assets/credentials/ndli-library.jpg",
        "thumb": "assets/thumbnails/ndli-library.jpg"
    },
    {
        "id": "ndli-stress",
        "title": "Mental Health and Stress Management in Academic Environment",
        "issuer": "NDLI Club / IIT Kharagpur",
        "category": "Workshops & Participation",
        "type": "Session Participation",
        "date": "7 Apr 2026",
        "href": "assets/credentials/ndli-stress.jpg",
        "thumb": "assets/thumbnails/ndli-stress.jpg"
    },
    {
        "id": "nptel-java-99",
        "title": "Programming in Java",
        "issuer": "NPTEL",
        "category": "Programming & Development",
        "type": "Course Completion",
        "date": "Jul–Oct 2026",
        "featured": true,
        "credentialId": "NPTEL26CS153S1158500076",
        "href": "assets/credentials/nptel-java-99.pdf",
        "thumb": "assets/thumbnails/nptel-java-99.jpg",
        "note": "99/100 · 12-week course · 4 credits recommended"
    },
    {
        "id": "nxtwave-ai-visionboot",
        "title": "AI VISIONBOOT — Project Completion",
        "issuer": "NxtWave",
        "category": "AI & GenAI",
        "type": "Project Completion",
        "date": "2026",
        "featured": true,
        "href": "assets/credentials/nxtwave-ai-visionboot.png",
        "thumb": "assets/thumbnails/nxtwave-ai-visionboot.jpg"
    },
    {
        "id": "infosys-numpy",
        "title": "Python — Advanced Operations with NumPy Arrays",
        "issuer": "Infosys Springboard",
        "category": "Data & Analytics",
        "type": "Course Completion",
        "date": "6 Sep 2026",
        "href": "assets/credentials/infosys-numpy.pdf",
        "thumb": "assets/thumbnails/infosys-numpy.jpg"
    },
    {
        "id": "aws-ai-practitioner-modules",
        "title": "AWS AI Practitioner — Learning Modules",
        "issuer": "Infosys Springboard · AWS AI Practitioner learning path",
        "category": "AI & GenAI",
        "type": "12 Learning Modules",
        "date": "6 Sep 2026",
        "featured": true,
        "href": "assets/credentials/aws-ai-practitioner/index.html",
        "thumb": "assets/thumbnails/aws-ai-practitioner.jpg",
        "note": "Grouped as 12 learning modules rather than presented as an AWS professional certification."
    },
    {
        "id": "asthra-11-ai-for-education",
        "title": "ASTHRA 11.0 — AI for Education — First Position",
        "issuer": "St. Joseph’s College of Engineering and Technology (Autonomous), Palai",
        "category": "Recognition",
        "type": "Certificate of Achievement",
        "date": "17–18 Sep 2026",
        "href": "assets/credentials/asthra-11-ai-for-education-first-position.png",
        "thumb": "assets/thumbnails/asthra-11-ai-for-education-first-position.jpg",
        "note": "Secured First Position in ASTHRA X — AI for Education at ASTHRA 11.0, a National Level Annual Technical Fest."
    },
    {
        "id": "retechnox-internship",
        "title": "5-Day Python Programming Internship",
        "issuer": "Retechnox Technologies LLP",
        "category": "Workshops & Participation",
        "type": "Short Internship",
        "date": "5–9 Oct 2025",
        "href": "assets/credentials/retechnox-internship.png",
        "thumb": "assets/thumbnails/retechnox-internship.png"
    },
    {
        "id": "retechnox-workshop",
        "title": "Python Programming Workshop",
        "issuer": "Retechnox Technologies LLP",
        "category": "Workshops & Participation",
        "type": "Workshop Completion",
        "date": "10 Oct 2025",
        "href": "assets/credentials/retechnox-workshop.png",
        "thumb": "assets/thumbnails/retechnox-workshop.png"
    },
    {
        "id": "retechnox-quiz",
        "title": "Python Programming Quiz",
        "issuer": "Retechnox Technologies LLP",
        "category": "Workshops & Participation",
        "type": "Assessment Completion",
        "date": "10 Oct 2025",
        "href": "assets/credentials/retechnox-quiz.png",
        "thumb": "assets/thumbnails/retechnox-quiz.png"
    }
];
function Certifications() {
    const ref = useRef(null);
    const vis = useInView(ref, 0.05);
    const [active, setActive] = useState(null);
    const [filter, setFilter] = useState("All");
    const categories = ["All", "AI & GenAI", "Programming & Development", "Data & Analytics", "Cloud & Tools", "Cybersecurity", "Professional Skills", "Workshops & Participation", "Recognition"];
    const filtered = filter === "All" ? CERTS : CERTS.filter(cert => cert.category === filter);
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape")
            setActive(null); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
    return (React.createElement("section", { id: "certifications", className: "certs-section", ref: ref },
        React.createElement("div", { className: "certs-inner" },
            React.createElement("div", { className: `section-label fade-up${vis ? " visible" : ""}` }, "Credentials"),
            React.createElement("h2", { className: `section-h2 fade-up${vis ? " visible" : ""}` }, "Certifications & Credentials"),
            React.createElement("p", { className: `section-sub fade-up${vis ? " visible" : ""}` }, "A de-duplicated collection of substantial course completions, project credentials, simulations, workshops, and selected participation records."),
            React.createElement("article", { className: `milestone-card${vis ? " visible" : ""}` },
                React.createElement("div", { className: "milestone-copy" },
                    React.createElement("span", { className: "milestone-kicker" }, "\u2605 Featured Milestone"),
                    React.createElement("h3", null, MILESTONE.title),
                    React.createElement("p", { className: "milestone-issuer" }, MILESTONE.issuer),
                    React.createElement("p", { className: "milestone-date" }, MILESTONE.date),
                    React.createElement("p", { className: "milestone-note" }, "A consolidated AI-readiness milestone, highlighted separately from individual short-course credentials."),
                    React.createElement("a", { href: MILESTONE.href, target: "_blank", rel: "noopener noreferrer", className: "btn-primary milestone-btn" }, "View Credential")),
                React.createElement("button", { className: "milestone-preview", onClick: () => setActive(MILESTONE), "aria-label": "Preview IICT AI Readiness credential" },
                    React.createElement("img", { src: MILESTONE.thumb, alt: MILESTONE.title }))),
            React.createElement("div", { className: "cert-filter-row", role: "group", "aria-label": "Filter credentials" }, categories.map(cat => (React.createElement("button", { key: cat, className: `cert-filter${filter === cat ? " active" : ""}`, onClick: () => setFilter(cat) }, cat)))),
            React.createElement("div", { className: "cert-count" },
                filtered.filter(c => !c.placeholder).length,
                " verified credential",
                filtered.filter(c => !c.placeholder).length === 1 ? "" : "s"),
            React.createElement("div", { className: "cert-grid" }, filtered.map((cert, i) => (React.createElement("article", { key: cert.id, className: `credential-card${cert.featured ? " featured" : ""}${vis ? " visible" : ""}`, style: { transitionDelay: `${Math.min(i, 8) * 0.04}s` } },
                React.createElement("button", { className: "credential-preview", onClick: () => !cert.placeholder && setActive(cert), "aria-label": `${cert.placeholder ? "Reserved" : "Preview"} ${cert.title}` },
                    React.createElement("img", { src: cert.thumb, alt: "", loading: "lazy" }),
                    React.createElement("span", { className: "credential-preview-overlay" }, cert.placeholder ? "Reserved" : "Preview"),
                    cert.featured && React.createElement("span", { className: "credential-featured" }, "\u2605 Featured")),
                React.createElement("div", { className: "credential-copy" },
                    React.createElement("div", { className: "credential-meta" },
                        React.createElement("span", null, cert.type),
                        React.createElement("span", null, cert.date)),
                    React.createElement("h3", null, cert.title),
                    React.createElement("p", null, cert.issuer),
                    React.createElement("div", { className: "credential-footer" },
                        React.createElement("span", { className: "credential-category" }, cert.category),
                        cert.placeholder ? React.createElement("span", { className: "credential-pending" }, "Awaiting upload") : React.createElement("a", { href: cert.href, target: "_blank", rel: "noopener noreferrer" }, "View Credential \u2192")))))))),
        active && (React.createElement("div", { className: "cert-modal-backdrop", onClick: () => setActive(null) },
            React.createElement("div", { className: "cert-modal credential-modal", onClick: e => e.stopPropagation() },
                React.createElement("button", { className: "cert-modal-close", onClick: () => setActive(null), "aria-label": "Close credential preview" }, "\u2715"),
                React.createElement("img", { src: active.thumb, alt: active.title, className: "cert-modal-img" }),
                React.createElement("div", { className: "cert-modal-info" },
                    React.createElement("span", { className: "cert-type-badge" }, active.type || "Milestone"),
                    React.createElement("p", { className: "cert-modal-title" }, active.title),
                    React.createElement("p", { className: "cert-modal-issuer" },
                        active.issuer,
                        active.date ? ` · ${active.date}` : ""),
                    active.credentialId && React.createElement("p", { className: "cert-modal-id" },
                        "Credential ID: ",
                        active.credentialId),
                    active.note && React.createElement("p", { className: "cert-modal-note" }, active.note),
                    React.createElement("a", { href: active.href, target: "_blank", rel: "noopener noreferrer", className: "credential-modal-link" }, "Open Full Credential \u2192")))))));
}
function BeyondScreen() {
    const moments = [
        ["assets/photos/moment-01.jpg", "Presenting", "Sharing ideas in a classroom setting"],
        ["assets/photos/moment-02.jpg", "Learning Session", "Participating in a technical session"],
        ["assets/photos/moment-03.jpg", "Team & Community", "Learning with peers and mentors"],
        ["assets/photos/moment-04.jpg", "Collaboration", "Working through ideas together"],
        ["assets/photos/moment-05.jpg", "Campus Community", "Connecting beyond coursework"],
        ["assets/photos/moment-06.jpg", "Recognition", "Celebrating a learning milestone"],
        ["assets/photos/moment-07.jpg", "Hands-on Learning", "Working in a computer lab"],
        ["assets/photos/moment-08.jpg", "Teamwork", "Collaborating on practical work"],
        ["assets/photos/moment-09.jpg", "Presenting Together", "Communicating ideas with a team"],
        ["assets/photos/moment-10.jpg", "Collaborating Ideas", "Discussion, teamwork and problem-solving"],
        ["assets/photos/moment-11.jpg", "Campus Event", "Learning through participation"],
        ["assets/photos/moment-12.jpg", "Building Together", "Working on ideas with peers"]
    ];
    return React.createElement("section", { id: "beyond-screen", className: "beyond-screen" },
        React.createElement("div", { className: "section-container" },
            React.createElement("div", { className: "section-kicker" }, "MOMENTS & EXPERIENCES"),
            React.createElement("h2", null, "Beyond the Screen"),
            React.createElement("p", { className: "beyond-lead" }, "Learning, presenting, collaborating and building with people."),
            React.createElement("div", { className: "beyond-grid" }, moments.map((m, i) => React.createElement("figure", { className: `beyond-card beyond-${(i % 6) + 1}`, key: m[0] },
                React.createElement("img", { src: m[0], alt: m[1], loading: "lazy" }),
                React.createElement("figcaption", null,
                    React.createElement("strong", null, m[1]),
                    React.createElement("span", null, m[2])))))));
}
function App() {
    const [loaded, setLoaded] = useState(false);
    return (React.createElement("div", null,
        !loaded && React.createElement(Preloader, { onDone: () => setLoaded(true) }),
        React.createElement(Navbar, null),
        React.createElement(Hero, null),
        React.createElement(About, null),
        React.createElement(Skills, null),
        React.createElement(Projects, null),
        React.createElement(Experience, null),
        React.createElement(Education, null),
        React.createElement(Certifications, null),
        React.createElement(BeyondScreen, null),
        React.createElement(Process, null),
        React.createElement(Footer, null)));
}
// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, null));
