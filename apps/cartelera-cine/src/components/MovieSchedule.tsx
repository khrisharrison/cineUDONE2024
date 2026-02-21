import React, { useState } from 'react';
import { Schedule } from '../constants/schedules';
import '../styles/MovieSchedule.css';

type MovieScheduleProps = {
  scheduleByDate: Record<string, Schedule[]>;
};

const MovieSchedule: React.FC<MovieScheduleProps> = ({ scheduleByDate }) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dates = Object.keys(scheduleByDate);

  const buyTicketUrl = 'http://localhost:4202/';

  const handleBuyTicket = () => {
    window.location.href = buyTicketUrl;
  };

  const formatDate = (dateKey: string) => {
    const date = new Date(dateKey);
    return {
      month: date.toLocaleDateString('es-VE', { month: 'short' }).toUpperCase(),
      day: date.toLocaleDateString('es-VE', { day: '2-digit' }),
    };
  };
  
  const formatTimeForUser = (date: Date) =>
    date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true })
      .replace(/\s?[a|p]\. m\./, (match) => match.replace(' ', ' '));

  const handlePrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const handleNext = () => setCurrentIndex(Math.min(currentIndex + 1, dates.length - 3));

  return (
    <div className="movie-schedule">
      <div className="controls">
        <button className="carousel-button prev" onClick={handlePrev} disabled={currentIndex === 0}>
          ◀
        </button>
        <h3>
          <span role="img" aria-label="Calendario">📅</span> Horarios
        </h3>
        <button className="carousel-button next" onClick={handleNext} disabled={currentIndex >= dates.length - 3}>
          ▶
        </button>
      </div>
      <div className="carousel-container">
        <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
          {dates.map((dateKey) => {
            const { month, day } = formatDate(dateKey);
            return (
              <div key={dateKey} className="carousel-item">
                <div
                  className={`date-box ${activeDate === dateKey ? 'active' : ''}`}
                  onClick={() => setActiveDate(activeDate === dateKey ? null : dateKey)}
                >
                  <span className="month">{month}</span>
                  <span className="day">{day}</span>
                </div>
                {activeDate === dateKey && (
                  <ul className="schedule-list">
                    {scheduleByDate[dateKey].map((schedule, idx) => (
                      <button key={idx} className='schedule-item w-full' onClick={handleBuyTicket}>
                        <span className="time">
                          {formatTimeForUser(new Date(schedule.startTime))}
                        </span>
                        <span className="room">{schedule.room}</span>                        
                      </button>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieSchedule;