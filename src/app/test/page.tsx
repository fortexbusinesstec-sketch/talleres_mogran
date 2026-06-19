'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconArrowRight,
  IconCheck,
  IconLock,
  IconMail,
  IconRefresh,
  IconUser,
  IconSparkles,
  IconHelpCircle
} from '@tabler/icons-react';
import { SpeakerIcon, SPEAKER_COLORS, SpeakerStyleKey } from '@/components/ui/SpeakerIcons';

// --- DATA CONFIGURATION ---

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Talleres', href: '/#schedule' },
  { label: 'Contacto', href: '/#closing' },
];

interface SpeakerStyle {
  style: SpeakerStyleKey;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  development: string[];
  workshops: string[];
  icon: SpeakerStyleKey;
  color: string;
  synergy: string;
  friction: string;
  idealRole: string;
}

const speakerStyles: Record<SpeakerStyleKey, SpeakerStyle> = {
  ORADOR_CONECTOR: {
    style: "ORADOR_CONECTOR",
    name: "El Orador Conector",
    tagline: "Tu voz construye puentes",
    description: "Combinas empatía natural con creatividad. Tu audiencia se siente escuchada y comprendida.",
    strengths: ["Empatía situacional", "Creatividad metafórica", "Adaptabilidad social"],
    development: ["Preparación estructurada", "Delegación en equipos", "Auto-promoción"],
    workshops: ["Improvisación Estructurada", "Liderazgo en Equipos", "Presencia Escénica"],
    icon: "ORADOR_CONECTOR",
    color: "#05BFDB",
    synergy: "Orador Transformador (comparten creatividad y visión)",
    friction: "Orador Analítico (puede chocar tu enfoque intuitivo con su exceso de datos)",
    idealRole: "Facilitador de consensos y presentador de ideas creativas."
  },
  ORADOR_ESTRATEGA: {
    style: "ORADOR_ESTRATEGA",
    name: "El Orador Estratega",
    tagline: "La preparación es tu superpoder",
    description: "Eres meticuloso, estructurado y confiable. Tu discurso está siempre bien preparado y enfocado en objetivos claros.",
    strengths: ["Preparación exhaustiva", "Estructura lógica", "Calma bajo presión"],
    development: ["Improvisación rápida", "Conexión emocional", "Flexibilidad mental"],
    workshops: ["Improvisación Estructurada", "Storytelling Emocional", "Adaptabilidad"],
    icon: "ORADOR_ESTRATEGA",
    color: "#0A4D68",
    synergy: "Orador Analítico (ambos aprecian la precisión y estructura)",
    friction: "Orador Explorador (su falta de orden te puede causar fricción)",
    idealRole: "Planificador de discursos y expositor técnico/corporativo."
  },
  ORADOR_ENERGETICO: {
    style: "ORADOR_ENERGETICO",
    name: "El Orador Energético",
    tagline: "Tu energía enciende salas",
    description: "Carismático, improvisador y contagioso. Tu presencia llena cualquier espacio y despierta pasiones en la audiencia.",
    strengths: ["Carisma natural", "Improvisación", "Energía escénica"],
    development: ["Estructura rígida", "Escucha activa", "Preparación formal"],
    workshops: ["Estructura del Discurso", "Escucha Activa", "Preparación Estratégica"],
    icon: "ORADOR_ENERGETICO",
    color: "#F59E0B",
    synergy: "Orador Conector (ambos conectan fuertemente con las personas)",
    friction: "Orador Estratega (puede ver tu improvisación como falta de rigor)",
    idealRole: "Orador motivacional y presentador en vivo."
  },
  ORADOR_ANALITICO: {
    style: "ORADOR_ANALITICO",
    name: "El Orador Analítico",
    tagline: "La precisión convence",
    description: "Preciso, basado en datos y lógica impecable. Tu argumentación es sólida como una roca e irrefutable.",
    strengths: ["Precisión y rigor", "Datos y evidencia", "Lógica estructurada"],
    development: ["Storytelling", "Conexión emocional", "Presencia escénica"],
    workshops: ["Storytelling para Técnicos", "Conexión Emocional", "Presencia Escénica"],
    icon: "ORADOR_ANALITICO",
    color: "#64748B",
    synergy: "Orador Estratega (ambos construyen sobre bases sólidas)",
    friction: "Orador Conector (su enfoque intuitivo puede parecerte carente de evidencia)",
    idealRole: "Validador de datos, analista y expositor de informes críticos."
  },
  ORADOR_TRANSFORMADOR: {
    style: "ORADOR_TRANSFORMADOR",
    name: "El Orador Transformador",
    tagline: "Tu visión mueve montañas",
    description: "Visionario que inspira cambios profundos. Combinas una gran creatividad con una fuerte capacidad de liderazgo.",
    strengths: ["Visión estratégica", "Inspiración", "Liderazgo de impacto"],
    development: ["Detalles prácticos", "Escucha activa", "Paciencia con el proceso"],
    workshops: ["Ejecución Práctica", "Escucha Activa", "Gestión del Tiempo"],
    icon: "ORADOR_TRANSFORMADOR",
    color: "#EF4444",
    synergy: "Orador Guerrero (juntos pueden liderar y ejecutar grandes metas)",
    friction: "Orador Protector (su cautela puede frenar tu visión de cambio rápido)",
    idealRole: "Líder de proyectos de cambio, conferencista inspiracional."
  },
  ORADOR_PROTECTOR: {
    style: "ORADOR_PROTECTOR",
    name: "El Orador Protector",
    tagline: "Escuchas lo que otros no oyen",
    description: "Escucha activa y facilitador de entornos. Creas espacios seguros para que otros se sientan cómodos hablando.",
    strengths: ["Escucha activa", "Empatía profunda", "Facilitación de grupos"],
    development: ["Proyección de voz", "Toma de posición firme", "Visibilidad personal"],
    workshops: ["Proyección y Voz", "Toma de Posición", "Visibilidad Personal"],
    icon: "ORADOR_PROTECTOR",
    color: "#10B981",
    synergy: "Orador Conector (ambos priorizan el bienestar de la audiencia)",
    friction: "Orador Transformador (su empuje constante puede abrumar tu ritmo de seguridad)",
    idealRole: "Moderador, mediador de debates y facilitador de dinámicas grupales."
  },
  ORADOR_GUERRERO: {
    style: "ORADOR_GUERRERO",
    name: "El Orador Guerrero",
    tagline: "Determinación que persuade",
    description: "Determinado, persuasivo y directo. No te detienes hasta convencer y defender con pasión lo que crees.",
    strengths: ["Persuasión directa", "Determinación de hierro", "Directez"],
    development: ["Empatía activa", "Escucha reflexiva", "Suavidad al comunicar"],
    workshops: ["Empatía Persuasiva", "Escucha Activa", "Comunicación No Violenta"],
    icon: "ORADOR_GUERRERO",
    color: "#DC2626",
    synergy: "Orador Transformador (comparten la energía de cambiar e influir)",
    friction: "Orador Protector (puede chocar tu estilo confrontacional con su búsqueda de paz)",
    idealRole: "Vocero de causas difíciles, negociador y cerrador de propuestas."
  },
  ORADOR_EXPLORADOR: {
    style: "ORADOR_EXPLORADOR",
    name: "El Orador Explorador",
    tagline: "La creatividad es tu brújula",
    description: "Creativo, experimental y poco estructurado. Siempre buscas nuevas formas de expresarte y contar historias.",
    strengths: ["Creatividad disruptiva", "Originalidad", "Adaptabilidad"],
    development: ["Estructura discursiva", "Disciplina del tiempo", "Seguimiento riguroso"],
    workshops: ["Estructura Creativa", "Disciplina del Orador", "Seguimiento de Proyectos"],
    icon: "ORADOR_EXPLORADOR",
    color: "#8B5CF6",
    synergy: "Orador Conector (comparten la fluidez y la mente abierta)",
    friction: "Orador Estratega (te costará adaptarte a sus plantillas y límites rígidos)",
    idealRole: "Creador de contenido interactivo, brainstormer de discursos."
  }
};

