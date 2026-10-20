import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Shield, Coffee, Calendar, Clock, CheckCircle2, Phone, User, ChevronLeft, MessageSquare } from 'lucide-react';

export default function App() {
  // Pasos: 'phone' -> 'details' -> 'booking' -> 'success'
  const [step, setStep] = useState('phone');
  
  // Datos del cliente y reserva
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedSport, setSelectedSport] = useState('padel');
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Base de datos de turnos ocupados por día/deporte/hora (guardada en localStorage)
  const [bookedSlots, setBookedSlots] = useState(() => {
    const saved = localStorage.getItem('lescourts_booked_slots');
    return saved ? JSON.parse(saved) : {};
  });

  // Guardar turnos ocupados cada vez que cambien
  useEffect(() => {
    localStorage.setItem('lescourts_booked_slots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  // Generar próximos 5 días dinámicamente
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        index: i,
        label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : d.toLocaleDateString('es-AR', { weekday: 'short' }),
        dateNum: d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }),
        fullDate: d.toISOString().split('T')[0]
      });
    }
    return days;
  };

  const availableDays = getNextDays();

  // Horarios base según deporte
  const baseHours = selectedSport === 'padel' ? [
    { time: '17:00', price: '$18.000', tag: 'Popular' },
    { time: '18:30', price: '$20.000', tag: 'Libre' },
    { time: '20:00', price: '$22.000', tag: '¡Estelar!' },
    { time: '21:30', price: '$22.000', tag: 'Último' },
    { time: '23:00', price: '$19.000', tag: 'Promo' },
  ] : [
    { time: '18:00', price: '$35.000', tag: 'Popular' },
    { time: '19:30', price: '$40.000', tag: '¡Estelar!' },
    { time: '21:00', price: '$40.000', tag: 'Libre' },
    { time: '22:30', price: '$38.000', tag: 'Promo' },
  ];

  // Verificar si un horario está ocupado para el día y deporte actual
  const currentFullDate = availableDays[selectedDay].fullDate;
  const hours = baseHours.map(h => {
    const slotKey = `${selectedSport}_${currentFullDate}_${h.time}`;
    const isBooked = bookedSlots[slotKey] || false;
    return {
      ...h,
      available: !isBooked,
      tag: isBooked ? 'Ocupado' : h.tag
    };
  });

  // PASO 1: Validar teléfono y buscar si ya existe el cliente en localStorage
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 6) return;

    const savedClients = JSON.parse(localStorage.getItem('lescourts_clients') || '{}');
    if (savedClients[phone]) {
      setName(savedClients[phone]);
      setIsReturningUser(true);
      setStep('booking');
    } else {
      setIsReturningUser(false);
      setStep('details');
    }
  };

  // PASO 2: Guardar nuevo cliente y avanzar
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const savedClients = JSON.parse(localStorage.getItem('lescourts_clients') || '{}');
    savedClients[phone] = name.trim();
    localStorage.setItem('lescourts_clients', JSON.stringify(savedClients));

    setStep('booking');
  };

  // PASO 3: Confirmar reserva, bloquear turno y abrir WhatsApp hacia Les Courts
  const handleFinalBooking = () => {
    if (!selectedTime) return;

    const slotKey = `${selectedSport}_${currentFullDate}_${selectedTime}`;
    setBookedSlots(prev => ({ ...prev, [slotKey]: true }));

    // Generar mensaje oficial para Les Courts (+5493513988422)
    const dateLabel = availableDays[selectedDay].dateNum;
    const sportName = selectedSport === 'padel' ? 'Pádel Pro' : 'Fútbol 7';
    const message = `¡Hola Les Courts! 🎾⚽ Vengo a confirmar mi reserva realizada correctamente.\n\n👤 *Cliente:* ${name}\n📱 *Teléfono:* ${phone}\n🏆 *Deporte:* ${sportName}\n📅 *Día:* ${dateLabel}\n⏰ *Horario:* ${selectedTime} hs\n\n¡Quedo a la espera de la confirmación final!`;
    const encodedMessage = encodeURIComponent(message);
    
    // Número oficial de Les Courts
    const whatsappUrl = `https://wa.me/5493513988422?text=${encodedMessage}`;
    
    // Abrir WhatsApp en pestaña nueva
    window.open(whatsappUrl, '_blank');

    setStep('success');
  };

  const resetBooking = () => {
    setStep('phone');
    setPhone('');
    setName('');
    setSelectedTime(null);
    setIsReturningUser(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 font-sans selection:bg-emerald-400 selection:text-slate-950">
      
      {/* NAVBAR FLOTANTE */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900/80 backdrop-blur border border-white/10 px-4 py-2 rounded-xl text-white font-black text-lg tracking-wider flex items-center gap-2">
              <span className="text-emerald-400">LC</span> LES COURTS
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

          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
            EL PARTIDAZO DE LA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              SEMANA SE JUEGA EN LES COURTS
            </span>
          </h1>

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
                  Disfrutá de bebidas ultra frías, picadas y buena música después de cada partido en nosso sector exclusivo para equipos.
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

      {/* MOTOR DE RESERVAS INTELIGENTE */}
      <section id="reservas" className="bg-slate-900 py-24 text-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-emerald-400 font-extrabold tracking-wider uppercase text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Sistema Online 24/7
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Gestión de Turnos</h2>
            <p className="text-slate-400">Identificate con tu teléfono y reservá tu cancha al instante.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* PASO 1: TELÉFONO */}
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">Paso 1 de 3</span>
                  <span className="text-xs text-slate-500 font-bold">Identificación</span>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" /> Ingresá tu número de Teléfono / WhatsApp
                  </label>
                  <p className="text-xs text-slate-400">Si ya reservaste antes, recordaremos tus datos automáticamente.</p>
                </div>
                <input
                  type="tel"
                  placeholder="Ej: 3512345678"
                  required
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white font-bold text-lg focus:outline-none focus:border-emerald-400 transition"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continuar <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* PASO 2: NOMBRE (Solo si es cliente nuevo) */}
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')} 
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Volver
                  </button>
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">Paso 2 de 3 • Cliente Nuevo</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" /> Nombre y Apellido
                  </label>
                  <p className="text-xs text-slate-400">Quedará guardado para tus próximas reservas.</p>
                  <input
                    type="text"
                    placeholder="Ej: Lionel Messi"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white font-bold text-base focus:outline-none focus:border-emerald-400 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continuar al Calendario <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* PASO 3: CALENDARIO, DISCIPLINA Y HORARIOS */}
            {step === 'booking' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')} 
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Cambiar número
                  </button>
                  <div className="text-right">
                    <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">Paso 3 de 3</span>
                    <span className="text-xs text-slate-300 font-bold">¡Hola, {name}! {isReturningUser && '(Datos recuperados ⚡)'}</span>
                  </div>
                </div>

                {/* Disciplina */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">1. Seleccioná la Disciplina</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedSport('padel'); setSelectedTime(null); }}
                      className={`py-3.5 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
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
                      className={`py-3.5 rounded-2xl font-black text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                        selectedSport === 'futbol'
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      ⚽ Fútbol 7
                    </button>
                  </div>
                </div>

                {/* Selección de Día */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" /> 2. Seleccioná el Día
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {availableDays.map((day) => (
                      <button
                        key={day.index}
                        type="button"
                        onClick={() => { setSelectedDay(day.index); setSelectedTime(null); }}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                          selectedDay === day.index
                            ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-400/20 scale-105'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-extrabold opacity-80">{day.label}</span>
                        <span className="text-xs font-black mt-0.5">{day.dateNum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selección de Horario */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" /> 3. Horarios Disponibles
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hours.map((h, idx) => (
                      <button
                        key={idx}
                        disabled={!h.available}
                        onClick={() => setSelectedTime(h.time)}
                        className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center relative overflow-hidden ${
                          !h.available
                            ? 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                            : selectedTime === h.time
                            ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-400/20 scale-[1.02]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50 cursor-pointer'
                        }`}
                      >
                        <span className="text-base font-black">{h.time}</span>
                        <span className="text-xs opacity-90 mt-0.5 font-bold">{h.available ? h.price : 'Ocupado'}</span>
                        <span className={`absolute top-1 right-2 text-[8px] font-extrabold uppercase px-1 py-0.5 rounded ${h.available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-400'}`}>
                          {h.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* BOTÓN FINAL */}
                {selectedTime && (
                  <div className="pt-4 border-t border-slate-800 animate-fade-in">
                    <button
                      type="button"
                      onClick={handleFinalBooking}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5" /> Enviar WhatsApp a Les Courts ({selectedTime} hs) 🚀
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* PANTALLA DE ÉXITO */}
            {step === 'success' && (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-400/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">¡Turno Reservado con Éxito!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Excelente <span className="text-white font-bold">{name}</span>. Se abrió WhatsApp para enviarle la confirmación al complejo (<span className="text-emerald-400 font-bold">+54 9 351 398-8422</span>) para tu cancha de <span className="text-emerald-400 uppercase font-bold">{selectedSport}</span> el día <span className="text-white font-bold">{availableDays[selectedDay].dateNum}</span> a las <span className="text-emerald-400 font-bold">{selectedTime} hs</span>. ¡El turno ya figura como ocupado!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetBooking}
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
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-400 p-1.5 rounded-lg text-slate-950 font-black text-xs">LC</div>
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