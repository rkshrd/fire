"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";

interface SourceLinksProps {
    sources: string[];
}

export default function SourceLinks({ sources }: SourceLinksProps) {
    const [expanded, setExpanded] = useState(false);

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace("www.", "");
        } catch {
            return url;
        }
    };

    if (!sources || sources.length === 0) return null;

    const displayedSources = expanded ? sources : sources.slice(0, 12);

    return (
        <div className="mt-12 mb-12">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 font-mono">
                {"// Sources & Références"}
                <span className="text-sm text-[var(--color-text-muted)] ml-2">
                    ({sources.length})
                </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {displayedSources.map((url, i) => (
                    <motion.a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-3 py-2 rounded border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all truncate"
                        data-hoverable
                    >
                        <ExternalLink size={12} className="shrink-0" />
                        <span className="truncate">{getDomain(url)}</span>
                    </motion.a>
                ))}
            </div>
            {sources.length > 12 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 text-xs font-mono text-[var(--color-accent)] hover:underline flex items-center gap-1"
                    data-hoverable
                >
                    <ChevronDown
                        size={14}
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                    {expanded ? "Voir moins" : `Voir les ${sources.length - 12} autres`}
                </button>
            )}
        </div>
    );
}