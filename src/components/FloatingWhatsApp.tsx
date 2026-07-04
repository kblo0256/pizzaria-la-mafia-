/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { WHATSAPP_URL } from '../data';

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      id="floating-whatsapp-btn"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-2xl transition-colors cursor-pointer group font-sans font-medium text-sm border border-green-500/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Fazer pedido via WhatsApp"
    >
      <MessageSquare className="w-5 h-5 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
        Pedir pelo WhatsApp
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </motion.button>
  );
}
