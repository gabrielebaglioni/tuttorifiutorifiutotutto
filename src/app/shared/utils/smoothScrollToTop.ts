// scroll-utils.ts
export function smoothScrollToTop(): Promise<void> {
  return new Promise<void>((resolve) => {
    const scrollToTop = () => {
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo(0, 0);
      }
    };

    const checkIfScrollCompleted = () => {
      if (window.scrollY === 0) {
        window.removeEventListener('scroll', checkIfScrollCompleted);
        resolve();
      }
    };

    window.addEventListener('scroll', checkIfScrollCompleted);
    scrollToTop();
  });
}
