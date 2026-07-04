/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Pizza, Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-md py-4 border-b border-gold/15 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="text-left select-none cursor-pointer focus:outline-none"
        >
          <h1 className="font-serif text-xl md:text-2xl font-extrabold tracking-widest text-light uppercase leading-none">
            La Máfia
            <span className="block text-[9px] text-gold tracking-[0.3em] font-light uppercase mt-0.5">
              Pizzaria
            </span>
          </h1>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-medium tracking-wider uppercase">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('sobre')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection('cardapio')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Cardápio
          </button>
          <button
            onClick={() => scrollToSection('pedido')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Pedido
          </button>
          <button
            onClick={() => scrollToSection('avaliacoes')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Avaliações
          </button>
          <button
            onClick={() => scrollToSection('localizacao')}
            className="text-light/80 hover:text-gold transition-colors cursor-pointer"
          >
            Contato
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('pedido')}
            className="bg-gold hover:bg-gold-hover text-dark px-4 py-2 rounded text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer hover:shadow-gold/10"
          >
            Pedir Agora
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gold hover:text-gold-hover transition-colors cursor-pointer"
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Slideout */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-gray/95 backdrop-blur-md absolute top-full left-0 w-full border-b border-gold/15 py-6 px-6 shadow-2xl space-y-4">
          <div className="flex flex-col gap-4 text-sm font-sans font-semibold tracking-wider uppercase">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('cardapio')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Cardápio
            </button>
            <button
              onClick={() => scrollToSection('pedido')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Monte seu Pedido
            </button>
            <button
              onClick={() => scrollToSection('avaliacoes')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Avaliações
            </button>
            <button
              onClick={() => scrollToSection('localizacao')}
              className="text-light/80 hover:text-gold transition-colors text-left py-1 cursor-pointer"
            >
              Contato
            </button>
            
            <button
              onClick={() => scrollToSection('pedido')}
              className="w-full bg-gold hover:bg-gold-hover text-dark text-center py-3 rounded text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
            >
              Pedir Agora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
