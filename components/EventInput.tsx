"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EventInputProps {
  onSubmit: (event: string) => void
  onCancel: () => void
}

export default function EventInput({ onSubmit, onCancel }: EventInputProps) {
  const [event, setEvent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (event.trim()) {
      onSubmit(event.trim())
      setEvent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        placeholder="予定を入力"
        className="flex-grow"
      />
      <Button type="submit" size="sm">追加</Button>
      <Button type="button" onClick={onCancel} variant="outline" size="sm">キャンセル</Button>
    </form>
  )
}