const centroids = {
  ORADOR_CONECTOR: { O: 75, C: 55, E: 65, A: 85, N: 40 },
  ORADOR_ESTRATEGA: { O: 50, C: 85, E: 45, A: 60, N: 25 },
  ORADOR_ENERGETICO: { O: 75, C: 40, E: 85, A: 55, N: 45 },
  ORADOR_ANALITICO: { O: 55, C: 80, E: 35, A: 70, N: 30 },
  ORADOR_TRANSFORMADOR: { O: 80, C: 65, E: 75, A: 60, N: 35 },
  ORADOR_PROTECTOR: { O: 60, C: 55, E: 35, A: 85, N: 40 },
  ORADOR_GUERRERO: { O: 50, C: 80, E: 75, A: 45, N: 30 },
  ORADOR_EXPLORADOR: { O: 85, C: 35, E: 60, A: 55, N: 50 }
};

// --- INITIAL QUESTION STATES ---

interface QuestionBase {
  id: string;
  type: 'select' | 'likert' | 'text';
  title: string;
  reino: number;
}

interface SelectQuestion extends QuestionBase {
  type: 'select';
  options: { key: string; text: string }[];
}

interface LikertItem {
  id: string;
  text: string;
  lowLabel: string;
  highLabel: string;
}

interface LikertQuestion extends QuestionBase {
  type: 'likert';
  items: LikertItem[];
}

interface TextQuestion extends QuestionBase {
  type: 'text';
  placeholder: string;
  minWords: number;
}

type Question = SelectQuestion | LikertQuestion | TextQuestion;

