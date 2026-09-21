export const centralNode = {
  id: 'core',
  label: 'S',
  title: 'Sahana F',
  tagline: 'A Universe of Tools',
  description: 'Exploring the intersection of biology, technology, and immersive digital worlds.',
}

// Exactly 8 nodes matching the reference design and user specification:
// 1. Frontend
// 2. Backend
// 3. Databases
// 4. Programming
// 5. Tools & Technologies
// 6. UI / UX Design
// 7. Bioinformatics
// 8. 3D Development (Unity + Blender)
export const skillNodes = [
  {
    id: 'frontend',
    name: 'Frontend',
    title: 'FRONTEND',
    subtitle: 'HTML5 · CSS3 · JavaScript · React.js',
    category: 'Client-Side Architecture',
    angle: 90, // Top
    distance: 210,
    color: '#f59e0b', // Warm Amber
    icon: 'FiCode',
    summary:
      'Designing and developing modern, responsive, and intuitive web user interfaces with performant component modularity and reactive state orchestration.',
    techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    strengths: [
      'Interactive component systems & state flows',
      'Fluid kinetic animations & micro-interactions',
      'Pixel-perfect responsive cross-device layouts',
      'Modern web standards & performance optimization',
    ],
    projects: ['The Three Realms', 'Portfolio Ecosystem', 'StructuroScope Web'],
  },
  {
    id: 'backend',
    name: 'Backend',
    title: 'BACKEND',
    subtitle: 'Node.js · Express.js',
    category: 'Server & API Systems',
    angle: 45, // Top Right
    distance: 235,
    color: '#c026d3', // Magenta / Purple
    icon: 'FiServer',
    summary:
      'Architecting resilient backend routing, RESTful APIs, asynchronous business logic, serverless functions, and third-party communication endpoints.',
    techs: ['Node.js', 'Express.js', 'REST APIs', 'Middleware Engineering', 'JSON Web Tokens', 'CORS Security'],
    strengths: [
      'Modular REST API route design',
      'Asynchronous pipeline orchestration',
      'Formspree, Twilio & webhook integrations',
      'Secure input sanitization & error handling',
    ],
    projects: ['Form Transmission Engine', 'Custom Node Services'],
  },
  {
    id: 'databases',
    name: 'Databases',
    title: 'DATABASES',
    subtitle: 'MySQL · Firebase',
    category: 'Data Persistence & Modeling',
    angle: 0, // Right
    distance: 250,
    color: '#00f5ff', // Electric Cyan
    icon: 'FiDatabase',
    summary:
      'Structuring relational schemas and real-time document collections with high-integrity indexing, transactional reliability, and secure authentication.',
    techs: ['MySQL', 'Firebase Firestore', 'Relational Schemas', 'Query Optimization', 'Database Security Rules'],
    strengths: [
      'ACID transactional consistency',
      'Real-time document synchronization',
      'Optimized indexing & data normalization',
      'Secure database access policies',
    ],
    projects: ['NeuroStride Data Engine', 'FIFA Analytics Database'],
  },
  {
    id: 'programming',
    name: 'Programming',
    title: 'PROGRAMMING',
    subtitle: 'Python',
    category: 'Core Logic & Computation',
    angle: 315, // Bottom Right
    distance: 235,
    color: '#a855f7', // Electric Violet
    icon: 'FiTerminal',
    summary:
      'Writing structured object-oriented logic, data manipulation scripts, algorithmic computation routines, and automated bioinformatics workflows.',
    techs: ['Python 3', 'NumPy', 'Pandas', 'OOP Architecture', 'Algorithms', 'Automation Scripting'],
    strengths: [
      'Scientific computation & matrix manipulation',
      'Automated file & data parsing pipelines',
      'Clean object-oriented architecture',
      'Algorithmic time/space complexity optimization',
    ],
    projects: ['FIFA Analysis Engine', 'Bioinformatics Scripting Suite'],
  },
  {
    id: 'tools',
    name: 'Tools & Technologies',
    title: 'TOOLS & TECHNOLOGIES',
    subtitle: 'Git · GitHub · VS Code',
    category: 'Developer Ecosystem & Tooling',
    angle: 270, // Bottom
    distance: 210,
    color: '#eab308', // Golden Amber
    icon: 'FiCpu',
    summary:
      'Harnessing modern developer tooling, version-controlled repository workflows, lightning-fast bundlers, and continuous deployment environments.',
    techs: ['Git', 'GitHub Workflows', 'VS Code', 'Vite Bundler', 'npm / pnpm', 'Netlify CI/CD', 'ESLint'],
    strengths: [
      'Git feature branching & pull requests',
      'Lightning-fast Vite hot module reloading',
      'Automated production build pipelines',
      'Zero-downtime continuous deployment',
    ],
    projects: ['All Live Deployments & GitHub Repositories'],
  },
  {
    id: 'uiux',
    name: 'UI / UX Design',
    title: 'UI / UX DESIGN',
    subtitle: 'Figma · Canva · Framer',
    category: 'Visual Systems & Prototyping',
    angle: 225, // Bottom Left
    distance: 235,
    color: '#ec4899', // Neon Pink
    icon: 'FiLayers',
    summary:
      'Conceptualizing futuristic user journeys, high-fidelity design systems, spatial typographic hierarchy, and interactive prototypes.',
    techs: ['Figma', 'Canva', 'Framer', 'Design Systems', 'Kinetic Typography', 'Interactive Prototyping'],
    strengths: [
      'Dark futuristic & cyberpunk aesthetic framing',
      'Design tokens, color harmony & typography',
      'User empathy & visual layout balance',
      'Rapid wireframing to interactive prototyping',
    ],
    projects: ['Portfolio Futuristic Design System', 'Client Branding Systems'],
  },
  {
    id: 'bioinformatics',
    name: 'Bioinformatics',
    title: 'BIOINFORMATICS',
    subtitle: 'BLAST · ClustalW · NCBI · MEGA · PyMOL · Cytoscape',
    category: 'Computational Biology & Genomics',
    angle: 180, // Left
    distance: 250,
    color: '#38bdf8', // Sky Cyan
    icon: 'FiActivity',
    summary:
      'Bridging computation with biological data: DNA/protein sequence alignment, macromolecular 3D visualization, phylogenetic modeling, and biological network mapping.',
    techs: ['BLAST', 'ClustalW', 'NCBI Entrez', 'MEGA', 'PyMOL 3D', 'Cytoscape'],
    strengths: [
      'Pairwise & multiple sequence alignments',
      '3D molecular structure inspection & docking',
      'Phylogenetic tree inference & evolutionary analysis',
      'Biological interaction pathway modeling',
    ],
    projects: ['StructuroScope', 'Genomic Research Analysis'],
  },
  {
    id: 'threeD',
    name: '3D Development',
    title: '3D DEVELOPMENT',
    subtitle: 'Unity · Blender',
    category: 'Spatial Worlds & Game Tech',
    angle: 135, // Top Left
    distance: 235,
    color: '#818cf8', // Indigo Purple
    icon: 'FiBox',
    summary:
      'Building 3D meshes, spatial environments, lighting setups, camera choreography, and game interactions inside Unity and Blender.',
    techs: ['Unity Engine', 'Blender 3D', '3D Modeling', 'GLTF/GLB Pipeline', 'Lighting & Textures', 'Spatial Physics'],
    strengths: [
      '3D mesh modeling & UV unwrapping',
      'Cinematic lighting & atmospheric skyboxes',
      'Real-time asset optimization for interactive rendering',
      'Spatial camera choreography & scene staging',
    ],
    projects: ['The Three Realms (3D World)', 'Digital Scene Prototyping'],
  },
]
