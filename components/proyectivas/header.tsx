"use client"

import { motion } from "framer-motion"
import { TOTAL_PHRASES } from "@/lib/blocks-data"

interface HeaderProps {
  nombre: string
  answeredCount: number
  blockIndex: number
}

export function Header({ nombre, answeredCount, blockIndex }: HeaderProps) {
  const pct = Math.round((answeredCount / TOTAL_PHRASES) * 100)

  return (
    <div className="shrink-0 bg-background/95 backdrop-blur border-b border-border/30 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:block">
            Frases para completar
          </p>
          <h1 className="text-base md:text-lg font-bold font-serif text-foreground truncate">
            {nombre}
          </h1>
        </div>

        <p className="text-base font-bold text-foreground shrink-0 text-center">
          Etapa {blockIndex + 1}
        </p>

        <div className="flex items-center gap-3 shrink-0 flex-1 justify-end">
          <div className="text-right">
            <p className="text-xl font-normal text-primary tabular-nums leading-none">
              {answeredCount}
              <span className="text-xl font-normal text-muted-foreground">/{TOTAL_PHRASES}</span>
            </p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide">respondidas</p>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-muted/50 mx-4 md:mx-6 mb-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