const questions: Question[] = [
  // --- REINO 1: CONTEXTO ---
  {
    id: '1.1',
    reino: 1,
    type: 'select',
    title: '¿Cuál es tu nivel actual en oratoria pública?',
    options: [
      { key: 'A', text: 'Principiante: Me bloqueo al hablar frente a grupos' },
      { key: 'B', text: 'Intermedio: Hablo, pero me pongo nervioso' },
      { key: 'C', text: 'Avanzado: Hablo con confianza, quiero perfeccionar' },
      { key: 'D', text: 'Experto: Busco dominar técnicas avanzadas' },
    ]
  },
  // --- REINO 2: EL ESCENARIO ---
  {
    id: '2.1',
    reino: 2,
    type: 'select',
    title: 'Estás dando una presentación importante a 30 personas. De repente, el proyector deja de funcionar. La audiencia te mira. Tienes 10 segundos para reaccionar:',
    options: [
      { key: 'A', text: 'Improviso un chiste sobre la tecnología y sigo hablando' },
      { key: 'B', text: 'Pido ayuda calmadamente mientras mantengo contacto visual con la audiencia' },
      { key: 'C', text: 'Me disculpo brevemente y propongo continuar sin apoyos visuales' },
      { key: 'D', text: 'Hago una pausa, respiro hondo y retomo desde donde iba' },
      { key: 'E', text: 'Invito a la audiencia a una actividad corta o debate mientras lo arreglan' },
    ]
  },
  {
    id: '2.4',
    reino: 2,
    type: 'likert',
    title: 'Antes de hablar en público, ¿cómo te sientes TÍPICAMENTE?',
    items: [
      { id: 'a', text: 'Siento palpitaciones aceleradas o taquicardia', lowLabel: 'Nunca', highLabel: 'Casi siempre' },
      { id: 'b', text: 'Siento ganas repentinas de ir al baño', lowLabel: 'Nunca', highLabel: 'Casi siempre' },
      { id: 'c', text: 'Siento una excitación positiva, como antes de un gran juego', lowLabel: 'Nunca', highLabel: 'Casi siempre' },
      { id: 'd', text: 'Tengo pensamientos intrusivos del tipo "voy a fallar"', lowLabel: 'Nunca', highLabel: 'Casi siempre' },
      { id: 'e', text: 'Me siento enfocado, calmado y listo para hablar', lowLabel: 'Nunca', highLabel: 'Casi siempre' }
    ]
  },
  // --- REINO 3: EL LABORATORIO ---
  {
    id: '3.1',
    reino: 3,
    type: 'text',
    title: 'Si tu forma de comunicar fuera UN objeto, ¿cuál sería y por qué?',
    placeholder: 'Ejemplo: "Sería un puente, porque me gusta conectar ideas de un extremo a otro para que las personas crucen..."',
    minWords: 15
  },
  {
    id: '3.4',
    reino: 3,
    type: 'likert',
    title: 'Tu mentor te dice de improviso: "Olvida todo lo que te enseñé. Hoy vamos a probar algo completamente nuevo". ¿Cómo reaccionas?',
    items: [
      { id: 'a', text: 'Me emociona la posibilidad de descubrir algo mejor', lowLabel: 'Total desacuerdo', highLabel: 'Total acuerdo' },
      { id: 'b', text: 'Me incomoda bastante, prefiero seguir lo que ya sé que funciona', lowLabel: 'Total desacuerdo', highLabel: 'Total acuerdo' },
      { id: 'c', text: 'Le pregunto las razones del cambio antes de decidirme a probarlo', lowLabel: 'Total desacuerdo', highLabel: 'Total acuerdo' },
      { id: 'd', text: 'Acepto el reto, pero me aseguro de tener un plan B bajo la manga', lowLabel: 'Total desacuerdo', highLabel: 'Total acuerdo' }
    ]
  },
  // --- REINO 4: EL ESPEJO ---
  {
    id: '4.1',
    reino: 4,
    type: 'select',
    title: 'Un compañero de trabajo te confiesa: "Mañana tengo mi primera presentación importante frente a la gerencia y estoy aterrorizado". ¿Qué le respondes?',
    options: [
      { key: 'A', text: '"Tranquilo, a todos nos pasa la primera vez. ¿Quieres que dediquemos una hora a ensayar juntos?"' },
      { key: 'B', text: '"¿Cuánto has practicado? La clave de perder el miedo está únicamente en la preparación."' },
      { key: 'C', text: '"Imagina a todos los gerentes en ropa interior, eso siempre ayuda a quitarle seriedad."' },
      { key: 'D', text: '"¡Tú puedes! Confía en tu talento y tírate a la piscina sin pensar mucho."' },
      { key: 'E', text: '"Entiendo totalmente. Cuéntame, ¿qué parte en específico es la que más te asusta?"' },
    ]
  },
  {
    id: '4.4',
    reino: 4,
    type: 'likert',
    title: 'En medio de una conversación difícil o confrontación, ¿qué haces TÍPICAMENTE?',
    items: [
      { id: 'a', text: 'Escucho con atención hasta el final antes de formular mi respuesta', lowLabel: 'Nunca', highLabel: 'Siempre' },
      { id: 'b', text: 'Interrumpo al otro para dar mi opinión y corregir sus imprecisiones', lowLabel: 'Nunca', highLabel: 'Siempre' },
      { id: 'c', text: 'Pregunto activamente cómo se siente la otra persona respecto al tema', lowLabel: 'Nunca', highLabel: 'Siempre' },
      { id: 'd', text: 'Busco resolver el problema práctico rápidamente, restándole peso al drama emocional', lowLabel: 'Nunca', highLabel: 'Siempre' },
      { id: 'e', text: 'Trato de ponerme sinceramente en el lugar de la otra persona antes de juzgarla', lowLabel: 'Nunca', highLabel: 'Siempre' }
    ]
  }
];

