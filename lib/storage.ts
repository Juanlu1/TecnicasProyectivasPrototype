import { BLOCKS, type Block, type Phrase } from './blocks-data'

const STORAGE_KEY = 'tp-frases-incompletas-v1'

export interface UserInfo {
  nombre: string
  edad: string
  email: string
}

export interface PersistedState {
  userInfo: UserInfo
  answers: Record<string, string>
  order: Record<string, string[]>
  screenIndex: number
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function createInitialState(userInfo: UserInfo): PersistedState {
  const order: Record<string, string[]> = {}
  for (const block of BLOCKS) {
    order[block.id] = shuffle(block.phrases.map(p => p.id)).map(id => id)
  }
  return { userInfo, answers: {}, order, screenIndex: 0 }
}

export function loadState(): PersistedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedState
    if (!parsed.answers || !parsed.order || !parsed.userInfo) return null
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: PersistedState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

// Reordena las frases de cada bloque según el orden persistido (randomizado
// una vez al iniciar el test, y conservado para no reordenar al volver).
export function applyOrder(order: Record<string, string[]>): Block[] {
  return BLOCKS.map(block => {
    const ids = order[block.id]
    if (!ids) return block
    const byId = new Map(block.phrases.map(p => [p.id, p]))
    const phrases: Phrase[] = ids.map(id => byId.get(id)!).filter(Boolean)
    return { ...block, phrases }
  })
}
