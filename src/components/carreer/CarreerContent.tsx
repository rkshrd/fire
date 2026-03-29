"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import companiesData from "@/data/companies.json";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import CodeBlock, {
    CodeLine,
    Keyword,
    Type,
    Str,
    Var,
    Punct,
    Comment,
} from "@/components/terminal/CodeBlock";
import KPIDashboard from "@/components/carreer/KPIDashboard";
import TechStackSection from "@/components/carreer/TechStackSection";
import ProjectHighlight from "@/components/carreer/ProjectHighlight";
import MethodologyFlow from "@/components/carreer/MethodologyFlow";
import CompanyCharts from "@/components/carreer/CompanyCharts";
import GrandsProjects from "@/components/carreer/GrandsProjects";
import LegalIdentity from "@/components/carreer/LegalIdentity";
import CompanyTimeline from "@/components/carreer/CompanyTimeline";
import CompanyValues from "@/components/carreer/CompanyValues";
import ProjectScope from "@/components/carreer/ProjectScope";
import FacilityInfo from "@/components/carreer/FacilityInfo";

export default function CarreerContent({ initialSlug }: { initialSlug?: string }) {
    const initialIndex = initialSlug
        ? Math.max(
              0,
              companiesData.companies.findIndex((c) => c.slug === initialSlug)
          )
        : 0;

    const pathname = usePathname();
    const router = useRouter();
    const [activeCompany, setActiveCompany] = useState(initialIndex);
    const [expandedMission, setExpandedMission] = useState<number | null>(null);
    const company = companiesData.companies[activeCompany];

    useEffect(() => {
        if (pathname === "/carreer" || pathname === "/carreer/") {
            router.replace(`/carreer/${companiesData.companies[activeCompany].slug}/`, {
                scroll: false,
            });
        }
    }, [activeCompany, pathname, router]);

    const handleCompanyChange = (i: number) => {
        setActiveCompany(i);
        setExpandedMission(null);
        router.replace(`/carreer/${companiesData.companies[i].slug}/`, { scroll: false });
    };

    return (
        <div className="max-w-[1100px] mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Carreer
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// Expériences professionnelles en alternance"}
                </p>
            </motion.div>

            {/* Company selector */}
            <div className="flex gap-2 mb-8 flex-wrap">
                {companiesData.companies.map((c, i) => (
                    <button
                        key={c.name}
                        onClick={() => handleCompanyChange(i)}
                        className={`text-sm font-mono px-5 py-2.5 rounded-md border transition-all ${
                            i === activeCompany
                                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                        }`}
                        data-hoverable
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            {/* Company details */}
            <motion.div
                key={company.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Identity code block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-card)]">
                        <CodeBlock language="typescript">
                            <CodeLine lineNumber={1}>
                                <Keyword>interface</Keyword> <Type>Experience</Type>{" "}
                                <Punct>{"{"}</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={2} indent={1}>
                                <Var>company</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={3} indent={1}>
                                <Var>role</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={4} indent={1}>
                                <Var>period</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={5} indent={1}>
                                <Var>team</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={6} indent={1}>
                                <Var>type</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={7} indent={1}>
                                <Var>sector</Var>
                                <Punct>:</Punct> <Type>string</Type>
                                <Punct>;</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={8}>
                                <Punct>{"}"}</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={9}>&nbsp;</CodeLine>
                            <CodeLine lineNumber={10}>
                                <Keyword>const</Keyword> <Var>experience</Var>
                                <Punct>:</Punct> <Type>Experience</Type> <Punct>=</Punct>{" "}
                                <Punct>{"{"}</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={11} indent={1}>
                                <Var>company</Var>
                                <Punct>:</Punct> <Str>{`"${company.name}"`}</Str>
                                <Punct>,</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={12} indent={1}>
                                <Var>role</Var>
                                <Punct>:</Punct> <Str>{`"${company.role}"`}</Str>
                                <Punct>,</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={13} indent={1}>
                                <Var>period</Var>
                                <Punct>:</Punct> <Str>{`"${company.period}"`}</Str>
                                <Punct>,</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={14} indent={1}>
                                <Var>team</Var>
                                <Punct>:</Punct> <Str>{`"${company.team}"`}</Str>
                                <Punct>,</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={15} indent={1}>
                                <Comment>{`// ${company.identity.type} — ${company.identity.sector}`}</Comment>
                            </CodeLine>
                            <CodeLine lineNumber={16} indent={1}>
                                <Var>type</Var>
                                <Punct>:</Punct> <Str>{`"${company.identity.type}"`}</Str>
                                <Punct>,</Punct>
                            </CodeLine>
                            <CodeLine lineNumber={17} indent={1}>
                                <Var>sector</Var>
                                <Punct>:</Punct> <Str>{`"${company.identity.sector}"`}</Str>
                            </CodeLine>
                            <CodeLine lineNumber={18}>
                                <Punct>{"}"}</Punct>
                                <Punct>;</Punct>
                            </CodeLine>
                        </CodeBlock>
                    </div>
                </motion.div>

                {/* KPIs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <KPIDashboard kpis={company.kpis} />
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                >
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {company.description}
                    </p>
                </motion.div>

                {/* Legal Identity + Timeline */}
                {(company.legalIdentity || company.timeline) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {"// Entreprise"}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {company.legalIdentity && (
                                <LegalIdentity items={company.legalIdentity} />
                            )}
                            {company.timeline && <CompanyTimeline events={company.timeline} />}
                        </div>
                    </motion.div>
                )}

                {/* Facility (Vivalto CHP) */}
                {company.facility && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {`// ${company.facility.name}`}
                        </h2>
                        <FacilityInfo
                            facility={company.facility}
                            jobProfiles={company.jobProfiles}
                        />
                    </motion.div>
                )}

                {/* Values & Engagements */}
                {company.values && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {"// Valeurs & Engagements"}
                        </h2>
                        <CompanyValues
                            values={company.values}
                            missionStatement={company.missionStatement}
                            engagements={company.engagements}
                            services={company.services}
                            servicesObjective={company.servicesObjective}
                        />
                    </motion.div>
                )}

                {/* Charts */}
                {company.charts && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {"// Chiffres clés"}
                        </h2>
                        <CompanyCharts charts={company.charts} />
                    </motion.div>
                )}

                {/* Project Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                        {"// Projet phare"}
                    </h2>
                    <ProjectHighlight project={company.project} />
                </motion.div>

                {/* Project Scope (SUEZ) */}
                {company.projectScope && company.projectDevOps && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <ProjectScope scope={company.projectScope} devops={company.projectDevOps} />
                    </motion.div>
                )}

                {/* Grands Projets */}
                {company.grandsProjects && company.grandsProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                            {"// Grands Projets"}
                        </h2>
                        <GrandsProjects projects={company.grandsProjects} />
                    </motion.div>
                )}

                {/* Missions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                        {"// Missions"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {company.missions.map((mission, i) => {
                            const hasDetails = !!(mission.details?.length || mission.tools?.length);
                            const isExpanded = expandedMission === i;

                            return (
                                <motion.div
                                    key={mission.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <TerminalWindow
                                        title={`mission_${i + 1}.md`}
                                        onClick={
                                            hasDetails
                                                ? () => setExpandedMission(isExpanded ? null : i)
                                                : undefined
                                        }
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-2">
                                                    {"> " + mission.title}
                                                </h3>
                                                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                                    {mission.description}
                                                </p>
                                            </div>
                                            {hasDetails && (
                                                <ChevronDown
                                                    size={14}
                                                    className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 mt-0.5 ${
                                                        isExpanded ? "rotate-180" : ""
                                                    }`}
                                                />
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    {mission.details && (
                                                        <ul className="mt-3 space-y-1.5 border-t border-[var(--color-border)] pt-3">
                                                            {mission.details.map((d, j) => (
                                                                <li
                                                                    key={j}
                                                                    className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                                                                >
                                                                    <span className="text-[var(--color-green)] shrink-0">
                                                                        →
                                                                    </span>
                                                                    {d}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {mission.tools && (
                                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                                            {mission.tools.map((tool) => (
                                                                <span
                                                                    key={tool}
                                                                    className="text-xs px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-syntax-type)]"
                                                                >
                                                                    {tool}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </TerminalWindow>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                        {"// Stack Technique"}
                    </h2>
                    <TechStackSection techStack={company.techStack} />
                </motion.div>

                {/* Methodology */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                        {"// Méthodologie"}
                    </h2>
                    <MethodologyFlow steps={company.methodology} />
                </motion.div>

                {/* Conclusion + Sources */}
                {company.conclusion && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <TerminalWindow title="conclusion.md">
                            <blockquote className="border-l-2 border-[var(--color-accent)] pl-3 mb-4">
                                <p className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                                    {`"${company.conclusion.text}"`}
                                </p>
                            </blockquote>
                            <div className="text-xs font-mono">
                                <p className="text-[var(--color-text-primary)] font-semibold">
                                    {company.conclusion.author}
                                </p>
                                <p className="text-[var(--color-text-muted)]">
                                    {company.conclusion.title}
                                </p>
                            </div>
                            {company.sources && company.sources.length > 0 && (
                                <p className="text-[10px] text-[var(--color-text-muted)] mt-4 pt-3 border-t border-[var(--color-border)] font-mono">
                                    Sources :{" "}
                                    {company.sources.map((s, i) => (
                                        <span key={s.label}>
                                            {i > 0 && " · "}
                                            {s.url ? (
                                                <a
                                                    href={s.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[var(--color-accent)] hover:underline"
                                                    data-hoverable
                                                >
                                                    {s.label}
                                                </a>
                                            ) : (
                                                s.label
                                            )}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </TerminalWindow>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}