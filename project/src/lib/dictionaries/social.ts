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

  // Linear Programming Theory (detailed)
  linear_programming_feasible_region_title: string;
  linear_programming_feasible_region_desc: string;
  linear_programming_objective_function_title: string;
  linear_programming_objective_function_desc: string;
  linear_programming_simplex_method_title: string;
  linear_programming_simplex_method_desc: string;
  linear_programming_duality_title: string;
  linear_programming_duality_desc: string;

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
    page_subtitle:
      "Comprehensive coverage of statistics, probability, financial mathematics, and linear programming for the Spanish Baccalaureate Social Sciences track.",
    track_badge: "Social Sciences Track",

    descriptive_statistics_title: "Descriptive Statistics",
    descriptive_statistics_desc:
      "Methods for summarizing, organizing, and visualizing data to understand patterns and characteristics in social science research.",

    probability_title: "Probability Foundations",
    probability_desc:
      "Theoretical and applied probability concepts including conditional probability, Bayes' theorem, and probability distributions.",

    inferential_statistics_title: "Inferential Statistics",
    inferential_statistics_desc:
      "Statistical inference methods including hypothesis testing, confidence intervals, and sampling distributions for drawing conclusions from data.",

    correlation_regression_title: "Correlation & Regression",
    correlation_regression_desc:
      "Analysis of relationships between variables using correlation coefficients and linear regression models.",

    financial_math_title: "Financial Mathematics",
    financial_math_desc:
      "Mathematical models for financial applications including simple and compound interest, annuities, loans, and investment analysis.",

    linear_programming_title: "Linear Programming",
    linear_programming_desc:
      "Optimization techniques for maximizing or minimizing linear objective functions subject to linear constraints.",

    linear_programming_feasible_region_title: "Feasible Region",
    linear_programming_feasible_region_desc:
      "The feasible region is the set of all points that satisfy all constraints simultaneously. Typically it is a convex polygon in two dimensions, bounded by the constraint lines.",
    linear_programming_objective_function_title: "Objective Function",
    linear_programming_objective_function_desc:
      "The objective function is the linear function to be maximized or minimized. The optimal solution occurs at a corner point (vertex) of the feasible region.",
    linear_programming_simplex_method_title: "Simplex Method",
    linear_programming_simplex_method_desc:
      "The simplex method is an iterative algorithm that moves from one corner point to an adjacent one, improving the objective function value at each step until the optimal solution is reached.",
    linear_programming_duality_title: "Duality",
    linear_programming_duality_desc:
      "Every linear programming problem has a corresponding dual problem. The optimal values of the primal and dual problems are equal under certain conditions (strong duality theorem).",

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
    page_subtitle:
      "Cobertura completa d'estadística, probabilitat, matemàtiques financeres i programació lineal per a la pista de Ciències Socials del Batxillerat espanyol.",
    track_badge: "Pista de Ciències Socials",

    descriptive_statistics_title: "Estadística Descriptiva",
    descriptive_statistics_desc:
      "Mètodes per resumir, organitzar i visualitzar dades per entendre patrons i característiques en la recerca en ciències socials.",

    probability_title: "Fonaments de Probabilitat",
    probability_desc:
      "Conceptes teòrics i aplicats de probabilitat inclòs probabilitat condicionada, teorema de Bayes i distribucions de probabilitat.",

    inferential_statistics_title: "Estadística Inferencial",
    inferential_statistics_desc:
      "Mètodes d'estadística inferencial inclòs proves d'hipòtesis, intervals de confiança i distribucions de mostreig per extreure conclusions de les dades.",

    correlation_regression_title: "Correl·lació i Regressió",
    correlation_regression_desc:
      "Anàlisi de relacions entre variables utilitzant coeficients de correl·lació i models de regressió lineal.",

    financial_math_title: "Matemàtiques Financeres",
    financial_math_desc:
      "Models matemàtics per a aplicacions financeres inclòs interès simple i compost, anualitats, préstecs i anàlisi d'inversions.",

    linear_programming_title: "Programació Lineal",
    linear_programming_desc:
      "Tècniques d'optimització per maximitzar o minimitzar funcions objectiu lineals subjectes a restriccions lineals.",

    linear_programming_feasible_region_title: "Regió Factible",
    linear_programming_feasible_region_desc:
      "La regió factible és el conjunt de tots els punts que satisfacen totes les restriccions simultàniament. Típicament és un polígon convex en dues dimensions, delimitat per les línies de restricció.",
    linear_programming_objective_function_title: "Funció Objectiu",
    linear_programming_objective_function_desc:
      "La funció objectiu és la funció lineal que es vol maximitzar o minimitzar. La solució òptima ocorre en un punt vora (vèrtex) de la regió factible.",
    linear_programming_simplex_method_title: "Mètode Simplex",
    linear_programming_simplex_method_desc:
      "El mètode simplex és un algoritme iteratiu que es desplaça d'un punt vora a un adjacent, millorant el valor de la funció objectiu en cada pas fins a assolir la solució òptima.",
    linear_programming_duality_title: "Dualitat",
    linear_programming_duality_desc:
      "Cada problema de programació lineal té un problema dual corresponent. Els valors òptims del problema primal i dual són iguals en certes condicions (teorema de dualitat forta).",

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
    page_subtitle:
      "Cobertura completa de estadística, probabilidad, matemáticas financieras y programación lineal para la pista de Ciencias Sociales del Bachillerato español.",
    track_badge: "Pista de Ciencias Sociales",

    descriptive_statistics_title: "Estadística Descriptiva",
    descriptive_statistics_desc:
      "Métodos para resumir, organizar y visualizar datos para entender patrones y características en la investigación en ciencias sociales.",

    probability_title: "Fundamentos de Probabilidad",
    probability_desc:
      "Conceptos teóricos y aplicados de probabilidad incluyendo probabilidad condicionada, teorema de Bayes y distribuciones de probabilidad.",

    inferential_statistics_title: "Estadística Inferencial",
    inferential_statistics_desc:
      "Métodos de estadística inferencial incluyendo pruebas de hipótesis, intervalos de confianza y distribuciones de muestreo para extraer conclusiones de los datos.",

    correlation_regression_title: "Correlación y Regresión",
    correlation_regression_desc:
      "Análisis de relaciones entre variables utilizando coeficientes de correlación y modelos de regresión lineal.",

    financial_math_title: "Matemáticas Financieras",
    financial_math_desc:
      "Modelos matemáticos para aplicaciones financieras incluyendo interés simple y compuesto, anualidades, préstamos y análisis de inversiones.",

    linear_programming_title: "Programación Lineal",
    linear_programming_desc:
      "Técnicas de optimización para maximizar o minimizar funciones objetivo lineales sujetas a restricciones lineales.",

    linear_programming_feasible_region_title: "Región Factible",
    linear_programming_feasible_region_desc:
      "La región factible es el conjunto de todos los puntos que satisfacen todas las restricciones simultáneamente. Típicamente es un polígono convexo en dos dimensiones, delimitado por las líneas de restricción.",
    linear_programming_objective_function_title: "Función Objetivo",
    linear_programming_objective_function_desc:
      "La función objetivo es la función lineal que se desea maximizar o minimizar. La solución óptima ocurre en un punto esquina (vértice) de la región factible.",
    linear_programming_simplex_method_title: "Método Simplex",
    linear_programming_simplex_method_desc:
      "El método simplex es un algoritmo iterativo que se mueve de un punto esquina a uno adyacente, mejorando el valor de la función objetivo en cada paso hasta alcanzar la solución óptima.",
    linear_programming_duality_title: "Dualidad",
    linear_programming_duality_desc:
      "Todo problema de programación lineal tiene un problema dual correspondiente. Los valores óptimos del problema primal y dual son iguales bajo ciertas condiciones (teorema de dualidad fuerte).",

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
