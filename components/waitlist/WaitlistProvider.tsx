'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import WaitlistModal from '@/components/WaitlistModal';

/**
 * ONE waitlist modal for the whole app.
 *
 * Previously the modal was mounted independently in Navbar, Footer, and in
 * every page that offered a signup, so a single homepage render carried three
 * copies of the dialog, three copies of its form state, and three focus traps
 * competing for the same document. This provider mounts it once at the layout
 * root; everything else just calls `openWaitlist(product)`.
 */

interface WaitlistContextValue {
  openWaitlist: (product?: string) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error('useWaitlist must be used inside <WaitlistProvider>');
  return ctx;
}

export default function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>(undefined);

  const openWaitlist = useCallback((next?: string) => {
    setProduct(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Stable value: consumers that only need `openWaitlist` must not re-render
  // every time the dialog opens or closes.
  const value = useMemo(() => ({ openWaitlist }), [openWaitlist]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={close} defaultProduct={product} />
    </WaitlistContext.Provider>
  );
}
