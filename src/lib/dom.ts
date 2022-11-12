export const switchBodyOverflow = (overflow: 'auto' | 'hidden') => {
  if (document.body.style.overflow !== overflow) document.body.style.overflow = overflow;
};
