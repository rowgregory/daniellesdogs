import S1 from '../components/assets/service_1.png';
import S2 from '../components/assets/service_2.png';
import S3 from '../components/assets/service_3.png';
import S4 from '../components/assets/service_4.png';
import M1 from '../components/assets/M1.png';
import M2 from '../components/assets/M2.png';
import M3 from '../components/assets/M3.png';
import M4 from '../components/assets/M4.png';
import M5 from '../components/assets/M5.png';
import M6 from '../components/assets/M6.png';
import M7 from '../components/assets/M7.jpeg';
import M8 from '../components/assets/M8.png';
import M9 from '../components/assets/M9.png';
import M10 from '../components/assets/M10.png';
import M11 from '../components/assets/M11.png';
import M12 from '../components/assets/M12.png';
import M13 from '../components/assets/M13.jpeg';
import M14 from '../components/assets/M14.jpeg';
import M15 from '../components/assets/M15.jpeg';
import M16 from '../components/assets/M16.jpeg';
import M17 from '../components/assets/M17.jpeg';
import M18 from '../components/assets/M18.jpeg';
import M19 from '../components/assets/M19.jpeg';
import M20 from '../components/assets/M20.jpeg';
import M21 from '../components/assets/M21.jpeg';
import M22 from '../components/assets/M22.jpeg';
import M23 from '../components/assets/M23.jpeg';
import M24 from '../components/assets/M24.jpeg';

import Flexibility from '../components/assets/flexibility.png';
import Convenience from '../components/assets/convenience.png';
import Communication from '../components/assets/communication.png';
import TextAndUpdates from '../components/assets/textAndUpdates.png';

export const setsUsApartData = [
  {
    icon: Flexibility,
    text: 'Flexibility',
    desc: 'Our walking business stands out with its exceptional flexibility, accommodating diverse schedules and adapting to individual needs. We prioritize offering convenient and customizable walking services, ensuring both clients and their furry companions enjoy the utmost convenience and satisfaction.',
  },
  {
    icon: Convenience,
    text: 'Convenience',
    desc: `Our walking business excels in providing unparalleled convenience. With hassle-free booking, flexible scheduling, and personalized services, we make it effortless for clients to prioritize their dog's exercise needs while fitting seamlessly into their busy lifestyles.`,
  },
  {
    icon: Communication,
    text: 'Communication',
    desc: `Communication is a key strength of our walking business. We prioritize clear and prompt communication with our clients, keeping them informed about their dog's walks, sharing updates and photos, and addressing any concerns or preferences. Building trust through effective communication is our top priority.`,
  },
  {
    icon: TextAndUpdates,
    text: `Photo & Text Updates`,
    desc: `Our walking business goes the extra mile by providing photo and text updates during each walk. Clients can stay connected with their furry friends, receiving real-time updates and capturing joyful moments, ensuring peace of mind and a delightful experience for both pets and owners.`,
  },
];

export const servicesData = [
  {
    img: S1,
    text: 'Thirty Minute Walk',
  },
  {
    img: S2,
    text: 'One Hour Walk',
  },
  {
    img: S3,
    text: 'Overnight Care',
  },
  {
    img: S4,
    text: 'Check-Ins',
  },
];

export const SplitTextToChars = (textNode: any) => {
  const textContent = textNode.textContent;
  const textSplit = textContent.split('');

  const frag = document.createDocumentFragment();
  textSplit.forEach((letter: any, i: number) => {
    const span = document.createElement('span') as any;
    span.textContent = letter;
    span.style = `${letter === ' ' ? 'min-width: 0.45rem;' : ''}z-index: ${
      textSplit.length - i
    }; position: relative; display: inline-block;`;
    frag.appendChild(span);
  });
  textNode.textContent = '';
  textNode.appendChild(frag);

  return textNode.children;
};

export const imgArr = [
  {
    first: M1,
    second: M2,
    third: M3,
    fourth: M4,
    fifth: M5,
    sixth: M6,
    seventh: M7,
    eigth: M8,
    ninth: M9,
    tenth: M10,
    eleventh: M11,
    twelth: M12,
  },
  {
    first: M13,
    second: M14,
    third: M15,
    fourth: M16,
    fifth: M17,
    sixth: M18,
    seventh: M19,
    eigth: M20,
    ninth: M21,
    tenth: M22,
    eleventh: M23,
    twelth: M24,
  },
];
