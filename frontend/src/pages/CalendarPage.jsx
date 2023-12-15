import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar/NavBar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import ReservaModal from '../components/modals/ReservaModal';
import axios from 'axios';

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservas, setReservas] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const closeModal = () => {
        setIsModalOpen(false);
        fetchReservas()
    };

    const fetchReservas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/getReservas')
            console.log(response.data)
            setReservas(response.data.msg); // Actualiza el estado con la propiedad 'msg' de la respuesta
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateReserva = (reservaData) => {
        fetchReservas()
        console.log('Crear reserva:', reservaData);
    };

    useEffect(() => {
        fetchReservas()
    }, [])

    // Mapea las reservas al formato esperado por FullCalendar
    const mappedReservas = reservas.map(reserva => ({
        id: reserva._id,
        title: `Habitacion ${reserva.habitacion}`,
        start: new Date(reserva.fechaIngreso),
        end: new Date(reserva.fechaSalida),
        color: getRandomColor(),
    }));

    return (
        <section className='mt-24'>
            <NavBar />
            <div className='pl-14 pr-14'>
                <h2 className='text-6xl mb-6 font-bold'>Reservas</h2>
                <button onClick={openModal}>Agregar Reserva</button>
                <div style={{ position: 'absolute', zIndex: '-10', width: '90%', margin: 'auto' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        zIndex="10"
                        events={mappedReservas}
                    />
                </div>
                <ReservaModal isOpen={isModalOpen} closeModal={closeModal} handleCreateReserva={handleCreateReserva} />
            </div>
        </section>
    );
}

export default CalendarPage;
