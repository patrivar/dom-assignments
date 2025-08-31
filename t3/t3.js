'use strict';

const target = document.getElementById('target');

const { name: browserName, version: browserVersion, os: osName } = detectClientInfo();

const screenWidth = screen.width;
const screenHeight = screen.height;
const availWidth = screen.availWidth;
const availHeight = screen.availHeight;

const now = new Date();

const dateFormatter = new Intl.DateTimeFormat('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const timeFormatter = new Intl.DateTimeFormat('fi-FI', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const infoItems = [
  `Selaimen nimi: ${browserName}, versio: ${browserVersion}`,
  `Käyttöjärjestelmä: ${osName}`,
  `Näytön koko: ${screenWidth} x ${screenHeight}`,
  `Käytettävissä oleva tila: ${availWidth} x ${availHeight}`,
  `Päivämäärä: ${dateFormatter.format(now)}`,
  `Aika: ${timeFormatter.format(now)}`
];

infoItems.forEach(text => {
  const p = document.createElement('p');
  p.textContent = text;
  target.appendChild(p);
});

function detectClientInfo() {
  const ua = navigator.userAgent;

  const browsers = [
    { name: 'Microsoft Edge', pattern: /Edg\/(\d+(\.\d+)?)/ },
    { name: 'Opera',          pattern: /OPR\/(\d+(\.\d+)?)/ },
    { name: 'Google Chrome',  pattern: /Chrome\/(\d+(\.\d+)?)/ },
    { name: 'Mozilla Firefox',pattern: /Firefox\/(\d+(\.\d+)?)/ },
    { name: 'Apple Safari',   pattern: /Version\/(\d+(\.\d+)?).*Safari\// }
  ];

  let browserName = 'Tuntematon';
  let browserVersion = '';

  for (const { name, pattern } of browsers) {
    const match = ua.match(pattern);
    if (match) {
      browserName = name;
      browserVersion = match[1];
      break;
    }
  }

  const osName = getOS(ua);

  return {
    name: browserName,
    version: browserVersion,
    os: osName
  };
}

function getOS(ua) {
  if (/Windows NT/.test(ua))               return 'Windows';
  if (/Mac OS X/.test(ua) && !/Mobile/.test(ua)) return 'macOS';
  if (/Android/.test(ua))                  return 'Android';
  if (/iPhone|iPad|iPod/.test(ua))         return 'iOS';
  if (/Linux/.test(ua))                    return 'Linux';
  return 'Tuntematon';
}
