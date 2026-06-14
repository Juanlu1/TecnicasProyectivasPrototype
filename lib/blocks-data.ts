export interface Phrase {
  id: string
  text: string
}

export interface Block {
  id: string
  title: string
  subtitle: string
  hue: number
  phrases: Phrase[]
}

// Color de acento por bloque (oklch, misma luminosidad/croma que usa la
// paleta base, solo varía el matiz). Mantiene la identidad visual general
// mientras da a cada bloque un color propio para las tarjetas y el stepper.
export function getBlockColor(hue: number, alpha?: number): string {
  return alpha !== undefined
    ? `oklch(0.5 0.1 ${hue} / ${alpha})`
    : `oklch(0.5 0.1 ${hue})`
}

// Los mismos 65 ítems del test de frases incompletas original, agrupados en 8
// bloques temáticos. El orden de los bloques se reorganizó respecto de la
// tabla "tal cual" para arrancar con un bloque de baja carga (Estudio) y
// dejar los más sensibles (Temores, Yo y los demás) en el medio del
// recorrido, cerrando con un bloque más liviano (Futuro y aspiraciones).
export const BLOCKS: Block[] = [
  {
    id: 'estudio',
    hue: 260,
    title: 'Estudio y universidad',
    subtitle: 'Proyección académica',
    phrases: [
      { id: 'q01', text: 'Acceder a la universidad hoy...' },
      { id: 'q02', text: 'Las chicas/os que estudian...' },
      { id: 'q03', text: 'Sin un título...' },
      { id: 'q04', text: 'Las carreras largas...' },
      { id: 'q05', text: 'Estudiar en grupo...' },
      { id: 'q06', text: 'Hacer cursos fuera de la universidad...' },
      { id: 'q07', text: 'Terminar una carrera...' },
      { id: 'q08', text: 'Hacerse de amigos en la universidad...' },
      { id: 'q09', text: 'Hacer una carrera corta...' },
      { id: 'q10', text: 'Presentarme a un examen...' },
      { id: 'q11', text: 'Si no estudiara sería...' },
    ],
  },
  {
    id: 'trabajo',
    hue: 226,
    title: 'Trabajo y valores laborales',
    subtitle: 'Valores y motivaciones laborales',
    phrases: [
      { id: 'q12', text: 'Para trabajar es importante...' },
      { id: 'q13', text: 'Conseguir trabajo hoy...' },
      { id: 'q14', text: 'Sin un trabajo...' },
      { id: 'q15', text: 'Si quiero tener una buena posición económica...' },
      { id: 'q16', text: 'Las mujeres que trabajan...' },
      { id: 'q17', text: 'Lo que más me atrae de un trabajo es...' },
      { id: 'q18', text: 'En esta sociedad, más vale la pena ganar plata que...' },
      { id: 'q19', text: 'La mayor satisfacción en un trabajo es...' },
      { id: 'q20', text: 'El problema con la mayor parte de los trabajos es...' },
      { id: 'q21', text: 'El deseo más grande de un profesional es...' },
      { id: 'q22', text: 'Una profesión brinda la oportunidad para...' },
      { id: 'q23', text: 'Lo que más quiero de un trabajo es...' },
      { id: 'q24', text: 'Lo que más me disgusta de un trabajo es...' },
    ],
  },
  {
    id: 'decisiones',
    hue: 191,
    title: 'Decisiones',
    subtitle: 'Estilo y dificultad de decisión',
    phrases: [
      { id: 'q25', text: 'Si se me presenta una dificultad...' },
      { id: 'q26', text: 'Elegir...' },
      { id: 'q27', text: 'Para organizar mejor mi tiempo...' },
      { id: 'q28', text: 'Para elegir hago ta-te-ti...' },
      { id: 'q29', text: 'Rara vez tomo una decisión importante sin consultar con alguien...' },
      { id: 'q30', text: 'Me resulta difícil...' },
      { id: 'q31', text: 'Cuando dudo entre dos cosas...' },
      { id: 'q32', text: 'Antes de hacer algo importante pienso...' },
      { id: 'q33', text: 'Es difícil elegir una profesión cuando...' },
      { id: 'q34', text: 'Cuando tengo que tomar una decisión me resulta tan difícil que...' },
      { id: 'q35', text: 'Lo difícil de tomar una decisión es...' },
      { id: 'q36', text: 'Puedo intentar un cambio pero...' },
    ],
  },
  {
    id: 'familia',
    hue: 157,
    title: 'Familia, casa y mandatos',
    subtitle: 'Mandatos y expectativas',
    phrases: [
      { id: 'q37', text: 'En mi casa...' },
      { id: 'q38', text: 'Si tengo que mantener una familia...' },
      { id: 'q39', text: 'Cuando tenga hijos...' },
      { id: 'q40', text: 'Mis padres quisieran que yo...' },
      { id: 'q41', text: 'No tener hijos...' },
    ],
  },
  {
    id: 'temores',
    hue: 123,
    title: 'Temores y ansiedades',
    subtitle: 'Temores',
    phrases: [
      { id: 'q42', text: 'A veces me da miedo...' },
      { id: 'q43', text: 'Me da miedo equivocarme...' },
      { id: 'q44', text: 'Pensar en el futuro me asusta muchísimo...' },
      { id: 'q45', text: 'Lo que más me pone nerviosa/o es...' },
      { id: 'q46', text: 'Lo que más me preocupa es...' },
      { id: 'q47', text: 'Necesito que me entiendan...' },
    ],
  },
  {
    id: 'yo',
    hue: 89,
    title: 'Yo y los demás',
    subtitle: 'Autoconcepto',
    phrases: [
      { id: 'q48', text: 'La sociedad espera que una/o sea una persona...' },
      { id: 'q49', text: 'Yo soy...' },
      { id: 'q50', text: 'Los demás...' },
    ],
  },
  {
    id: 'autoridad',
    hue: 54,
    title: 'Autoridad',
    subtitle: 'Relación con la autoridad',
    phrases: [
      { id: 'q51', text: 'Mis profesores piensan que yo...' },
      { id: 'q52', text: 'Una persona adulta...' },
      { id: 'q53', text: 'Siento que los adultos que tienen autoridad sobre mí (profes, directivos) a veces son...' },
      { id: 'q54', text: 'Cuando se me acerca un profe o alguien que manda, yo...' },
      { id: 'q55', text: 'Las personas con autoridad me inspiran...' },
    ],
  },
  {
    id: 'futuro',
    hue: 20,
    title: 'Futuro y aspiraciones',
    subtitle: 'Aspiraciones y proyección',
    phrases: [
      { id: 'q56', text: 'Siempre me gustó...' },
      { id: 'q57', text: 'El año que viene...' },
      { id: 'q58', text: 'Si yo pudiera...' },
      { id: 'q59', text: 'Dentro de diez años...' },
      { id: 'q60', text: 'Si yo fuera rica/o podría...' },
      { id: 'q61', text: 'En la vida, lo más importante es...' },
      { id: 'q62', text: 'En la vida quiero llegar a ser...' },
      { id: 'q63', text: 'Siempre quise viajar por...' },
      { id: 'q64', text: 'Cuando sea mayor podré...' },
    ],
  },
]

