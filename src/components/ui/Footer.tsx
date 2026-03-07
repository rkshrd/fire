import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full border-t border-[var(--color-border)] py-3 bg-[var(--color-bg-primary)] z-40">
            <div className="w-full px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-mono text-[var(--color-text-muted)]">
                <p>
                    <span className="text-[var(--color-text-secondary)]">© 2026</span>{" "}
                    <span className="text-[var(--color-accent)]">Thaïs PARISOT</span>
                </p>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        home
                    </Link>
                    <a
                        href="https://www.linkedin.com/in/thaïs-parisot-777ir3ign1s/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        linkedin
                    </a>
                    <a
                        href="https://discord.com/users/264148329527508992"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        discord
                    </a>
                    cv
                    <a
                        href="/CV.pdf"
                        download="CV-Thaïs-Parisot.pdf"
                        className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
                        data-hoverable
                        title="Télécharger mon CV"
                    >
                        <Download size={14} />
                    </a>
                    <a
                        href="/CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
                        data-hoverable
                        title="Voir mon CV"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </footer>
    );
}