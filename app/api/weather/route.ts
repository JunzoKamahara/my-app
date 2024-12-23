import { NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: '緯度と経度が必要です' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    // 日付ごとの天気データを整形
    const weatherByDate: { [key: string]: any } = {};
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!weatherByDate[date]) {
        weatherByDate[date] = {
          icon: item.weather[0].icon,
          temperature: Math.round(item.main.temp)
        };
      }
    });

    return NextResponse.json(weatherByDate);
  } catch (error) {
    return NextResponse.json({ error: '天気データの取得に失敗しました' }, { status: 500 });
  }
} 