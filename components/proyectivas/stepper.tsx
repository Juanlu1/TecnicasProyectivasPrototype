"use client"

import { Check } from "lucide-react"
import { getBlockColor, type Block } from "@/lib/blocks-data"

interface StepperProps {
  blocks: Block[]
  currentBlockIndex: number
  isBlockComplete: (blockIndex: number) => boolean
  onJump: (blockIndex: number) => void
}

export function Stepper({ blocks, currentBlockIndex, isBlockComplete, onJump }: StepperProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 -mx-1 scrollbar-none">
      {blocks.map((block, i) => {
        const active = i === currentBlockIndex
        const done = isBlockComplete(i)
        const color = getBlockColor(block.hue)
        return (
          <button
            key={block.id}
            onClick={() => onJump(i)}
            className="shrink-0 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors"
            style={{
              borderColor: active ? color : done ? getBlockColor(block.hue, 0.3) : 'var(--border)',
              backgroundColor: active ? color : done ? getBlockColor(block.hue, 0.1) : 'var(--card)',
              color: active ? 'var(--card)' : done ? color : 'var(--muted-foreground)',
            }}
          >
            <span
              className="flex items-center justify-center w-4 h-4 rounded-full text-[10px] shrink-0"
              style={{
                backgroundColor: active ? 'color-mix(in oklch, white 20%, transparent)' : getBlockColor(block.hue, 0.15),
                color: active ? 'inherit' : color,
              }}
            >
              {done && !active ? <Check className="w-2.5 h-2.5" /> : i + 1}
            </span>
            <span className="whitespace-nowrap">{block.title}</span>
          </button>
        )
      })}
    </div>
  )
}
