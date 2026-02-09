import Link from "next/link";

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
                    <Link
                        href="/profile"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        profile
                    </Link>
                    <Link
                        href="/projects"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        projects
                    </Link>
                    <Link
                        href="/veille"
                        className="hover:text-[var(--color-accent)] transition-colors"
                        data-hoverable
                    >
                        veille
                    </Link>
                </div>
            </div>
        </footer>
    );
}