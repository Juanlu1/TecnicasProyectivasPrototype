"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { IntroScreen } from "./intro-screen"
import { PhrasePage } from "./phrase-page"
import { Header } from "./header"
import { ThankYouOverlay } from "./thank-you-overlay"
import { BLOCKS, TOTAL_PHRASES, buildScreens } from "@/lib/blocks-data"
import {
  applyOrder,
  createInitialState,
  loadState,
  saveState,
  type PersistedState,
  type UserInfo,
} from "@/lib/storage"

type Phase = "intro" | "test"

export function ProyectivasModule() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [state, setState] = useState<PersistedState | null>(null)
  const [showThanks, setShowThanks] = useState(false)
  const [thanksDismissed, setThanksDismissed] = useState(false)

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      setState(saved)
      setPhase("test")
    }
  }, [])

  const blocks = useMemo(() => (state ? applyOrder(state.order) : BLOCKS), [state])
  const screens = useMemo(() => buildScreens(blocks), [blocks])

  const answeredCount = state
    ? Object.values(state.answers).filter(a => a.trim().length > 0).length
    : 0
  const allDone = answeredCount === TOTAL_PHRASES

  useEffect(() => {
    if (allDone && !thanksDismissed) setShowThanks(true)
  }, [allDone, thanksDismissed])

  const persist = useCallback((next: PersistedState) => {
    setState(next)
    saveState(next)
  }, [])

  function handleStart(userInfo: UserInfo) {
    const fresh = createInitialState(userInfo)
    persist(fresh)
    setPhase("test")
  }

  function handleChange(phraseId: string, value: string) {
    if (!state) return
    persist({ ...state, answers: { ...state.answers, [phraseId]: value } })
  }

  function goToScreen(index: number) {
    if (!state) return
    const clamped = Math.max(0, Math.min(index, screens.length - 1))
    persist({ ...state, screenIndex: clamped })
  }

  function handlePrev() {
    if (!state) return
    if (state.screenIndex === 0) return
    goToScreen(state.screenIndex - 1)
  }

  function handleNext() {
    if (!state) return
    if (state.screenIndex === screens.length - 1) {
      setShowThanks(true)
      return
    }
    goToScreen(state.screenIndex + 1)
  }

  function handleJumpToBlock(blockIndex: number) {
    const firstScreen = screens.findIndex(s => s.blockIndex === blockIndex)
    if (firstScreen >= 0) goToScreen(firstScreen)
  }

  function isBlockComplete(blockIndex: number) {
    if (!state) return false
    const block = blocks[blockIndex]
    return block.phrases.every(p => (state.answers[p.id] ?? "").trim().length > 0)
  }

  if (phase === "intro" || !state) {
    return <IntroScreen onStart={handleStart} />
  }

  const currentBlockIndex = screens[state.screenIndex].blockIndex

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header
        nombre={state.userInfo.nombre}
        answeredCount={answeredCount}
        blockIndex={currentBlockIndex}
      />
      <PhrasePage
        blocks={blocks}
        screens={screens}
        screenIndex={state.screenIndex}
        answers={state.answers}
        onChange={handleChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpToBlock={handleJumpToBlock}
        isBlockComplete={isBlockComplete}
      />
      <ThankYouOverlay
        show={showThanks}
        onClose={() => {
          setShowThanks(false)
          setThanksDismissed(true)
        }}
      />
    </div>
  )
}
