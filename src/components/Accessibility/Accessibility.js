import { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

export default function Accessibility({
  accessibilitySettings,
  setAccessibilitySettings,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  if (!menuIsOpen) {
    return (
      <button
        type="button"
        className="fixed left-0 top-40 z-50 p-0 border-none bg-transparent"
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

  const settingsAreDefault = Object.values(accessibilitySettings).every(
    (settings) => !settings
  );

  return (
    <div className="fixed left-0 top-44 z-50 p-2 border-solid border-r-8 border-brand-blue-2 bg-brand-gray">
      <div
        className="relative overflow-y-auto"
        style={{ width: 400, maxHeight: 'calc(100vh - 12rem)' }}
      >
        <div className="flex justify-between items-center py-6 px-4">
          <h3 className="text-2-5xl color-brand-blue">Accessibility Tools</h3>
          <button
            className={`px-2 py-1 border-none bg-brand-green-dark text-white${
              settingsAreDefault ? ' hidden' : ''
            }`}
            onClick={() =>
              setAccessibilitySettings({
                colorContrast: false,
                highlightLinks: false,
                textSize: 0,
                letterSpacing: 0,
                pauseAnimations: false,
                cursorSize: 0,
              })
            }
          >
            RESET ALL
          </button>
        </div>
        <div className="flex flex-wrap">
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                colorContrast: !prevSettings.colorContrast,
              }))
            }
          >
            <Image
              src="/images/color-contrast.png"
              width={45}
              height={45}
              alt="Color contrast"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              COLOR
              <br />
              CONTRAST
            </div>
            <div className="flex justify-end">
              <FaCheckCircle
                className={
                  !accessibilitySettings.colorContrast ? 'opacity-0' : ''
                }
                color="#793e69"
                size="1.375rem"
              />
            </div>
          </button>
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                highlightLinks: !prevSettings.highlightLinks,
              }))
            }
          >
            <Image
              src="/images/highlight-links.png"
              width={38}
              height={38}
              alt="Highlight links"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              HIGHLIGHT
              <br />
              LINKS
            </div>
            <div className="flex justify-end">
              <FaCheckCircle
                className={
                  !accessibilitySettings.highlightLinks ? 'opacity-0' : ''
                }
                color="#793e69"
                size="1.375rem"
              />
            </div>
          </button>
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                textSize:
                  prevSettings.textSize < 2 ? prevSettings.textSize + 1 : 0,
              }))
            }
          >
            <Image
              src="/images/text-size.png"
              width={48}
              height={32}
              alt="Text size"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              TEXT
              <br />
              SIZE
            </div>
            <div
              className={`flex justify-between items-center${
                accessibilitySettings.textSize === 0 ? ' opacity-0' : ''
              }`}
            >
              <div className="h-2 flex-1 mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{ width: `${accessibilitySettings.textSize * 50}%` }}
                />
              </div>
              <FaCheckCircle color="#793e69" size="1.375rem" />
            </div>
          </button>
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                letterSpacing:
                  prevSettings.letterSpacing < 2
                    ? prevSettings.letterSpacing + 1
                    : 0,
              }))
            }
          >
            <Image
              src="/images/letter-spacing.png"
              width={50}
              height={44}
              alt="Letter spacing"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              LETTER
              <br />
              SPACING
            </div>
            <div
              className={`flex justify-between items-center${
                accessibilitySettings.letterSpacing === 0 ? ' opacity-0' : ''
              }`}
            >
              <div className="h-2 flex-1 mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{
                    width: `${accessibilitySettings.letterSpacing * 50}%`,
                  }}
                />
              </div>
              <FaCheckCircle color="#793e69" size="1.375rem" />
            </div>
          </button>
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                pauseAnimations: !prevSettings.pauseAnimations,
              }))
            }
          >
            <Image
              src="/images/pause-animations.png"
              width={46}
              height={46}
              alt="Pause animations"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              PAUSE
              <br />
              ANIMATIONS
            </div>
            <div className="flex justify-end">
              <FaCheckCircle
                className={
                  !accessibilitySettings.pauseAnimations ? 'opacity-0' : ''
                }
                color="#793e69"
                size="1.375rem"
              />
            </div>
          </button>
          <button
            className="w-1/2 p-4 border-solid border-brand-gray border-8 bg-white text-center text-brand-navy"
            type="button"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                cursorSize:
                  prevSettings.cursorSize < 2 ? prevSettings.cursorSize + 1 : 0,
              }))
            }
          >
            <Image
              src="/images/cursor-size.png"
              width={32}
              height={44}
              alt="Cursor size"
            />
            <div
              className="mt-2 mb-1 text-1-5xl tracking-wider-2"
              style={{ lineHeight: 1.2727 }}
            >
              CURSOR
              <br />
              SIZE
            </div>
            <div
              className={`flex justify-between items-center${
                accessibilitySettings.cursorSize === 0 ? ' opacity-0' : ''
              }`}
            >
              <div className="h-2 flex-1 mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{ width: `${accessibilitySettings.cursorSize * 50}%` }}
                />
              </div>
              <FaCheckCircle color="#793e69" size="1.375rem" />
            </div>
          </button>
        </div>
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
