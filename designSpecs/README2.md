🎯 README – Chef d’Orchestre TerraStab

Ce fichier est la source de vérité pour coordonner le développement du site TerraStab. Il permet à un ou plusieurs agents (IA ou humains) d’intervenir efficacement selon les spécifications définies.

⸻

🧱 Structure globale du site

Le site est divisé en deux grandes parties :

1. Landing Page (8 sections)

Gérée par : Track Front / Display

Ordre	Fichier .md	Composant React	Description
1️⃣	landingSection1.md	<HeroSection />	Promesse + image maison fissurée + CTA principal
2️⃣	landingSection2.md	<MiniPromise />	Mini-promesse qui renforce l’intention
3️⃣	landingSection3.md	<ExpertQuotes />	Preuves sociales par experts
4️⃣	landingSection4.md	<TechSection />	Description simplifiée de la technologie
5️⃣	landingSection5.md	<TrustLogos />	Logos des soutiens institutionnels
6️⃣	landingSection6.md	<UrgencySection />	Raisons d’agir maintenant (climat, valeur)
7️⃣	landingSection7.md	<FAQSection />	Objections + réponses
8️⃣	landingSection8.md	<SecondCTA />	Dernière chance de conversion

➡️ Voir aussi landingPage.md pour la structure globale de la page.

2. Customer Journey (post-CTA)

Gérée par : Track Fullstack

Fichier : custJourney.md

Composants principaux :
	•	<RiskSurvey />
	•	<RecommendationDisplay />
	•	<Configurator />
	•	<QuoteDisplay />
	•	<DepositPayment />

Inclut :
	•	Frictions identifiées (configurateur)
	•	Idée d’assistance téléphonique à étudier

⸻

⚙️ Stack technique

Voir specsTech.md pour les détails.

Résumé :
	•	Framework : React + Vite
	•	Style : TailwindCSS
	•	Animations : Framer Motion
	•	Backend : Supabase
	•	Déploiement : Vercel

Spécificités :
	•	Site mobile-first
	•	CTA toujours visible sur mobile (sticky button)
	•	Micro-interactions partout (hover, reveal, accordion…)

⸻

🧠 Règles d’or pour les agents
	•	Lire la spéc .md associée à chaque section AVANT de coder.
	•	Ne pas modifier le contenu stratégique. Le but est de respecter le ton, l’ordre, la promesse.
	•	Respecter les structures suggérées : composants enfants, animations, hiérarchie visuelle.
	•	Toujours penser mobile-first, mais tester aussi en desktop.
	•	Chaque composant doit être isolé, testable et réutilisable.
	•	Le contenu dynamique (avis, recommandations…) devra être branché à Supabase plus tard, donc simuler avec JSON pour l’instant.

⸻

🧩 Fichiers de spécifications disponibles

/specs
├── landingPage.md
├── specsTech.md
├── custJourney.md
└── landing/
    ├── landingSection1.md
    ├── landingSection2.md
    ├── landingSection3.md
    ├── landingSection4.md
    ├── landingSection5.md
    ├── landingSection6.md
    ├── landingSection7.md
    └── landingSection8.md


⸻

🔁 Suggestion de prompts pour agents spécialisés

🎨 Agent UI (HeroSection)

Tu es un développeur React/Tailwind. Implémente le composant <HeroSection> selon landingSection1.md. Utilise l’image maison-fissuree.jpg comme background, insère le CTA principal, applique des animations douces (Framer Motion). Priorise lisibilité et impact. Mobile-first.

💬 Agent UX (FAQSection)

Implémente <FAQSection> comme accordéon avec @radix-ui/react-accordion, selon landingSection7.md. Focus sur lisibilité, structure en questions-réponses. Responsive. Animations subtiles.

🔧 Agent Fullstack (RiskSurvey)

Tu es un développeur React/Supabase. Crée <RiskSurvey> qui déclenche un flow post-CTA comme spécifié dans custJourney.md. Simule les données pour l’instant. Prépare les hooks pour Supabase plus tard.

