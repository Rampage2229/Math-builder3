export interface ScientificDictionary {
  title: string;
  subtitle: string;
  topics: {
    limits: TheoryTopicDict;
    continuity: TheoryTopicDict;
    derivatives: TheoryTopicDict;
    integrals: TheoryTopicDict;
    vectors: TheoryTopicDict;
    matrices: TheoryTopicDict;
    probability: TheoryTopicDict;
  };
}

export interface TheoryTopicDict {
  id: string;
  title: string;
  description: string;
  theory: TheorySectionDict[];
  examples: TheoryExampleDict[];
  visualization?: VisualizationConfigDict;
}

export interface TheorySectionDict {
  id: string;
  title: string;
  content: string;
  formulas?: FormulaDict[];
  keyPoints?: string[];
}

export interface TheoryExampleDict {
  id: string;
  title: string;
  problem: string;
  solution: string;
  steps: ExampleStepDict[];
}

export interface ExampleStepDict {
  step: number;
  description: string;
  formula?: string;
  result?: string;
}

export interface FormulaDict {
  latex: string;
  description: string;
}

export interface VisualizationConfigDict {
  type: 'function-graph' | 'vector' | 'matrix' | 'probability';
  config: Record<string, unknown>;
}

export const scientificTopicsOrder: (keyof ScientificDictionary['topics'])[] = [
  'limits',
  'continuity',
  'derivatives',
  'integrals',
  'vectors',
  'matrices',
  'probability',
];

export interface ScientificPageDictionary {
  page_title: string;
  page_subtitle: string;
  track_badge: string;
  limits_title: string;
  limits_desc: string;
  derivatives_title: string;
  derivatives_desc: string;
  integrals_title: string;
  integrals_desc: string;
  vectors_title: string;
  vectors_desc: string;
  matrices_title: string;
  matrices_desc: string;
  probability_title: string;
  probability_desc: string;
  nav_home: string;
  nav_social: string;
  nav_scientific: string;
  key_formulas: string;
  examples: string;
  key_points: string;
  problem: string;
  solution: string;
  theory_link: string;
  exercises_link: string;
}

export const scientificDictionary: Record<string, ScientificPageDictionary> = {
  en: {
    page_title: "Scientific Mathematics Theory",
    page_subtitle: "Comprehensive coverage of limits, derivatives, integrals, vectors, matrices, and probability for the Spanish Baccalaureate Scientific track.",
    track_badge: "Scientific Sciences Track",
    limits_title: "Limits and Continuity",
    limits_desc: "Study of limits, continuity, and asymptotic behavior of functions.",
    derivatives_title: "Derivatives",
    derivatives_desc: "Differentiation rules and applications including rates of change and optimization.",
    integrals_title: "Integrals",
    integrals_desc: "Integration techniques including definite and indefinite integrals.",
    vectors_title: "Vectors",
    vectors_desc: "Vector operations in 2D and 3D space.",
    matrices_title: "Matrices",
    matrices_desc: "Matrix operations, determinants, and systems of linear equations.",
    probability_title: "Probability",
    probability_desc: "Probability theory including conditional probability and distributions.",
    nav_home: "Home",
    nav_social: "Social Mathematics",
    nav_scientific: "Scientific Mathematics",
    key_formulas: "Key Formulas",
    examples: "Examples",
    key_points: "Key Points",
    problem: "Problem",
    solution: "Solution",
    theory_link: "View Theory",
    exercises_link: "Practice Exercises",
  },
  ca: {
    page_title: "Teoria de Matemàtiques Científiques",
    page_subtitle: "Cobertura completa de límits, derivades, integrals, vectors, matrius i probabilitat per a la pista de Ciències del Batxillerat espanyol.",
    track_badge: "Pista de Ciències Científiques",
    limits_title: "Límits i Continuitat",
    limits_desc: "Estudi de límits, continuïtat i comportament assimptòtic de funcions.",
    derivatives_title: "Derivades",
    derivatives_desc: "Regles de derivació i aplicacions inclòs ritmes de canvi i optimització.",
    integrals_title: "Integrals",
    integrals_desc: "Tècniques d'integració inclòs integrals definides i indefinides.",
    vectors_title: "Vectors",
    vectors_desc: "Operacions vectors en espai 2D i 3D.",
    matrices_title: "Matrius",
    matrices_desc: "Operacions de matrius, determinants i sistemes d'equacions lineals.",
    probability_title: "Probabilitat",
    probability_desc: "Teoria de la probabilitat inclòs probabilitat condicionada i distribucions.",
    nav_home: "Inici",
    nav_social: "Matemàtiques Socials",
    nav_scientific: "Matemàtiques Científiques",
    key_formulas: "Fórmules Clau",
    examples: "Exemples",
    key_points: "Punts Clau",
    problem: "Problema",
    solution: "Solució",
    theory_link: "Veure Teoria",
    exercises_link: "Exercicis de Pràctica",
  },
  es: {
    page_title: "Teoría de Matemáticas Científicas",
    page_subtitle: "Cobertura completa de límites, derivadas, integrales, vectores, matrices y probabilidad para la pista de Ciencias del Bachillerato español.",
    track_badge: "Pista de Ciencias Científicas",
    limits_title: "Límites y Continuidad",
    limits_desc: "Estudio de límites, continuidad y comportamiento asintótico de funciones.",
    derivatives_title: "Derivadas",
    derivatives_desc: "Reglas de derivación y aplicaciones inclòs tasas de cambio y optimización.",
    integrals_title: "Integrales",
    integrals_desc: "Técnicas de integración inclòs integrales definidas e indefinidas.",
    vectors_title: "Vectores",
    vectors_desc: "Operaciones vectoriales en espacio 2D y 3D.",
    matrices_title: "Matrices",
    matrices_desc: "Operaciones de matrices, determinantes y sistemas de ecuaciones lineales.",
    probability_title: "Probabilidad",
    probability_desc: "Teoría de probabilidad inclòs probabilidad condicionada y distribuciones.",
    nav_home: "Inicio",
    nav_social: "Matemáticas Sociales",
    nav_scientific: "Matemáticas Científicas",
    key_formulas: "Fórmulas Clave",
    examples: "Ejemplos",
    key_points: "Puntos Clave",
    problem: "Problema",
    solution: "Solución",
    theory_link: "Ver Teoría",
    exercises_link: "Ejercicios de Práctica",
  },
};
