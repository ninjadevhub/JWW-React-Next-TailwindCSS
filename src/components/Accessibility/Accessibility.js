import { useState } from 'react';
import Image from 'next/image';

export default function Accessibility({ setAccessibilitySettings }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  if (!menuIsOpen) {
    return (
      <button
        type="button"
        className="fixed left-0 top-40 p-0 border-none bg-transparent"
        onClick={() => setMenuIsOpen(true)}
      >
        <Image
          src="/images/accessibility.png"
          width={94}
          height={94}
          alt="Accessibility"
        />
      </button>
    );
  }

  return (
    <div className="fixed left-0 top-40 bg-brand-gray" style={{ width: 300 }}>
      <h3 className="color-brand-blue">Accessibility Tools</h3>
      <div className="flex flex-wrap">
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, colorContrast: !prevSettings.colorContrast }))}
        >
          COLOR CONTRAST
        </button>
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, highlightLinks: !prevSettings.highlightLinks }))}
        >
          HIGHLIGHT LINKS
        </button>
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, textSize: prevSettings.textSize < 2 ? prevSettings.textSize + 1 : 0 }))}
        >
          TEXT SIZE
        </button>
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, letterSpacing: prevSettings.letterSpacing < 2 ? prevSettings.letterSpacing + 1 : 0 }))}
        >
          LETTER SPACING
        </button>
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, pauseAnimations: !prevSettings.pauseAnimations }))}
        >
          PAUSE ANIMATIONS
        </button>
        <button
          className="w-1/2 p-0 border-none bg-transparent"
          type="button"
          onClick={() => setAccessibilitySettings(prevSettings => ({ ...prevSettings, cursorSize: prevSettings.cursorSize < 2 ? prevSettings.cursorSize + 1 : 0 }))}
        >
          CURSOR SIZE
        </button>
      </div>
      <button
        type="button"
        className="absolute right-0 top-4 transform translate-x-full p-0 border-none bg-transparent"
        onClick={() => setMenuIsOpen(false)}
      >
        <Image
          src="/images/close-accessibility.png"
          width={94}
          height={94}
          alt="Close accessibility menu"
        />
      </button>
    </div>
  );
}