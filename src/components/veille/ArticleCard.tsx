"use client";

import { motion } from "framer-motion";

interface ArticleCardProps {
    title: string;
    description: string;
    date: string;
    source: string;
    tags: string[];
    link: string;
}

export default function ArticleCard({
    title,
    description,
    date,
    source,
    tags,
    link,
}: ArticleCardProps) {
    if (!title || !description) return null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] hover:-translate-y-1"
        >
            {/* Images removed: article cards no longer display images */}
            <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--color-text-secondary)] mb-4 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-2">
                        <span>{source}</span>
                        {date && (
                            <>
                                <span>•</span>
                                <span>{date}</span>
                            </>
                        )}
                    </div>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-accent)] hover:underline"
                            data-hoverable
                            onClick={(e) => e.stopPropagation()}
                        >
                            lire →
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}