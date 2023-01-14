import Flexible from '../components/svg/Flexible';
import Convenience from '../components/svg/Convenience';
import PhotoUpdates from '../components/svg/PhotoUpdates';
import Communication from '../components/svg/Communication';
import S1 from '../components/assets/service_1.png';
import S2 from '../components/assets/service_2.png';
import S3 from '../components/assets/service_3.png';
import S4 from '../components/assets/service_4.png';
import Fifth from '../components/assets/fifth.jpeg';
import Thirteenth from '../components/assets/thirteenth.jpeg';

export const setsUsApartData = [
  {
    icon: <Flexible />,
    text: 'Flexibility',
  },
  {
    icon: <Convenience />,
    text: 'Convenience',
  },
  {
    icon: <Communication />,
    text: 'Communcation',
  },
  {
    icon: <PhotoUpdates />,
    text: `Photo & Text Updates`,
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
    first:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660264184/M1_cucuux.png',
    second:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265747/M10-min_z6pywe.png',
    third: Thirteenth,
    fourth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265350/M2-min_khrx2h.png',
    fifth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265415/M3-min_lcsyzv.png',
    sixth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265446/M4-min_kes7ya.png',
    seventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265453/M5-min_koc06p.png',
    eigth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265533/M6-min_rzhgqq.png',
    ninth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265562/M7-min_jvix21.png',
    tenth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833624/IMG_5634_jcwygm.png',
    eleventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008137/IMG_2013_za0pih.png',
    twelth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008476/IMG_5597_eo0rsf.jpg',
  },
  {
    first:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007945/IMG_7775_te5poe.png',
    second:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007808/IMG_7823_lmunws.png',
    third:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663007800/IMG_6175_hi89pi.jpg',
    fourth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265599/M8-min_jtw364.png',
    fifth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662834144/Screenshot_2022-07-28_at_5.10.42_PM_fig1vy.png',
    sixth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1660265650/M11-min_s0yxxn.png',
    seventh: Fifth,
    eigth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1663008138/IMG_1192_d7ahmz.png',
    ninth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833626/IMG_5423_f5dgii.png',
    tenth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833624/IMG_0271_hzwto8.png',
    eleventh:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833607/IMG_2909_jzizco.png',
    twelth:
      'https://res.cloudinary.com/dxc6zj0ir/image/upload/v1662833619/IMG_5661_wmbxxo.png',
  },
];
