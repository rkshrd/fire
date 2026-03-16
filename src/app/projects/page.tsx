"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import projectsData from "@/data/projects.json";
import { Table, Folder, Download } from "lucide-react";

const projects = projectsData.projects;

const tagColors: Record<string, string> = {
    school: "text-[var(--color-cyan)] border-[var(--color-cyan)]",
    corporate: "text-[var(--color-green)] border-[var(--color-green)]",
    myself: "text-[var(--color-purple)] border-[var(--color-purple)]",
};

const tagLabels: Record<string, string> = {
    school: "school",
    corporate: "corporate",
    myself: "personal",
};

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleDownload = (project: (typeof projects)[number]) => {
        const payload = {
            title: project.title,
            tag: project.tag,
            description: project.description,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${project.title.replace(/\s+/g, "_")}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const filtered = activeFilter ? projects.filter((p) => p.tag === activeFilter) : projects;

    const toggleFlip = (index: number) => {
        setFlippedCards((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
    };

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl sm:text-5xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Projects (E5)
                </h1>
                <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {"// Réalisations professionnelles et personnelles"}
                </p>
            </motion.div>

            {/* Synthesis table link */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <TerminalWindow title="e5_synthesis.md">
                    <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                        {"// Tableau de Synthèse E5 — cliquez pour ouvrir le Google Sheet"}
                    </p>
                    <a
                        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTmOzeS6toxwj45O5Jy-TZwNsUKV_QmY7xcW8jA6BREg_1XiZCIGG2-lOfsgyQ1Bg/pubhtml?gid=512918397&single=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-accent)] hover:underline"
                        data-hoverable
                    >
                        <Table size={14} className="inline-block mr-1" />
                        Ouvrir le Tableau de Synthèse E5
                    </a>
                </TerminalWindow>
            </motion.div>

            {/* Filter buttons */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                className="flex flex-wrap gap-2 mb-8"
            >
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                    onClick={() => setActiveFilter(null)}
                    className={`text-xs font-mono px-4 py-2 rounded-md border transition-all ${
                        !activeFilter
                            ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                            : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                    }`}
                    data-hoverable
                >
                    Tous ({projects.length})
                </motion.button>
                {(["school", "corporate", "myself"] as const).map((tag, index) => (
                    <motion.button
                        key={tag}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.2, ease: "easeOut" }}
                        onClick={() => setActiveFilter(tag === activeFilter ? null : tag)}
                        className={`text-xs font-mono px-4 py-2 rounded-md border transition-all ${
                            tag === activeFilter
                                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]"
                                : `border-[var(--color-border)] ${tagColors[tag]} hover:border-[var(--color-accent)]`
                        }`}
                        data-hoverable
                    >
                        {tagLabels[tag]} ({projects.filter((p) => p.tag === tag).length})
                    </motion.button>
                ))}
            </motion.div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((project) => {
                        const globalIndex = projects.indexOf(project);
                        const isFlipped = flippedCards.has(globalIndex);

                        return (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => toggleFlip(globalIndex)}
                                className="relative h-[160px] group"
                                style={{ perspective: "1000px" }}
                                data-hoverable
                            >
                                <div
                                    className="w-full h-full transition-transform duration-500 relative"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                                    }}
                                >
                                    {/* Front */}
                                    <div
                                        className="absolute inset-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 flex flex-col items-center justify-center text-center hover:border-[var(--color-accent)] transition-colors"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <Folder
                                            size={28}
                                            className="mb-3 text-[var(--color-accent)]"
                                        />
                                        <h3 className="text-xs font-mono font-semibold text-[var(--color-text-primary)] leading-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Back */}
                                    <div
                                        className="absolute inset-0 rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg-secondary)] p-4 flex flex-col justify-between"
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                        }}
                                    >
                                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDownload(project);
                                                    }}
                                                    className="download-icon"
                                                    aria-label={`Download ${project.title}`}
                                                    data-hoverable
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}