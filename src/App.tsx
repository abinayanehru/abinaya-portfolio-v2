import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Copy, Github, Linkedin, Mail, Menu, X, FileText, Plus, Check, Play, Sparkles } from "lucide-react";
import { PROFILE, FEATURED, ADDITIONAL, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS, type Project } from "./data";
import { useReveal } from "./useReveal";

const NAV = [["About", "#about"], ["Work", "#work"], ["Skills", "#skills"], ["Journey", "#experience"], ["Contact", "#contact"]] as const;

function Artwork({ project }: { project: Project }) {
  return <div className={`artwork ${project.hue}`} aria-hidden="true"><div className="art-grid"/><div className="art-glow"/><span className="art-number">{project.index}</span><span className="art-cross">✳</span></div>;
}
function SimilarityDemo() {
  const [first, setFirst] = useState("kitten");
  const [second, setSecond] = useState("sitting");
  const distance = (a: string, b: string) => {
    const x = a.toLowerCase(), y = b.toLowerCase();
    const row = Array.from({ length: y.length + 1 }, (_, i) => i);
    for (let i = 1; i <= x.length; i++) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= y.length; j++) {
        const old = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (x[i - 1] === y[j - 1] ? 0 : 1));
        previous = old;
      }
    }
    return row[y.length];
  };
  const similarity = first.length + second.length === 0 ? 100 :
    Math.round((1 - distance(first, second) / Math.max(first.length, second.length, 1)) * 100);
  return <DemoFrame title="Try the similarity search" subtitle="Enter two words to compare their character-level similarity.">
    <div className="demo-input-grid">
      <label>First word<input value={first} onChange={e => setFirst(e.target.value)} placeholder="Enter a word"/></label>
      <label>Second word<input value={second} onChange={e => setSecond(e.target.value)} placeholder="Enter another word"/></label>
    </div>
    <div className="demo-result"><div><span className="demo-result-label">Similarity score</span><strong>{first.trim() && second.trim() ? `${similarity}%` : "—"}</strong></div>
      <div className="demo-meter"><span style={{ width: `${first.trim() && second.trim() ? similarity : 0}%` }}/></div>
      <p>{!first.trim() || !second.trim() ? "Enter both words to calculate a score." : similarity >= 80 ? "Very similar strings" : similarity >= 50 ? "Moderately similar strings" : "Low string similarity"}</p>
    </div>
  </DemoFrame>;
}

