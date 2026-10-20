import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Shield, Coffee, Calendar, Clock, CheckCircle2, Phone, User, ChevronLeft, MessageSquare, AlertCircle, MapPin } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('phone');
  
  // Datos del cliente y reserva
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedSede, setSelectedSede] = useState('belgrano'); // 'belgrano' o 'rivera'
  const [selectedSport, setSelectedSport] = useState('padel'); // 'tenis', 'padel', 'squash', 'futbol'
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // Base de datos de turnos ocupados por sede/deporte/día/hora (guardada en localStorage)
  const [bookedSlots, setBookedSlots] = useState(() => {
    const saved = localStorage.getItem('lescourts_booked_slots');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('lescourts_booked_slots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  // Definir deportes disponibles según la sede elegida
  const getSportsForSede = (sede) => {
    if (sede === 'belgrano') {
      return [
        { id: 'padel', name: '🎾 Pádel Pro' },
        { id: 'tenis', name: '🎾 Tenis' },
        { id: 'squash', name: '🎾 Squash' },
      ];
    } else {
      return [
        { id: 'padel', name: '🎾 Pádel Pro' },
        { id: 'futbol', name: '⚽ Fútbol 7' },
      ];
    }
  };

  // Si cambia la sede, asegurarnos de que el deporte seleccionado sea válido para esa sede
  const handleSedeChange = (sedeId) => {
    setSelectedSede(sedeId);
    setSelectedTime(null);
    const validSports = getSportsForSede(sedeId);
    if (!validSports.some(s => s.id === selectedSport)) {
      setSelectedSport(validSports[0].id);
    }
  };

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

  // Horarios y precios según el deporte
  const getHoursForSport = (sport) => {
    if (sport === 'futbol') {
      return [
        { time: '18:00', price: '$35.000', tag: 'Popular' },
        { time: '19:30', price: '$40.000', tag: '¡Estelar!' },
        { time: '21:00', price: '$40.000', tag: 'Libre' },
        { time: '22:30', price: '$38.000', tag: 'Promo' },
      ];
    } else if (sport === 'tenis') {
      return [
        { time: '17:00', price: '$15.000', tag: 'Popular' },
        { time: '18:30', price: '$18.000', tag: 'Libre' },
        { time: '20:00', price: '$20.000', tag: '¡Estelar!' },
      ];
    } else if (sport === 'squash') {
      return [
        { time: '17:30', price: '$12.000', tag: 'Popular' },
        { time: '19:00', price: '$14.000', tag: 'Libre' },
        { time: '20:30', price: '$16.000', tag: '¡Estelar!' },
      ];
    } else {
      // Pádel
      return [
        { time: '17:00', price: '$18.000', tag: 'Popular' },
        { time: '18:30', price: '$20.000', tag: 'Libre' },
        { time: '20:00', price: '$22.000', tag: '¡Estelar!' },
        { time: '21:30', price: '$22.000', tag: 'Último' },
        { time: '23:00', price: '$19.000', tag: 'Promo' },
      ];
    }
  };

  const baseHours = getHoursForSport(selectedSport);
  const currentFullDate = availableDays[selectedDay].fullDate;
  
  const hours = baseHours.map(h => {
    const slotKey = `${selectedSede}_${selectedSport}_${currentFullDate}_${h.time}`;
    const isBooked = bookedSlots[slotKey] || false;
    return {
      ...h,
      available: !isBooked,
      tag: isBooked ? 'Ocupado' : h.tag
    };
  });

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

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const savedClients = JSON.parse(localStorage.getItem('lescourts_clients') || '{}');
    savedClients[phone] = name.trim();
    localStorage.setItem('lescourts_clients', JSON.stringify(savedClients));

    setStep('booking');
  };

  const handleFinalBooking = () => {
    if (!selectedTime) return;

    const slotKey = `${selectedSede}_${selectedSport}_${currentFullDate}_${selectedTime}`;
    setBookedSlots(prev => ({ ...prev, [slotKey]: true }));

    const dateLabel = availableDays[selectedDay].dateNum;
    const sedeName = selectedSede === 'belgrano' ? 'Villa Belgrano (Av. Laplace 550)' : 'Rivera Indarte (Av. Boderau 7700)';
    const sportName = selectedSport === 'padel' ? 'Pádel Pro' : selectedSport === 'futbol' ? 'Fútbol 7' : selectedSport === 'tenis' ? 'Tenis' : 'Squash';
    
    const message = `¡Hola Les Courts! 🎾⚽ Vengo a confirmar mi reserva.\n\n📍 *Sede:* ${sedeName}\n👤 *Cliente:* ${name}\n📱 *Teléfono:* ${phone}\n🏆 *Deporte:* ${sportName}\n📅 *Día:* ${dateLabel}\n⏰ *Horario:* ${selectedTime} hs\n\nQuedo atento para coordinar el envío de la seña y asegurar mi turno. ¡Gracias!`;
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/5493513988422?text=${encodedMessage}`;
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
    <div className="min-h-screen bg-[#2d4d23] text-white font-sans selection:bg-[#78a436] selection:text-white">
      
      {/* NAVBAR FLOTANTE */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#1e3416]/90 backdrop-blur border border-white/10 px-4 py-2 rounded-xl text-white font-black text-lg tracking-wider flex items-center gap-2 shadow-lg">
              <span className="text-[#9bc947]">LC</span> LES COURTS
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-white">
            <a href="#inicio" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Inicio</a>
            <a href="#sedes" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Sedes</a>
            <a href="#servicios" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Canchas</a>
            <a href="#reservas" className="px-4 py-1.5 rounded-full hover:bg-white/10 transition">Reservas</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#reservas"
              className="bg-[#8cc63f] hover:bg-[#7ab332] text-slate-950 px-6 py-2.5 rounded-full font-black text-sm transition shadow-lg shadow-[#8cc63f]/20 flex items-center gap-2 cursor-pointer"
            >
              Reservar cancha
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center bg-[#1a2e14] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-30 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#203919] via-[#1a2e14]/70 to-[#12200d]/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-bold text-[#b4ea57] tracking-wide uppercase">
            Complejo Deportivo • Córdoba
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
            EL PARTIDAZO DE LA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9bc947] to-[#c7f56e]">
              SEMANA SE JUEGA EN LES COURTS
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-medium">
            Viví la mejor experiencia deportiva con canchas de primer nivel en nuestras dos sedes exclusivas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#reservas"
              className="w-full sm:w-auto bg-[#8cc63f] hover:bg-[#7ab332] text-slate-950 px-8 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-[#8cc63f]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              Reservar cancha <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#sedes"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 px-8 py-4 rounded-2xl font-bold text-base transition text-center cursor-pointer"
            >
              Conocer sedes
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#25411c] rounded-t-[40px] md:rounded-t-[60px]" />
      </section>

      {/* SECCIÓN NUESTRAS SEDES */}
      <section id="sedes" className="bg-[#25411c] py-16 text-white relative z-20 border-b border-[#345c27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12 text-center sm:text-left">
            <span className="text-[#a4e33b] font-extrabold tracking-wider uppercase text-xs bg-[#8cc63f]/15 px-3.5 py-1.5 rounded-full border border-[#8cc63f]/30">
              Ubicaciones
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              NUESTRAS DOS SEDES EN CÓRDOBA
            </h2>
            <p className="text-slate-300 max-w-xl">
              Elegí la sede que te quede más cómoda y descubrí su oferta deportiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* SEDE VILLA BELGRANO */}
            <div className="bg-[#1b3113] border border-[#345c27] rounded-3xl p-8 shadow-2xl hover:border-[#8cc63f]/60 transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#8cc63f]/20 text-[#b4ea57] border border-[#8cc63f]/40 px-3.5 py-1.5 rounded-full font-extrabold text-xs">
                  <MapPin className="w-4 h-4 text-[#8cc63f]" /> Sede Principal
                </div>
                <h3 className="text-2xl font-black text-white">Villa Belgrano</h3>
                <p className="text-[#b4ea57] font-bold text-sm">Av. Laplace 550, Córdoba</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cuenta con <strong className="text-white">4 canchas de pádel rápidas de blindex o muro</strong>, además de canchas de <strong className="text-white">tenis y squash</strong>.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#2e4f22]">
                <a href="#reservas" onClick={() => handleSedeChange('belgrano')} className="text-[#b4ea57] font-black text-sm hover:underline flex items-center gap-1">
                  Reservar en Villa Belgrano →
                </a>
              </div>
            </div>

            {/* SEDE RIVERA INDARTE */}
            <div className="bg-[#1b3113] border border-[#345c27] rounded-3xl p-8 shadow-2xl hover:border-[#8cc63f]/60 transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#8cc63f]/20 text-[#b4ea57] border border-[#8cc63f]/40 px-3.5 py-1.5 rounded-full font-extrabold text-xs">
                  <MapPin className="w-4 h-4 text-[#8cc63f]" /> Sede Norte
                </div>
                <h3 className="text-2xl font-black text-white">Rivera Indarte</h3>
                <p className="text-[#b4ea57] font-bold text-sm">Av. Boderau 7700, Córdoba</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cuenta con <strong className="text-white">4 canchas de pádel rápidas de blindex</strong> y canchas de <strong className="text-white">fútbol 7</strong> de césped sintético.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#2e4f22]">
                <a href="#reservas" onClick={() => handleSedeChange('rivera')} className="text-[#b4ea57] font-black text-sm hover:underline flex items-center gap-1">
                  Reservar en Rivera Indarte →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN INSTALACIONES */}
      <section id="servicios" className="bg-[#25411c] py-16 text-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12 text-center sm:text-left">
            <span className="text-[#a4e33b] font-extrabold tracking-wider uppercase text-xs bg-[#8cc63f]/15 px-3.5 py-1.5 rounded-full border border-[#8cc63f]/30">
              Deportes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              DISCIPLINAS DISPONIBLES
            </h2>
            <p className="text-slate-300 max-w-xl">
              Superficies de primer nivel listas para tu próximo partido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* TARJETA PÁDEL REAL */}
            <div className="bg-[#1b3113] border border-[#345c27] rounded-3xl overflow-hidden shadow-2xl hover:border-[#8cc63f]/60 transition duration-300 flex flex-col">
              <div className="relative h-72 overflow-hidden bg-[#16290f] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cancha de Pádel Pro Vidriada" 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-[#8cc63f] text-slate-950 font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md z-10">
                  Pádel Pro
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Pádel (Ambas Sedes)</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Disponibles en Villa Belgrano (blindex o muro) y Rivera Indarte (blindex). Iluminación LED y máxima comodidad.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#2e4f22] flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase">Blindex o Muro</span>
                  <a href="#reservas" className="text-[#b4ea57] font-extrabold text-sm hover:underline flex items-center gap-1">
                    Reservar Pádel →
                  </a>
                </div>
              </div>
            </div>

            {/* TARJETA FÚTBOL 7 SINTÉTICO REAL */}
            <div className="bg-[#1b3113] border border-[#345c27] rounded-3xl overflow-hidden shadow-2xl hover:border-[#8cc63f]/60 transition duration-300 flex flex-col">
              <div className="relative h-72 overflow-hidden bg-[#16290f] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cancha de Fútbol Césped Sintético" 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-[#78a436] text-white font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md z-10">
                  Fútbol 7 & Otros
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Fútbol 7, Tenis y Squash</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Fútbol 7 con césped sintético de alta gama en Rivera Indarte. Tenis y Squash en Villa Belgrano.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#2e4f22] flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase">Césped Sintético Pro</span>
                  <a href="#reservas" className="text-[#b4ea57] font-extrabold text-sm hover:underline flex items-center gap-1">
                    Reservar Turno →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MOTOR DE RESERVAS INTELIGENTE POR SEDE */}
      <section id="reservas" className="bg-[#1c3315] py-24 text-white relative border-t border-[#345c27]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[#a4e33b] font-extrabold tracking-wider uppercase text-xs bg-[#8cc63f]/15 px-3.5 py-1.5 rounded-full border border-[#8cc63f]/30">
              Sistema Online 24/7
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Gestión de Turnos</h2>
            <p className="text-slate-300">Elegí tu sede, identificate y reservá tu cancha al instante.</p>
          </div>

          <div className="bg-[#15270f] border border-[#345c27] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* PASO 1: TELÉFONO */}
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#294a1e]">
                  <span className="text-xs font-black uppercase text-[#b4ea57] tracking-wider">Paso 1 de 3</span>
                  <span className="text-xs text-slate-400 font-bold">Identificación</span>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8cc63f]" /> Ingresá tu número de Teléfono / WhatsApp
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
                  className="w-full bg-[#101e0b] border border-[#2e4f22] rounded-2xl px-5 py-4 text-white font-bold text-lg focus:outline-none focus:border-[#8cc63f] transition"
                />
                <button
                  type="submit"
                  className="w-full bg-[#8cc63f] hover:bg-[#7ab332] text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-[#8cc63f]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continuar <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* PASO 2: NOMBRE (Solo si es cliente nuevo) */}
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#294a1e]">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')} 
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Volver
                  </button>
                  <span className="text-xs font-black uppercase text-[#b4ea57] tracking-wider">Paso 2 de 3 • Cliente Nuevo</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#8cc63f]" /> Nombre y Apellido
                  </label>
                  <p className="text-xs text-slate-400">Quedará guardado para tus próximas reservas.</p>
                  <input
                    type="text"
                    placeholder="Ej: Lionel Messi"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#101e0b] border border-[#2e4f22] rounded-2xl px-5 py-4 text-white font-bold text-base focus:outline-none focus:border-[#8cc63f] transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8cc63f] hover:bg-[#7ab332] text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-[#8cc63f]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continuar a la Reserva <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* PASO 3: SEDE, DISCIPLINA, CALENDARIO Y HORARIOS */}
            {step === 'booking' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#294a1e]">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')} 
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Cambiar número
                  </button>
                  <div className="text-right">
                    <span className="text-xs font-black uppercase text-[#b4ea57] tracking-wider block">Paso 3 de 3</span>
                    <span className="text-xs text-slate-200 font-bold">¡Hola, {name}! {isReturningUser && '(Datos recuperados ⚡)'}</span>
                  </div>
                </div>

                {/* 1. SELECCIÓN DE SEDE */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8cc63f]" /> 1. Seleccioná la Sede
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSedeChange('belgrano')}
                      className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        selectedSede === 'belgrano'
                          ? 'bg-[#8cc63f] text-slate-950 border-[#8cc63f] shadow-lg shadow-[#8cc63f]/20'
                          : 'bg-[#101e0b] text-slate-300 border-[#2e4f22] hover:border-[#8cc63f]/50'
                      }`}
                    >
                      <span>📍 Villa Belgrano</span>
                      <span className="text-[10px] font-medium opacity-75">Av. Laplace 550</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSedeChange('rivera')}
                      className={`py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm border transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        selectedSede === 'rivera'
                          ? 'bg-[#8cc63f] text-slate-950 border-[#8cc63f] shadow-lg shadow-[#8cc63f]/20'
                          : 'bg-[#101e0b] text-slate-300 border-[#2e4f22] hover:border-[#8cc63f]/50'
                      }`}
                    >
                      <span>📍 Rivera Indarte</span>
                      <span className="text-[10px] font-medium opacity-75">Av. Boderau 7700</span>
                    </button>
                  </div>
                </div>

                {/* 2. SELECCIÓN DE DISCIPLINA (Filtrada por Sede) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">2. Seleccioná el Deporte</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {getSportsForSede(selectedSede).map((sport) => (
                      <button
                        key={sport.id}
                        type="button"
                        onClick={() => { setSelectedSport(sport.id); setSelectedTime(null); }}
                        className={`py-3.5 px-3 rounded-2xl font-black text-xs sm:text-sm border transition flex items-center justify-center gap-2 cursor-pointer ${
                          selectedSport === sport.id
                            ? 'bg-[#8cc63f] text-slate-950 border-[#8cc63f] shadow-lg shadow-[#8cc63f]/20'
                            : 'bg-[#101e0b] text-slate-300 border-[#2e4f22] hover:border-[#8cc63f]/50'
                        }`}
                      >
                        {sport.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. SELECCIÓN DE DÍA */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8cc63f]" /> 3. Seleccioná el Día
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {availableDays.map((day) => (
                      <button
                        key={day.index}
                        type="button"
                        onClick={() => { setSelectedDay(day.index); setSelectedTime(null); }}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                          selectedDay === day.index
                            ? 'bg-[#8cc63f] text-slate-950 border-[#8cc63f] font-black shadow-lg shadow-[#8cc63f]/20 scale-105'
                            : 'bg-[#101e0b] text-slate-300 border-[#2e4f22] hover:border-[#8cc63f]/50'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-extrabold opacity-80">{day.label}</span>
                        <span className="text-xs font-black mt-0.5">{day.dateNum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. SELECCIÓN DE HORARIO */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8cc63f]" /> 4. Horarios Disponibles
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hours.map((h, idx) => (
                      <button
                        key={idx}
                        disabled={!h.available}
                        onClick={() => setSelectedTime(h.time)}
                        className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center relative overflow-hidden ${
                          !h.available
                            ? 'bg-[#0b1407] border-[#1a2e14] text-slate-600 cursor-not-allowed opacity-50'
                            : selectedTime === h.time
                            ? 'bg-[#8cc63f] text-slate-950 border-[#8cc63f] font-black shadow-lg shadow-[#8cc63f]/20 scale-[1.02]'
                            : 'bg-[#101e0b] border-[#2e4f22] text-slate-300 hover:border-[#8cc63f]/50 cursor-pointer'
                        }`}
                      >
                        <span className="text-base font-black">{h.time}</span>
                        <span className="text-xs opacity-90 mt-0.5 font-bold">{h.available ? h.price : 'Ocupado'}</span>
                        <span className={`absolute top-1 right-2 text-[8px] font-extrabold uppercase px-1 py-0.5 rounded ${h.available ? 'bg-[#8cc63f]/20 text-[#b4ea57]' : 'bg-red-500/20 text-red-400'}`}>
                          {h.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AVISO DE SEÑA */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-amber-300 text-xs leading-relaxed">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wide block mb-0.5">Importante para asegurar tu turno:</span>
                    Para completar y asegurar tu reserva definitivamente, al enviar el mensaje de WhatsApp se te solicitará el pago de una seña previa para no perder el turno.
                  </div>
                </div>

                {/* BOTÓN FINAL */}
                {selectedTime && (
                  <div className="pt-2 animate-fade-in">
                    <button
                      type="button"
                      onClick={handleFinalBooking}
                      className="w-full bg-[#8cc63f] hover:bg-[#7ab332] text-slate-950 py-4 rounded-2xl font-black text-base transition shadow-xl shadow-[#8cc63f]/20 flex items-center justify-center gap-2 cursor-pointer"
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
                <div className="w-20 h-20 bg-[#8cc63f]/20 border border-[#8cc63f] text-[#b4ea57] rounded-full flex items-center justify-center mx-auto text-3xl font-black animate-bounce">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">¡Turno Reservado con Éxito!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Excelente <span className="text-white font-bold">{name}</span>. Se abrió WhatsApp para enviar la confirmación a la sede <span className="text-white font-bold">{selectedSede === 'belgrano' ? 'Villa Belgrano' : 'Rivera Indarte'}</span> para tu cancha de <span className="text-[#b4ea57] uppercase font-bold">{selectedSport}</span> el día <span className="text-white font-bold">{availableDays[selectedDay].dateNum}</span> a las <span className="text-[#b4ea57] font-bold">{selectedTime} hs</span>. ¡Recordá coordinar la seña para asegurar tu lugar!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetBooking}
                  className="bg-[#243f1b] hover:bg-[#2f5423] text-white px-6 py-3 rounded-xl font-bold text-sm transition cursor-pointer border border-[#345c27]"
                >
                  Hacer otra reserva
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#12200d] border-t border-[#233d1b] py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="bg-[#8cc63f] p-1.5 rounded-lg text-slate-950 font-black text-xs">LC</div>
            <span className="font-bold text-white text-base">LES COURTS</span>
          </div>
          <p>© {new Date().getFullYear()} Les Courts Complejo Deportivo. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/lescourts" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#1b3113] hover:bg-[#8cc63f] hover:text-slate-950 text-white px-4 py-2 rounded-xl transition border border-[#2e4f22] font-extrabold text-xs uppercase"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}