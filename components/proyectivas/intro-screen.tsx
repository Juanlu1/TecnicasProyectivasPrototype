"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BLOCKS, TOTAL_PHRASES } from "@/lib/blocks-data"
import type { UserInfo } from "@/lib/storage"
import { Sparkles } from "lucide-react"

interface IntroScreenProps {
  onStart: (info: UserInfo) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [email, setEmail] = useState("")

  const canStart =
    nombre.trim().length > 0 &&
    edad.trim().length > 0 &&
    email.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canStart) return
    onStart({
      nombre: nombre.trim(),
      edad: edad.trim(),
      email: email.trim(),
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen px-5 py-10 text-center"
    >
      <div className="max-w-sm w-full flex flex-col items-center gap-5">

        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card text-sm text-primary font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Técnicas Proyectivas
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5">
          <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1] font-serif">
            Frases para<br />completar
          </h1>
          <p className="text-sm text-muted-foreground">
            Un recorrido por bloques temáticos, de a pocas frases por vez
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden text-left"
        >
          <div className="px-5 py-4 space-y-2">
            <p className="text-sm text-foreground leading-relaxed">
              Vas a completar <strong>{TOTAL_PHRASES} frases</strong> divididas en{" "}
              <strong>{BLOCKS.length} bloques</strong>. En cada pantalla vas a ver
              solo unas pocas, para ir avanzando sin agobio.
            </p>
            <p className="text-sm text-foreground leading-relaxed italic">
              "Complete con lo primero que se le ocurra; exprese sus verdaderos
              sentimientos."
            </p>
          </div>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="w-full space-y-3"
        >
          <div className="space-y-1.5 text-left">
            <Label htmlFor="nombre" className="text-sm font-medium">
              Nombre completo
            </Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre y apellido"
              className="rounded-xl bg-card/70 h-11 text-base"
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 text-left">
              <Label htmlFor="edad" className="text-sm font-medium">Edad</Label>
              <Input
                id="edad"
                type="number"
                min={10}
                max={99}
                value={edad}
                onChange={e => setEdad(e.target.value)}
                placeholder="Tu edad"
                className="rounded-xl bg-card/70 h-11 text-base"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="rounded-xl bg-card/70 h-11 text-base"
                autoComplete="email"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!canStart}
            className="w-full h-12 font-bold rounded-2xl text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none mt-1"
          >
            Comenzar
          </Button>
        </motion.form>

      </div>
    </motion.div>
  )
}
