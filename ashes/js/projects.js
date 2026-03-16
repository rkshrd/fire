      const projects = [
            { title: "Projet N°1 : Apache2 & SSL", tag: "school", description: "Configuration et sécurisation d'un serveur web Apache2 avec certificats SSL/TLS pour garantir des connexions HTTPS sécurisées." },
            { title: "Projet N°2 : Site Web Balance ton Port", tag: "school", description: "Développement d'une application web interactive permettant de visualiser et gérer les informations portuaires en temps réel." },
            { title: "Projet N°3 : DHCP", tag: "school", description: "Mise en place et configuration d'un serveur DHCP pour l'attribution automatique d'adresses IP sur le réseau local." },
            { title: "Projet N°4 : Keylogger", tag: "myself", description: "Développement d'un outil de surveillance des frappes clavier à des fins éducatives et de cybersécurité." },
            { title: "Projet N°5 : Referential Pool Prints & GLPI", tag: "corporate", description: "Création d'un référentiel d'imprimantes et intégration avec GLPI pour une gestion optimale du parc d'impression." },
            { title: "Projet N°6 : OCS & GLPI", tag: "corporate", description: "Déploiement et configuration d'OCS Inventory couplé à GLPI pour l'inventaire automatisé du parc informatique." },
            { title: "Projet N°7 : Fire Network", tag: "school", description: "Conception et simulation d'une architecture réseau sécurisée avec pare-feu et règles de filtrage avancées." },
            { title: "Projet N°8 : Migration W11 & Renewal User IT Equipment", tag: "corporate", description: "Planification et exécution de la migration vers Windows 11 avec renouvellement complet des équipements utilisateurs." },
            { title: "Projet N°9 : Deploy Fleet Printers & Guideline", tag: "corporate", description: "Déploiement d'une flotte d'imprimantes réseau avec création de guides d'utilisation et de maintenance." },
            { title: "Projet N°10 : Deploy & Configuration New Switches", tag: "corporate", description: "Installation et configuration de nouveaux switches réseau avec VLAN et sécurisation des ports." },
            { title: "Projet N°11 : Process User Profile & Onboarding New Employee", tag: "corporate", description: "Automatisation du processus de création de profils utilisateurs et d'onboarding pour les nouveaux employés." },
            { title: "Projet N°12 : Add Sonde & Thermostat PCE", tag: "corporate", description: "Installation de sondes de température et thermostats connectés pour la supervision des salles serveurs." },
            { title: "Projet N°13 : Stadium Company", tag: "school", description: "Projet de gestion d'infrastructure IT pour un stade : réseau, caméras, affichage et billetterie électronique." },
            { title: "Projet N°14 : Radius, Auth, VPN & MFA", tag: "myself", description: "Mise en place d'une infrastructure d'authentification Radius avec VPN et authentification multi-facteurs." },
            { title: "Projet N°15 : Add Access Control Devices", tag: "corporate", description: "Intégration de dispositifs de contrôle d'accès physique connectés au système de gestion des identités." },
            { title: "Projet N°16 : Network Monitoring", tag: "myself", description: "Développement d'une solution de monitoring réseau en temps réel avec alertes automatisées." },
            { title: "Projet N°17 : Referential IT Services Catalog", tag: "corporate", description: "Création d'un catalogue de services IT complet pour standardiser et documenter tous les services offerts." },
            { title: "Projet N°18 : Backup & Disaster Recovery", tag: "corporate", description: "Mise en place d'une stratégie de sauvegarde complète avec plan de reprise après sinistre (PRA/PCA)." },
            { title: "Projet N°19 : Active Directory Migration", tag: "myself", description: "Planification et exécution d'une migration Active Directory vers une nouvelle forêt avec restructuration." },
            { title: "Projet N°20 : Virtualization Infrastructure", tag: "school", description: "Conception d'une infrastructure de virtualisation avec VMware/Hyper-V pour optimiser les ressources serveurs." }
        ];

        const carousel = document.getElementById('carousel');
        let currentRotation = 0;
        let targetRotation = 0;
        const totalCards = projects.length;
        const angleIncrement = 360 / totalCards;
        const radius = 750; // Rayon de la roue augmenté pour plus d'espacement

        // Générer les cartes
        projects.forEach((project, index) => {
           const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front">
                        <h2>${project.title}</h2>
                        <div class="card-image" onclick="event.stopPropagation(); window.open('/projects/projetnmb${index + 1}.pdf', '_blank')">
                            <div class="placeholder-icon">📁</div>
                        </div>
                    </div>
                    <div class="card-face card-back">
                        <div class="card-description">
                            ${project.description}
                        </div>
                        <div class="card-back-footer">
                            <span class="tag ${project.tag}">#${project.tag}</span>
                            <div class="download-icon" onclick="downloadFile('${project.title}')">
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        // Gestion du clic pour retourner la carte
            card.addEventListener('click', (e) => {
                // Ne pas retourner si on clique sur l'icône de téléchargement
                if (e.target.closest('.download-icon')) {
                    return;
                }
                
                // Calculer la rotation nécessaire pour mettre cette carte au premier plan
                const currentAngle = (angleIncrement * index) + currentRotation;
                const targetAngle = Math.round(currentAngle / 360) * 360;
                const adjustment = currentAngle - targetAngle;
                targetRotation = targetRotation - adjustment;
                
                // Retourner toutes les autres cartes
                document.querySelectorAll('.card').forEach(c => {
                    if (c !== card) {
                        c.classList.remove('flipped');
                    }
                });
                
                // Retourner la carte cliquée après un court délai pour permettre l'animation
                setTimeout(() => {
                    card.classList.toggle('flipped');
                }, 300);
            });

            carousel.appendChild(card);
        });

        // Positionner les cartes en cercle
        function updateCarousel() {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const angle = (angleIncrement * index) + currentRotation;
                const angleRad = (angle * Math.PI) / 180;
                
                const x = Math.sin(angleRad) * radius;
                const z = Math.cos(angleRad) * radius;
                
                // Calculer l'opacité et l'échelle en fonction de la position
                const normalizedZ = (z + radius) / (radius * 2);
                const scale = 0.7 + (normalizedZ * 0.3);
                const opacity = 0.4 + (normalizedZ * 0.6);
                
                card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = Math.round(normalizedZ * 100);
            });
        }

        // Animation fluide
        function animate() {
            currentRotation += (targetRotation - currentRotation) * 0.1;
            updateCarousel();
            requestAnimationFrame(animate);
        }

        // Initialiser la position des cartes
        updateCarousel();
        animate();

        // Gestion du scroll - une carte à la fois
        let isScrolling = false;
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (isScrolling) return;
            isScrolling = true;
            
        // Retourner toutes les cartes à leur état initial lors du scroll
            document.querySelectorAll('.card').forEach(c => {
                c.classList.remove('flipped');
            });

            // Scroll vers le bas = rotation vers la gauche (de droite vers gauche)
            // Scroll vers le haut = rotation vers la droite (de gauche vers droite)
            if (e.deltaY > 0) {
                targetRotation -= angleIncrement; // Droite vers gauche
            } else {
                targetRotation += angleIncrement; // Gauche vers droite
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 400);
        }, { passive: false });

        // Fonction de téléchargement
        function downloadFile(projectName) {
            // Créer un fichier texte de démonstration
            const content = `Détails du projet: ${projectName}\n\nCeci est un fichier de démonstration.`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectName}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }