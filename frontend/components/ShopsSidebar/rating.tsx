'use client'

import { useEffect, useState } from 'react'

interface RatingRangeSliderProps {
  initialMin?: number
  initialMax?: number
  onChange: (range: { min: number; max: number }) => void
}

export function RatingRangeSlider({
  initialMin = 1.0,
  initialMax = 5.0,
  onChange
}: RatingRangeSliderProps) {
  const [min, setMin] = useState(initialMin)
  const [max, setMax] = useState(initialMax)

  useEffect(() => {
    onChange({ min, max })
  }, [min, max, onChange])

  const minPos = ((min - 1) / (5 - 1)) * 100
  const maxPos = ((max - 1) / (5 - 1)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Rating
        </span>
        <span className="text-lg font-black text-orange-500">
          {min.toFixed(1)} - {max.toFixed(1)} ★
        </span>
      </div>

      <div className="relative h-6 w-full touch-none">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-lg bg-gray-100" />

        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-lg bg-orange-500"
          style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
        />

        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={min}
          onChange={(e) =>
            setMin(Math.min(parseFloat(e.target.value), max - 0.1))
          }
          className="range-input pointer-events-none absolute top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:shadow-md"
        />

        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={max}
          onChange={(e) =>
            setMax(Math.max(parseFloat(e.target.value), min + 0.1))
          }
          className="range-input pointer-events-none absolute top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
    </div>
  )
}