function DemoFrame({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <section className="project-demo" aria-label={title}>
    <div className="project-demo-heading"><span className="demo-icon"><Play size={15}/></span><div><h4>{title}</h4><p>{subtitle}</p></div><span className="demo-live"><i/> LIVE DEMO</span></div>
    {children}
    <p className="demo-disclaimer"><Sparkles size={13}/> Interactive sample for portfolio demonstration; uses local example data.</p>
  </section>;
}

function IncidentDemo() {
  const [description, setDescription] = useState("Unable to access the student portal");
  const [submitted, setSubmitted] = useState(false);
  const classify = (text: string) => {
    const d = text.toLowerCase();
    if (/data breach|ransomware|security breach|all systems down|production outage|fire|life[- ]threat|payment system down/.test(d)) return { level: "Critical", priority: "P1 · Immediate response", color: "critical", reason: "Potential security, safety, or organisation-wide outage." };
    if (/cannot access|unable to access|not working|system down|multiple users|service unavailable|blocked|failed login|crash/.test(d)) return { level: "High", priority: "P2 · Urgent response", color: "high", reason: "A key service appears unavailable or users are blocked." };
    if (/slow|delay|error|incorrect|intermittent|performance|timeout/.test(d)) return { level: "Medium", priority: "P3 · Standard queue", color: "medium", reason: "A service issue is reported but may have a workaround." };
    return { level: "Low", priority: "P4 · Low priority", color: "low", reason: "No urgent impact keywords detected; review the description if needed." };
  };
  const result = classify(description);
  return <DemoFrame title="Automated incident triage" subtitle="Describe the issue. The demo infers a priority from the incident text—severity is not selected manually.">
    <label className="demo-full-label">Incident description<textarea rows={3} value={description} onChange={e => { setDescription(e.target.value); setSubmitted(false); }} placeholder="Describe the issue, impact, and affected service…"/></label>
    <button className="demo-action" onClick={() => setSubmitted(true)} disabled={!description.trim()}>Run triage <ArrowUpRight size={15}/></button>
    {submitted && <div className="demo-result triage-result"><div><span className="demo-result-label">Machine-assigned severity</span><strong className={`severity-${result.color}`}>{result.level}</strong></div><div><span className="demo-result-label">Suggested priority</span><strong>{result.priority}</strong></div><p>{result.reason}</p><p>Sample classification based on keywords; a production system would use its configured rules/model and human review.</p></div>}
  </DemoFrame>;
}

function LanguageDemo() {
  const [language, setLanguage] = useState("Tamil");
  const [message, setMessage] = useState("Your request has been received.");
  const [translation, setTranslation] = useState("உங்கள் கோரிக்கை பெறப்பட்டது.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const codes: Record<string, string> = { English: "en", Tamil: "ta", Hindi: "hi", Spanish: "es", French: "fr", German: "de" };
  async function translate() {
    if (!message.trim()) { setTranslation(""); setError("Enter a message to translate."); return; }
    if (language === "English") { setTranslation(message); setError(""); return; }
    setLoading(true); setError("");
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(message.trim())}&langpair=en|${codes[language]}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Translation service unavailable");
      const data = await response.json();
      const translated = data?.responseData?.translatedText;
      if (!translated || data?.responseStatus >= 400) throw new Error("No translation was returned");
      setTranslation(translated);
    } catch {
      setTranslation("");
      setError("Could not fetch a translation right now. Check your internet connection and try again.");
    } finally { setLoading(false); }
  }
  return <DemoFrame title="Multilingual message translator" subtitle="Enter a new English sentence, choose a language, and translate that specific text.">
    <label className="demo-full-label">Source message (English)<textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Type any sentence to translate"/></label>
    <label className="demo-full-label">Translate to<select value={language} onChange={e => setLanguage(e.target.value)}>{Object.keys(codes).map(l => <option key={l}>{l}</option>)}</select></label>
    <button className="demo-action" onClick={translate} disabled={loading || !message.trim()}>{loading ? "Translating…" : "Translate message"} <ArrowUpRight size={15}/></button>
    <div className="demo-result"><span className="demo-result-label">{language} translation</span><strong className="demo-translation">{loading ? "Translating your sentence…" : translation || error || "Your translation will appear here."}</strong>{error && <p role="status">{error}</p>}<p>Uses an online translation service; translation quality and availability may vary.</p></div>
  </DemoFrame>;
}

function LeaveDemo() {
  const [requested, setRequested] = useState(3);
  const totalAccrued = 18;
  const previousConsumed = 5;
  const availableBeforeRequest = totalAccrued - previousConsumed;
  const remaining = availableBeforeRequest - requested;
  return <DemoFrame title="Accrual balance deduction engine" subtitle="Adjust requested leave and see the available balance and validation update live.">
    <div className="leave-demo-top"><span>ANNUAL QUOTA: {totalAccrued.toFixed(1)} DAYS</span></div>
    <div className="leave-engine">
      <div className="leave-slider-head"><label htmlFor="leave-days">Select requested leave: <strong>{requested.toFixed(1)} Days</strong></label><input id="leave-days" type="range" min="0.5" max="15" step="0.5" value={requested} onChange={e => setRequested(Number(e.target.value))}/></div>
      <div className="leave-metrics"><div><span>Total accrued</span><strong>{totalAccrued.toFixed(1)} d</strong></div><div><span>Previous consumed</span><strong>{previousConsumed.toFixed(1)} d</strong></div><div className={remaining >= 0 ? "balance-ok" : "balance-low"}><span>Balance after request</span><strong>{remaining.toFixed(1)} d</strong></div></div>
      <div className={`leave-validation ${remaining >= 0 ? "valid" : "invalid"}`}><Check size={16}/>{remaining >= 0 ? `Request verified: Balance sufficient (${remaining.toFixed(1)} days remaining).` : `Insufficient balance: request exceeds available leave by ${Math.abs(remaining).toFixed(1)} days.`}</div>
    </div>
  </DemoFrame>;
}


function DemoPanel({ project }: { project: Project }) {
  const searchable = `${project.title} ${project.category} ${project.tagline} ${project.stack.join(" ")}`.toLowerCase();
  if (searchable.includes("similarity") || searchable.includes("string search")) return <SimilarityDemo/>;
  if (searchable.includes("incident") || searchable.includes("ticket") || searchable.includes("resolution")) return <IncidentDemo/>;
  if (searchable.includes("multilingual") || searchable.includes("language")) return <LanguageDemo/>;
  if (searchable.includes("leave compass") || searchable.includes("leave management")) return <LeaveDemo/>;
  return <DemoFrame title="Project preview" subtitle="Explore this project through its overview and repository.">
    <div className="demo-result"><strong>{project.title}</strong><p>{project.tagline}</p><p>This project does not have a custom interactive preview configured yet.</p></div>
  </DemoFrame>;
}

