import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Cpu, 
  DollarSign, 
  Shield, 
  Globe, 
  Rocket, 
  TrendingUp, 
  Palette,
  Terminal,
  ChevronRight,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

const blueprintData = [
  {
    id: 'positioning',
    title: 'Brand Positioning',
    icon: Target,
    items: [
      { label: 'One-Sentence Positioning', value: 'The enterprise orchestration layer for building, deploying, and managing autonomous AI workforces without writing a single line of code.' },
      { label: 'Mission', value: 'To democratize enterprise automation by turning complex workflows into intelligent, autonomous agents.' },
      { label: 'Vision', value: 'A future where every company has a digital workforce operating alongside human teams, amplifying productivity exponentially.' },
      { label: 'Target Audience', value: 'Mid-market to Enterprise Ops leaders, RevOps, CTOs, and IT Directors.' },
      { label: 'Emotional Trigger', value: 'Empowerment and Control. The relief of automating the mundane and the power of orchestrating intelligence at scale.' },
    ]
  },
  {
    id: 'product',
    title: 'Product Concept',
    icon: Cpu,
    items: [
      { label: 'Core Problem', value: 'Companies have fragmented SaaS stacks and manual processes. Building custom AI agents requires scarce engineering talent, and existing automation tools are too rigid and lack true AI reasoning.' },
      { label: 'Unique Solution', value: 'A visual, node-based canvas combined with a natural language interface that lets non-technical operators build "Reasoning Agents" that can make decisions, access databases, and execute multi-step workflows.' },
      { label: 'Key Features (MVP)', value: 'Visual agent builder, 50+ native SaaS integrations, basic human-in-the-loop approval flows, SOC2 compliance architecture.' },
      { label: 'Advanced Features', value: 'Multi-agent orchestration (bots talking to bots), custom LLM fine-tuning on company data, predictive workflow suggestions, self-healing integrations.' },
      { label: 'AI/ML Strategy', value: 'LLM-agnostic routing (OpenAI, Anthropic, Gemini) based on task complexity and cost. RAG for enterprise data context.' },
      { label: 'Tech Stack', value: 'React/Next.js (Frontend), Node.js/Go (Backend), PostgreSQL + pgvector (Database), Kubernetes (Orchestration), Temporal (Workflow Engine).' },
    ]
  },
  {
    id: 'revenue',
    title: 'Revenue Model',
    icon: DollarSign,
    items: [
      { label: 'Pricing Tiers', value: 'Starter: $999/mo (5 agents). Pro: $2,499/mo (20 agents, custom APIs). Enterprise: $10k+/mo (Unlimited, VPC, SLA).' },
      { label: 'SaaS Structure', value: 'Base platform fee + usage-based pricing on "Agent Compute Hours" or "Tasks Completed".' },
      { label: 'Upsells & Add-ons', value: 'Premium integrations (SAP, Oracle), custom model fine-tuning, audit logs & advanced compliance reporting.' },
      { label: 'Marketplace Potential', value: '"Bot Store" where creators sell pre-trained agent templates for specific industries, taking a 20% platform cut.' },
    ]
  },
  {
    id: 'advantage',
    title: 'Competitive Advantage',
    icon: Shield,
    items: [
      { label: 'Defensibility', value: 'Deep integrations into enterprise legacy systems and proprietary workflow data.' },
      { label: 'Moat Strategy', value: 'The "System of Action" moat. Once bots are embedded into daily operations and custom workflows, switching costs become astronomically high.' },
      { label: 'Network Effects', value: 'Two-sided marketplace: more developers building templates attracts more enterprises, which attracts more developers.' },
      { label: 'Data Advantage', value: 'Aggregating anonymized telemetry on how enterprises structure workflows to train better foundational action models.' },
    ]
  },
  {
    id: 'market',
    title: 'Market Opportunity',
    icon: Globe,
    items: [
      { label: 'TAM Estimation', value: 'Global Intelligent Process Automation market is projected to reach $30B+ by 2030. Capturing 1% of the mid-market/enterprise segment yields a $300M ARR opportunity.' },
      { label: 'Industry Trends', value: 'Shift from "software that helps you work" to "software that does the work for you" (Service-as-a-Software).' },
      { label: 'Why Now?', value: 'LLMs have crossed the threshold of reliability for reasoning tasks. API ecosystems are mature. Companies are under pressure to do more with less headcount.' },
    ]
  },
  {
    id: 'gtm',
    title: 'Go-To-Market Strategy',
    icon: Rocket,
    items: [
      { label: 'Launch Plan', value: 'Private beta with 10 design partners. Launch on Product Hunt and Hacker News with a "Build an AI employee in 5 minutes" hook.' },
      { label: 'Early Adopter Strategy', value: 'Target RevOps and Support leaders who feel the pain of manual data entry and triage most acutely.' },
      { label: 'Viral Loops', value: '"Powered by BotBuilder.tech" badges on external-facing bots (e.g., customer support agents).' },
      { label: 'Strategic Partnerships', value: 'Partner with consulting firms (Accenture, Deloitte) to use BotBuilder as their implementation tool for digital transformation.' },
      { label: 'Community Play', value: '"The Automation Playbook" - a library of open-source workflows and case studies showing exact ROI metrics.' },
    ]
  },
  {
    id: 'exit',
    title: 'Exit Strategy',
    icon: TrendingUp,
    items: [
      { label: 'Potential Acquirers', value: 'ServiceNow, Salesforce, Microsoft, Atlassian, or UiPath.' },
      { label: '5-Year Roadmap', value: 'Y1: MVP ($1M ARR) → Y2: Marketplace ($5M ARR) → Y3: Global ($15M ARR) → Y4: Action Models ($40M ARR) → Y5: Pre-IPO/Acquisition ($100M+ ARR).' },
      { label: 'Revenue Milestones', value: 'Seed ($1M ARR), Series A ($3-5M ARR), Series B ($10-15M ARR).' },
    ]
  },
  {
    id: 'brand',
    title: 'Brand Assets',
    icon: Palette,
    items: [
      { label: 'Tagline Ideas', value: '"Your Digital Workforce, Built in Minutes." | "Don\'t just automate. Orchestrate." | "The OS for AI Agents."' },
      { label: 'Slogan', value: '"Build the bots that build your business."' },
      { label: 'Brand Personality', value: 'Authoritative, sleek, visionary, yet highly accessible. Think Stripe meets Palantir.' },
      { label: 'Visual Identity', value: 'Dark mode default. Deep blacks, neon electric blue or emerald green accents. Monospace fonts for technical elements, clean sans-serif for marketing copy.' },
    ]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState(blueprintData[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = blueprintData.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-emerald-500/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-4 sm:px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          <span className="font-display font-bold text-white tracking-tight hidden sm:inline-block">BotBuilder.tech</span>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://www.godaddy.com/en/domainsearch/find?domainToCheck=BotBuilder.tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-semibold text-xs sm:text-sm transition-colors"
          >
            Buy Domain
          </a>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-zinc-400 hover:text-white">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-16 bg-[#050505] z-40 p-6 overflow-y-auto border-t border-white/5 flex flex-col"
          >
            <nav className="space-y-2 flex-1">
              {blueprintData.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{section.title}</span>
                  </button>
                );
              })}
            </nav>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <a 
                href="https://www.godaddy.com/en/domainsearch/find?domainToCheck=BotBuilder.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-semibold transition-colors"
              >
                Buy this Domain
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-80 fixed h-screen border-r border-white/5 p-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Terminal className="w-4 h-4 text-emerald-500" />
              </div>
              <h1 className="font-display font-bold text-xl text-white tracking-tight">BotBuilder.tech</h1>
            </div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-4">Startup Blueprint</p>
          </div>

          <nav className="flex-1 space-y-1.5">
            {blueprintData.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                  <span className="font-medium text-sm">{section.title}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
            <div className="glass-panel rounded-xl p-4">
              <p className="text-xs text-zinc-400 mb-2">Valuation Target</p>
              <p className="font-display text-2xl font-bold text-white">$100M+</p>
            </div>
            
            <a 
              href="https://www.godaddy.com/en/domainsearch/find?domainToCheck=BotBuilder.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-semibold transition-colors group"
            >
              Buy this Domain
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 px-6 py-24 lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            
            {/* Hero Section */}
            <div className="mb-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  CONFIDENTIAL DECK
                </div>
                <h2 className="text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                  The OS for <br />
                  <span className="text-gradient-accent">AI Agents.</span>
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl font-light mb-8">
                  A comprehensive venture blueprint for BotBuilder.tech, designed to capture the $30B+ intelligent process automation market.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a 
                    href="https://www.godaddy.com/en/domainsearch/find?domainToCheck=BotBuilder.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-bold text-lg transition-colors group"
                  >
                    Buy BotBuilder.tech
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-sm text-zinc-500 font-mono">
                    Domain available for acquisition
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sections */}
            <div className="space-y-32">
              {blueprintData.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <motion.section 
                    key={section.id} 
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="scroll-mt-32"
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-1 block">
                          Section 0{idx + 1}
                        </span>
                        <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      {section.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="glass-panel rounded-2xl p-6 lg:p-8 hover:bg-white/[0.04] transition-colors"
                        >
                          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                            {item.label}
                          </h4>
                          <p className="text-lg text-zinc-200 leading-relaxed font-light">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </div>

            {/* Footer */}
            <footer className="mt-32 pt-12 border-t border-white/5 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-6">
                <Terminal className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-500 font-mono text-sm">
                Generated for BotBuilder.tech
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
