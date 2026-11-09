/**
 * Single source of truth for all resume content shown in the app.
 * Content mirrors docs/resume-content.md — screens must not hard-code resume text.
 */
import type { AndroidSymbol, SFSymbol } from 'expo-symbols';

export type AppIcon = {
  /** SF Symbol (iOS) */
  ios: SFSymbol;
  /** Material Symbol (Android / web) */
  android: AndroidSymbol;
};

export type YearMonth = {
  year: number;
  /** 1-12 */
  month: number;
};

export type Period = {
  start: YearMonth;
  /** `undefined` means the position is current. */
  end?: YearMonth;
};

export type Highlight = {
  title: string;
  text: string;
  icon: AppIcon;
};

export type ExperienceId = 'epages' | 'plancraft';

export type Experience = {
  id: ExperienceId;
  /** Short name used for tab labels and navigation titles. */
  shortName: string;
  company: string;
  role: string;
  period: Period;
  intro: string[];
  highlights: Highlight[];
  keyChallenges?: string[];
  /** Technologies mentioned in the experience text only. */
  techStack: string[];
  websiteUrl: string;
  accentColor: string;
  icon: AppIcon;
};

export type ContactLink = {
  label: string;
  url: string;
  icon: AppIcon;
  /** Brand color for the icon tile. */
  color: string;
};

export type Contact = {
  email: string;
  phone: string;
  location: string;
  linkedIn: ContactLink;
  gitHub: ContactLink;
};

export type Education = {
  title: string;
  institution: string;
  period: Period;
};

export type Skill = {
  title: string;
  text: string;
  icon: AppIcon;
};

export type PersonalProject = {
  title: string;
  text: string;
  techStack: string[];
  icon: AppIcon;
};

export type Language = {
  name: string;
  level: string;
};

export type Profile = {
  name: string;
  initials: string;
  headline: string;
};

export type Resume = {
  profile: Profile;
  contact: Contact;
  summary: string[];
  /** Technologies named in the summary. */
  coreTechnologies: string[];
  skills: Skill[];
  languages: Language[];
  education: Education[];
  personalProjects: PersonalProject[];
  experience: Record<ExperienceId, Experience>;
  /** Order in which experience is presented (most recent first). */
  careerOrder: ExperienceId[];
};

