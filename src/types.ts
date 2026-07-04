/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PizzaCategory = 'promocionais' | 'especiais' | 'premium' | 'mafia' | 'doces';

export interface PizzaItem {
  id: string;
  name: string;
  ingredients: string;
  priceBroto: number;
  priceGrande: number;
}

export interface BebidaItem {
  id: string;
  name: string;
  price: number;
}

export interface PizzaOrderInput {
  id: string;
  type: 'inteira' | 'meio-a-meio';
  category: PizzaCategory;
  flavor: string;
  category2?: PizzaCategory;
  flavor2?: string;
  size: 'broto' | 'grande';
  quantity: number;
}

export interface BebidaOrderInput {
  id: string;
  name: string;
  quantity: number;
}

export interface ClientData {
  name: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  zip: string;
  reference: string;
}

export type PaymentMethod = 'PIX' | 'DINHEIRO' | 'CREDITO' | 'DEBITO';

export interface OrderState {
  pizzas: PizzaOrderInput[];
  bebidas: { [bebidaId: string]: number }; // Maps beverage ID to quantity
  clientData: ClientData;
  paymentMethod: PaymentMethod;
  changeFor: string;
  observations: string;
}