function ProjectCard({ project, large = false, onOpenDemo }: { project: Project; large?: boolean; onOpenDemo: (project: Project) => void }) {
  const [expanded, setExpanded] = useState(false);
  return <article className={`project-card reveal ${large ? "project-large" : ""}`}>
    <button className="project-cover" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
      <Artwork project={project}/><div className="project-meta"><span>{project.category}</span><span className={`plus ${expanded ? "plus-open" : ""}`}><Plus size={19}/></span></div>
      <h3>{project.title}</h3><span className="cover-hint">{expanded ? "Close details" : "Explore project"} <ArrowUpRight size={16}/></span>
    </button>
    <div className={`project-details ${expanded ? "details-open" : ""}`} style={expanded ? { maxHeight: 1400, overflowY: "auto" } : undefined}><p>{project.tagline}</p>
      {!!project.stack.length && <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>}
      <button className="demo-open-button" onClick={() => onOpenDemo(project)}><Play size={15}/> Open live demo <ArrowUpRight size={15}/></button>
      {project.repo ? <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={16}/></a> : <span className="muted-note">No public repository linked</span>}
    </div>
  </article>;
}

function AdditionalProjectRow({ project }: { project: Project }) {
  return <a className="additional-row" href={project.repo || "#work"} target={project.repo ? "_blank" : undefined} rel={project.repo ? "noreferrer" : undefined}>
    <span className="mono">{project.index}</span><strong>{project.title}</strong><span className="additional-type">{project.category}</span><ArrowUpRight size={20}/>
  </a>;
}

