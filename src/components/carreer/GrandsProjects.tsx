"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { GrandProject } from "@/types/companies";

export default function GrandsProjects({ projects }: { projects: GrandProject[] }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.06 * i }}
                >
                    <TerminalWindow title={`project_${String(i + 1).padStart(2, "0")}.md`}>
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 text-2xl font-bold text-[var(--color-text-muted)] opacity-10 font-mono select-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-xs font-semibold text-[var(--color-accent)] mb-2 pr-8">
                                {"> " + project.title}
                            </h3>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] font-mono"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </TerminalWindow>
                </motion.div>
            ))}
        </div>
    );
}