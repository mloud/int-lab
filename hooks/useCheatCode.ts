import { useState, useEffect } from 'react';

export function useCheatCode(secretCode: string) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let inputSequence = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorovat, pokud uživatel píše do inputu nebo textarea, aby se cheat nespouštěl při psaní textu
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      inputSequence += e.key.toLowerCase();
      
      if (inputSequence.length > secretCode.length) {
        inputSequence = inputSequence.slice(-secretCode.length);
      }

      if (inputSequence === secretCode.toLowerCase()) {
        setIsActive(prev => !prev);
        inputSequence = ''; // Reset sequence po úspěchu
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [secretCode]);

  return { isActive, setIsActive };
}
