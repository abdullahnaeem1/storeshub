'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export default function Reveal({ children, className, delay = 0, distance = 24 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.18 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : distance }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduceMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
