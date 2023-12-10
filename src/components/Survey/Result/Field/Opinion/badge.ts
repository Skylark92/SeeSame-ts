import badgeSprites from 'assets/badge-sprites.png';

export const badge = `
  content: '';
  display: block;
  width: 1.375rem;
  height: 1.375rem;
  background: url(${badgeSprites});
  background-size: 7.1875rem 2.25rem;
  background-position: -2.5625rem -0.4375rem;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
`;

export const grade = [
  'background-position: -2.5625rem -0.4375rem;',
  'background-position: -4.125rem -0.4375rem;',
  'background-position: -5.65625rem -0.4375rem;',
];
