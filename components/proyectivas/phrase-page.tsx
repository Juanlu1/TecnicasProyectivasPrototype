"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Stepper } from "./stepper"
import { getBlockColor } from "@/lib/blocks-data"
import type { Block, Screen } from "@/lib/blocks-data"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

interface PhrasePageProps {
  blocks: Block[]
  screens: Screen[]
  screenIndex: number
  answers: Record<string, string>
  onChange: (phraseId: string, value: string) => void
  onPrev: () => void
  onNext: () => void
  onJumpToBlock: (blockIndex: number) => void
  isBlockComplete: (blockIndex: number) => boolean
}

export function PhrasePage({
  blocks,
  screens,
  screenIndex,
  answers,
  onChange,
  onPrev,
  onNext,
  onJumpToBlock,
  isBlockComplete,
}: PhrasePageProps) {
  const screen = screens[screenIndex]
  const block = blocks[screen.blockIndex]
  const isFirstScreen = screenIndex === 0
  const isLastScreen = screenIndex === screens.length - 1
  const color = getBlockColor(block.hue)
  const allAnswered = screen.phrases.every(p => (answers[p.id] ?? "").trim().length > 0)

  return (
    <div className="flex flex-col flex-1 min-h-0 px-4 py-3 md:px-8 md:py-4 overflow-hidden">
      <div className="w-full max-w-xl mx-auto flex flex-col flex-1 min-h-0 gap-3">

        <Stepper
          blocks={blocks}
          currentBlockIndex={screen.blockIndex}
          isBlockComplete={isBlockComplete}
          onJump={onJumpToBlock}
        />

        <div className="space-y-0.5 shrink-0">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color }}
          >
            {block.subtitle}
          </p>
          <div className="flex items-baseline justify-between gap-3">
            <h1 className="text-xl font-bold text-foreground font-serif leading-snug">
              {block.title}
            </h1>
            {screen.pageCount > 1 && (
              <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                Parte {screen.pageIndex + 1} de {screen.pageCount}
              </span>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={screenIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col flex-1 min-h-0 justify-start gap-3 overflow-y-auto"
          >
            {screen.phrases.map((phrase, i) => {
              const answered = (answers[phrase.id] ?? "").trim().length > 0
              return (
                <div
                  key={phrase.id}
                  className="shrink-0 flex flex-col rounded-2xl border shadow-sm gap-2 px-4 py-3 transition-colors"
                  style={{
                    borderColor: getBlockColor(block.hue, 0.25),
                    backgroundColor: answered ? getBlockColor(block.hue, 0.06) : 'var(--card)',
                    borderLeftWidth: '4px',
                    borderLeftColor: color,
                  }}
                >
                  <div className="flex items-start gap-2.5 shrink-0">
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5"
                      style={{
                        backgroundColor: answered ? color : getBlockColor(block.hue, 0.12),
                        color: answered ? 'var(--card)' : color,
                      }}
                    >
                      {answered ? <Check className="w-3 h-3" /> : i + 1}
                    </span>
                    <p className="text-[14px] font-semibold text-foreground font-serif leading-snug">
                      {phrase.text}
                    </p>
                  </div>
                  <Textarea
                    value={answers[phrase.id] ?? ""}
                    onChange={e => onChange(phrase.id, e.target.value)}
                    placeholder="Completá con lo primero que se te ocurra..."
                    className="h-20 min-h-0 rounded-xl bg-background/60 text-[14px] border-border/50 focus-visible:border-ring focus-visible:ring-ring/50 resize-none"
                  />
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 shrink-0 pt-1">
          <Button
            variant="secondary"
            onClick={onPrev}
            disabled={isFirstScreen}
            className="rounded-full px-4 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            onClick={onNext}
            disabled={!allAnswered}
            className="rounded-full px-5 font-semibold disabled:opacity-30"
            style={{ backgroundColor: color }}
          >
            {isLastScreen ? "Finalizar" : "Siguiente"}
            {!isLastScreen && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

      </div>
    </div>
  )
}
