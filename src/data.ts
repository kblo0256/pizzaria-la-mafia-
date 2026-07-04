/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PizzaCategory, PizzaItem, BebidaItem } from './types';

export interface CategoryInfo {
  id: PizzaCategory;
  title: string;
  description: string;
}

export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5513996253682&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3ODMyNjY4MzgsInBob25lIjoiKzU1MTM5OTYyNTM2ODIiLCJ0ZXh0IjoiIiwiYXBwIjoiaW5zdGFncmFtIn0.FfcR26GjTd08jYmbf9DP7HDgnq4rDFYDLb1w8zw_D27s8mvmBsERoQiY6g3eRJM5gmKSVEpYy3S3902_sPZFHQ&utm_campaign=wa_phone_number_xma&source_surface=45";

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: 'promocionais',
    title: 'Promocionais',
    description: 'Nossos sabores tradicionais com preços incríveis e promocionais.'
  },
  {
    id: 'especiais',
    title: 'Especiais',
    description: 'Combinações deliciosas preparadas com muito carinho.'
  },
  {
    id: 'premium',
    title: 'Premium',
    description: 'Pizzas sofisticadas com ingredientes selecionados de alta qualidade.'
  },
  {
    id: 'mafia',
    title: 'Código La Máfia',
    description: 'As criações lendárias e exclusivas da casa.'
  },
  {
    id: 'doces',
    title: 'Doces',
    description: 'Pizzas doces irresistíveis para fechar com chave de ouro.'
  }
];