const RESULTS_STEP = questions.length + 1;

export default function TestPage() {
  const [step, setStep] = useState(0); // 0 = Welcome, 1..7 = Questions, 8 = Results
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [likertState, setLikertState] = useState<Record<string, number>>({});
  const [textVal, setTextVal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState('');
  const [isTransitioningStep, setIsTransitioningStep] = useState(false);

  // Results details
  const [scores, setScores] = useState({ O: 50, C: 50, E: 50, A: 50, N: 50 });
  const [speakerStyle, setSpeakerStyle] = useState<SpeakerStyle | null>(null);
  
  // Email capture unlock
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Scroll to top on step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleStart = () => {
    setStep(1);
    setIsTransitioningStep(false);
  };

  const handleSelectAnswer = (optionKey: string) => {
    if (isTransitioningStep) return;
    const q = questions[step - 1];
    if (!q) return;

    setIsTransitioningStep(true);
    setAnswers((prev) => ({ ...prev, [q.id]: optionKey }));

    // Auto advance select questions
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsTransitioningStep(false);
    }, 250);
  };

  const handleLikertChange = (itemId: string, val: number) => {
    setLikertState((prev) => ({ ...prev, [itemId]: val }));
  };

  const handleLikertSubmit = () => {
    if (isTransitioningStep) return;
    const q = questions[step - 1] as LikertQuestion;
    if (!q) return;
    
    setIsTransitioningStep(true);
    // Save answers
    const currentQAnswers: Record<string, number> = {};
    q.items.forEach((item) => {
      currentQAnswers[item.id] = likertState[item.id] || 3; // Default to neutral if somehow unclicked
    });

    setAnswers((prev) => ({ ...prev, [q.id]: currentQAnswers }));
    
    // Reset temporary state for next questions
    setLikertState({});
    setStep((prev) => prev + 1);
    
    setTimeout(() => {
      setIsTransitioningStep(false);
    }, 300);
  };

  const handleTextSubmit = () => {
    if (isTransitioningStep) return;
    const q = questions[step - 1] as TextQuestion;
    if (!q) return;

    setIsTransitioningStep(true);
    setAnswers((prev) => ({ ...prev, [q.id]: textVal }));

    // Start AI loading animation
    setIsAnalyzing(true);
    setAnalysisProgress(0);
  };

  // Simulated AI Metaphor analysis progress
  useEffect(() => {
    if (!isAnalyzing) return;

    const phrases = [
      'Extrayendo tu respuesta...',
      'Buscando patrones y metáforas comunicacionales...',
      'Evaluando nivel de creatividad y abstracción mental...',
      'Mapeando nivel de detalle y coherencia discursiva...',
      'Generando coeficientes de Apertura y Responsabilidad...',
      '¡Listo! Perfil del Laboratorio consolidado.',
    ];

    let currentPhase = 0;
    setAnalysisText(phrases[0]);

    const timer = setInterval(() => {
      setAnalysisProgress((prev) => {
        const next = prev + 1.2;
        
        // Change text based on progress
        const phaseIndex = Math.min(phrases.length - 1, Math.floor((next / 100) * phrases.length));
        if (phaseIndex !== currentPhase) {
          currentPhase = phaseIndex;
          setAnalysisText(phrases[phaseIndex]);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsAnalyzing(false);
            setStep((prev) => prev + 1);
            setIsTransitioningStep(false);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [isAnalyzing]);

  // Scoring and Classification Logic
  const calculateResults = () => {
    // 1. EXTRAVERSION (E)
    let e_points = 0;
    const p21 = answers['2.1'];
    if (p21 === 'A' || p21 === 'E') e_points += 35;
    else if (p21 === 'B') e_points += 20;
    else if (p21 === 'C') e_points += 15;
    else if (p21 === 'D') e_points += 10;
    else e_points += 20; // Default fallback

    const p24 = answers['2.4'] || { a: 3, b: 3, c: 3, d: 3, e: 3 };
    e_points += (p24.c || 3) * 7;

    const p44 = answers['4.4'] || { a: 3, b: 3, c: 3, d: 3, e: 3 };
    e_points += (p44.b || 3) * 6;
    const E_percent = Math.max(10, Math.min(100, Math.round(e_points)));

    // 2. NEUROTICISMO (N)
    let n_points = 0;
    n_points += (p24.a || 3) * 6;
    n_points += (p24.b || 3) * 4;
    n_points += (p24.d || 3) * 6;
    n_points += (6 - (p24.e || 3)) * 4;
    const N_percent = Math.max(10, Math.min(100, Math.round(n_points)));

    // 3. APERTURA (O)
    const metaphorText = answers['3.1'] || '';
    const wordCount = metaphorText.split(/\s+/).filter(Boolean).length;
    let o_points = 10;
    if (wordCount >= 25) o_points = 30;
    else if (wordCount >= 18) o_points = 20;

    const p34 = answers['3.4'] || { a: 3, b: 3, c: 3, d: 3 };
    o_points += (p34.a || 3) * 8;
    o_points += (6 - (p34.b || 3)) * 6;
    const O_percent = Math.max(10, Math.min(100, Math.round(o_points)));

    // 4. RESPONSABILIDAD (C)
    let c_points = 10;
    if (wordCount >= 25) c_points = 30;
    else if (wordCount >= 18) c_points = 20;

    c_points += (p34.c || 3) * 6;
    c_points += (p34.d || 3) * 8;
    const C_percent = Math.max(10, Math.min(100, Math.round(c_points)));

    // 5. AMABILIDAD (A)
    let a_points = 0;
    const p41 = answers['4.1'];
    if (p41 === 'A' || p41 === 'E') a_points += 30;
    else if (p41 === 'D') a_points += 15;
    else if (p41 === 'C') a_points += 10;
    else if (p41 === 'B') a_points += 5;
    else a_points += 20; // Default fallback

    a_points += (p44.a || 3) * 7;
    a_points += (p44.e || 3) * 7;
    const A_percent = Math.max(10, Math.min(100, Math.round(a_points)));

    // Final consolidated scores
    const calculatedScores = {
      O: O_percent,
      C: C_percent,
      E: E_percent,
      A: A_percent,
      N: N_percent
    };

    setScores(calculatedScores);

    // Classification Algorithm
    const THRESHOLD = 60;
    const O = O_percent;
    const C = C_percent;
    const E = E_percent;
    const A = A_percent;
    const N = N_percent;

    let matchedStyle: SpeakerStyleKey | null = null;

    // Check thresholds in order of specificity
    if (A >= THRESHOLD && O >= THRESHOLD && E >= THRESHOLD * 0.8) {
      matchedStyle = 'ORADOR_CONECTOR';
    } else if (C >= THRESHOLD && N <= (100 - THRESHOLD) && E <= THRESHOLD) {
      matchedStyle = 'ORADOR_ESTRATEGA';
    } else if (E >= THRESHOLD && O >= THRESHOLD && C <= THRESHOLD) {
      matchedStyle = 'ORADOR_ENERGETICO';
    } else if (C >= THRESHOLD && E <= (100 - THRESHOLD) && A >= THRESHOLD * 0.7) {
      matchedStyle = 'ORADOR_ANALITICO';
    } else if (O >= THRESHOLD && E >= THRESHOLD && C >= THRESHOLD * 0.7) {
      matchedStyle = 'ORADOR_TRANSFORMADOR';
    } else if (A >= THRESHOLD && E <= (100 - THRESHOLD) && O >= THRESHOLD * 0.6) {
      matchedStyle = 'ORADOR_PROTECTOR';
    } else if (C >= THRESHOLD && E >= THRESHOLD && A <= THRESHOLD * 0.8) {
      matchedStyle = 'ORADOR_GUERRERO';
    } else if (O >= THRESHOLD && C <= (100 - THRESHOLD)) {
      matchedStyle = 'ORADOR_EXPLORADOR';
    }

    // Fallback: Closest Centroid
    if (!matchedStyle) {
      let minDistance = Infinity;
      let closestKey: SpeakerStyleKey = 'ORADOR_CONECTOR';

      Object.entries(centroids).forEach(([key, centroid]) => {
        const dist = Math.sqrt(
          Math.pow(O - centroid.O, 2) +
          Math.pow(C - centroid.C, 2) +
          Math.pow(E - centroid.E, 2) +
          Math.pow(A - centroid.A, 2) +
          Math.pow(N - centroid.N, 2)
        );
        if (dist < minDistance) {
          minDistance = dist;
          closestKey = key as SpeakerStyleKey;
        }
      });
      matchedStyle = closestKey;
    }

    setSpeakerStyle(speakerStyles[matchedStyle]);
    setStep(RESULTS_STEP); // Proceed to results step
  };

  // Trigger calculation when step hits RESULTS_STEP
  useEffect(() => {
    if (step === RESULTS_STEP) {
      calculateResults();
    }
  }, [step]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmittingEmail(true);

    // Simulate database saving and unlock action
    setTimeout(() => {
      setIsSubmittingEmail(false);
      setIsUnlocked(true);
    }, 1800);
  };

  const handleReset = () => {
    setAnswers({});
    setLikertState({});
    setTextVal('');
    setIsUnlocked(false);
    setName('');
    setEmail('');
    setStep(0);
  };

  // Helper info for Likert Progress
  const isLikertComplete = () => {
    const q = questions[step - 1];
    if (q && q.type === 'likert') {
      return q.items.every((item) => likertState[item.id] !== undefined);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] text-mogran-secondary flex flex-col font-sans antialiased">
      {/* Header / Navbar */}
      <header className="w-full bg-[#F4F1E8]/95 border-b border-mogran-secondary/5 py-4 px-6 md:px-12 backdrop-blur-md z-30 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/images/logo/logo-dark.svg" alt="Talleres Mogran" className="h-8 md:h-9 w-auto" />
          </a>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm font-semibold hover:text-mogran-primary transition-colors py-1 px-2 text-mogran-secondary/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-mogran-secondary/5 border border-mogran-secondary/5 overflow-hidden">
          
          {/* Progress Bar (Visible inside wizard steps 1 to questions.length) */}
          {step > 0 && step < RESULTS_STEP && (
            <div className="bg-mogran-bone/30 px-6 pt-6 pb-2 border-b border-mogran-secondary/5">
              <div className="flex justify-between items-center text-xs font-semibold text-mogran-secondary/55 mb-2">
                <span>REINO {questions[step - 1].reino} de 4</span>
                <span>Progreso: {Math.round(((step - 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-mogran-secondary/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((step - 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-mogran-primary"
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* --- REINO 0: BIENVENIDA --- */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-mogran-primary-subtle text-mogran-primary flex items-center justify-center mb-6">
                  <IconSparkles size={24} />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-mogran-secondary tracking-tight mb-2">
                  BIENVENIDO AL UNIVERSO MOGRAN
                </h1>
                <p className="text-base md:text-lg italic font-medium text-mogran-primary/95 mb-6">
                  "Aquí los oradores no nacen, se descubren."
                </p>
                <div className="text-sm md:text-base text-mogran-neutral/80 max-w-md mb-8 flex flex-col gap-3">
                  <p>
                    Atravesarás <strong>5 reinos</strong> interactivos basados en situaciones reales de oratoria, creatividad y conexiones sociales.
                  </p>
                  <p>
                    Al final de este viaje, revelaremos tu <strong>Estilo de Orador único</strong> clasificado científicamente en base al modelo Big Five (OCEAN).
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-mogran-primary hover:bg-mogran-primary-hover text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg shadow-mogran-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                  COMENZAR EL VIAJE
                  <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <div className="grid grid-cols-3 gap-4 border-t border-mogran-secondary/5 mt-10 pt-6 w-full text-left max-w-md">
                  <div className="flex flex-col">
                    <span className="text-xs text-mogran-secondary/55">⏱️ Duración</span>
                    <span className="text-xs font-bold mt-0.5">1-2 minutos</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-mogran-secondary/55">🎯 Preguntas</span>
                    <span className="text-xs font-bold mt-0.5">7 Escenarios</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-mogran-secondary/55">🧬 Ciencia</span>
                    <span className="text-xs font-bold mt-0.5">Big Five (OCEAN)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- QUESTIONS WIZARD (1 to questions.length) --- */}
            {step > 0 && step < RESULTS_STEP && !isAnalyzing && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-mogran-primary mb-1">
                  Reino {questions[step - 1].reino}: {
                    questions[step - 1].reino === 1 ? 'Contexto' :
                    questions[step - 1].reino === 2 ? 'El Escenario' :
                    questions[step - 1].reino === 3 ? 'El Laboratorio' : 'El Espejo'
                  }
                </div>
                <h2 className="text-lg md:text-xl font-bold text-mogran-secondary mb-6 leading-tight">
                  {questions[step - 1].title}
                </h2>

                {/* Question Type: Select */}
                {questions[step - 1].type === 'select' && (
                  <div className="flex flex-col gap-3">
                    {(questions[step - 1] as SelectQuestion).options.map((option) => {
                      const isSelected = answers[questions[step - 1].id] === option.key;
                      return (
                        <button
                          key={option.key}
                          onClick={() => handleSelectAnswer(option.key)}
                          className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-mogran-primary bg-mogran-primary-subtle/40 text-mogran-secondary shadow-sm'
                              : 'border-mogran-secondary/10 hover:border-mogran-primary/30 hover:bg-mogran-bone/10 text-mogran-neutral/80'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                            isSelected ? 'bg-mogran-primary text-white' : 'bg-mogran-secondary/5 text-mogran-secondary/50'
                          }`}>
                            {option.key}
                          </span>
                          <span>{option.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Question Type: Likert */}
                {questions[step - 1].type === 'likert' && (
                  <div className="flex flex-col gap-6">
                    {(questions[step - 1] as LikertQuestion).items.map((item) => (
                      <div key={item.id} className="flex flex-col border-b border-mogran-secondary/5 pb-4 last:border-0 last:pb-0">
                        <p className="text-sm font-semibold mb-3 text-mogran-neutral/90">
                          {item.text}
                        </p>
                        <div className="flex items-center justify-between gap-1.5 md:gap-3">
                          <span className="text-[10px] md:text-xs text-mogran-secondary/50 max-w-[80px] text-right font-medium">
                            {item.lowLabel}
                          </span>
                          <div className="flex gap-1.5 md:gap-2.5">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = likertState[item.id] === val;
                              return (
                                <button
                                  key={val}
                                  onClick={() => handleLikertChange(item.id, val)}
                                  className={`w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center font-bold text-sm transition-all ${
                                    isSelected
                                      ? 'bg-mogran-primary border-mogran-primary text-white shadow-md shadow-mogran-primary/15'
                                      : 'border-mogran-secondary/15 hover:border-mogran-primary/30 text-mogran-secondary bg-white'
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-[10px] md:text-xs text-mogran-secondary/50 max-w-[80px] text-left font-medium">
                            {item.highLabel}
                          </span>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleLikertSubmit}
                      disabled={!isLikertComplete()}
                      className="w-full py-3 bg-mogran-secondary disabled:bg-mogran-secondary/15 disabled:cursor-not-allowed hover:bg-mogran-secondary/95 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2"
                    >
                      Continuar
                      <IconArrowRight size={18} />
                    </button>
                  </div>
                )}

                {/* Question Type: Text (Metaphor) */}
                {questions[step - 1].type === 'text' && (
                  <div className="flex flex-col gap-4">
                    <textarea
                      value={textVal}
                      onChange={(e) => setTextVal(e.target.value)}
                      placeholder={(questions[step - 1] as TextQuestion).placeholder}
                      rows={5}
                      className="w-full p-4 rounded-xl border border-mogran-secondary/15 focus:outline-none focus:border-mogran-primary bg-white text-sm font-medium text-mogran-neutral resize-none"
                    />
                    <div className="flex justify-between items-center text-xs text-mogran-secondary/50 font-medium">
                      <span>Mínimo 15 palabras requeridas</span>
                      <span className={textVal.split(/\s+/).filter(Boolean).length >= 15 ? 'text-mogran-primary font-bold' : ''}>
                        Palabras: {textVal.split(/\s+/).filter(Boolean).length}
                      </span>
                    </div>

                    <button
                      onClick={handleTextSubmit}
                      disabled={textVal.split(/\s+/).filter(Boolean).length < (questions[step - 1] as TextQuestion).minWords}
                      className="w-full py-3 bg-mogran-primary disabled:bg-mogran-secondary/15 disabled:cursor-not-allowed hover:bg-mogran-primary-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2"
                    >
                      Enviar respuesta
                      <IconSparkles size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* --- SCANNING LOADING STATE (REINO 3 INTRO) --- */}
            {isAnalyzing && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-full bg-mogran-primary/5 flex items-center justify-center relative mb-6">
                  <IconSparkles size={32} className="text-mogran-primary animate-pulse" />
                  <div className="absolute inset-0 border-2 border-mogran-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-lg font-bold text-mogran-secondary mb-2">
                  Análisis Inteligente de Metáfora
                </h3>
                <p className="text-sm text-mogran-neutral/80 max-w-sm mb-6 h-10 flex items-center justify-center">
                  {analysisText}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full max-w-xs h-2 bg-mogran-secondary/5 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-mogran-primary transition-all duration-300 ease-out"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* --- REINO 5: RESULTADO PANTALLA --- */}
            {step === RESULTS_STEP && speakerStyle && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-8 flex flex-col"
              >
                {/* Result Title */}
                <div className="flex flex-col items-center text-center border-b border-mogran-secondary/5 pb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mogran-primary mb-1">
                    ¡CUESTIONARIO COMPLETADO!
                  </span>
                  <h1 className="text-xl font-bold text-mogran-secondary mb-5">
                    TU ESTILO DE ORADOR DETECTADO:
                  </h1>

                  {/* Icon Card */}
                  <div
                    className="flex flex-col items-center p-6 rounded-2xl border-2 mb-4 w-52 relative overflow-hidden"
                    style={{
                      borderColor: speakerStyle.color,
                      backgroundColor: `${speakerStyle.color}05`,
                    }}
                  >
                    <SpeakerIcon styleKey={speakerStyle.style} size={56} className="mb-3" />
                    <span
                      className="text-xs uppercase font-extrabold tracking-wide"
                      style={{ color: speakerStyle.color }}
                    >
                      {speakerStyle.name}
                    </span>
                  </div>

                  <p className="text-base md:text-lg italic font-bold text-mogran-secondary">
                    "{speakerStyle.tagline}"
                  </p>
                  <p className="text-sm text-mogran-neutral/80 max-w-md mt-2">
                    {speakerStyle.description}
                  </p>
                </div>

                {/* Grid 3 Strengths */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-mogran-secondary/55 mb-3">
                    Tus 3 Fortalezas Clave:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {speakerStyle.strengths.map((str, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-mogran-secondary/[0.03] border border-mogran-secondary/5 rounded-xl">
                        <span className="w-5 h-5 rounded-full bg-mogran-primary-subtle text-mogran-primary flex items-center justify-center flex-shrink-0">
                          <IconCheck size={12} strokeWidth={3} />
                        </span>
                        <span className="text-xs font-semibold text-mogran-secondary/90 leading-tight">
                          {str}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dimensional Profile (Percentages) */}
                <div className="mt-8 border-t border-mogran-secondary/5 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-mogran-secondary/55 mb-4">
                    Tu Perfil Dimensional (Big Five):
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {[
                      { label: 'Apertura (O)', val: scores.O, desc: 'Creatividad y curiosidad' },
                      { label: 'Responsabilidad (C)', val: scores.C, desc: 'Estructura y detalle' },
                      { label: 'Extraversión (E)', val: scores.E, desc: 'Energía y sociabilidad' },
                      { label: 'Amabilidad (A)', val: scores.A, desc: 'Empatía y colaboración' },
                      { label: 'Neuroticismo (N)', val: scores.N, desc: 'Sensibilidad al estrés' }
                    ].map((dim, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-mogran-secondary/90">{dim.label}</span>
                          <span className="text-xs font-semibold text-mogran-secondary/50">{dim.desc}</span>
                          <span className="font-extrabold text-mogran-primary">{dim.val}%</span>
                        </div>
                        <div className="w-full h-2 bg-mogran-secondary/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dim.val}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * i }}
                            className="h-full bg-mogran-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locked / Unlocked Content via Email Capture */}
                <div className="mt-8 border-t border-mogran-secondary/5 pt-6">
                  <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-mogran-secondary text-white rounded-2xl p-6 relative overflow-hidden"
                      >
                        {/* Dot Grid Pattern */}
                        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <IconLock size={28} className="text-mogran-primary mb-3" />
                          <h3 className="text-base md:text-lg font-bold mb-1">
                            Desbloquea tu plan completo gratis
                          </h3>
                          <p className="text-xs text-white/70 max-w-sm mb-5 leading-normal">
                            Ingresa tu email para desbloquear tus Áreas de Desarrollo, Talleres Recomendados y niveles de Compatibilidad.
                          </p>

                          <form onSubmit={handleUnlockSubmit} className="w-full max-w-md flex flex-col gap-3">
                            <div className="relative">
                              <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                              <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Tu Nombre"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-mogran-primary text-xs md:text-sm text-white placeholder-white/40 font-medium"
                              />
                            </div>
                            <div className="relative">
                              <IconMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Tu Correo Electrónico"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-mogran-primary text-xs md:text-sm text-white placeholder-white/40 font-medium"
                              />
                            </div>
                            
                            <button
                              type="submit"
                              disabled={isSubmittingEmail}
                              className="w-full py-2.5 bg-mogran-primary hover:bg-mogran-primary-hover text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-md shadow-mogran-primary/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
                            >
                              {isSubmittingEmail ? 'Guardando...' : 'DESBLOQUEAR GRATIS'}
                              {!isSubmittingEmail && <IconArrowRight size={16} />}
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unlocked"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-6"
                      >
                        {/* Thank you note */}
                        <div className="bg-mogran-primary/5 border border-mogran-primary/20 rounded-2xl p-4 flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-mogran-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <IconCheck size={14} />
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-mogran-secondary">
                              ¡Perfil desbloqueado con éxito, {name}!
                            </h4>
                            <p className="text-[11px] text-mogran-neutral/80 mt-0.5">
                              Hemos enviado tu reporte detallado a <strong>{email}</strong> con ejercicios de desarrollo de 10 minutos.
                            </p>
                          </div>
                        </div>

                        {/* Development areas */}
                        <div className="bg-mogran-bone/30 border border-mogran-secondary/5 rounded-2xl p-5">
                          <h4 className="text-xs font-extrabold uppercase tracking-wide text-mogran-secondary/60 mb-2.5">
                            Mis Áreas de Desarrollo a Trabajar:
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {speakerStyle.development.map((dev, i) => (
                              <li key={i} className="text-xs text-mogran-neutral/90 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-mogran-primary" />
                                {dev}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Recommended workshops */}
                        <div className="bg-mogran-bone/30 border border-mogran-secondary/5 rounded-2xl p-5">
                          <h4 className="text-xs font-extrabold uppercase tracking-wide text-mogran-secondary/60 mb-2.5">
                            Talleres Mogran Recomendados para Ti:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {speakerStyle.workshops.map((wk, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white text-mogran-secondary border border-mogran-secondary/10"
                              >
                                Taller de {wk}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 border-t border-mogran-secondary/5 pt-3.5 flex flex-col items-center">
                            <a
                              href="/#schedule"
                              className="text-xs font-bold text-white bg-mogran-primary hover:bg-mogran-primary-hover px-5 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              Ver Horarios y Matricularse
                              <IconArrowRight size={14} />
                            </a>
                          </div>
                        </div>

                        {/* Compatibility */}
                        <div className="bg-mogran-bone/30 border border-mogran-secondary/5 rounded-2xl p-5">
                          <h4 className="text-xs font-extrabold uppercase tracking-wide text-mogran-secondary/60 mb-3">
                            Compatibilidad Escénica:
                          </h4>
                          <div className="flex flex-col gap-2.5 text-xs">
                            <p>
                              <strong>Sinergia con:</strong> {speakerStyle.synergy}
                            </p>
                            <p>
                              <strong>Fricción con:</strong> {speakerStyle.friction}
                            </p>
                            <p>
                              <strong>Rol Ideal en Equipos:</strong> {speakerStyle.idealRole}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom actions */}
                <div className="mt-8 border-t border-mogran-secondary/5 pt-6 flex justify-between gap-4">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-bold text-mogran-secondary/60 hover:text-mogran-primary transition-colors focus:outline-none"
                  >
                    <IconRefresh size={16} />
                    Hacer de nuevo
                  </button>
                  <a
                    href="/"
                    className="text-xs font-bold text-mogran-primary hover:underline focus:outline-none"
                  >
                    Volver al Inicio
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#14213D] text-white/50 text-xs py-6 px-4 text-center mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Talleres Mogran. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="/#hero" className="hover:text-white transition-colors">Inicio</a>
            <a href="/#closing" className="hover:text-white transition-colors">FAQ</a>
            <a href="https://www.tiktok.com/@profesormoises" target="_blank" rel="noopener noreferrer" className="hover:text-mogran-primary transition-colors">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
