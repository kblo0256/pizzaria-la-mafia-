/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Navigation, Share2 } from 'lucide-react';
import { WHATSAPP_URL } from '../data';

export default function LocationSection() {
  const handleDirectionsClick = () => {
    // Elegant navigation handler to open coordinates in external maps
    const address = 'Av. Xavante, 555 - Caruara, Santos - SP, 11200-000, Brasil';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="localizacao" className="py-24 bg-dark-gray relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-gold tracking-[0.3em] font-sans text-xs uppercase block">
                Onde Nos Encontrar
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-light">
                Venha nos <br />
                <span className="text-gold font-light">Visitar</span>
              </h2>
              <div className="w-16 h-[2px] bg-gold/50 mt-4"></div>
              <p className="font-sans text-light/60 text-xs mt-2">
                Estamos estrategicamente localizados para garantir um atendimento rápido e uma entrega sempre fumegante.
              </p>
            </div>

            {/* Contacts details list */}
            <div className="space-y-6">
              
              {/* Endereço */}
              <div className="flex gap-4 p-4 rounded-lg bg-dark/40 border border-gold/10 hover:border-gold/25 transition-all">
                <div className="text-gold flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-light uppercase">
                    Endereço
                  </h4>
                  <p className="text-xs text-light/70 font-sans mt-1">
                    Av. Xavante, 555 <br />
                    Bairro Caruara — Santos / SP <br />
                    CEP 11200-000
                  </p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex gap-4 p-4 rounded-lg bg-dark/40 border border-gold/10 hover:border-gold/25 transition-all">
                <div className="text-gold flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-light uppercase">
                    Horário de Funcionamento
                  </h4>
                  <p className="text-xs text-light/70 font-sans mt-1">
                    Terça a Domingo <br />
                    Das 18:00h às 23:30h <br />
                    <span className="text-gold font-semibold">(Fechado às Segundas-feiras)</span>
                  </p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex gap-4 p-4 rounded-lg bg-dark/40 border border-gold/10 hover:border-gold/25 transition-all">
                <div className="text-gold flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-light uppercase">
                    Contato Direto
                  </h4>
                  <p className="text-xs text-light/70 font-sans mt-1">
                    Telefone Fixo: (44) 3649-6311 <br />
                    WhatsApp Delivery: <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline decoration-gold/30">+55 (13) 99625-3682</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Quick directions link */}
            <button
              onClick={handleDirectionsClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-gold hover:text-gold-hover border border-gold/40 hover:border-gold px-6 py-3 rounded font-sans font-bold uppercase tracking-wider text-xs transition-all cursor-pointer text-shadow-gold"
            >
              <Navigation className="w-4 h-4" />
              <span>Como Chegar (Google Maps)</span>
            </button>
          </div>

          {/* Map Column (Right) */}
          <div className="lg:col-span-7 h-[400px] rounded-lg overflow-hidden border border-gold/20 shadow-2xl relative group">
            {/* Custom dark map style layer using advanced CSS filters */}
            <iframe
              src="https://maps.google.com/maps?q=Av.%20Xavante,%20555,%20Caruara,%20Santos,%20SP,%20Brasil&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Localização La Máfia Pizzaria"
              className="absolute inset-0 z-10 w-full h-full object-cover select-none"
            ></iframe>
            
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent pointer-events-none z-20"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
