/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Quote, Award } from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// Prepare sample high-quality structured items which can be edited/added to later
const PREPARED_REVIEWS: ReviewItem[] = [
  {
    id: 'r-1',
    author: 'Giovanni Bellini',
    rating: 5,
    comment: 'A melhor pizza de fermentação natural da região. O molho de tomate é absurdamente fresco e o ambiente lembra as verdadeiras trattorias de Palermo. Respeito total pela gastronomia!',
    date: 'Ontem'
  },
  {
    id: 'r-2',
    author: 'Alessandra S.',
    rating: 5,
    comment: 'Excepcional! A massa é leve, crocante nas bordas e macia no centro. Pedimos pelo WhatsApp e o atendimento foi rápido, com entrega impecável e pizza quente de verdade.',
    date: 'Há 3 dias'
  },
  {
    id: 'r-3',
    author: 'Carlos Henrique Ramos',
    rating: 5,
    comment: 'Pizzaria espetacular em Santos! Recomendo muito o sabor Don Corleone, a calabresa artesanal curada com queijo pecorino dá um toque italiano perfeito. Entrega super rápida e muito atenciosa.',
    date: 'Há 1 semana'
  }
];

export default function Reviews() {
  return (
    <section id="avaliacoes" className="py-24 bg-dark relative overflow-hidden">
      {/* Background visual styling */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-wine/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-gold tracking-[0.3em] font-sans text-xs uppercase block">
            A Opinião de Quem Importa
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-light">
            Depoimentos &amp; <span className="text-gold font-light">Avaliações</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold/50 mx-auto mt-4"></div>
          <p className="font-sans text-light/60 text-sm max-w-md mx-auto">
            A honra de servir bem se reflete na satisfação e no respeito dos nossos clientes fiéis.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PREPARED_REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`p-8 rounded-lg bg-dark-gray border relative flex flex-col justify-between min-h-[250px] transition-all duration-300 ${
                review.id === 'r-3' 
                  ? 'border-dashed border-gold/25 opacity-75 hover:opacity-100 hover:border-gold/55' 
                  : 'border-gold/10 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5'
              }`}
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-gold/10 group-hover:text-gold/20 transition-colors">
                <Quote className="w-8 h-8 transform rotate-180" />
              </div>

              <div className="space-y-4">
                {/* Stars Rating */}
                <div className="flex text-gold gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-xs md:text-sm text-light/80 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-gold/10 pt-4 mt-6 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-xs md:text-sm font-semibold tracking-wider text-light uppercase">
                    {review.author}
                  </h4>
                  <span className="text-[10px] text-light/45 font-sans block mt-0.5">
                    Cliente La Máfia
                  </span>
                </div>
                
                <span className="font-mono text-[9px] text-gold/60 uppercase tracking-widest bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic score counter */}
        <div className="mt-16 text-center border-t border-gold/10 pt-10">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-dark-gray/80 border border-gold/15 px-8 py-4 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl font-extrabold text-gold text-shadow-gold">4.9</span>
              <div className="text-left">
                <div className="flex text-gold gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-light/50 font-sans">Pontuação média de avaliações</span>
              </div>
            </div>
            
            <div className="hidden sm:block w-[1px] h-8 bg-gold/20"></div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-xs tracking-wider uppercase font-semibold text-light font-sans">
                Aprovada por +1.200 famílias da região
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
