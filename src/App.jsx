import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { CheckCircle2, ArrowRight, Trophy, Zap, Shield, Sparkles, Flame, Calendar, Clock } from 'lucide-react';

export default function App() {
  const [selectedSport, setSelectedSport] = useState('padel');
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const hours = [
    { time: '17:00', available: true, price: '$18.000', tag: 'Popular' },
    { time: '18:30', available: false, price: '$20.000', tag: 'Ocupado' },
    { time: '20:00', available: true, price: '$22.000', tag: '¡Último turno!' },
    { time: '21:30', available: true, price: '$22.000', tag: 'Estelar' },
    { time: '23:00', available: true, price: '$19.000', tag: 'Promo' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !selectedTime) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-400 selection:text-slate-950">
      <Navbar />
      <Hero />

      {/* SECCIÓN DE BENEFICIOS / POR QUÉ ELEGIRNOS */}
      <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition">
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Iluminación LED Pro</h4>
              <p className="text-xs text-slate-400">Cero sombras, visibilidad perfecta de noche.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition">
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Sintético Premium</h4>
              <p className="text-xs text-slate-400">Cancha impecable para cuidar tus articulaciones.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition">
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Tercer Tiempo</h4>
              <p className="text-xs text-slate-400">Buffet, bebidas frías y el mejor ambiente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN INSTALACIONES */}
      <section id="instalaciones" className="py-24 bg-slate-900/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Nivel Internacional
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Nuestras Canchas</h2>
            <p className="text-slate-400">Elegí tu disciplina y vení a romperla con tus amigos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tarjeta Pádel */}
            <div className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500 transition duration-500 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500" />
              <div className="space-y-4 relative z-10">
                <span className="inline-block bg-emerald-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wide">
                  🎾 Pádel Pro
                </span>
                <h3 className="text-3xl font-black text-white group-hover:text-emerald-400 transition">Blindex & Césped Pro</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Canchas vidriadas reglamentarias con salida para exterior. Diseñadas para un pique perfecto y máxima competitividad.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Blindex de alta seguridad</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Iluminación LED anti-reflejo</li>
                </ul>
              </div>
              <div className="pt-8 relative z-10">
                <a 
                  href="#reservas" 
                  onClick={() => setSelectedSport('padel')} 
                  className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-400/20"
                >
                  Reservar Pádel <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tarjeta Fútbol */}
            <div className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition duration-500 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition duration-500" />
              <div className="space-y-4 relative z-10">
                <span className="inline-block bg-blue-500 text-white font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wide">
                  ⚽ Fútbol 7
                </span>
                <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition">Sintético de Alta Densidad</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El escenario ideal para armar partidazos de 7 contra 7. Medidas oficiales, arcos profesionales y excelente demarcación.
                </p>
                <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Caucho ecológico de primera</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Vestuarios amplios y duchas</li>
                </ul>
              </div>
              <div className="pt-8 relative z-10">
                <a 
                  href="#reservas" 
                  onClick={() => setSelectedSport('futbol')} 
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-blue-500/20"
                >
                  Reservar Fútbol 7 <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTOR DE RESERVAS INTERACTIVO */}
      <section id="reservas" className="py-24 bg-slate-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Sistema Online 24/7
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Apartá tu Turno</h2>
            <p className="text-slate-400">Elegí deporte, fecha y horario. Confirmá al instante.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {!bookingConfirmed ? (
              <div className="space-y-8">
                {/* Paso 1 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Seleccioná la Disciplina</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('padel'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                        selectedSport === 'padel'
                          ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-400/25 scale-[1.02]'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      🎾 Pádel Pro
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('futbol'); setSelectedTime(null); }}
                      className={`py-4 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                        selectedSport === 'futbol'
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-[1.02]'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      ⚽ Fútbol 7
                    </button>
                  </div>
                </div>

                {/* Paso 2 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">2. Seleccioná la Fecha</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-emerald-400 transition"
                    />
                  </div>
                </div>

                {/* Paso 3 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">3. Seleccioná el Horario</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hours.map((h, idx) => (
                      <button
                        key={idx}
                        disabled={!h.available}
                        onClick={() => setSelectedTime(h.time)}
                        className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center relative overflow-hidden ${
                          !h.available
                            ? 'bg-slate-950/30 border-slate-900 text-slate-600 cursor-not-allowed opacity-40'
                            : selectedTime === h.time
                            ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-extrabold shadow-lg shadow-emerald-400/25 scale-[1.02]'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 cursor-pointer'
                        }`}
                      >
                        <span className="text-lg font-black">{h.time}</span>
                        <span className="text-xs font-bold mt-1">{h.available ? h.price : 'Ocupado'}</span>
                        {h.available && (
                          <span className="absolute top-1 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            {h.tag}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formulario */}
                {selectedTime && (
                  <form onSubmit={handleBookingSubmit} className="pt-6 border-t border-slate-800 space-y-4 animate-fade-in">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-400" /> ¡Completá tus datos para asegurar el turno!
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-400/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Confirmar Reserva de Cancha 🚀
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-400/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white">¡Turno Solicitado con Éxito!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Impecable <span className="text-white font-bold">{formData.name}</span>. Apartamos tu cancha de <span className="text-emerald-400 uppercase font-bold">{selectedSport}</span> para el día <span className="text-white font-bold">{selectedDate}</span> a las <span className="text-emerald-400 font-bold">{selectedTime} hs</span>.
                  </p>
                </div>
                <button
                  onClick={() => { setBookingConfirmed(false); setSelectedTime(null); setSelectedFormData({ name: '', phone: '' }); }}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer border border-slate-700"
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
            <div className="bg-emerald-400 p-2 rounded-xl text-slate-950 font-black text-base">LC</div>
            <span className="font-extrabold text-white text-lg tracking-tight">LES COURTS</span>
          </div>
          <p>© {new Date().getFullYear()} Les Courts Complejo Deportivo. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/lescourts" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-white px-4 py-2.5 rounded-xl transition border border-slate-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}