export const TOTAL_PHRASES = BLOCKS.reduce((acc, b) => acc + b.phrases.length, 0)

// Reparte las frases de un bloque en páginas de 3 o 4 ítems, lo más parejas
// posible, para que cada pantalla muestre "unas pocas" frases por vez.
export function paginateBlock(phrases: Phrase[], maxPerPage = 4): Phrase[][] {
  const n = Math.max(1, Math.ceil(phrases.length / maxPerPage))
  const base = Math.floor(phrases.length / n)
  const remainder = phrases.length % n
  const pages: Phrase[][] = []
  let cursor = 0
  for (let i = 0; i < n; i++) {
    const size = base + (i < remainder ? 1 : 0)
    pages.push(phrases.slice(cursor, cursor + size))
    cursor += size
  }
  return pages
}

export interface Screen {
  blockIndex: number
  pageIndex: number
  pageCount: number
  phrases: Phrase[]
}

// Aplana una lista de bloques (ya reordenados/randomizados) en una lista
// lineal de "pantallas" (páginas) de 3-4 frases cada una.
export function buildScreens(blocks: Block[]): Screen[] {
  return blocks.flatMap((block, blockIndex) => {
    const pages = paginateBlock(block.phrases)
    return pages.map((phrases, pageIndex) => ({
      blockIndex,
      pageIndex,
      pageCount: pages.length,
      phrases,
    }))
  })
}
