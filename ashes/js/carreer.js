 // Data
        const companies = {
            suez: {
                name: 'SUEZ R&V',
                presentation: 'suez-presentation',
                missions: 'suez-missions',
                headerImage: 'logo_corpo/Altiplano.jpeg',
                link: 'https://www.suez.fr/fr-fr'
            },
            vivalto: {
                name: 'Vivalto Santé & CHPE',
                presentation: 'vivalto-presentation',
                missions: 'vivalto-missions',
                headerImage: 'logo_corpo/epm.webp',
                link: 'https://chpeurope-leportmarly.vivalto-sante.com/'
            },
            e3: {
                name: 'Entreprise 3',
                presentation: 'e3-presentation',
                missions: 'e3-missions',
                headerImage: 'pictures/company-headers/e3-header.jpg'
            }
        };

        let currentCompany = 'suez';
        let currentView = 'presentation';


        function updateHeader(company) {
            const headerImg = document.getElementById('companyHeaderImage');
            headerImg.src = companies[company]?.headerImage;
            headerImg.alt = companies[company]?.name + ' header';

            const headerLink= document.getElementsByClassName('company-link')[0];
            headerLink.setAttribute('href', companies[company]?.link || '#');
        }

        // Handle company button clicks
        document.querySelectorAll('.company-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const company = btn.dataset.company;
                switchCompany(company);
                showPresentation(company);
            });
        });

        // Handle missions button clicks
        document.querySelectorAll('.missions-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const company = btn.dataset.company;
                switchCompany(company);
                showMissions(company);
            });
        });

        function switchCompany(company) {
            // Update active buttons
            document.querySelectorAll('.company-button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.company === company);
            });

            document.querySelectorAll('.missions-button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.company === company);
            });

            currentCompany = company;

            // update header image
            updateHeader(company);
        }

        function showPresentation(company) {
            // Hide all content
            document.querySelectorAll('.content > div').forEach(el => {
                el.classList.add('content-hidden');
            });

            // Show presentation
            const presentationId = companies[company].presentation;
            document.getElementById(presentationId).classList.remove('content-hidden');

            // Update missions button state
            document.querySelectorAll('.missions-button').forEach(btn => {
                btn.classList.remove('selected');
            });

            currentView = 'presentation';
        }

        function showMissions(company) {
            // Hide all content
            document.querySelectorAll('.content > div').forEach(el => {
                el.classList.add('content-hidden');
            });

            // Show missions
            const missionsId = companies[company].missions;
            document.getElementById(missionsId).classList.remove('content-hidden');

            // Update missions button state
            document.querySelectorAll('.missions-button').forEach(btn => {
                btn.classList.toggle('selected', btn.dataset.company === company);
            });

            currentView = 'missions';
        }

        // Ensure header shows correct image on initial load
        updateHeader(currentCompany);