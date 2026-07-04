/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PizzaCategory, PizzaOrderInput, BebidaOrderInput, ClientData, PaymentMethod, OrderState } from '../types';
import { CATEGORIES_INFO, MENU_DATA, BEBIDAS_DATA, BASE_CATEGORY_PRICES, BASE_BEBIDA_PRICE, WHATSAPP_URL } from '../data';
import { Plus, Trash2, ShoppingBag, MapPin, CreditCard, MessageSquare, ClipboardCheck, Info, User, Phone, Edit3 } from 'lucide-react';

export default function OrderForm() {
  // --- Form State ---
  const [pizzas, setPizzas] = useState<PizzaOrderInput[]>([
    {
      id: 'p-initial-1',
      type: 'inteira',
      category: 'promocionais',
      flavor: '',
      category2: 'promocionais',
      flavor2: '',
      size: 'grande',
      quantity: 1,
    },
  ]);

  // For beverages selection when empty or populated
  const [customBebidas, setCustomBebidas] = useState<BebidaOrderInput[]>([
    { id: 'b-initial-1', name: '', quantity: 0 }
  ]);
  
  // For pre-populated beverages list quantites
  const [populatedBebidasQty, setPopulatedBebidasQty] = useState<Record<string, number>>({});

  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zip: '',
    reference: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');
  const [changeFor, setChangeFor] = useState<string>('');
  const [observations, setObservations] = useState<string>('');

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');

  // Delivery tax configuration (can be changed easily)
  const DELIVERY_TAX = 7.00;

  // --- CEP auto-fill API integration ---
  const fetchCep = async (zipCode: string) => {
    const cleanZip = zipCode.replace(/\D/g, '');
    if (cleanZip.length === 8) {
      setIsLoadingCep(true);
      setCepError('');
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanZip}/json/`);
        const data = await response.json();
        if (data.erro) {
          setCepError('CEP não encontrado. Verifique o número digitado.');
        } else {
          setClientData((prev) => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade && data.uf ? `${data.localidade} / ${data.uf}` : (data.localidade || ''),
          }));
        }
      } catch (err) {
        setCepError('Erro ao buscar o CEP. Tente preencher manualmente.');
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const numbersOnly = value.replace(/\D/g, '');
    let formatted = numbersOnly;
    if (numbersOnly.length > 5) {
      formatted = `${numbersOnly.slice(0, 5)}-${numbersOnly.slice(5, 8)}`;
    }
    setClientData((prev) => ({ ...prev, zip: formatted }));

    if (numbersOnly.length === 8) {
      fetchCep(numbersOnly);
    } else {
      setCepError('');
    }
  };

  // --- Actions ---
  const addPizza = () => {
    setPizzas([
      ...pizzas,
      {
        id: `p-${Date.now()}`,
        type: 'inteira',
        category: 'promocionais',
        flavor: '',
        category2: 'promocionais',
        flavor2: '',
        size: 'grande',
        quantity: 1,
      },
    ]);
  };

  const removePizza = (id: string) => {
    if (pizzas.length > 1) {
      setPizzas(pizzas.filter((p) => p.id !== id));
    } else {
      // Clear first pizza instead of deleting it completely
      setPizzas([
        {
          id: 'p-initial-1',
          type: 'inteira',
          category: 'promocionais',
          flavor: '',
          category2: 'promocionais',
          flavor2: '',
          size: 'grande',
          quantity: 1,
        },
      ]);
    }
  };

  const updatePizzaField = (id: string, field: keyof PizzaOrderInput, value: any) => {
    setPizzas(
      pizzas.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };
          if (field === 'category') {
            updated.flavor = ''; // Reset flavor when changing category to prevent mismatches
          }
          if (field === 'category2') {
            updated.flavor2 = ''; // Reset flavor2 when changing category2
          }
          if (field === 'type' && value === 'meio-a-meio') {
            if (!updated.category2) updated.category2 = 'promocionais';
            if (!updated.flavor2) updated.flavor2 = '';
          }
          return updated;
        }
        return p;
      })
    );
  };

  const addCustomBebida = () => {
    setCustomBebidas([
      ...customBebidas,
      { id: `b-${Date.now()}`, name: '', quantity: 1 }
    ]);
  };

  const removeCustomBebida = (id: string) => {
    setCustomBebidas(customBebidas.filter((b) => b.id !== id));
  };

  const updateCustomBebidaField = (id: string, field: keyof BebidaOrderInput, value: any) => {
    setCustomBebidas(
      customBebidas.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const updatePopulatedBebidaQty = (id: string, delta: number) => {
    const current = populatedBebidasQty[id] || 0;
    const next = Math.max(0, current + delta);
    setPopulatedBebidasQty({
      ...populatedBebidasQty,
      [id]: next
    });
  };

  // Helper to calculate pricing for single or half-and-half pizza unit
  const getPizzaUnitPrice = (p: PizzaOrderInput) => {
    const realCategoryItems1 = MENU_DATA[p.category] || [];
    const realItem1 = realCategoryItems1.find((item) => item.name.toLowerCase() === p.flavor.toLowerCase());
    const price1 = realItem1 
      ? (p.size === 'broto' ? realItem1.priceBroto : realItem1.priceGrande)
      : (p.size === 'broto' ? BASE_CATEGORY_PRICES[p.category].broto : BASE_CATEGORY_PRICES[p.category].grande);

    if (p.type === 'meio-a-meio') {
      const cat2 = p.category2 || 'promocionais';
      const flav2 = p.flavor2 || '';
      const realCategoryItems2 = MENU_DATA[cat2] || [];
      const realItem2 = realCategoryItems2.find((item) => item.name.toLowerCase() === flav2.toLowerCase());
      const price2 = realItem2
        ? (p.size === 'broto' ? realItem2.priceBroto : realItem2.priceGrande)
        : (p.size === 'broto' ? BASE_CATEGORY_PRICES[cat2].broto : BASE_CATEGORY_PRICES[cat2].grande);
      
      return Math.max(price1, price2);
    }

    return price1;
  };

  // --- Dynamic Pricing Calculations ---
  const calculationSummary = useMemo(() => {
    let subtotal = 0;
    let pizzaCount = 0;
    let bebidaCount = 0;

    // 1. Calculate Pizzas
    pizzas.forEach((p) => {
      const pricePerUnit = getPizzaUnitPrice(p);
      subtotal += pricePerUnit * p.quantity;
      pizzaCount += p.quantity;
    });

    // 2. Calculate Beverages
    const hasPopulatedDrinks = BEBIDAS_DATA.length > 0;
    if (hasPopulatedDrinks) {
      BEBIDAS_DATA.forEach((b) => {
        const qty = populatedBebidasQty[b.id] || 0;
        if (qty > 0) {
          subtotal += b.price * qty;
          bebidaCount += qty;
        }
      });
    } else {
      customBebidas.forEach((b) => {
        if (b.name.trim() !== '' && b.quantity > 0) {
          subtotal += BASE_BEBIDA_PRICE * b.quantity;
          bebidaCount += b.quantity;
        }
      });
    }

    const total = subtotal > 0 ? subtotal + DELIVERY_TAX : 0;

    return {
      subtotal,
      total,
      pizzaCount,
      bebidaCount,
      grandTotalCount: pizzaCount + bebidaCount
    };
  }, [pizzas, customBebidas, populatedBebidasQty]);

  // --- Send WhatsApp Order ---
  const handleSendOrder = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!clientData.name || !clientData.phone || !clientData.street || !clientData.number || !clientData.neighborhood) {
      alert('Por favor, preencha os campos obrigatórios dos Dados de Entrega (Nome, Telefone, Rua, Número e Bairro).');
      return;
    }

    const validPizzas = pizzas.filter((p) => {
      if (p.type === 'meio-a-meio') {
        return p.flavor.trim() !== '' && (p.flavor2 || '').trim() !== '';
      }
      return p.flavor.trim() !== '';
    });
    const validBebidas: { name: string; qty: number; price: number }[] = [];

    const hasPopulatedDrinks = BEBIDAS_DATA.length > 0;
    if (hasPopulatedDrinks) {
      BEBIDAS_DATA.forEach((b) => {
        const qty = populatedBebidasQty[b.id] || 0;
        if (qty > 0) {
          validBebidas.push({ name: b.name, qty, price: b.price });
        }
      });
    } else {
      customBebidas.forEach((b) => {
        if (b.name.trim() !== '' && b.quantity > 0) {
          validBebidas.push({ name: b.name, qty: b.quantity, price: BASE_BEBIDA_PRICE });
        }
      });
    }

    if (validPizzas.length === 0 && validBebidas.length === 0) {
      alert('Adicione pelo menos uma pizza com sabor preenchido ou uma bebida ao seu pedido.');
      return;
    }

    // Compose message
    let msg = `🍷 *LA MÁFIA PIZZARIA - NOVO PEDIDO* 🍕\n`;
    msg += `======================================\n`;
    msg += `*RESPEITO E TRADIÇÃO EM SUA MESA*\n\n`;

    if (validPizzas.length > 0) {
      msg += `*🍕 PIZZAS ADICIONADAS:*\n`;
      validPizzas.forEach((p, idx) => {
        const sizeLabel = p.size === 'broto' ? 'Broto' : 'Grande';
        const price = getPizzaUnitPrice(p);

        if (p.type === 'meio-a-meio') {
          msg += `${idx + 1}. *${p.quantity}x Pizza ${sizeLabel}*\n`;
          msg += `   *Meio a Meio*\n`;
          msg += `   • 50% ${p.flavor.trim()}\n`;
          msg += `   • 50% ${(p.flavor2 || '').trim()}\n`;
          msg += `   - Subtotal: R$ ${(price * p.quantity).toFixed(2)}\n\n`;
        } else {
          msg += `${idx + 1}. *${p.quantity}x Pizza ${sizeLabel}*\n`;
          msg += `   • Sabor: ${p.flavor.trim()}\n`;
          msg += `   - Subtotal: R$ ${(price * p.quantity).toFixed(2)}\n\n`;
        }
      });
    }

    if (validBebidas.length > 0) {
      msg += `*🥤 BEBIDAS ADICIONADAS:*\n`;
      validBebidas.forEach((b, idx) => {
        msg += `${idx + 1}. *${b.name.trim()}*\n`;
        msg += `   - Quantidade: ${b.qty}x\n`;
        msg += `   - Valor: R$ ${(b.price * b.qty).toFixed(2)}\n\n`;
      });
    }

    msg += `======================================\n`;
    msg += `*📍 DADOS PARA ENTREGA:*\n`;
    msg += `- *Nome:* ${clientData.name.trim()}\n`;
    msg += `- *Telefone:* ${clientData.phone.trim()}\n`;
    msg += `- *Endereço:* ${clientData.street.trim()}, Nº ${clientData.number.trim()}\n`;
    msg += `- *Bairro:* ${clientData.neighborhood.trim()}\n`;
    if (clientData.complement) msg += `- *Complemento:* ${clientData.complement.trim()}\n`;
    if (clientData.city) msg += `- *Cidade:* ${clientData.city.trim()}\n`;
    if (clientData.zip) msg += `- *CEP:* ${clientData.zip.trim()}\n`;
    if (clientData.reference) msg += `- *Referência:* ${clientData.reference.trim()}\n`;
    msg += `\n`;

    msg += `======================================\n`;
    msg += `*💳 FORMA DE PAGAMENTO:*\n`;
    msg += `- *Modo:* ${paymentMethod}\n`;
    if (paymentMethod === 'DINHEIRO' && changeFor) {
      msg += `- *Troco para:* R$ ${changeFor.trim()}\n`;
    }
    if (observations.trim()) {
      msg += `- *Observações:* ${observations.trim()}\n`;
    }
    msg += `\n`;

    msg += `======================================\n`;
    msg += `*💵 RESUMO FINANCEIRO:*\n`;
    msg += `- *Subtotal:* R$ ${calculationSummary.subtotal.toFixed(2)}\n`;
    msg += `- *Taxa de Entrega:* R$ ${DELIVERY_TAX.toFixed(2)} (Fixa)\n`;
    msg += `- *TOTAL GERAL:* R$ ${calculationSummary.total.toFixed(2)}\n`;
    msg += `======================================\n`;
    msg += `_Agradecemos a honra e a preferência!_`;

    // WhatsApp URL creation with dynamic text added to the official endpoint
    const whatsappUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(msg)}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pedido" className="py-24 bg-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-wine/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-gold tracking-[0.3em] font-sans text-xs uppercase block">
            Crie Seu Pedido Personalizado
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-light">
            Monte <span className="text-gold font-light">Seu Pedido</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold/50 mx-auto mt-4"></div>
          <p className="font-sans text-light/60 text-sm max-w-lg mx-auto">
            Adicione suas pizzas favoritas, selecione as bebidas, insira os dados de entrega e finalize diretamente no nosso canal oficial.
          </p>
        </div>

        {/* Info Box about Menu Status (Bento Style) */}
        <div className="mb-10 p-6 rounded-2xl bg-[#111] border border-white/5 flex items-start gap-3">
          <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-serif text-sm text-gold font-semibold uppercase tracking-wider">
              Simulador Inteligente Ativado
            </h5>
            <p className="font-sans text-xs text-light/75 leading-relaxed">
              Como o cardápio está preparado para receber seus dados, você pode digitar livremente os sabores de pizza desejados nos campos de texto abaixo. O sistema usará os preços base configurados de cada categoria para realizar a simulação financeira em tempo real!
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <form onSubmit={handleSendOrder} className="space-y-8">
          
          {/* 1. SECTION: PIZZAS (Bento Style Card) */}
          <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold text-light tracking-wide flex items-center gap-2">
                <span className="text-gold">01.</span> Escolha as Pizzas
              </h3>
              <span className="text-xs font-sans text-gold bg-[#D4AF37]/5 px-3 py-1 rounded-xl border border-gold/25">
                {calculationSummary.pizzaCount} Pizza(s) adicionada(s)
              </span>
            </div>

            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {pizzas.map((pizza, index) => {
                  const estimatedUnitPrice = getPizzaUnitPrice(pizza);

                  return (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-5 bg-[#161616] rounded-xl border border-white/5 relative flex flex-col gap-4 overflow-hidden shadow-inner"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="font-serif text-xs tracking-wider text-gold font-semibold uppercase">
                          Pizza #{index + 1}
                        </span>
                        
                        {pizzas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePizza(pizza.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1 cursor-pointer"
                            title="Remover pizza"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Pizza Type Toggle */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                          Tipo de Pizza *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => updatePizzaField(pizza.id, 'type', 'inteira')}
                            className={`py-2.5 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                              pizza.type === 'inteira'
                                ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light hover:border-white/10'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${pizza.type === 'inteira' ? 'bg-gold animate-ping' : 'bg-transparent'}`}></span>
                            Pizza Inteira
                          </button>
                          <button
                            type="button"
                            onClick={() => updatePizzaField(pizza.id, 'type', 'meio-a-meio')}
                            className={`py-2.5 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                              pizza.type === 'meio-a-meio'
                                ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light hover:border-white/10'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${pizza.type === 'meio-a-meio' ? 'bg-gold animate-ping' : 'bg-transparent'}`}></span>
                            Meio a Meio
                          </button>
                        </div>
                      </div>

                      {pizza.type === 'meio-a-meio' ? (
                        <div className="space-y-4">
                          {/* Primeiro Sabor */}
                          <div className="p-4 bg-[#111] rounded-xl border border-white/5 space-y-3">
                            <h4 className="font-serif text-[10px] text-gold font-bold uppercase tracking-wider">Metade 1 (Esquerda)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Categoria 1 */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                                  Categoria *
                                </label>
                                <select
                                  value={pizza.category}
                                  onChange={(e) => updatePizzaField(pizza.id, 'category', e.target.value as PizzaCategory)}
                                  className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                                >
                                  {CATEGORIES_INFO.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.title}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Sabor 1 */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                                  Sabor *
                                </label>
                                <select
                                  required
                                  value={pizza.flavor}
                                  onChange={(e) => updatePizzaField(pizza.id, 'flavor', e.target.value)}
                                  className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                                >
                                  <option value="" disabled>Selecione o sabor...</option>
                                  {(MENU_DATA[pizza.category] || []).map((item) => (
                                    <option key={item.id} value={item.name}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Segundo Sabor */}
                          <div className="p-4 bg-[#111] rounded-xl border border-white/5 space-y-3">
                            <h4 className="font-serif text-[10px] text-gold font-bold uppercase tracking-wider">Metade 2 (Direita)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Categoria 2 */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                                  Categoria *
                                </label>
                                <select
                                  value={pizza.category2 || 'promocionais'}
                                  onChange={(e) => updatePizzaField(pizza.id, 'category2', e.target.value as PizzaCategory)}
                                  className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                                >
                                  {CATEGORIES_INFO.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.title}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Sabor 2 */}
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                                  Sabor *
                                </label>
                                <select
                                  required
                                  value={pizza.flavor2 || ''}
                                  onChange={(e) => updatePizzaField(pizza.id, 'flavor2', e.target.value)}
                                  className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                                >
                                  <option value="" disabled>Selecione o sabor...</option>
                                  {(MENU_DATA[pizza.category2 || 'promocionais'] || []).map((item) => (
                                    <option key={item.id} value={item.name}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Tamanho */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                              Tamanho *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => updatePizzaField(pizza.id, 'size', 'broto')}
                                className={`py-2 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border ${
                                  pizza.size === 'broto'
                                    ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                    : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light'
                                }`}
                              >
                                Broto
                              </button>
                              <button
                                type="button"
                                onClick={() => updatePizzaField(pizza.id, 'size', 'grande')}
                                className={`py-2 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border ${
                                  pizza.size === 'grande'
                                    ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                    : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light'
                                }`}
                              >
                                Grande
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Categoria */}
                          <div className="md:col-span-4 flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                              Categoria *
                            </label>
                            <select
                              value={pizza.category}
                              onChange={(e) => updatePizzaField(pizza.id, 'category', e.target.value as PizzaCategory)}
                              className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                            >
                              {CATEGORIES_INFO.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Sabor / Seleção do Cardápio */}
                          <div className="md:col-span-5 flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                              Sabor *
                            </label>
                            <select
                              required
                              value={pizza.flavor}
                              onChange={(e) => updatePizzaField(pizza.id, 'flavor', e.target.value)}
                              className="bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all cursor-pointer font-sans"
                            >
                              <option value="" disabled>Selecione o sabor...</option>
                              {(MENU_DATA[pizza.category] || []).map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Tamanho */}
                          <div className="md:col-span-3 flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                              Tamanho *
                            </label>
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                type="button"
                                onClick={() => updatePizzaField(pizza.id, 'size', 'broto')}
                                className={`py-2 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border ${
                                  pizza.size === 'broto'
                                    ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                    : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light'
                                }`}
                              >
                                Broto
                              </button>
                              <button
                                type="button"
                                onClick={() => updatePizzaField(pizza.id, 'size', 'grande')}
                                className={`py-2 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border ${
                                  pizza.size === 'grande'
                                    ? 'bg-[#D4AF37]/10 text-gold border-gold'
                                    : 'bg-[#0B0B0B] text-light/50 border-white/5 hover:text-light'
                                }`}
                              >
                                Grande
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Requirement 4: Real-time Live formatted Visual Card Preview */}
                      <div className="mt-2 p-4 rounded-xl bg-[#0B0B0B]/60 border border-gold/15 flex items-start gap-3.5 shadow-md">
                        <span className="text-2xl select-none animate-pulse">🍕</span>
                        <div className="space-y-1 font-sans text-xs flex-grow">
                          <div className="font-extrabold text-light uppercase tracking-wider flex items-center justify-between">
                            <span>{pizza.quantity}x Pizza {pizza.size === 'broto' ? 'Broto' : 'Grande'}</span>
                            <span className="font-mono text-[9px] text-gold/60">{pizza.type === 'meio-a-meio' ? 'Meio a Meio' : 'Inteira'}</span>
                          </div>
                          {pizza.type === 'meio-a-meio' ? (
                            <div className="text-light/70 space-y-0.5 font-sans pl-1">
                              <p className="flex items-center gap-2">• 50% <span className="text-gold font-bold">{pizza.flavor || 'Selecione o 1º Sabor...'}</span></p>
                              <p className="flex items-center gap-2">• 50% <span className="text-gold font-bold">{(pizza.flavor2) || 'Selecione o 2º Sabor...'}</span></p>
                            </div>
                          ) : (
                            <p className="text-light/70 pl-1">
                              Sabor: <span className="text-gold font-bold">{pizza.flavor || 'Selecione o Sabor...'}</span>
                            </p>
                          )}
                          <div className="pt-2 flex justify-between items-center border-t border-white/5 mt-2">
                            <span className="text-[10px] text-light/40 uppercase tracking-widest font-mono">Subtotal:</span>
                            <span className="font-mono text-sm text-gold font-black">
                              R$ {(estimatedUnitPrice * pizza.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5">
                        {/* Quantidade */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-light/50 mr-2">
                            Quantidade:
                          </span>
                          <div className="flex items-center bg-[#0B0B0B] border border-white/10 rounded-xl overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updatePizzaField(pizza.id, 'quantity', Math.max(1, pizza.quantity - 1))}
                              className="px-3 py-1 text-light/70 hover:text-light cursor-pointer text-sm font-semibold transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 font-mono text-xs text-light font-bold">
                              {pizza.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updatePizzaField(pizza.id, 'quantity', pizza.quantity + 1)}
                              className="px-3 py-1 text-light/70 hover:text-light cursor-pointer text-sm font-semibold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Estimated Price Display */}
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-sans text-light/45 block">Preço Estimado</span>
                          <span className="font-mono text-sm text-gold font-bold">
                            R$ {(estimatedUnitPrice * pizza.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={addPizza}
              className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-gold/5 border border-dashed border-gold/40 text-gold hover:text-gold-hover py-3.5 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer text-shadow-gold"
            >
              <Plus className="w-4 h-4" /> Adicionar outra pizza
            </button>
          </div>

          {/* 2. SECTION: BEBIDAS (Bento Style Card) */}
          <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold text-light tracking-wide flex items-center gap-2">
                <span className="text-gold">02.</span> Selecione as Bebidas
              </h3>
              <span className="text-xs font-sans text-gold bg-[#D4AF37]/5 px-3 py-1 rounded-xl border border-gold/25">
                {calculationSummary.bebidaCount} Bebida(s) selecionada(s)
              </span>
            </div>

            {BEBIDAS_DATA.length > 0 ? (
              // IF POPULATED (FUTURE STATE): Show pre-loaded list with +/- increments
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BEBIDAS_DATA.map((drink) => {
                  const currentQty = populatedBebidasQty[drink.id] || 0;
                  return (
                    <div
                      key={drink.id}
                      className="p-4 rounded-xl bg-[#161616] border border-white/5 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-sans text-sm font-semibold text-light uppercase">{drink.name}</h4>
                        <span className="font-mono text-xs text-gold">R$ {drink.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center bg-[#0B0B0B] border border-white/10 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updatePopulatedBebidaQty(drink.id, -1)}
                          className="px-2.5 py-1 text-light hover:text-gold transition-colors text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-bold text-light">{currentQty}</span>
                        <button
                          type="button"
                          onClick={() => updatePopulatedBebidaQty(drink.id, 1)}
                          className="px-2.5 py-1 text-light hover:text-gold transition-colors text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // IF EMPTY STATE: Provide active form builders for adding customizable drinks line-by-line
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {customBebidas.map((b, idx) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-3 bg-[#161616] p-3.5 rounded-xl border border-white/5"
                    >
                      {/* Name of drink */}
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={b.name}
                          onChange={(e) => updateCustomBebidaField(b.id, 'name', e.target.value)}
                          placeholder="Digite o nome da bebida (Ex: Coca-Cola Lata)"
                          className="w-full bg-[#0B0B0B] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-xs focus:outline-none transition-all font-sans placeholder-light/25"
                        />
                      </div>

                      {/* Qty selector */}
                      <div className="flex items-center bg-[#0B0B0B] border border-white/10 rounded-xl flex-shrink-0 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateCustomBebidaField(b.id, 'quantity', Math.max(0, b.quantity - 1))}
                          className="px-3 py-1 text-light/70 hover:text-light cursor-pointer text-xs font-semibold transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 font-mono text-xs text-light font-bold">
                          {b.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCustomBebidaField(b.id, 'quantity', b.quantity + 1)}
                          className="px-3 py-1 text-light/70 hover:text-light cursor-pointer text-xs font-semibold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Beverage */}
                      {customBebidas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCustomBebida(b.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={addCustomBebida}
                  className="flex items-center justify-center gap-1.5 bg-transparent text-gold hover:text-gold-hover text-xs font-bold font-sans uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Bebida à Lista
                </button>
              </div>
            )}
          </div>

          {/* 3. SECTION: CLIENT DATA (Bento Style Card) */}
          <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 shadow-xl">
            <div className="border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold text-light tracking-wide flex items-center gap-2">
                <span className="text-gold">03.</span> Dados para Entrega
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Nome */}
              <div className="md:col-span-6 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50 flex items-center gap-1">
                  <User className="w-3 h-3 text-gold" /> Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={clientData.name}
                  onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Telefone */}
              <div className="md:col-span-6 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gold" /> Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* CEP */}
              <div className="md:col-span-3 flex flex-col gap-1.5 relative">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50 flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold" /> CEP
                  </span>
                  {isLoadingCep && <span className="text-[9px] text-gold animate-pulse">Buscando...</span>}
                </label>
                <input
                  type="text"
                  maxLength={9}
                  value={clientData.zip}
                  onChange={handleZipChange}
                  placeholder="00000-000"
                  className={`bg-[#161616] text-light border rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25 ${
                    cepError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-gold'
                  }`}
                />
                {cepError && (
                  <p className="text-[10px] text-red-400 mt-0.5 font-sans leading-tight">
                    {cepError}
                  </p>
                )}
              </div>

              {/* Rua */}
              <div className="md:col-span-6 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Rua / Logradouro *
                </label>
                <input
                  type="text"
                  required
                  value={clientData.street}
                  onChange={(e) => setClientData({ ...clientData, street: e.target.value })}
                  placeholder="Ex: Alameda das Oliveiras"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Número */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Número *
                </label>
                <input
                  type="text"
                  required
                  value={clientData.number}
                  onChange={(e) => setClientData({ ...clientData, number: e.target.value })}
                  placeholder="Ex: 1920"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Complemento */}
              <div className="md:col-span-4 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Complemento
                </label>
                <input
                  type="text"
                  value={clientData.complement}
                  onChange={(e) => setClientData({ ...clientData, complement: e.target.value })}
                  placeholder="Ex: Apto 32, Bloco B"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Bairro */}
              <div className="md:col-span-4 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Bairro *
                </label>
                <input
                  type="text"
                  required
                  value={clientData.neighborhood}
                  onChange={(e) => setClientData({ ...clientData, neighborhood: e.target.value })}
                  placeholder="Ex: Jardim Itália"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Cidade */}
              <div className="md:col-span-4 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Cidade
                </label>
                <input
                  type="text"
                  value={clientData.city}
                  onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
                  placeholder="Ex: São Paulo"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>

              {/* Referência */}
              <div className="md:col-span-12 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Ponto de Referência
                </label>
                <input
                  type="text"
                  value={clientData.reference}
                  onChange={(e) => setClientData({ ...clientData, reference: e.target.value })}
                  placeholder="Ex: Próximo à praça principal ou mercado central"
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                />
              </div>
            </div>
          </div>

          {/* 4. SECTION: PAYMENT & NOTES (Bento Style Card) */}
          <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6 shadow-xl">
            <div className="border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold text-light tracking-wide flex items-center gap-2">
                <span className="text-gold">04.</span> Pagamento &amp; Observações
              </h3>
            </div>

            <div className="space-y-6">
              {/* Payment selector buttons */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50 flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-gold" /> Método de Pagamento *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['PIX', 'DINHEIRO', 'CREDITO', 'DEBITO'] as PaymentMethod[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMethod(mode)}
                      className={`py-3 px-2 text-xs font-semibold rounded-xl font-sans transition-all cursor-pointer border flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === mode
                          ? 'bg-[#D4AF37]/10 text-gold border-gold'
                          : 'bg-[#161616] text-light/60 border-white/5 hover:text-light hover:border-white/10'
                      }`}
                    >
                      <span className="uppercase tracking-wider font-bold text-[10px]">
                        {mode === 'CREDITO' ? 'C. de Crédito' : mode === 'DEBITO' ? 'C. de Débito' : mode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cash Change Conditional input */}
              <AnimatePresence>
                {paymentMethod === 'DINHEIRO' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                      Precisa de troco para quanto? *
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'DINHEIRO'}
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      placeholder="Ex: Troco para R$ 100,00"
                      className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Observation Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-light/50">
                  Observações Gerais / Instruções
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Ex: Tirar cebola, borda recheada, campainha quebrada..."
                  rows={3}
                  className="bg-[#161616] text-light border border-white/10 focus:border-gold rounded-xl px-3 py-2 text-sm focus:outline-none transition-all font-sans placeholder-light/25 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 5. SUMMARY & SUBMIT (Conversion Bento Focus) */}
          <div className="bg-white text-gray-900 p-6 md:p-8 rounded-2xl border-l-4 border-gold space-y-6 shadow-2xl relative overflow-hidden">
            {/* Elegant visual detail behind summary */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full filter blur-2xl pointer-events-none"></div>

            <h3 className="font-serif text-lg md:text-xl font-bold text-[#0B0B0B] tracking-wide flex items-center gap-2 uppercase">
              <ClipboardCheck className="w-5 h-5 text-gold" /> Resumo do Pedido d'La Máfia
            </h3>

            <div className="space-y-3 font-sans text-sm text-gray-700 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-500 uppercase tracking-wider">Subtotal Itens:</span>
                <span className="font-mono text-gray-900 font-bold">
                  R$ {calculationSummary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="uppercase tracking-wider">Taxa de Entrega Fixa:</span>
                <span className="font-mono text-gray-900 font-bold">
                  R$ {DELIVERY_TAX.toFixed(2)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-3 flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase font-serif tracking-wider text-wine font-bold block">Total Geral</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    ({calculationSummary.grandTotalCount} item/itens adicionados)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-3xl font-black text-gray-900">
                    R$ {calculationSummary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-sans font-extrabold uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg hover:shadow-green-600/10 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.01]"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Enviar Pedido pelo WhatsApp</span>
            </button>
            <p className="text-center font-sans text-[10px] text-gray-400 mt-2 font-medium">
              Ao enviar, o site abrirá automaticamente o WhatsApp com sua mensagem formatada para fechamento rápido.
            </p>
          </div>

        </form>

      </div>
    </section>
  );
}
