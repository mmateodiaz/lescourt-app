import React, { useState } from 'react';
import { ArrowRight, Trophy, Shield, Coffee } from 'lucide-react';
import logoImg from './logo.png';

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
    <div className="min-h-screen bg-slate-900 text-slate-900 font-sans selection:bg-emerald-400 selection:text-slate-950">
      
      {/* NAVBAR FLOTANTE */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-xl text-white font-black text-lg tracking-wider flex items-center gap-2">
              <img src={logoImg} alt="Les Courts Logo" className="w-6 h-6 rounded object-cover" />
              LES COURTS
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-white">
            <a href="#inicio" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Fútbol & Pádel</a>
            <a href="#servicios" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Servicios</a>
            <a href="#reservas" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Reservas</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#reservas"
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-6 py-2.5 rounded-full font-black text-sm transition shadow-lg shadow-emerald-400/20 flex items-center gap-2 cursor-pointer"
            >
              Reservar cancha
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-40 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-bold text-emerald-400 tracking-wide uppercase">
            Fútbol 7 & Pádel Pro • Córdoba
          </div>

          {/* TÍTULO PRINCIPAL */}
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
            EL PARTIDAZO DE LA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              SEMANA SE JUGA EN LES COURTS
            </span>
          </h1>

          {/* LOGO DEBAJO DEL TÍTULO */}
          <div className="py-2">
            <img 
              src={logoImg} 
              alt="Les Courts Logo Oficial" 
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl shadow-2xl border-2 border-emerald-400/40 object-cover mx-auto transform hover:scale-105 transition duration-300" 
            />
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Viví la mejor experiencia deportiva con canchas de primer nivel, iluminación LED profesional y el mejor tercer tiempo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#reservas"
              className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-8 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-400/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              Reservar cancha <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#servicios"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 px-8 py-4 rounded-2xl font-bold text-base transition text-center cursor-pointer"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-[40px] md:rounded-t-[60px]" />
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section id="servicios" className="bg-white py-16 text-slate-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="text-emerald-600 font-extrabold tracking-wider uppercase text-xs">
              SERVICIOS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              MÁS QUE UNA CANCHA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Torneos y Eventos</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Organizamos campeonatos relámpago de pádel y fútbol 7 con premios, fixture digital y la mejor competencia de la zona.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Bar y Tercer Tiempo</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Disfrutá de bebidas ultra frías, picadas y buena música después de cada partido en nuestro sector exclusivo para equipos.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Comodidades Pro</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Estacionamiento privado dentro del predio, vestuarios amplios con agua caliente individual y seguridad permanente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOR DE RESERVAS */}
      <section id="reservas" className="bg-slate-900 py-24 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Sistema Online
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Reservá Tu Cancha</h2>
            <p className="text-slate-400">Elegí el deporte, la fecha y el horario en segundos.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {!bookingConfirmed ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Seleccioná la Disciplina</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('padel'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                        selectedSport === 'padel'
                          ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-400/20'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      🎾 Pádel Pro
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('futbol'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                        selectedSport === 'futbol'
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
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
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-emerald-400"
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
                            ? 'bg-slate-900/30 border-slate-900 text-slate-600 cursor-not-allowed opacity-40'
                            : selectedTime === h.time
                            ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-400/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer'
                        }`}
                      >
                        <span className="text-base font-black">{h.time}</span>
                        <span className="text-xs opacity-80 mt-1">{h.available ? h.price : 'Ocupado'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTime && (
                  <form onSubmit={handleBookingSubmit} className="pt-6 border-t border-slate-800 space-y-4">
                    <h3 className="text-lg font-black text-white">Completá tus datos para confirmar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-400/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Confirmar Reserva 🚀
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-400/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">¡Reserva Solicitada con Éxito!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Gracias <span className="text-white font-bold">{formData.name}</span>. Apartamos tu cancha para el día <span className="text-white">{selectedDate}</span> a las <span className="text-emerald-400 font-bold">{selectedTime} hs</span>.
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
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <img src={logoImg} alt="Les Courts Logo" className="w-6 h-6 rounded object-cover" />
            <span className="font-bold text-white text-base">LES COURTS</span>
          </div>
          <p>© {new Date().getFullYear()} Les Courts Complejo Deportivo. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/lescourts" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-white px-4 py-2 rounded-xl transition border border-slate-800 font-extrabold text-xs uppercase"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}