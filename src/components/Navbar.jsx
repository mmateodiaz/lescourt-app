import React from 'react';
import { Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-lime-400 p-2 rounded-xl text-slate-950 font-black text-xl tracking-wider">
            LC
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            LES <span className="text-lime-400">COURTS</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#inicio" className="hover:text-lime-400 transition">Inicio</a>
          <a href="#instalaciones" className="hover:text-lime-400 transition">Canchas</a>
          <a href="#reservas" className="hover:text-lime-400 transition">Reservas</a>
          <a href="#contacto" className="hover:text-lime-400 transition">Contacto</a>
        </nav>

        <div>
          <a
            href="#reservas"
            className="bg-lime-400 hover:bg-lime-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-lime-400/20 text-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Reservar Turno
          </a>
        </div>
      </div>
    </header>
  );
}