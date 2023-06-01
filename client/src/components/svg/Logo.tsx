import styled from 'styled-components';

const Group = styled.g<{ donothover: any }>`
  transition: 300ms;
  :hover {
    fill: ${({ donothover }) => (donothover ? '' : 'lightpink')};
  }
`;

export const DDLogo = ({ fill, w, h }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 250 250'
    width={w ? w : '200pt'}
    height={h ? h : '200pt'}
  >
    <Group
      donothover={fill}
      transform='translate(-130,300) scale(0.100000,-0.100000)'
      fill={fill ? fill : '#f3f3f3'}
      stroke='none'
    >
      <path
        d='M2966 2624 c-219 -53 -388 -243 -456 -512 l-11 -43 -70 75 c-81 86
-173 151 -274 191 -83 34 -232 45 -324 25 -134 -29 -282 -143 -348 -266 -62
-116 -78 -192 -77 -354 1 -164 19 -252 76 -366 37 -74 115 -165 186 -217 85
-63 225 -125 455 -201 125 -42 273 -99 329 -127 134 -66 279 -163 357 -238 34
-33 64 -54 66 -48 2 7 9 30 16 52 30 99 152 312 258 450 25 33 116 134 201
225 186 197 237 258 284 343 67 119 79 168 80 307 0 110 -4 135 -28 210 -73
222 -188 370 -348 451 -112 57 -250 73 -372 43z m226 -114 c212 -65 380 -289
418 -558 28 -199 -44 -359 -268 -595 -65 -67 -140 -148 -168 -179 l-52 -57 -6
38 c-17 109 -218 284 -369 322 -65 16 -112 1 -166 -53 -107 -108 -194 -359
-163 -472 10 -34 9 -37 -6 -32 -411 138 -542 191 -641 258 -164 113 -251 303
-251 545 0 169 47 304 140 407 97 105 211 156 352 156 165 -1 276 -49 411
-180 l87 -85 10 40 c18 72 60 172 93 221 70 107 193 198 306 230 73 20 199 17
273 -6z m-158 -1507 c-86 -131 -184 -330 -184 -375 0 -7 -17 5 -38 27 -55 59
-116 106 -216 169 -77 49 -85 56 -60 56 43 1 94 22 193 79 l89 51 98 0 c55 0
106 5 114 10 23 15 24 12 4 -17z'
      />
      <path
        d='M2710 2081 c-23 -12 -44 -36 -60 -67 -22 -42 -25 -62 -25 -144 0 -78
4 -102 22 -135 31 -59 65 -87 107 -88 103 -3 173 164 131 308 -21 74 -48 113
-91 131 -42 18 -42 18 -84 -5z'
      />
      <path
        d='M2313 1990 c-93 -38 -78 -233 26 -353 43 -48 102 -73 149 -61 52 13
86 77 78 152 -10 105 -80 215 -161 253 -44 21 -59 22 -92 9z'
      />
      <path
        d='M3010 1754 c-97 -82 -107 -274 -19 -349 48 -39 101 -35 149 13 85 85
92 246 14 328 -41 44 -97 47 -144 8z'
      />
      <path
        d='M2140 1582 c-132 -66 -7 -338 158 -345 77 -3 118 41 116 123 -3 85
-62 172 -146 214 -61 31 -81 32 -128 8z'
      />
    </Group>
  </svg>
);
