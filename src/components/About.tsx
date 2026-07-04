/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Heart, ShieldAlert } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wine/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-gold tracking-[0.3em] font-sans text-xs uppercase block">
            Nossa Essência
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-light">
            Tradição &amp; <span className="text-gold font-light">Respeito Absoluto</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold/50 mx-auto mt-4"></div>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Tile 1: The Soul (Col-span 8) */}
          <div className="md:col-span-8 bg-[#111] rounded-2xl border border-gold/15 p-8 flex flex-col justify-between relative overflow-hidden group min-h-[320px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full filter blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                ★★★★★ <span className="text-white/40">|</span> Excelência Italiana
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-light leading-tight">
                O pacto de honra com a <br />
                <span className="text-gold italic">Vera Pizza Napoletana</span>
              </h3>
              <p className="font-sans text-light/75 text-sm md:text-base leading-relaxed max-w-2xl">
                Inspirada no charme eterno do cinema clássico italiano e na profunda reverência
                que as antigas famílias da Itália têm pelo alimento, a <strong>La Máfia Pizzaria</strong> 
                nasce como um santuário de sofisticação gastronômica. Para nós, cozinhar é um pacto de honra,
                e cada pizza entregue é tratada com o máximo respeito que sua mesa merece.
              </p>
            </div>

            {/* Quick stats / Highlights embedded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-6">
              <div className="flex gap-3">
                <div className="text-gold flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold tracking-wider text-light uppercase">
                    Receita Original
                  </h4>
                  <p className="text-[11px] text-light/60 font-sans mt-0.5">
                    Processo artesanal com insumos da mais alta pureza.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-gold flex-shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-semibold tracking-wider text-light uppercase">
                    Cuidado Familiar
                  </h4>
                  <p className="text-[11px] text-light/60 font-sans mt-0.5">
                    Cada disco aberto manualmente por pizzaiolos dedicados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tile 2: Heritage Wine-Red Block (Col-span 4) */}
          <div className="md:col-span-4 bg-[#8B0000] text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold block mb-2">Tradição Guardada</span>
                <h3 className="font-serif italic text-3xl mb-4 text-white leading-tight">Nossa Herança</h3>
                <p className="text-xs leading-relaxed text-white/90 font-light">
                  Uma história que atravessa gerações, fundamentada no respeito absoluto à arte culinária italiana. Aqui, cada fatia é um compromisso indissolúvel com a alta gastronomia.
                </p>
              </div>
              <div className="mt-8 border-t border-white/20 pt-4 flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest text-white/70">Desde 1992</span>
                <span className="text-lg font-serif opacity-40 italic">Cosa Nostra</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-6 text-white/5 text-8xl font-serif font-bold italic select-none pointer-events-none">Tradição</div>
          </div>

          {/* Tile 3: The Origin story slot (Col-span 6) */}
          <div className="md:col-span-6 bg-[#161616] rounded-2xl border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden group min-h-[280px]">
            <div className="absolute top-0 left-0 w-1 bg-gold h-full"></div>
            <div className="space-y-4">
              <span className="text-gold/60 text-[10px] font-mono tracking-widest block uppercase">
                Respeito à Famiglia
              </span>
              <h4 className="font-serif text-lg tracking-wider text-gold uppercase font-bold">
                A Origem da Tradição
              </h4>
              <p className="font-sans text-xs text-light/70 leading-relaxed">
                Nossa história em Santos foi fundada no compromisso de resgatar a autêntica gastronomia artesanal italiana. Combinando farinha de trigo especial importada tipo 00 com um processo de fermentação natural de 48 horas, criamos massas de leveza incomparável, bordas perfeitamente aeradas e aromas inconfundíveis. Cada pizza que sai de nosso forno é o resultado de paciência, respeito absoluto aos ingredientes e honra à tradição.
              </p>
            </div>
            <div className="text-[10px] font-mono text-light/30 uppercase mt-4">
              La Máfia — Sabor e Honra em Cada Fatia
            </div>
          </div>

          {/* Tile 4: Preparation photo (Col-span 6) */}
          <div className="md:col-span-6 relative overflow-hidden rounded-2xl border border-white/5 min-h-[280px] group">
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/src/assets/images/pizza_artisanal_prep_1783179271075.jpg"
                alt="Preparação da Pizza"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            </motion.div>
            <div className="absolute bottom-6 left-6 z-20">
              <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase">
                PROCESSO ARTESANAL
              </span>
              <p className="text-white/80 text-xs mt-2 max-w-xs font-light">
                Discos abertos manualmente com bordas aeradas e assados sob temperatura controlada.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
