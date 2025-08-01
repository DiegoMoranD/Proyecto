import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import es from 'date-fns/locale/es';
import Config from '../layouts/PageAuth/Config';
import ModalCitasPop from '../ModalCitasPop';

const locales = { 'es': es };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCitaId, setSelectedCitaId] = useState(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await Config.indexAgenda();
                // Transforma las citas al formato que espera react-big-calendar
                const citas = response.data.map(cita => ({
                    id: cita.id,
                    title: cita.motivo,
                    start: new Date(`${cita.fecha}T${cita.hora}`),
                    end: new Date(`${cita.fecha}T${cita.hora}`), // Puedes sumar tiempo si tienes duración
                }));
                setEvents(citas);
            } catch (error) {
                console.error('Error al cargar las citas:', error);
            }
        };
        fetchCitas();
    }, []);

    return (
        <div className=" sm:p-4 md:p-6 max-w-full overflow-x-auto">
            <div className="min-w-[600px] w-full">
                <ModalCitasPop
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    id={selectedCitaId}
                />
                <h2 className="text-xl mb-4 font-[500] border-b border-black/20 pb-1 -mt-4">Calendario</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, width: '100%' }}
                    onSelectEvent={(event) => {
                        setSelectedCitaId(event.id);
                        setIsModalOpen(true);
                    }}
                    messages={{
                        today: 'Hoy',
                        previous: 'Atrás',
                        next: 'Siguiente',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        agenda: 'Agenda',
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarView;