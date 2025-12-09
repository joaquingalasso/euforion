import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCalendarDay } from 'react-icons/fa';
import { getUpcomingEvents } from '../data/events';

function Calendar({ events: externalEvents }) {
    const events = externalEvents || getUpcomingEvents(); // In a real app, you might want all events, not just upcoming

    // Initialize calendar to the month of the first upcoming event, otherwise today
    const [currentDate, setCurrentDate] = useState(() => {
        if (events.length > 0) {
            const [y, m, d] = events[0].date.split('-').map(Number);
            return new Date(y, m - 1, 1);
        }
        return new Date();
    });

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month); // 0 = Sunday

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Group events by date for quick lookup
    const eventsByDate = events.reduce((acc, event) => {
        // Fix TZ issue by taking only the YYYY-MM-DD part
        const dateStr = event.date;
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(event);
        return acc;
    }, {});

    const renderDays = () => {
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
        }

        // Days of current month
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = eventsByDate[dateStr] || [];

            days.push(
                <div key={d} className={`calendar-day ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                    <span className="day-number">{d}</span>
                    <div className="day-events">
                        {dayEvents.map((ev, idx) => (
                            <div key={idx} className="event-dot" title={ev.title}
                                style={{ backgroundColor: getCategoryColor(ev.category) }}
                            />
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'biblioteca': return 'var(--color-blue-light)';
            case 'talleres': return 'var(--color-blue-azure)';
            case 'institucional': return 'var(--color-blue-dark)';
            default: return 'var(--color-blue-medium)';
        }
    };

    return (
        <div className="calendar-component">
            <div className="calendar-header">
                <button onClick={prevMonth} className="btn-icon"><FaChevronLeft /></button>
                <h3>{monthNames[month]} {year}</h3>
                <button onClick={nextMonth} className="btn-icon"><FaChevronRight /></button>
            </div>

            <div className="calendar-grid">
                <div className="weekday">Dom</div>
                <div className="weekday">Lun</div>
                <div className="weekday">Mar</div>
                <div className="weekday">Mié</div>
                <div className="weekday">Jue</div>
                <div className="weekday">Vie</div>
                <div className="weekday">Sáb</div>
                {renderDays()}
            </div>

            <style>{`
                .calendar-component {
                    background: white;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-md);
                    padding: 1.5rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .calendar-header h3 { margin: 0; color: var(--color-blue-dark); }
                .btn-icon {
                    background: none;
                    border: none;
                    color: var(--color-blue-medium);
                    cursor: pointer;
                    font-size: 1.2rem;
                }
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 0.5rem;
                    text-align: center;
                }
                .weekday {
                    font-weight: bold;
                    color: var(--color-gray-medium);
                    font-size: 0.9rem;
                    padding-bottom: 0.5rem;
                }
                .calendar-day {
                    min-height: 80px;
                    border: 1px solid var(--color-gray-light);
                    border-radius: 8px;
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .calendar-day.empty { background: transparent; border: none; }
                .day-number { font-weight: 600; font-size: 0.9rem; color: var(--color-gray-dark); }
                .day-events {
                    display: flex;
                    gap: 4px;
                    margin-top: 4px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .event-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .has-events { background-color: var(--color-bg-light); border-color: var(--color-blue-light); }
            `}</style>
        </div>
    );
}

export default Calendar;