export const resume: Resume = {
  profile: {
    name: 'Florian Oellerich',
    initials: 'FO',
    headline: 'Senior Fullstack Software Engineer',
  },
  contact: {
    email: 'florian.oellerich@hotmail.de',
    phone: '+49 175 8142708',
    location: 'Hamburg, Germany',
    linkedIn: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/florian-oellerich-4a811580/',
      icon: { ios: 'person.crop.circle', android: 'person' },
      color: '#0A66C2',
    },
    gitHub: {
      label: 'GitHub',
      url: 'https://github.com/Raigen',
      icon: { ios: 'chevron.left.forwardslash.chevron.right', android: 'code' },
      color: '#6E5494',
    },
  },
  summary: [
    'Software Engineer with 15 years of experience designing, building, and evolving production software, including 11 years developing eCommerce SaaS platforms at ePages.',
    'Experienced across the full software development lifecycle, from technical planning and system design to implementation, deployment, and long-term maintenance. Strong background in JavaScript, TypeScript, Node.js, React, and React Native, and in AI-assisted development with Claude, Cursor, and Codex — focused on modernizing existing systems, improving developer workflows, and building maintainable, scalable solutions.',
    'Passionate about engineering practices that help teams deliver software more effectively, combining deep technical knowledge with automation, continuous learning, and collaborative problem-solving.',
  ],
  coreTechnologies: [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'React',
    'React Native',
    'Claude',
    'Cursor',
    'Codex',
  ],
  skills: [
    {
      title: 'Engineering leadership',
      text: 'Sets the direction of a team and develops the people on it.',
      icon: { ios: 'person.3.fill', android: 'groups' },
    },
    {
      title: 'Mobile development',
      text: 'Builds and ships features in a consumer app.',
      icon: { ios: 'iphone', android: 'smartphone' },
    },
    {
      title: 'Testing',
      text: 'Knows and teaches best practises for unit and e2e tests.',
      icon: { ios: 'checkmark.seal.fill', android: 'check_circle' },
    },
  ],
  languages: [
    { name: 'German', level: 'native' },
    { name: 'English', level: 'fluent' },
  ],
  education: [
    {
      title: 'Fachinformatiker - Systemintegration',
      institution: 'CCV Computer Vertrieb UG',
      period: { start: { year: 2008, month: 8 }, end: { year: 2011, month: 7 } },
    },
  ],
  personalProjects: [
    {
      title: 'Homelab',
      text: 'Operates a self-hosted infrastructure on multiple Raspberry Pis and mini PCs — smart home, media, network, and self-hosted developer services running as Docker containers via Docker Compose, provisioned and managed across all hosts through an AI-assisted Ansible playbook, and monitored with Uptime Kuma.',
      techStack: ['Raspberry Pi', 'Docker', 'Docker Compose', 'Ansible', 'Uptime Kuma'],
      icon: { ios: 'server.rack', android: 'dns' },
    },
  ],
  careerOrder: ['plancraft', 'epages'],
  experience: {
    plancraft: {
      id: 'plancraft',
      shortName: 'plancraft',
      company: 'Plancraft GmbH',
      role: 'Javascript Developer, Fullstack',
      period: { start: { year: 2022, month: 12 } },
      intro: [
        "Built and evolved features across backend APIs, React web applications, and the React Native mobile app of plancraft's SaaS platform for craft and construction businesses — used by over 20,000 tradespeople in 11 European countries.",
        'Drove the modernization of the mobile application, automated its delivery infrastructure, and developed complex business features for time tracking and workforce planning.',
      ],
      highlights: [
        {
          title: 'Mobile application modernization',
          text: 'Modernized and maintained the React Native mobile application using Expo, with regular SDK updates keeping the app continuously compliant with evolving Android and iOS store requirements.',
          icon: { ios: 'iphone', android: 'smartphone' },
        },
        {
          title: 'CI/CD and developer experience',
          text: 'Designed and automated the mobile delivery pipeline using Expo and EAS, giving developers and stakeholders instant QR-code access to preview builds for pull requests — down from up to an hour per full test build.',
          icon: { ios: 'gearshape.2.fill', android: 'build' },
        },
        {
          title: 'Release automation',
          text: 'Implemented an automated release workflow that delivers over-the-air updates after merges and identifies when a new App Store or Google Play build is required.',
          icon: { ios: 'arrow.triangle.2.circlepath', android: 'sync' },
        },
        {
          title: 'AI-assisted release workflows',
          text: 'Developed an AI agent skill that, together with the automated delivery pipeline, cut store releases from several hours of manual work spread over days to a few minutes of review and confirmation.',
          icon: { ios: 'wand.and.stars', android: 'rocket_launch' },
        },
        {
          title: 'AI-assisted development',
          text: 'Integrated Claude, Cursor, and Codex into daily fullstack workflows, accelerating implementation, code review, and debugging across backend, web, and mobile.',
          icon: { ios: 'sparkles', android: 'bolt' },
        },
        {
          title: 'Time tracking and workforce management',
          text: 'Extended the existing time-tracking system and designed and implemented overtime management functionality, translating business requirements into an integrated technical solution.',
          icon: { ios: 'clock.fill', android: 'schedule' },
        },
        {
          title: 'Cross-platform development',
          text: 'Delivered features across Node.js backend services, React web interfaces, and React Native mobile applications, maintaining consistency across the platform.',
          icon: { ios: 'square.stack.3d.up.fill', android: 'code' },
        },
        {
          title: 'Technical collaboration',
          text: 'Shaped implementation approaches with engineers and product stakeholders, solving technical challenges and delivering maintainable solutions.',
          icon: { ios: 'bubble.left.and.bubble.right.fill', android: 'groups' },
        },
      ],
      techStack: [
        'React Native',
        'Expo',
        'EAS',
        'React',
        'Node.js',
        'Claude',
        'Cursor',
        'Codex',
        'CI/CD',
        'OTA updates',
      ],
      websiteUrl: 'https://plancraft.com',
      accentColor: '#12A150',
      icon: { ios: 'hammer.fill', android: 'construction' },
    },
    epages: {
      id: 'epages',
      shortName: 'ePages',
      company: 'ePages GmbH',
      role: 'Senior Javascript Developer',
      period: { start: { year: 2011, month: 8 }, end: { year: 2022, month: 11 } },
      intro: [
        "Planned and built ePages' next-generation online shop storefront from the ground up using Node.js, MySQL, jQuery, and later React. The storefront connected to both legacy and new backend APIs to give shoppers the same buying experience in more than 20 European markets and over 15 languages.",
        'Drove alignment across product management, UX design, and engineering throughout the process, and took responsibility for mentoring and growing engineers within a team of 6–15 developers.',
      ],
      highlights: [
        {
          title: 'Online shop storefront',
          text: 'Designed and implemented a new customer-facing storefront for online shops, with customizable React-based themes, serving more than 10,000 merchants and their shoppers in over 20 markets and 15+ languages.',
          icon: { ios: 'storefront.fill', android: 'storefront' },
        },
        {
          title: 'Shop CMS page builder',
          text: 'Built a CMS building kit that let merchants design every page of their online shop on their own, without needing a developer for every change.',
          icon: { ios: 'doc.richtext.fill', android: 'web' },
        },
        {
          title: 'Merchant backoffice',
          text: 'Planned and developed a new backoffice application that merchants use to run and manage their online shops, built on the REST APIs of multiple microservices.',
          icon: { ios: 'shippingbox.fill', android: 'work' },
        },
        {
          title: 'API design collaboration',
          text: 'Worked with backend teams on equal footing to jointly shape the REST APIs and communication channels powering the storefront.',
          icon: { ios: 'bubble.left.and.bubble.right.fill', android: 'link' },
        },
        {
          title: 'Backend refactoring',
          text: "Refactored the entire storefront backend to TypeScript so a single codebase could serve both of ePages' REST APIs equally.",
          icon: { ios: 'arrow.triangle.2.circlepath', android: 'sync' },
        },
        {
          title: 'TypeScript adoption',
          text: 'Introduced TypeScript across the frontend and backend of the new storefront, raising code quality and long-term maintainability.',
          icon: { ios: 'chevron.left.forwardslash.chevron.right', android: 'code' },
        },
        {
          title: 'Mentorship',
          text: 'Onboarded and mentored junior developers within a team of 6–15 engineers, helping them quickly grow into fully-fledged developers and beyond.',
          icon: { ios: 'person.3.fill', android: 'groups' },
        },
        {
          title: 'Infrastructure ownership',
          text: "Managed the team's own container projects on Kubernetes on Google Cloud Engine.",
          icon: { ios: 'cloud.fill', android: 'cloud' },
        },
      ],
      keyChallenges: [
        'Migrated the CI/CD setup step by step from CircleCI to GitHub Actions.',
        'Kept dependencies up to date on a regular basis, handling breaking changes and evolving design principles, such as the React Hooks upgrade.',
        'Drove the introduction of TypeScript across all JavaScript projects.',
      ],
      techStack: [
        'Node.js',
        'TypeScript',
        'JavaScript',
        'React',
        'React Hooks',
        'jQuery',
        'MySQL',
        'REST APIs',
        'Microservices',
        'Kubernetes',
        'Google Cloud',
        'CircleCI',
        'GitHub Actions',
      ],
      websiteUrl: 'https://www.epages.com',
      accentColor: '#2F80ED',
      icon: { ios: 'bag.fill', android: 'storefront' },
    },
  },
};
