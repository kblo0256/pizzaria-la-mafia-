/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, MessageSquare, Shield, HelpCircle, Heart } from 'lucide-react';
import { WHATSAPP_URL } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: 'instagram' | 'whatsapp') => {
    if (platform === 'instagram') {
      window.open('https://instagram.com/pizzariarlamafia', '_blank', 'noopener,noreferrer');
    } else {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark border-t border-gold/15 py-16 text-light/70 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Main top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo / Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl font-extrabold tracking-widest text-light uppercase">
              La Máfia
              <span className="block text-xs text-gold tracking-[0.3em] font-light uppercase">
                Pizzaria
              </span>
            </h3>
            <p className="font-sans text-xs text-light/50 leading-relaxed max-w-sm">
              Sabor, tradição e sofisticação gastronômica. Massas artesanais de fermentação natural preparadas para honrar a sua mesa com o máximo respeito.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleSocialClick('instagram')}
                className="w-8 h-8 rounded-full border border-gold/20 hover:border-gold flex items-center justify-center text-light/70 hover:text-gold transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSocialClick('whatsapp')}
                className="w-8 h-8 rounded-full border border-gold/20 hover:border-gold flex items-center justify-center text-light/70 hover:text-gold transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-xs font-semibold tracking-widest uppercase text-gold">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {['hero', 'sobre', 'cardapio', 'pedido', 'avaliacoes', 'localizacao'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => scrollToSection(sec)}
                    className="hover:text-gold transition-colors text-light/60 capitalize cursor-pointer text-left"
                  >
                    {sec === 'hero' ? 'Início' : sec === 'pedido' ? 'Monte seu Pedido' : sec === 'localizacao' ? 'Contato' : sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Times & Address Column */}
          <div className="md:col-span-5 space-y-4 text-xs font-sans">
            <h4 className="font-serif text-xs font-semibold tracking-widest uppercase text-gold">
              Funcionamento &amp; Contato
            </h4>
            <p className="leading-relaxed">
              <strong className="text-light block font-serif tracking-wide mb-1 uppercase text-[10px]">Endereço:</strong>
              Av. Xavante, 555 — Caruara, Santos / SP <br />
              CEP: 11200-000
            </p>
            <p className="leading-relaxed">
              <strong className="text-light block font-serif tracking-wide mb-1 uppercase text-[10px]">Horários:</strong>
              Terça a Domingo: 18:00h às 23:30h <br />
              Segunda-feira: Fechado
            </p>
            <p className="leading-relaxed">
              <strong className="text-light block font-serif tracking-wide mb-1 uppercase text-[10px]">Atendimento WhatsApp:</strong>
              +55 (13) 99625-3682
            </p>
          </div>

        </div>

        {/* Bottom copyright and legal line */}
        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans">
          
          <div className="text-light/40 text-center sm:text-left">
            &copy; {currentYear} La Máfia Pizzaria. Todos os direitos reservados.
          </div>

          {/* Legal / Terms of usage (Mock elegant links) */}
          <div className="flex gap-6 text-light/45">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                alert('Aviso Legal: Política de Privacidade fictícia preparada para homologação.');
              }}
              className="hover:text-gold transition-all duration-300 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-gold/50" />
              <span>Política de Privacidade</span>
            </a>
            
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                alert('Aviso Legal: Termos de Uso fictícios preparados para homologação.');
              }}
              className="hover:text-gold transition-all duration-300 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-gold/50" />
              <span>Termos de Uso</span>
            </a>
          </div>

        </div>

        {/* Traditional Signature Footer */}
        <div className="text-center text-[10px] text-light/25 font-serif tracking-[0.2em] flex items-center justify-center gap-2">
          <span>FATTO CON</span>
          <Heart className="w-3 h-3 text-wine fill-current inline" />
          <span>PER LA FAMIGLIA</span>
        </div>

      </div>
    </footer>
  );
}
