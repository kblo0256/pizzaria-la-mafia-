/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Flame, Shield, Award, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-16">
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/pizza_hero_banner_1783179258561.jpg"
          alt="Pizza Artesanal La Máfia"
          className="w-full h-full object-cover scale-105 filter brightness-45 contrast-110 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Overlays (Radial and Linear Gradients to enhance readability and premium feel) */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark/85"></div>
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-8">
        {/* Trust Indicator Header */}
        <motion.div
          className="inline-flex items-center gap-1 bg-dark-gray/90 border border-gold/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-light/90 ml-2">
            Padrão de Qualidade Máximo
          </span>
        </motion.div>

        {/* Cinematic Display Title */}
        <motion.h1
          className="font-serif text-5xl md:text-8xl tracking-[0.1em] font-extrabold text-light uppercase mb-6 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          La Máfia
          <span className="block text-2xl md:text-3xl text-gold tracking-[0.3em] font-light mt-2 font-serif uppercase">
            Pizzaria
          </span>
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p
          className="font-sans text-base md:text-xl text-light/85 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sabores marcantes, respeito absoluto pela tradição gastronômica italiana.
          Massas artesanais de fermentação lenta com ingredientes selecionados sob a mais alta exigência.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => scrollToSection('pedido')}
            className="w-full sm:w-auto bg-wine hover:bg-wine-hover text-light border border-wine/50 px-8 py-4 rounded-md font-sans font-semibold tracking-wider uppercase text-sm transition-all duration-300 shadow-xl cursor-pointer hover:shadow-wine/10"
          >
            Fazer Pedido
          </button>
          
          <button
            onClick={() => scrollToSection('cardapio')}
            className="w-full sm:w-auto bg-transparent hover:bg-light/5 text-gold border border-gold/40 hover:border-gold px-8 py-4 rounded-md font-sans font-semibold tracking-wider uppercase text-sm transition-all duration-300 cursor-pointer text-shadow-gold"
          >
            Ver Cardápio
          </button>
        </motion.div>

        {/* Core Pillars / Badges of Trust */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-gold/15 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-dark-gray border border-gold/20 flex items-center justify-center text-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-light">
              Ingredientes Selecionados
            </h3>
            <p className="text-xs text-light/60 font-sans">
              Curadoria dos melhores laticínios, tomates e embutidos.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 border-y sm:border-y-0 sm:border-x border-gold/15 py-4 sm:py-0">
            <div className="w-10 h-10 rounded-full bg-dark-gray border border-gold/20 flex items-center justify-center text-gold">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-light">
              Massa Artesanal
            </h3>
            <p className="text-xs text-light/60 font-sans">
              48h de fermentação natural. Extrema leveza e crocância.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-dark-gray border border-gold/20 flex items-center justify-center text-gold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-sm tracking-widest uppercase font-semibold text-light">
              Entrega Rápida
            </h3>
            <p className="text-xs text-light/60 font-sans">
              Sua pizza chega impecável, quente e suculenta em sua mesa.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gold/60 hover:text-gold cursor-pointer transition-colors" onClick={() => scrollToSection('sobre')}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
