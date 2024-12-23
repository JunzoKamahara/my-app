"use client"

import React, { useState, useEffect } from 'react';
import { format, addWeeks, addDays } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DaySchedule from '@/components/DaySchedule';
import Image from 'next/image';
import { WeatherData, WeatherState } from '@/types/weather';

const WeeklySchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState<{ [date: string]: string[] }>({});
  const [weather, setWeather] = useState<WeatherState>({});

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?lat=35.6762&lon=139.6503`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('天気データの取得に失敗しました:', error);
      }
    };

    fetchWeather();
  }, [currentWeek]);

  const handleAddEvent = (date: string, event: string) => {
    const updatedEvents = {
      ...events,
      [date]: [...(events[date] || []), event] // イベントを追加
    };
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (date: string, index: number) => {
    const updatedEvents = {
      ...events,
      [date]: events[date].filter((_, i) => i !== index) // index番目のイベントを削除
    };
    if (updatedEvents[date].length === 0) {
      delete updatedEvents[date];
    }
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents));
  };

  const handleEditEvent = (date: string, index: number, newEvent: string) => {
    const updatedEvents = {
      ...events,
      [date]: events[date].map((event, i) => 
        i === index ? newEvent : event  // index番目のイベントを新しい内容に更新
      )
    };
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(prev => addWeeks(prev, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(prev => addWeeks(prev, 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextWeek,
    onSwipedRight: goToPreviousWeek,
    touchEventOptions: { passive: false },
    trackMouse: true
  });

  const weekDays = [...Array(7)].map((_, i) => 
    addDays(currentWeek, i)
  );

  return (
    <div className="max-w-md mx-auto p-4" {...handlers}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-xl font-bold">
          {format(weekDays[0], 'M/d')} - {format(weekDays[6], 'M/d')}
        </h2>
        <Button variant="ghost" onClick={goToNextWeek}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="space-y-4">
        {weekDays.map(day => {
          const dateStr = day.toISOString().split('T')[0];
          const weatherData = weather[dateStr];
          return (
            <DaySchedule 
              key={dateStr}
              date={day}
              events={events[dateStr] || []}
              weather={weatherData}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
              onEditEvent={handleEditEvent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySchedule;

