"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface ThankYouOverlayProps {
  show: boolean
  onClose: () => void
}

export function ThankYouOverlay({ show, onClose }: ThankYouOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-background flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260, delay: 0.1 }}
            className="flex flex-col items-center text-center gap-4 max-w-sm"
          >
            <CheckCircle2 className="w-14 h-14 text-primary" />
            <h2 className="text-2xl font-bold font-serif text-foreground">
              ¡Muchas gracias!
            </h2>
            <p className="text-sm text-muted-foreground">
              Completaste el recorrido. Tus respuestas fueron guardadas.
              Si querés revisar o cambiar algo, podés volver y seguir editando.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow hover:bg-primary/90 transition-colors"
            >
              Volver
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
