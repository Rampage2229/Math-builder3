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
