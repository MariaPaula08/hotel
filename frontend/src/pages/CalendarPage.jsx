import React from 'react';
import NavBar from '../components/navbar/NavBar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const CalendarPage = () => {

    return (
        <section className='mt-24'>
            <NavBar />
            <div className='pl-14 pr-14'>
                <h2 className='text-6xl mb-6 font-bold'>Reservas</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[
                        {id: 1, title: "Habitacion 301", start:"2023-12-01", end:"2023-12-06"},
                        {id: 2, title: "Habitacion 302", start:"2023-12-01", end:"2023-12-01", color: 'tomato'},
                        {id: 3, title: "Habitacion 401", start:"2023-12-15", end:"2023-12-17", color: 'cyan'},
                    ]}
                />
            </div>
        </section>
    );
}

export default CalendarPage;
