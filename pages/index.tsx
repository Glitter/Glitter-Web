import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '@/branding/logo.svg';
import Step from '@/components/Step/Step';
import Button from '@/components/Button/Button';
import Feature from '@/components/Feature/Feature';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import optimizeLineBreak from '@/lib/typography/optimize-line-break';
import { emitEvent } from '@/lib/analytics';
import scrollToEl from '@/lib/scrolling/scrollToEl';
import { getButtonClassName } from '@/components/Button/Button';
import styles from './index.module.css';

const IndexPage = () => {
  const aboutGlitterEl = useRef<HTMLElement>(null);
  const menuItems = [
    {
      value: 'https://github.com/Glitter/Glitter/releases',
      label: 'Download',
    },
    {
      value: 'https://github.com/Glitter/Glitter/wiki',
      label: 'Documentation',
    },
    {
      value: 'https://discord.gg/CdefJmp',
      label: 'Community Chat',
    },
    {
      value: 'https://github.com/Glitter/Glitter',
      label: 'GitHub',
    },
  ];

  return (
    <main>
      <header className="py-4">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl xl:max-w-6xl flex justify-between items-center md:items-baseline">
          <img src={logo} width="156" alt="Glitter logo" />
          <nav>
            <div className="md:hidden">
              <MobileMenu
                onChange={({ value }) => {
                  window.location.href = value;
                }}
                menuItems={menuItems}
              />
            </div>
            <ul className="hidden md:flex list-none">
              {menuItems.map((menuItem, i) => (
                <li key={i} className="ml-8">
                  <a
                    className="hover:underline focus:underline"
                    href={menuItem.value}
                  >
                    {menuItem.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <section className="py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl lg:grid lg:gap-2">
          <div>
            <h1 className="font-semibold text-4xl text-secondary-900 lg:text-5xl leading-tight">
              Revive{' '}
              {optimizeLineBreak('your desktop', {
                force: true,
              })}
            </h1>
            <p className="mt-5 mx-auto max-w-xl text-secondary-800 md:text-xl lg:text-2xl lg:mt-8">
              {optimizeLineBreak(
                "What if you could use the web technologies to make your desktop pretty, useful, or both - that's Glitter",
              )}
            </p>
            <div className={`mt-5 lg:mt-12 ${styles.buttonsGrid}`}>
              <a
                className={getButtonClassName({
                  color: 'primary',
                  size: 'lg',
                })}
                href="https://github.com/Glitter/Glitter/releases"
              >
                Download Glitter
              </a>
              <Button
                color="default"
                size="lg"
                variant="text"
                onClick={() => {
                  emitEvent({
                    category: 'Learn More Button',
                    action: 'click',
                    label: 'Hero',
                  });

                  if (aboutGlitterEl.current === null) {
                    return;
                  }

                  scrollToEl({ el: aboutGlitterEl.current });
                }}
              >
                Learn more
              </Button>
            </div>
          </div>
          <div
            className={`mt-12 flex justify-center lg:mt-24 ${styles.heroImageContainer}`}
          >
            <img
              className={styles.heroImage}
              src={require('@/illustrations/hero.svg')}
              width="680"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center">
            <div className="pl-8">
              <p className="font-bold text-2xl leading-snug">
                How people are using Glitter
              </p>
            </div>
            <div className="relative pl-8">
              <FontAwesomeIcon
                icon={['fas', 'sparkles']}
                className="absolute top-0 left-0 mt-1 text-yellow-500 text-xl"
              />
              <p className="text-lg text-gray-800 leading-snug">
                <b>Video backgrounds</b> - Instead of a static, boring image,
                you can have a video playing as your wallpaper
              </p>
            </div>
            <div className="relative pl-8">
              <FontAwesomeIcon
                icon={['fas', 'sparkles']}
                className="absolute top-0 left-0 mt-1 text-yellow-500 text-xl"
              />
              <p className="text-lg text-gray-800 leading-snug">
                <b>Get notifications</b> - Made another sale through Stripe? Got
                another YouTube subscriber? - Get a custom alert
              </p>
            </div>
            <div className="relative pl-8">
              <FontAwesomeIcon
                icon={['fas', 'sparkles']}
                className="absolute top-0 left-0 mt-1 text-yellow-500 text-xl"
              />
              <p className="text-lg text-gray-800 leading-snug">
                <b>Video/audio players</b> - Create a custom interface for your
                favourite player - Spotify, YouTube, etc.
              </p>
            </div>
            <div className="relative pl-8">
              <FontAwesomeIcon
                icon={['fas', 'sparkles']}
                className="absolute top-0 left-0 mt-1 text-yellow-500 text-xl"
              />
              <p className="text-lg text-gray-800 leading-snug">
                <b>Weather overview</b> - Do you need an umbrella, or a
                sunscreen? Easily find out right from your desktop
              </p>
            </div>
            <div className="relative pl-8">
              <FontAwesomeIcon
                icon={['fas', 'sparkles']}
                className="absolute top-0 left-0 mt-1 text-yellow-500 text-xl"
              />
              <p className="text-lg text-gray-800 leading-snug">
                <b>PC performance</b> - Track your CPU / RAM usage through nice
                charts instead of digging through your OS
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={aboutGlitterEl}
        className="py-16 bg-secondary-500 text-secondary-100"
      >
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          <span className="block">What is Glitter?</span>
          <h2 className="mt-2 font-semibold text-3xl leading-tight lg:text-5xl">
            {optimizeLineBreak("Here's how Glitter works:")}
          </h2>
          <p className="mt-6 font-medium lg:text-xl xl:text-2xl">
            Glitter is an app for your computer that allows you to add widgets
            to your screen. Now, there are many apps that do this. Where Glitter
            is different is that it allows those widgets to be written with web
            technologies, which drastically lowers the barrier to entry into the
            desktop customization "land".
          </p>
          <p className="mt-6 font-medium lg:text-xl xl:text-2xl">
            You can download widgets made by other people, and you can also
            create your own. Glitter makes both easy - it's up to you.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          <div className="mt-12 grid gap-24 lg:mt-16 xl:mt-24">
            <Step
              title="Step 1 - Download and install Glitter"
              image={require('@/illustrations/browsing.svg')}
              isArt
              children={
                <>
                  <p>
                    Glitter is free, and Open Source. It works on Windows,
                    macOS, and a lot of Linux distributions.
                  </p>
                  <a
                    className={getButtonClassName({
                      size: 'lg',
                      className: 'mt-5',
                      variant: 'text',
                    })}
                    href="https://github.com/Glitter/Glitter/releases"
                  >
                    Download Glitter
                  </a>
                </>
              }
            />
            <Step
              title="Step 2 - Create a new widget"
              image={require('@/screenshots/glitter-create-widget.png')}
              children={
                <p>
                  Glitter comes with an integrated development server and
                  templates for React and Vue.js. All you have to do is open
                  your favourite code editor and start working on your widget.
                </p>
              }
            />
            <Step
              title="Step 3 - Add the widget to your screen"
              image={require('@/screenshots/glitter-widget-management.png')}
              children={
                <p>
                  Each widget can be added any number of times, to any of your
                  screens. Glitter makes it easy to just drag the widgets around
                  so you can position them just the way you want to.
                </p>
              }
            />
            <p className="text-center lg:text-2xl lg:mt-8 xl:text-3xl">
              Yes - it's <span className="font-semibold">that</span> simple
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
          <h2 className="mt-2 font-semibold text-3xl text-gray-200 leading-tight lg:text-5xl">
            {optimizeLineBreak('What does Glitter provide?')}
          </h2>
          <p className="mt-6 text-gray-100 lg:text-2xl xl:text-3xl">
            Here is a short summary of some niceties:
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:mt-12">
            <Feature title="Technologies you know" icon={['fab', 'js']}>
              {optimizeLineBreak(
                'Glitter widgets are written with HTML, CSS, and JS. We have templates for React and Vue.js',
              )}
            </Feature>
            <Feature title="Easy management" icon={['fas', 'bring-front']}>
              {optimizeLineBreak(
                'Widgets can be easily added to, and positioned on, any of your screens. Every widget can be added multiple times.',
              )}
            </Feature>
            <Feature title="Visual configuration" icon={['fas', 'cog']}>
              {optimizeLineBreak(
                'Widgets are personal - and we recognize that. Our settings framework allows for easy configurability.',
              )}
            </Feature>
            <Feature
              title="Widgets marketplace *"
              icon={['fas', 'users-class']}
            >
              {optimizeLineBreak(
                'Install widgets people have shared with a few clicks on our marketplace and benefit from a collective genius',
              )}
            </Feature>
            <Feature title="System access" icon={['fas', 'microchip']}>
              {optimizeLineBreak(
                'Each widget can access the underlying system through Node.js for when more power is needed.',
              )}
            </Feature>
            <Feature title="Open Source" icon={['fas', 'shield-check']}>
              {optimizeLineBreak(
                'Glitter code is open source, and available for both contribution and inspection to anyone.',
              )}
            </Feature>
          </div>
          <p className="mt-8 text-primary-100">* Coming soon</p>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
          <p className="text-gray-900 text-2xl xl:text-3xl leading-tight">
            Are you ready to make your desktop beautiful again?
          </p>
          <a
            className={getButtonClassName({
              color: 'primary',
              size: 'lg',
              className: 'mt-5 lg:mt-8',
            })}
            href="https://github.com/Glitter/Glitter/releases"
          >
            Download Glitter
          </a>

          <div className={`${styles.separator} mt-16 mx-auto h-12 max-w-xl`} />
        </div>
      </section>

      <section className="py-16 bg-primary-200">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
          <h2 className="mt-2 font-semibold text-3xl text-gray-900 leading-tight lg:text-5xl">
            {optimizeLineBreak(
              'Open Source, and works on all major operating systems',
            )}
          </h2>
          <p className="mt-6 lg:text-2xl xl:text-3xl">
            Glitter supports the following
          </p>
          <div className={`mt-6 grid gap-8 justify-center ${styles.osGrid}`}>
            <div className="text-center text-primary-700">
              <FontAwesomeIcon icon={['fab', 'windows']} size="4x" />
              <span className="mt-2 block text-secondary-800">Windows</span>
            </div>
            <div className="text-center text-primary-700">
              <FontAwesomeIcon icon={['fab', 'apple']} size="4x" />
              <span className="mt-2 block text-secondary-800">macOS</span>
            </div>
            <div className="text-center text-primary-700">
              <FontAwesomeIcon icon={['fab', 'linux']} size="4x" />
              <span className="mt-2 block text-secondary-800">Linux</span>
            </div>
          </div>
          {new Array(3).map(() => (
            <p>Hello</p>
          ))}
          <p className="mt-12 lg:text-l lg:mt-8 xl:text-xl">
            We are testing Glitter on Windows 10, macOS Catalina, and Ubuntu.
            Other versions might be supported, and we are always open to
            contribution. After all, Glitter is{' '}
            <a className="underline" href="https://github.com/Glitter/Glitter">
              Open Source
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
          <div className="flex flex-wrap justify-center">
            <a
              className="inline-block m-2 underline"
              href="https://github.com/Glitter/Glitter/releases"
            >
              Download Glitter
            </a>

            <a
              className="inline-block m-2 underline"
              href="https://github.com/Glitter/Glitter/wiki"
            >
              Documentation
            </a>
            <a
              className="inline-block m-2 underline"
              href="https://discord.gg/CdefJmp"
            >
              Community Chat
            </a>
            <a
              className="inline-block m-2 underline"
              href="https://github.com/Glitter/Glitter"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

IndexPage.displayName = 'IndexPage';

export default IndexPage;
