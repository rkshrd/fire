"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";

const navLinks = [
    { href: "/carreer", label: "Carreer" },
    { href: "/cursus", label: "Cursus" },
    { href: "/profile", label: "Profile" },
    { href: "/projects", label: "Projects (E5)" },
    { href: "/veille", label: "Veille" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dateStr, setDateStr] = useState("—");
    const [timeStr, setTimeStr] = useState("—");
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    // Hide logo on /veille when scrolled past hero
    const isVeille = pathname.startsWith("/veille");
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (!isVeille) return;
        const onScroll = () => setScrollY(window.scrollY);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isVeille]);

    const hideLogo = isVeille && scrollY > 150;

    // Live clock Europe/Paris
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const tz = "Europe/Paris";
            const parts = new Intl.DateTimeFormat("en-GB", {
                timeZone: tz,
                weekday: "short",
                month: "short",
                day: "2-digit",
            }).formatToParts(now);

            const weekday = parts.find((p) => p.type === "weekday")?.value || "";
            const day = parts.find((p) => p.type === "day")?.value || "";
            const month = parts.find((p) => p.type === "month")?.value || "";
            setDateStr(`${weekday} ${day} ${month}`);

            setTimeStr(
                new Intl.DateTimeFormat("en-GB", {
                    timeZone: tz,
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(now)
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // Close menu on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".navbar-menu") && !target.closest(".hamburger-btn")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    // Close menu on route change
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setMenuOpen(false);
    }

    return (
        <header className="glass fixed top-0 left-0 w-full z-50 h-18 px-6 !border-l-0 !border-r-0">
            <nav className="h-full w-full flex items-center">
                {/* Left: hamburger + dropdown */}
                <div className="relative flex-1">
                    <button
                        className="hamburger-btn w-10 h-10 flex items-center justify-center rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu principal"
                        data-hoverable
                    >
                        <div className="flex flex-col justify-center items-center w-[18px] h-[18px] gap-[4px]">
                            <span
                                className={`block h-[2px] w-full bg-[var(--color-accent)] group-hover:bg-[var(--color-accent-hover)] rounded-full transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
                            />
                            <span
                                className={`block h-[2px] w-full bg-[var(--color-accent)] group-hover:bg-[var(--color-accent-hover)] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                            />
                            <span
                                className={`block h-[2px] w-full bg-[var(--color-accent)] group-hover:bg-[var(--color-accent-hover)] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
                            />
                        </div>
                    </button>

                    {menuOpen && (
                        <div className="navbar-menu absolute top-full left-0 mt-2 min-w-[220px] glass rounded-lg animate-[slideDown_0.2s_ease] z-50 p-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block rounded-md text-base font-mono transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-accent)] px-4 py-2.5 ${
                                        pathname === link.href || pathname === link.href + "/"
                                            ? "text-[var(--color-accent)]"
                                            : "text-[var(--color-text-secondary)]"
                                    }`}
                                    data-hoverable
                                >
                                    <span className="text-[var(--color-accent)] mr-1">{">"}</span>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                {/* Center: logo - Home button */}
                <Link
                    href="/"
                    aria-label="Home"
                    data-hoverable
                    className="flex-none flex items-center justify-center mx-auto"
                >
                    <Image
                        src="/favicon.ico"
                        /*
                Préconiser le /nom_icone.format directement
                plutot que public/nom_icone.format pour éviter les
                problèmes de chemin d'accès et de configuration dans Next.js.
              */
                        alt="FireChipset"
                        width={52}
                        height={52}
                        priority
                        className={`cursor-pointer hover:opacity-100 active:opacity-60 transition-opacity duration-200 ${hideLogo ? "opacity-0 pointer-events-none" : "opacity-90"}`}
                    />
                </Link>

                {/* Right: datetime + theme toggle */}
                <div className="flex-1 flex items-center gap-4 justify-end">
                    <div className="hidden sm:flex flex-col items-end text-sm font-mono text-[var(--color-text-muted)]">
                        <span>{dateStr}</span>
                        <span className="text-[var(--color-accent)]">{timeStr}</span>
                    </div>
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                        aria-label="Toggle theme"
                        data-hoverable
                    >
                        {mounted ? (
                            theme === "light" ? (
                                <Sun size={20} className="text-[var(--color-accent)]" />
                            ) : (
                                <Moon size={20} className="text-[var(--color-accent)]" />
                            )
                        ) : null}
                    </button>
                </div>
            </nav>
        </header>
    );
}