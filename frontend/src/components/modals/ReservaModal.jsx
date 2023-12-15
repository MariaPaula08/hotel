// ReservaModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

import '../../styles/modal.css'

const ReservaModal = ({ isOpen, closeModal, handleCreateReserva }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [habitacion, setHabitacion] = useState('');
    const [tipoDeHabitacion, setTipoDeHabitacion] = useState('');
    const [cedulaHuesped, setCedulaHuesped] = useState('');
    const [nombreDelHuesped, setNombreDelHuesped] = useState('');
    const [correoHuesped, setCorreoHuesped] = useState('');
    const [numeroDeHuespedes, setNumeroDeHuespedes] = useState(1);

    const handleCreateClick = async () => {
        const reservaData = {
            fechaTomaReserva: new Date(),
            habitacion,
            tipoDeHabitacion,
            cedulaHuesped,
            nombreDelHuesped,
            correoHuesped,
            numeroDeHuespedes,
            fechaIngreso: startDate,
            fechaSalida: endDate,
        };

        try {
            // Realizar la solicitud POST al servidor
            const response = await fetch('http://localhost:3000/api/createReserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservaData),
            });

            if (!response.ok) {
                throw new Error('Error al crear la reserva');
            }

            // Obtener la respuesta del servidor (puede ser útil para manejar una respuesta exitosa)
            const responseData = await response.json();

            // Manejar la respuesta del servidor según tus necesidades
            console.log('Respuesta del servidor:', responseData);
            toast.success('Reserva Creada Con Exito')

            // Cerrar el modal después de crear la reserva
            closeModal();
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            toast.error('La habitacion ya posee Una reserva')
            // Puedes mostrar un mensaje de error o realizar otras acciones en caso de error
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Crear Reserva"
        >
            <div className='containerModal'>
                <h2 className='text-2xl font-bold mb-2'>Crear Reserva</h2>
                <label><b>Habitación:</b></label>
                <input required type="text" value={habitacion} onChange={(e) => setHabitacion(e.target.value)} />
                <label><b>Tipo de Habitación:</b></label>
                <select defaultValue={'cabaña'} value={tipoDeHabitacion} onChange={(e) => setTipoDeHabitacion(e.target.value)}>
                    <option value="cabaña">Cabaña</option>
                    <option value="jacuzzi">Cabaña Con Jacuzzi</option>
                    <option value="casaGrande">Casa Grande</option>
                </select>
                <label><b>Cédula del Huésped:</b></label>
                <input required type="text" value={cedulaHuesped} onChange={(e) => setCedulaHuesped(e.target.value)} />
                <label><b>Nombre del Huésped:</b></label>
                <input required type="text" value={nombreDelHuesped} onChange={(e) => setNombreDelHuesped(e.target.value)} />
                <label><b>Correo del Huésped:</b></label>
                <input required type="text" value={correoHuesped} onChange={(e) => setCorreoHuesped(e.target.value)} />
                <label><b>Número de Huéspedes:</b></label>
                <input required type="number" value={numeroDeHuespedes} onChange={(e) => setNumeroDeHuespedes(e.target.value)} />
                <label><b>Fecha de Ingreso:</b></label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <label><b>Fecha de Salida:</b></label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <button onClick={handleCreateClick}>Crear Reserva</button>
                <button onClick={closeModal}>Cancelar</button>
            </div>
        </Modal>
    );
};

export default ReservaModal;
