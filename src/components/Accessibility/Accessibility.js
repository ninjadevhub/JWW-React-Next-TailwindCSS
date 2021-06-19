import { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

export default function Accessibility({
  accessibilitySettings,
  setAccessibilitySettings,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const not2xl =
    typeof window !== 'undefined' ? window.innerWidth < 1536 : true;

  if (!menuIsOpen) {
    return (
      <button
        type="button"
        className="fixed left-0 top-36 z-50 p-0 border-none bg-transparent"
        onClick={() => setMenuIsOpen(true)}
      >
        <Image
          src="/images/accessibility.png"
          width={60}
          height={60}
          alt="Accessibility"
        />
      </button>
    );
  }

  const settingsAreDefault = Object.values(accessibilitySettings).every(
    (settings) => !settings
  );

  return (
    <div className="fixed left-0 top-40 z-50 p-2 border-solid border-r-8 border-brand-blue-2 bg-brand-gray">
      <div
        className="relative overflow-y-auto"
        style={{ width: not2xl ? 200 : 400, maxHeight: 'calc(100vh - 12rem)' }}
      >
        <div className="flex justify-between items-center py-3 px-2 2xl:py-6 2xl:px-4">
          <h3 className="text-base 2xl:text-2xl-3 color-brand-blue">
            Accessibility Tools
          </h3>
          <button
            className={`px-2 py-1 border-none bg-brand-green-dark text-xs 2xl:text-base text-white${
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
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
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
              width={not2xl ? 23 : 45}
              height={not2xl ? 23 : 45}
              alt="Color contrast"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
          <button
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
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
              width={not2xl ? 19 : 38}
              height={not2xl ? 19 : 38}
              alt="Highlight links"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
          <button
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
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
              width={not2xl ? 24 : 48}
              height={not2xl ? 16 : 32}
              alt="Text size"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
              <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{ width: `${accessibilitySettings.textSize * 50}%` }}
                />
              </div>
              <FaCheckCircle
                color="#793e69"
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
          <button
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
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
              width={not2xl ? 25 : 50}
              height={not2xl ? 22 : 44}
              alt="Letter spacing"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
              <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{
                    width: `${accessibilitySettings.letterSpacing * 50}%`,
                  }}
                />
              </div>
              <FaCheckCircle
                color="#793e69"
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
          <button
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
            onClick={() =>
              setAccessibilitySettings((prevSettings) => ({
                ...prevSettings,
                pauseAnimations: !prevSettings.pauseAnimations,
              }))
            }
          >
            <Image
              src="/images/pause-animations.png"
              width={not2xl ? 23 : 46}
              height={not2xl ? 23 : 46}
              alt="Pause animations"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
          <button
            className="w-1/2 p-2 2xl:p-4 border-solid border-brand-gray border-4 2xl:border-8 bg-white text-center text-brand-navy"
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
              width={not2xl ? 16 : 32}
              height={not2xl ? 22 : 44}
              alt="Cursor size"
            />
            <div
              className="mt-2 mb-1 text-sm 2xl:text-xl-2 tracking-wider-2"
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
              <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray">
                <div
                  className="h-2 bg-brand-green-dark"
                  style={{ width: `${accessibilitySettings.cursorSize * 50}%` }}
                />
              </div>
              <FaCheckCircle
                color="#793e69"
                size={not2xl ? '0.875rem' : '1.375rem'}
              />
            </div>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="absolute right-0 top-2 2xl:top-4 transform translate-x-full p-0 border-none bg-transparent"
        onClick={() => setMenuIsOpen(false)}
      >
        <Image
          src="/images/close-accessibility.png"
          width={60}
          height={60}
          alt="Close accessibility menu"
        />
      </button>
    </div>
  );
}