export const MENU_DATA: Record<PizzaCategory, PizzaItem[]> = {
  promocionais: [
    {
      id: 'p1',
      name: 'Marguerita',
      ingredients: 'Mussarela, tomate fresco e manjericão.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p2',
      name: 'Mussarela',
      ingredients: 'Cobertura clássica de mussarela, tomate, azeitona e orégano.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p3',
      name: 'Alho',
      ingredients: 'Mussarela com uma camada generosa de alho frito crocante.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p4',
      name: 'Milho',
      ingredients: 'Mussarela com milho selecionado.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p5',
      name: 'Bauru',
      ingredients: 'Presunto, mussarela e rodelas de tomate.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p6',
      name: 'Catupresunto',
      ingredients: 'Presunto picadinho coberto com legítimo Catupiry.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p7',
      name: 'Palmito',
      ingredients: 'Palmito em rodelas sobre uma camada de mussarela.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'p8',
      name: 'Calabresa',
      ingredients: 'Calabresa e cebola.',
      priceBroto: 32.90,
      priceGrande: 52.90
    }
  ],
  especiais: [
    {
      id: 'e1',
      name: 'Abobrinha',
      ingredients: 'Abobrinha gratinada com parmesão sobre mussarela.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e2',
      name: 'Vegetariana',
      ingredients: 'Brócolis, milho, cebola, palmito e tomate.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e3',
      name: 'Me Quer',
      ingredients: 'Calabresa, mussarela e Catupiry.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e4',
      name: 'Lombo',
      ingredients: 'Lombo canadense fatiado, tomate e mussarela.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e5',
      name: 'Frangalho',
      ingredients: 'Frango temperado com toque de alho frito e mussarela.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e6',
      name: 'Baiana',
      ingredients: 'Mussarela, calabresa, ovo e pimenta biquinho.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e7',
      name: 'México',
      ingredients: 'Frango, milho, bacon e Catupiry.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e8',
      name: 'Bacon',
      ingredients: 'Mussarela com fatias crocantes de bacon.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e9',
      name: 'Bertioga',
      ingredients: 'Mussarela, presunto, ovo e tomate.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e10',
      name: 'Brócolis',
      ingredients: 'Mussarela, brócolis e alho frito.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e11',
      name: 'Caiçara',
      ingredients: 'Mussarela, atum, ervilha, milho, tomate e milho.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'e12',
      name: 'Frango com Catupiry',
      ingredients: 'Frango desfiado temperado com Catupiry.',
      priceBroto: 36.90,
      priceGrande: 56.90
    }
  ],
  premium: [
    {
      id: 'pr1',
      name: 'Brasileira',
      ingredients: 'Brócolis, milho, cebola, palmito e mussarela.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr2',
      name: 'Canadense',
      ingredients: 'Lombo, palmito, mussarela e rodelas de tomate.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr3',
      name: 'Carne Seca',
      ingredients: 'Carne seca desfiada com cebola e mussarela.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr4',
      name: 'Cinco Queijos',
      ingredients: 'Mussarela, provolone, parmesão, gorgonzola e Catupiry.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr5',
      name: 'Portuguesa',
      ingredients: 'Presunto, ovos, cebola, ervilha, palmito e mussarela.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr6',
      name: 'Da Casa',
      ingredients: 'Mussarela, Catupiry, bacon e tomate.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr7',
      name: 'Tentação',
      ingredients: 'Calabresa, bacon, Catupiry e mussarela.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr8',
      name: 'Peperone',
      ingredients: 'Mussarela e peperone.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr9',
      name: 'Gostosona',
      ingredients: 'Calabresa, presunto, mussarela, Catupiry e tomate.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr10',
      name: 'Quatro Queijos',
      ingredients: 'Mussarela, Catupiry, parmesão e provolone.',
      priceBroto: 42.90,
      priceGrande: 62.90
    },
    {
      id: 'pr11',
      name: 'Ceciliana',
      ingredients: 'Champignon, bacon, cebola e mussarela.',
      priceBroto: 42.90,
      priceGrande: 62.90
    }
  ],
  mafia: [
    {
      id: 'm1',
      name: 'Vendetta',
      ingredients: 'Mussarela, carne moída, cheddar e Doritos.',
      priceBroto: 69.90,
      priceGrande: 69.90
    },
    {
      id: 'm2',
      name: 'Lá Dinastia',
      ingredients: 'Calabresa, cebola, cream cheese e gorgonzola.',
      priceBroto: 70.90,
      priceGrande: 70.90
    },
    {
      id: 'm3',
      name: 'El Capone',
      ingredients: 'Mussarela, medalhão de queijo coalho e mel.',
      priceBroto: 74.90,
      priceGrande: 74.90
    },
    {
      id: 'm4',
      name: 'Don Corleone',
      ingredients: 'Costela desfiada, molho barbecue, mussarela e cebola roxa.',
      priceBroto: 84.90,
      priceGrande: 84.90
    },
    {
      id: 'm5',
      name: 'El Pacino',
      ingredients: 'Mussarela, carne seca, queijo coalho, cebola roxa e pimenta biquinho.',
      priceBroto: 84.90,
      priceGrande: 84.90
    }
  ],
  doces: [
    {
      id: 'd1',
      name: 'Brigadeiro',
      ingredients: 'Base suave de muçarela, chocolate ao leite derretido e granulado.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'd2',
      name: 'Mesclada',
      ingredients: 'Base suave de muçarela, chocolate ao leite e chocolate branco.',
      priceBroto: 32.90,
      priceGrande: 52.90
    },
    {
      id: 'd3',
      name: 'Nevada',
      ingredients: 'Chocolate branco cremoso com raspas finas e cerejas.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'd4',
      name: 'M&M\'s',
      ingredients: 'Chocolate ao leite nobre coberto com pastilhas M&M\'s coloridas.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'd5',
      name: 'Kit Kat',
      ingredients: 'Chocolate cremoso ao leite finalizado com pedaços crocantes de chocolate Kit Kat.',
      priceBroto: 36.90,
      priceGrande: 56.90
    },
    {
      id: 'd6',
      name: 'Nutella',
      ingredients: 'Delicioso creme de avelã Nutella autêntico e generoso.',
      priceBroto: 47.90,
      priceGrande: 67.90
    }
  ]
};

export const BEBIDAS_DATA: BebidaItem[] = [
  { id: 'b1', name: 'Coca-Cola 1L', price: 12.00 },
  { id: 'b2', name: 'Sukita', price: 12.00 },
  { id: 'b3', name: 'Guaraná Antártica', price: 15.00 },
  { id: 'b4', name: 'Coca-Cola 2L', price: 18.00 },
  { id: 'b5', name: 'Heineken Lata', price: 6.50 },
  { id: 'b6', name: 'Corona', price: 10.50 },
  { id: 'b7', name: 'Heineken Long Neck', price: 11.00 }
];

export const BASE_CATEGORY_PRICES: Record<PizzaCategory, { broto: number; grande: number }> = {
  promocionais: { broto: 32.90, grande: 52.90 },
  especiais: { broto: 36.90, grande: 56.90 },
  premium: { broto: 42.90, grande: 62.90 },
  mafia: { broto: 74.90, grande: 74.90 },
  doces: { broto: 36.90, grande: 56.90 }
};

export const BASE_BEBIDA_PRICE = 12.00;
