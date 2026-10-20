import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedSport, setSelectedSport] = useState('padel');
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const hours = [
    { time: '17:00', available: true, price: '$18.000' },
    { time: '18:30', available: false, price: '$20.000' },
    { time: '20:00', available: true, price: '$22.000' },
    { time: '21:30', available: true, price: '$22.000' },
    { time: '23:00', available: true, price: '$19.000' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !selectedTime) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-lime-400 selection:text-slate-950">
      <Navbar />
      <Hero />

      {/* SECCIÓN INSTALACIONES */}
      <section id="instalaciones" className="py-24 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Nuestras Instalaciones</h2>
            <p className="text-slate-400">Diseñadas para brindarte la mejor experiencia deportiva en cada partido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-lime-400/50 transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-lime-400/10 text-lime-400 font-bold px-3 py-1 rounded-full text-xs uppercase border border-lime-400/20">Destacado</span>
                <h3 className="text-3xl font-black text-white">Pádel Pro</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Canchas vidriadas de última generación, césped sintético profesional e iluminación LED de alta potencia.</p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-lime-400" /> Blindex reglamentario</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-lime-400" /> Salida para exterior habilitada</li>
                </ul>
              </div>
              <div className="pt-8">
                <a href="#reservas" onClick={() => setSelectedSport('padel')} className="inline-flex items-center gap-2 text-lime-400 font-bold hover:underline">
                  Reservar Pádel <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-blue-500/10 text-blue-400 font-bold px-3 py-1 rounded-full text-xs uppercase border border-blue-500/20">Fútbol 7</span>
                <h3 className="text-3xl font-black text-white">Canchas de Fútbol 7</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Césped sintético de alta densidad, arcos oficiales y el mejor espacio para disfrutar el tercer tiempo.</p>
                <ul className="space-y-2 text-sm text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Medidas oficiales</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Vestuarios completos</li>
                </ul>
              </div>
              <div className="pt-8">
                <a href="#reservas" onClick={() => setSelectedSport('futbol')} className="inline-flex items-center gap-2 text-blue-400 font-bold hover:underline">
                  Reservar Fútbol <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOR DE RESERVAS */}
      <section id="reservas" className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Sistema de Reservas</h2>
            <p className="text-slate-400">Elegí tu disciplina, fecha y horario disponible en segundos.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {!bookingConfirmed ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Seleccioná la Disciplina</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('padel'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                        selectedSport === 'padel'
                          ? 'bg-lime-400 text-slate-950 border-lime-400 shadow-lg shadow-lime-400/20'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      🎾 Pádel Pro
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('futbol'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-bold text-sm border transition flex items-center justify-center gap-2 ${
                        selectedSport === 'futbol'
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      ⚽ Fútbol 7
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">2. Seleccioná la Fecha</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">3. Seleccioná el Horario</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hours.map((h, idx) => (
                      <button
                        key={idx}
                        disabled={!h.available}
                        onClick={() => setSelectedTime(h.time)}
                        className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                          !h.available
                            ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                            : selectedTime === h.time
                            ? 'bg-lime-400 text-slate-950 border-lime-400 font-bold shadow-md shadow-lime-400/20'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-base font-black">{h.time}</span>
                        <span className="text-xs opacity-80">{h.available ? h.price : 'Ocupado'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTime && (
                  <form onSubmit={handleBookingSubmit} className="pt-6 border-t border-slate-800 space-y-4">
                    <h3 className="text-lg font-bold text-white">Completá tus datos para confirmar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-400"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-lime-400 hover:bg-lime-500 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Confirmar Reserva de Turno
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-lime-400/20 border border-lime-400 text-lime-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">¡Reserva Solicitada con Éxito!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Gracias <span className="text-white font-bold">{formData.name}</span>. Apartamos tu cancha de <span className="text-lime-400 uppercase font-bold">{selectedSport}</span> para el día <span className="text-white">{selectedDate}</span> a las <span className="text-white">{selectedTime} hs</span>.
                  </p>
                </div>
                <button
                  onClick={() => { setBookingConfirmed(false); setSelectedTime(null); setFormData({ name: '', phone: '' }); }}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Hacer otra reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-lime-400 p-1.5 rounded-lg text-slate-950 font-black text-sm">LC</div>
            <span className="font-bold text-white text-base">LES COURTS</span>
          </div>
          <p>© {new Date().getFullYear()} Les Courts Complejo Deportivo. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/lescourts" target="_blank" rel="noreferrer" className="bg-slate-900 px-4 py-2 rounded-xl hover:text-lime-400 transition border border-slate-800 text-white font-bold text-xs uppercase">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}