export default function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [activeSkill, setActiveSkill] = useState("Languages");
  const [copied, setCopied] = useState(false);
  const [activeDemo, setActiveDemo] = useState<Project>(FEATURED[3] || FEATURED[0]);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const allProjects = FEATURED;
  const categories = useMemo(() => ["All", ...Array.from(new Set(FEATURED.map(p => p.category)))], []);
  const filteredProjects = FEATURED;
  async function copyEmail() {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
    catch { window.location.href = `mailto:${PROFILE.email}`; }
  }

  return <div className="site-shell">
    <header className="site-nav">
      <a href="#top" className="brand">AN<span>.</span></a>
      <nav className="desktop-nav">{NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="nav-cta" href={`mailto:${PROFILE.email}`}>Let’s talk <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      {menuOpen && <nav className="mobile-nav">{NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={17}/></a>)}</nav>}
    </header>

    <main>
      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-core"/><i className="orbit-dot dot-one"/><i className="orbit-dot dot-two"/></div>
        <div className="hero-content">
          <p className="eyebrow reveal">Portfolio <span>—</span> 2026 <i className="live-dot"/> Open to opportunities</p>
          <h1 className="hero-title reveal"><span>Abinaya</span><span className="outline-word">Nehru<span className="lime">.</span></span></h1>
          <div className="hero-bottom reveal"><p>Building thoughtful digital systems across <strong>AI, enterprise applications and search.</strong></p><a className="round-link" href="#work">Explore my work <span><ArrowDown size={19}/></span></a></div>
        </div><div className="hero-index">01 / 05 <span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <div className="marquee"><div className="marquee-track">{Array.from({length:2},(_,i)=><span key={i}>AI PLATFORMS <b>✳</b> ENTERPRISE SYSTEMS <b>✳</b> SEARCH & DATA <b>✳</b> WEB APPLICATIONS <b>✳</b></span>)}</div></div>

      <section className="about section-wrap" id="about">
        <p className="section-kicker reveal">(01) / A LITTLE ABOUT ME</p>
        <div className="about-copy reveal"><h2>I like turning complex ideas into <em>useful experiences.</em></h2><p>I’m Abinaya Nehru, an Information Technology graduate with internship and project experience across software development, AI-driven systems and full-stack applications. I enjoy connecting problem-solving with thoughtful product experiences.</p><a className="text-link" href="#experience">My journey <ArrowUpRight size={17}/></a></div>
        <div className="about-stats reveal"><div><strong>06</strong><span>Selected projects</span></div><div><strong>03</strong><span>Internship experiences</span></div><div><strong>04</strong><span>Skill collections</span></div></div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-heading"><div><p className="section-kicker reveal">(02) / SELECTED WORK</p><h2 className="display-heading reveal">Ideas made<br/><span>tangible.</span></h2></div><p className="section-intro reveal">A selection of systems, experiments and applications I’ve worked on.</p></div>
        <div className="project-grid">{filteredProjects.map((p,i)=><ProjectCard key={p.id} project={p} large={i===0&&filter==="All"} onOpenDemo={project => { setActiveDemo(project); document.getElementById("demo-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}/>)}</div>
        <section className="demo-workspace" id="demo-workspace" aria-label="Interactive project demonstrations">
          <div className="demo-workspace-top"><span className="demo-workspace-brand"><i/> ABINAYA NEHRU <span>SYS.SPEC // 2026</span></span><span className="demo-workspace-label">PROJECT DEMONSTRATION ENVIRONMENT</span></div>
          <div className="demo-project-nav">{allProjects.map(project => <button key={project.id} className={activeDemo.id===project.id ? "demo-project-tab active" : "demo-project-tab"} onClick={() => setActiveDemo(project)}><span>{project.index} // {project.category.toUpperCase()}</span><strong>{project.title}</strong><small>{project.stack.slice(0,2).join(" · ") || "Interactive preview"}</small></button>)}</div>
          <div className="demo-workspace-panel"><div className="demo-workspace-heading"><div><span className="demo-workspace-kicker">LOCAL DEMO // RUNS IN YOUR BROWSER <b>REF. {activeDemo.index}</b></span><h3>{activeDemo.title}</h3><p>{activeDemo.tagline}</p></div><span className="demo-spec-badge">INTERACTIVE <Sparkles size={14}/></span></div><div className="demo-workspace-content"><DemoPanel key={activeDemo.id} project={activeDemo}/></div><div className="demo-workspace-foot"><span>LOCAL SAMPLE DATA · NO BACKEND CONNECTION</span><span>{activeDemo.stack.slice(0,3).join(" / ")}</span></div></div>
        </section>
        <div className="additional-projects"><div className="additional-heading"><p className="section-kicker">(+) / ALSO IN THE WORKS</p><span>Additional projects</span></div>{ADDITIONAL.map(p=><AdditionalProjectRow project={p} key={p.id}/>)}</div>
      </section>

      <section className="skills section-wrap" id="skills">
        <div className="section-heading"><div><p className="section-kicker reveal">(03) / TOOLKIT</p><h2 className="display-heading reveal">What I work<br/><span>with.</span></h2></div><p className="section-intro reveal">Explore the tools and technologies used across my projects.</p></div>
        <div className="skills-layout reveal"><div className="skill-tabs" role="tablist" aria-label="Skill categories">{Object.keys(SKILLS).map(name=><button key={name} role="tab" aria-selected={activeSkill===name} className={activeSkill===name?"skill-tab selected":"skill-tab"} onClick={()=>setActiveSkill(name)}>{name}<ArrowUpRight size={18}/></button>)}</div>
          <div className="skill-panel" role="tabpanel"><p className="mono">SELECTED CAPABILITIES / {String(Object.keys(SKILLS).indexOf(activeSkill)+1).padStart(2,"0")}</p><div className="skill-pills">{(SKILLS[activeSkill]||[]).map((skill,i)=><span key={skill} style={{transitionDelay:`${i*35}ms`}}>{skill}</span>)}</div><div className="skill-panel-foot"><span>{(SKILLS[activeSkill]||[]).length} skills listed</span><span>Switch category ↗</span></div></div>
        </div>
      </section>

      <section className="journey section-wrap" id="experience">
        <div className="section-heading"><div><p className="section-kicker reveal">(04) / THE JOURNEY</p><h2 className="display-heading reveal">Experience<br/><span>in motion.</span></h2></div><p className="section-intro reveal">Learning by contributing, building and improving applications.</p></div>
        <div className="timeline">{EXPERIENCE.map((item,i)=><button type="button" className="timeline-item timeline-button reveal" key={item.org} onClick={() => setActiveExperience(i)} aria-label={`View details for ${item.role} at ${item.org}`}><span className="timeline-marker">{String(i+1).padStart(2,"0")}</span><span className="timeline-date">{item.period}</span><span className="timeline-main"><h3>{item.role}</h3><span className="timeline-org">{item.org}</span><span className="timeline-detail">{item.detail}</span><span className="timeline-open-hint">Open experience details ↗</span></span><ArrowUpRight className="timeline-arrow" size={21}/></button>)}</div>
        {activeExperience !== null && <div className="experience-overlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setActiveExperience(null); }}><aside className="experience-drawer" role="dialog" aria-modal="true" aria-labelledby="experience-drawer-title"><button className="drawer-close" onClick={() => setActiveExperience(null)} aria-label="Close experience details"><X size={21}/></button>{(() => { const item = EXPERIENCE[activeExperience]; const details: Record<string,{location:string;learned:string[];work:string[]}> = { "Prime Solutions": { location: "Coimbatore", learned: ["Flutter", "Dart fundamentals", "Mobile app development", "Widget-based UI composition", "Responsive layouts", "Stateful UI patterns", "API integration concepts", "Debugging and testing", "Git and version control"], work: ["✦ Contributed to app-development tasks during the internship.", "✦ Practised building mobile screens and arranging reusable Flutter widgets.", "✦ Worked on UI behaviour and layout refinement across app screens.", "✦ Used debugging and iterative testing to identify and resolve interface issues.", "✦ Improved familiarity with the mobile development workflow and version control."] }, "BICS Global": { location: "Chennai", learned: ["HTML5", "CSS3", "JavaScript", "React fundamentals", "Frontend-backend integration", "REST API concepts", "Form validation", "Responsive design", "Git and version control", "Debugging and testing"], work: ["✦ Contributed to full-stack web development tasks during the internship.", "✦ Worked on structuring web pages and improving responsive user interfaces.", "✦ Practised connecting interface components with application workflows.", "✦ Worked with form behaviour, validation, and debugging during development.", "✦ Built practical experience with iterative implementation and version control."] }, "CODTECH IT Solutions": { location: "Remote - Hyderabad", learned: ["Java", "Spring Boot", "REST API fundamentals", "MVC architecture", "Backend application development", "CRUD workflows", "MySQL/database concepts", "Form handling and validation", "Git and version control", "Testing and debugging"], work: ["✦ Developed a Hospital Management System as an internship project.", "✦ Implemented application workflows for organising hospital-related records.", "✦ Practised Java and Spring Boot application structure and backend logic.", "✦ Worked with data handling and CRUD-style operations for management workflows.", "✦ Tested application flows and refined implementation through debugging."] } }; const d = details[item.org] || {location:"Location not specified",learned:[],work:[item.detail]}; return <><p className="section-kicker">EXPERIENCE FILE / {String(activeExperience+1).padStart(2,"0")}</p><h3 id="experience-drawer-title">{item.org}</h3><p className="drawer-role">{item.role}</p><div className="drawer-meta"><span>PERIOD</span><strong>{item.period}</strong><span>LOCATION</span><strong>{d.location}</strong></div><section className="drawer-section"><h4>What I learned</h4><div className="drawer-tags">{d.learned.map(t=><span key={t}>{t}</span>)}</div></section><section className="drawer-section"><h4>What I did</h4><ul>{d.work.map(w=><li key={w}>{w}</li>)}</ul></section><p className="drawer-note">Details not present in the current portfolio data are marked for confirmation rather than guessed.</p></>; })()}</aside></div>}
        <div className="education-cert-grid"><article className="info-card reveal"><p className="section-kicker">EDUCATION</p><span className="info-icon">✳</span><h3>{EDUCATION.title}</h3><p>{EDUCATION.org}</p><div className="info-card-foot"><span>{EDUCATION.period}</span><strong>{EDUCATION.result}</strong></div></article>
          <article className="info-card reveal"><p className="section-kicker">CERTIFICATIONS</p><span className="info-icon">↗</span><h3>Continuous learning.</h3><div className="cert-list">{CERTIFICATIONS.map(c=><span key={c}>{c}</span>)}</div></article></div>
      </section>

      <section className="contact" id="contact"><div className="contact-glow"/><div className="contact-inner"><p className="section-kicker reveal">(05) / CONTACT</p><h2 className="contact-title reveal">Let’s build<br/><span>something.</span></h2>
        <div className="contact-actions reveal"><button className="email-button" onClick={copyEmail}>{copied?<Check size={18}/>:<Copy size={18}/>} {copied?"Email copied":PROFILE.email}</button><a className="outline-button" href={PROFILE.resume} target="_blank" rel="noreferrer"><FileText size={18}/> View résumé <ArrowUpRight size={16}/></a><a className="outline-button" href={PROFILE.resume} download><ArrowDown size={17}/> Download PDF</a></div>
        <div className="social-row reveal"><div><a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={14}/></a><a href={`mailto:${PROFILE.email}`}><Mail size={18}/> Email <ArrowUpRight size={14}/></a></div><span>© 2026 ABINAYA NEHRU</span></div>
      </div></section>
    </main>
  </div>;
}