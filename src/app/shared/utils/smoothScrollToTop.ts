// scroll-utils.ts
export function smoothScrollToTop(): Promise<void> {
  return new Promise<void>((resolve) => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
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
