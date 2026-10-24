export interface SocialDictionary {
  // Page header
  page_title: string;
  page_subtitle: string;
  track_badge: string;
  
  // Section titles
  descriptive_statistics_title: string;
  descriptive_statistics_desc: string;
  probability_title: string;
  probability_desc: string;
  inferential_statistics_title: string;
  inferential_statistics_desc: string;
  correlation_regression_title: string;
  correlation_regression_desc: string;
  financial_math_title: string;
  financial_math_desc: string;
  linear_programming_title: string;
  linear_programming_desc: string;
  
  // Navigation
  nav_home: string;
  nav_social: string;
  nav_scientific: string;
  
  // Common
  key_formulas: string;
  examples: string;
  key_points: string;
  problem: string;
  solution: string;
  
  // Links
  theory_link: string;
  exercises_link: string;
}

export const socialDictionary: Record<string, SocialDictionary> = {
  en: {
    page_title: "Social Mathematics Theory",
    page_subtitle: "Comprehensive coverage of statistics, probability, financial mathematics, and linear programming for the Spanish Baccalaureate Social Sciences track.",
    track_badge: "Social Sciences Track",
    
    descriptive_statistics_title: "Descriptive Statistics",
    descriptive_statistics_desc: "Methods for summarizing, organizing, and visualizing data to understand patterns and characteristics in social science research.",
    
    probability_title: "Probability Foundations",
    probability_desc: "Theoretical and applied probability concepts including conditional probability, Bayes' theorem, and probability distributions.",
    
    inferential_statistics_title: "Inferential Statistics",
    inferential_statistics_desc: "Statistical inference methods including hypothesis testing, confidence intervals, and sampling distributions for drawing conclusions from data.",
    
    correlation_regression_title: "Correlation & Regression",
    correlation_regression_desc: "Analysis of relationships between variables using correlation coefficients and linear regression models.",
    
    financial_math_title: "Financial Mathematics",
    financial_math_desc: "Mathematical models for financial applications including simple and compound interest, annuities, loans, and investment analysis.",
    
    linear_programming_title: "Linear Programming",
    linear_programming_desc: "Optimization techniques for maximizing or minimizing linear objective functions subject to linear constraints.",
    
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
    page_title: "Teoria de Matemàtiques Socials",
    page_subtitle: "Cobertura completa d'estadística, probabilitat, matemàtiques financeres i programació lineal per a la pista de Ciències Socials del Batxillerat espanyol.",
    track_badge: "Pista de Ciències Socials",
    
    descriptive_statistics_title: "Estadística Descriptiva",
    descriptive_statistics_desc: "Mètodes per resumir, organitzar i visualitzar dades per entendre patrons i característiques en la recerca en ciències socials.",
    
    probability_title: "Fonaments de Probabilitat",
    probability_desc: "Conceptes teòrics i aplicats de probabilitat inclòs probabilitat condicionada, teorema de Bayes i distribucions de probabilitat.",
    
    inferential_statistics_title: "Estadística Inferencial",
    inferential_statistics_desc: "Mètodes d'estadística inferencial inclòs proves d'hipòtesis, intervals de confiança i distribucions de mostreig per extreure conclusions de les dades.",
    
    correlation_regression_title: "Correl·lació i Regressió",
    correlation_regression_desc: "Anàlisi de relacions entre variables utilitzant coeficients de correl·lació i models de regressió lineal.",
    
    financial_math_title: "Matemàtiques Financeres",
    financial_math_desc: "Models matemàtics per a aplicacions financeres inclòs interès simple i compost, anualitats, préstecs i anàlisi d'inversions.",
    
    linear_programming_title: "Programació Lineal",
    linear_programming_desc: "Tècniques d'optimització per maximitzar o minimitzar funcions objectiu lineals subjectes a restriccions lineals.",
    
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
    page_title: "Teoría de Matemáticas Sociales",
    page_subtitle: "Cobertura completa de estadística, probabilidad, matemáticas financieras y programación lineal para la pista de Ciencias Sociales del Bachillerato español.",
    track_badge: "Pista de Ciencias Sociales",
    
    descriptive_statistics_title: "Estadística Descriptiva",
    descriptive_statistics_desc: "Métodos para resumir, organizar y visualizar datos para entender patrones y características en la investigación en ciencias sociales.",
    
    probability_title: "Fundamentos de Probabilidad",
    probability_desc: "Conceptos teóricos y aplicados de probabilidad incluyendo probabilidad condicionada, teorema de Bayes y distribuciones de probabilidad.",
    
    inferential_statistics_title: "Estadística Inferencial",
    inferential_statistics_desc: "Métodos de estadística inferencial incluyendo pruebas de hipótesis, intervalos de confianza y distribuciones de muestreo para extraer conclusiones de los datos.",
    
    correlation_regression_title: "Correlación y Regresión",
    correlation_regression_desc: "Análisis de relaciones entre variables utilizando coeficientes de correlación y modelos de regresión lineal.",
    
    financial_math_title: "Matemáticas Financieras",
    financial_math_desc: "Modelos matemáticos para aplicaciones financieras incluyendo interés simple y compuesto, anualidades, préstamos y análisis de inversiones.",
    
    linear_programming_title: "Programación Lineal",
    linear_programming_desc: "Técnicas de optimización para maximizar o minimizar funciones objetivo lineales sujetas a restricciones lineales.",
    
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
