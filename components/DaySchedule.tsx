"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import EventInput from './EventInput'
import Image from 'next/image'
import { WeatherData } from '@/types/weather'

interface DayScheduleProps {
  date: Date
  events: string[]
  onAddEvent: (date: string, event: string) => void
  onDeleteEvent: (date: string, index: number) => void
  onEditEvent: (date: string, index: number, newEvent: string) => void
  weather?: WeatherData
}

export default function DaySchedule({ date, events, weather, onAddEvent, onDeleteEvent, onEditEvent }: DayScheduleProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const handleAddEvent = (event: string) => {
    onAddEvent(date.toISOString().split('T')[0], event)
    setIsAdding(false)
  }

  const handleStartEdit = (event: string, index: number) => {
    setEditingIndex(index)
    setEditingText(event)
  }

  const handleSaveEdit = (index: number) => {
    if (editingText.trim()) {
      onEditEvent(date.toISOString().split('T')[0], index, editingText.trim())
    }
    setEditingIndex(null)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 
          className="font-bold mb-2 cursor-pointer hover:text-blue-600"
          onClick={() => setIsAdding(true)}
        >
          {date.toLocaleDateString('ja-JP', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        {weather && (
          <div className="flex items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="天気アイコン"
              width={40}
              height={40}
            />
            <span>{weather.temperature}°C</span>
          </div>
        )}
      </div>
      <ul className="space-y-2 mb-4">
        {events!=null && events.map((event, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
            {editingIndex === index ? (
              <Input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => handleSaveEdit(index)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(index)}
                autoFocus
                className="flex-grow mr-2"
              />
            ) : (
              <span 
                onClick={() => handleStartEdit(event, index)}
                className="cursor-pointer hover:text-blue-600 flex-grow"
              >
                {event}
              </span>
            )}
            <button
              onClick={() => onDeleteEvent(date.toISOString().split('T')[0], index)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
      {isAdding && (
        <EventInput onSubmit={handleAddEvent} onCancel={() => setIsAdding(false)} />
      )}
    </div>
  )
}