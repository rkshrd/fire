'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DraggableCandle() {
  const router = useRouter()
  const candleRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize position on client side only
    setPosition({
      x: window.innerWidth / 2 - 32,
      y: window.innerHeight - 200,
    })
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragOffset.current.x,
        y: touch.clientY - dragOffset.current.y,
      })
    }

    const onEnd = () => setIsDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    setIsDragging(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    dragOffset.current = { x: touch.clientX - position.x, y: touch.clientY - position.y }
    setIsDragging(true)
  }

  const handleDoubleClick = () => {
    router.push('/veille')
  }

  if (!isInitialized) return null

  return (
    <div
      ref={candleRef}
      className="fixed z-40 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        imageRendering: 'pixelated',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDoubleClick={handleDoubleClick}
      data-hoverable
      title="Double-click → Veille Technologique"
    >
      {/* Candle image */}
      <div className="relative group">
        <div
          className="w-24 h-24 transition-transform duration-200 hover:scale-110"
          style={{
            filter: isDragging
              ? 'drop-shadow(0 0 16px var(--color-accent))'
              : 'drop-shadow(0 0 8px var(--color-accent-glow))',
          }}
        >
          <Image src="/candle.png" alt="candle" width={96} height={96} className="w-full h-full object-contain" draggable={false} />
        </div>

        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {'// double-click → veille'}
        </div>
      </div>
    </div>
  )
}
