/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PizzaCategory, PizzaItem, BebidaItem } from '../types';
import { CATEGORIES_INFO, MENU_DATA, BEBIDAS_DATA } from '../data';
import { Pizza, Coffee, Wine, Sparkles, Tag, ChevronRight, Info } from 'lucide-react';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<PizzaCategory | 'bebidas'>('promocionais');
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const allModules = [
    {
      id: 'promocionais' as const,
      title: 'Pizzas Promocionais',
      description: 'Nossos sabores tradicionais com preços incríveis e promocionais.',
      priceInfo: { broto: '32,90', grande: '52,90' },
      items: MENU_DATA.promocionais
    },
    {
      id: 'especiais' as const,
      title: 'Pizzas Especiais',
      description: 'Combinações deliciosas preparadas com muito carinho.',
      priceInfo: { broto: '36,90', grande: '56,90' },
      items: MENU_DATA.especiais
    },
    {
      id: 'premium' as const,
      title: 'Pizzas Premium',
      description: 'Pizzas sofisticadas com ingredientes selecionados de alta qualidade.',
      priceInfo: { broto: '42,90', grande: '62,90' },
      items: MENU_DATA.premium
    },
    {
      id: 'mafia' as const,
      title: 'Código Lá Máfia',
      description: 'As criações lendárias e exclusivas da casa.',
      priceInfo: null,
      items: MENU_DATA.mafia
    },
    {
      id: 'doces' as const,
      title: 'Pizzas Doces',
      description: 'Pizzas doces irresistíveis para fechar com chave de ouro.',
      priceInfo: null,
      items: MENU_DATA.doces
    },
    {
      id: 'bebidas' as const,
      title: 'Bebidas Gélidas',
      description: 'Nossa refinada seleção de bebidas importadas e nacionais para harmonização.',
      priceInfo: null,
      items: BEBIDAS_DATA
    }
  ];

  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, clientWidth } = mobileScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        if (index !== activeMobileIndex && index >= 0 && index < allModules.length) {
          setActiveMobileIndex(index);
          const tabElement = document.getElementById(`mobile-tab-${index}`);
          if (tabElement) {
            tabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }
    }
  };

  const scrollToCategory = (index: number) => {
    if (mobileScrollRef.current) {
      const { clientWidth } = mobileScrollRef.current;
      mobileScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      setActiveMobileIndex(index);
    }
  };

  // Icons mapper for categories
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'promocionais':
        return <Tag className="w-4 h-4" />;
      case 'especiais':
        return <Pizza className="w-4 h-4 text-orange-400" />;
      case 'premium':
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'mafia':
        return <Wine className="w-4 h-4 text-red-400" />;
      case 'doces':
        return <Coffee className="w-4 h-4 text-pink-400" />;
      case 'bebidas':
        return <Wine className="w-4 h-4 text-blue-400" />;
      default:
        return <Pizza className="w-4 h-4" />;
    }
  };

  const currentCategoryInfo = CATEGORIES_INFO.find((c) => c.id === activeTab) || {
    title: 'Bebidas',
    description: 'Nossa refinada seleção de bebidas importadas e nacionais para harmonização.',
  };

  // Check if current tab is drinks or has actual data
  const actualItems = activeTab === 'bebidas' ? BEBIDAS_DATA : MENU_DATA[activeTab];
  const isMenuEmpty = actualItems.length === 0;

  return (
    <section id="cardapio" className="py-24 bg-dark relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-wine/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-gold tracking-[0.3em] font-sans text-xs uppercase block">
            Escolha Seus Sabores
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-light">
            O Cardápio <span className="text-gold font-light">La Máfia</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold/50 mx-auto mt-4"></div>
          <p className="font-sans text-light/60 text-sm max-w-xl mx-auto mt-2">
            Explore as nossas receitas de pizza artesanal preparadas com os melhores ingredientes selecionados e o verdadeiro respeito pela culinária clássica.
          </p>
        </div>

        {/* DESKTOP/TABLET VERSION */}
        <div className="hidden md:block space-y-8">
          {/* Navigation Tabs (Responsive & Elegant Bento Style) */}
          <div className="bg-[#111] p-2 rounded-2xl border border-white/5 flex justify-start md:justify-center overflow-x-auto pb-2 md:pb-2 mb-12 scrollbar-none gap-2 max-w-4xl mx-auto">
            {CATEGORIES_INFO.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-[#D4AF37]/10 text-gold border border-gold/30 shadow-sm shadow-[#D4AF37]/5'
                    : 'border border-transparent text-light/50 hover:text-light hover:bg-white/5'
                }`}
              >
                {getCategoryIcon(cat.id)}
                {cat.title}
              </button>
            ))}
            <button
              onClick={() => setActiveTab('bebidas')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === 'bebidas'
                  ? 'bg-[#D4AF37]/10 text-gold border border-gold/30 shadow-sm shadow-[#D4AF37]/5'
                  : 'border border-transparent text-light/50 hover:text-light hover:bg-white/5'
              }`}
            >
              {getCategoryIcon('bebidas')}
              Bebidas
            </button>
          </div>

          {/* Category Information Description Header (Bento Style) */}
          <div className="mb-8 p-6 border-l-4 border-gold bg-[#161616] rounded-r-2xl border-y border-r border-white/5">
            <h3 className="font-serif text-lg text-gold font-semibold tracking-wide">
              {currentCategoryInfo.title}
            </h3>
            <p className="font-sans text-xs text-light/70 mt-1 leading-relaxed">
              {currentCategoryInfo.description}
            </p>
          </div>

          {/* Menu Content Area */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {isMenuEmpty ? (
                  // IF EMPTY: Show elegantly styled blueprint template slots representing future components
                  <>
                    {activeTab !== 'bebidas' ? (
                      // Pizza item structural blueprint
                      [...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-xl bg-[#111] border border-dashed border-gold/20 hover:border-gold/50 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
                        >
                          <div className="absolute top-2 right-2 px-2 py-0.5 border border-gold/10 text-[9px] uppercase font-mono tracking-wider text-gold/60 rounded bg-dark">
                            Blueprint Slot #{index + 1}
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-lg font-bold tracking-wide text-light/70 uppercase">
                                [Nome da Pizza Especial #{index + 1}]
                              </h4>
                            </div>
                            
                            <p className="font-sans text-xs text-light/40 italic mt-2 pr-6">
                              [Ingredientes: Descrição da sua receita especial com detalhes, laticínios frescos, molhos artesanais e temperos especiais].
                            </p>
                          </div>

                          {/* Price tags structure */}
                          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gold/10">
                            <div className="text-left">
                              <span className="text-[10px] uppercase tracking-widest text-gold/50 block">Valor Broto</span>
                              <span className="font-mono text-xs text-gold/70 font-bold">R$ --,--</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] uppercase tracking-widest text-gold/50 block">Valor Grande</span>
                              <span className="font-mono text-sm text-gold font-bold">R$ --,--</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Beverage item structural blueprint
                      [...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-xl bg-[#111] border border-dashed border-gold/20 hover:border-gold/50 transition-all duration-500 flex justify-between items-center group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-gold/10 bg-dark flex items-center justify-center text-gold/40">
                              <Wine className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-serif text-sm font-semibold tracking-wider text-light/70 uppercase">
                                [Nome da Bebida Selecionada #{index + 1}]
                              </h4>
                              <p className="text-[10px] text-light/45 font-sans">Disponibilidade: Em estoque</p>
                            </div>
                          </div>
                          <span className="font-mono text-sm text-gold/70 font-bold">R$ --,--</span>
                        </div>
                      ))
                    )}

                    {/* Info helper card inside the menu category */}
                    <div className="md:col-span-2 mt-4 p-5 rounded border border-gold/15 bg-wine/10 flex items-start gap-3">
                      <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-serif text-sm text-gold font-semibold uppercase tracking-wider">
                          Estrutura do Cardápio Ativa
                        </h5>
                        <p className="font-sans text-xs text-light/70 mt-1 leading-relaxed">
                          Este cardápio está configurado com layouts premium e preparado para carregar dados automaticamente. Para torná-lo real, abra o arquivo <code>src/data.ts</code> e adicione seus sabores e valores aos arrays correspondentes. Ele calculará tudo instantaneamente!
                        </p>
                      </div>
                    </div>
                  </>
                ) : activeTab === 'bebidas' ? (
                  (() => {
                    const softDrinks = BEBIDAS_DATA.filter(b => ['b1', 'b2', 'b3', 'b4'].includes(b.id));
                    const beers = BEBIDAS_DATA.filter(b => ['b5', 'b6', 'b7'].includes(b.id));

                    return (
                      <div className="col-span-1 md:col-span-2 space-y-12 w-full">
                        {/* Refrigerantes Section */}
                        <div className="space-y-4">
                          <h4 className="font-serif text-lg text-gold font-semibold border-b border-gold/20 pb-2 tracking-wide flex items-center gap-2">
                            <span className="text-xl">🥤</span> Refrigerantes
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {softDrinks.map((beverage) => (
                              <div
                                key={beverage.id}
                                className="p-5 rounded-xl bg-[#111] border border-white/5 hover:border-gold/30 transition-all duration-300 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full border border-gold/10 bg-dark flex items-center justify-center text-gold">
                                    <Wine className="w-4 h-4 text-gold/80" />
                                  </div>
                                  <h5 className="font-serif text-sm font-semibold tracking-wider text-light uppercase">
                                    {beverage.name}
                                  </h5>
                                </div>
                                <span className="font-mono text-sm text-gold font-bold">
                                  R$ {beverage.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Cervejas Section */}
                        <div className="space-y-4">
                          <h4 className="font-serif text-lg text-gold font-semibold border-b border-gold/20 pb-2 tracking-wide flex items-center gap-2">
                            <span className="text-xl">🍺</span> Cervejas
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {beers.map((beverage) => (
                              <div
                                key={beverage.id}
                                className="p-5 rounded-xl bg-[#111] border border-white/5 hover:border-gold/30 transition-all duration-300 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full border border-gold/10 bg-dark flex items-center justify-center text-gold">
                                    <Wine className="w-4 h-4 text-gold/80" />
                                  </div>
                                  <h5 className="font-serif text-sm font-semibold tracking-wider text-light uppercase">
                                    {beverage.name}
                                  </h5>
                                </div>
                                <span className="font-mono text-sm text-gold font-bold">
                                  R$ {beverage.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  actualItems.map((item: any) => {
                    const pizza = item as PizzaItem;
                    const isSinglePrice = pizza.priceBroto === pizza.priceGrande;
                    return (
                      <div
                        key={pizza.id}
                        className="p-6 rounded-xl bg-[#111] border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg font-bold tracking-wide text-light uppercase">
                              {pizza.name}
                            </h4>
                          </div>
                          <p className="font-sans text-xs text-light/70 mt-2">
                            {pizza.ingredients}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gold/10">
                          {isSinglePrice ? (
                            <div className="w-full flex justify-between items-center">
                              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Preço Único</span>
                              <span className="font-mono text-base text-gold font-bold">R$ {pizza.priceGrande.toFixed(2)}</span>
                            </div>
                          ) : (
                            <>
                              <div className="text-left">
                                <span className="text-[10px] uppercase tracking-widest text-gold/50 block">Broto</span>
                                <span className="font-mono text-xs text-light font-bold">R$ {pizza.priceBroto.toFixed(2)}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] uppercase tracking-widest text-gold block">Grande</span>
                                <span className="font-mono text-sm text-gold font-bold">R$ {pizza.priceGrande.toFixed(2)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="block md:hidden space-y-6">
          {/* Sincronized Horizontal Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x px-1 scroll-smooth" id="mobile-tabs">
            {allModules.map((mod, idx) => (
              <button
                key={mod.id}
                id={`mobile-tab-${idx}`}
                onClick={() => scrollToCategory(idx)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-sans font-medium text-[11px] tracking-wider uppercase transition-all duration-300 whitespace-nowrap snap-center border ${
                  activeMobileIndex === idx
                    ? 'bg-[#D4AF37]/10 text-gold border border-[#D4AF37]/30 shadow-sm shadow-[#D4AF37]/5'
                    : 'bg-[#111] border border-white/5 text-light/50 hover:text-light'
                }`}
              >
                {getCategoryIcon(mod.id)}
                {mod.title}
              </button>
            ))}
          </div>

          {/* Single Main Card with horizontal scrolling logic */}
          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-[#111] to-transparent pointer-events-none z-10 opacity-70"></div>
            <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10 opacity-70"></div>

            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {allModules.map((mod, idx) => (
                <div
                  key={mod.id}
                  className="w-full flex-shrink-0 snap-center p-5 space-y-5 flex flex-col justify-between"
                  style={{ minHeight: '400px' }}
                >
                  <div className="space-y-4">
                    {/* Module Header */}
                    <div className="border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="p-1.5 bg-[#D4AF37]/10 rounded-lg text-gold flex items-center justify-center">
                          {getCategoryIcon(mod.id)}
                        </span>
                        <h3 className="font-serif text-lg text-gold font-black tracking-wide uppercase">
                          {mod.title}
                        </h3>
                      </div>
                      <p className="font-sans text-[11px] text-light/55 leading-relaxed">
                        {mod.description}
                      </p>
                      
                      {mod.priceInfo && (
                        <div className="mt-2.5 p-2 bg-dark/40 border border-[#D4AF37]/20 rounded-lg flex items-center justify-around text-[10px] font-mono tracking-wider text-light/70 uppercase">
                          <span>Broto: <strong className="text-light">R$ {mod.priceInfo.broto}</strong></span>
                          <span className="text-white/10">|</span>
                          <span>Grande: <strong className="text-gold font-bold">R$ {mod.priceInfo.grande}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Full List of Module Items */}
                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                      {mod.items.map((item: any) => {
                        if (mod.id === 'bebidas') {
                          const isSoftDrink = ['b1', 'b2', 'b3', 'b4'].includes(item.id);
                          return (
                            <div
                              key={item.id}
                              className="p-3.5 rounded-xl bg-dark/30 border border-white/5 flex justify-between items-center hover:border-gold/20 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-base">{isSoftDrink ? '🥤' : '🍺'}</span>
                                <h4 className="font-serif text-[11px] font-bold tracking-wider text-light uppercase">
                                  {item.name}
                                </h4>
                              </div>
                              <span className="font-mono text-xs text-gold font-bold">
                                R$ {item.price.toFixed(2)}
                              </span>
                            </div>
                          );
                        } else {
                          const pizza = item as PizzaItem;
                          const isSinglePrice = pizza.priceBroto === pizza.priceGrande;
                          return (
                            <div
                              key={pizza.id}
                              className="p-4 rounded-xl bg-dark/30 border border-white/5 flex flex-col gap-2 hover:border-gold/20 transition-all duration-300"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-serif text-xs font-bold tracking-wider text-light uppercase">
                                  {pizza.name}
                                </h4>
                                {isSinglePrice && (
                                  <span className="font-mono text-[9px] text-gold font-black bg-gold/10 px-1.5 py-0.5 rounded border border-gold/15">
                                    R$ {pizza.priceGrande.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              {pizza.ingredients && (
                                <p className="font-sans text-[10px] text-light/50 leading-relaxed">
                                  {pizza.ingredients}
                                </p>
                              )}

                              {!isSinglePrice && (
                                <div className="flex gap-3 pt-2 border-t border-white/5 text-[9px] font-mono tracking-wide">
                                  <span className="text-light/40">
                                    Broto: <strong className="text-light font-bold">R$ {pizza.priceBroto.toFixed(2)}</strong>
                                  </span>
                                  <span className="text-white/10">|</span>
                                  <span className="text-gold/70">
                                    Grande: <strong className="text-gold font-black">R$ {pizza.priceGrande.toFixed(2)}</strong>
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Drag Gesture Footer Indicator */}
                  <div className="pt-3 flex justify-between items-center text-[9px] text-light/25 font-mono tracking-widest border-t border-white/5 mt-3 select-none">
                    <span className="flex items-center gap-1 animate-pulse">
                      ◀ Deslize para navegar ▶
                    </span>
                    <span className="text-gold/40 font-bold bg-[#D4AF37]/5 px-2 py-0.5 rounded-full border border-gold/10">
                      MÓDULO {idx + 1} DE {allModules.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
