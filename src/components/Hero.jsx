import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center bg-slate-950 overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs font-semibold text-lime-400">
              <Zap className="w-3.5 h-3.5" /> Complejo Deportivo Profesional
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              VIVÍ LA PASIÓN EN <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">LES COURTS</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              Canchas profesionales de Pádel y Fútbol 7 de última generación. Iluminación LED y el mejor nivel para jugar con amigos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#reservas"
                className="w-full sm:w-auto bg-lime-400 hover:bg-lime-500 text-slate-950 px-8 py-4 rounded-2xl font-extrabold text-base transition shadow-xl shadow-lime-400/20 flex items-center justify-center gap-2 group"
              >
                Reservar Cancha Ahora
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-sm">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center border border-slate-700/50">
                <span className="bg-lime-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full mb-2">Turnos Online</span>
                <h3 className="text-2xl font-black text-white">¡Elegí tu horario!</h3>
                <p className="text-sm text-slate-300 mt-1">Rápido, fácil y sin vueltas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}