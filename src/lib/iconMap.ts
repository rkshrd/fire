import {
    Code,
    Terminal,
    Globe,
    Database,
    Monitor,
    Container,
    GitBranch,
    Server,
    Mountain,
    BookOpen,
    Gamepad2,
    Dumbbell,
    Crown,
    Telescope,
    Languages,
    type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    Code,
    Terminal,
    Globe,
    Database,
    Monitor,
    Container,
    GitBranch,
    Server,
    Mountain,
    BookOpen,
    Gamepad2,
    Dumbbell,
    Crown,
    Telescope,
    Languages,
};

export function getIcon(name: string): LucideIcon {
    return iconMap[name] || Code;
}