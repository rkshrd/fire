# Modifications

Dans src/components/ui/Footer.tsx :

```tsx
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
```

On utilise Link pour avoir les styles par défaut du composant. On utilise un <a> pour le customiser, avec un target par exemple, ou un download.

Exemple :

```tsx
<a
    href="/CV.pdf"
    download="CV-Thaïs-Parisot.pdf"
    className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
    data-hoverable
    title="Télécharger mon CV"
>
    <Download size={14} />
</a>
```

Ne pas oublier d'importer l'icone Download depuis lucide-react.

```tsx
import { Download } from "lucide-react";
```