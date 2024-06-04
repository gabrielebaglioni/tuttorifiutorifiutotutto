// scroll-utils.ts
export function smoothScrollToTop(): Promise<void> {
  return new Promise<void>((resolve) => {
    let touchStartY = 0;
    let isSwipe = false;

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
      isSwipe = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touchEndY = event.touches[0].clientY;
      const deltaY = Math.abs(touchEndY - touchStartY);
      if (deltaY > 10) { // Threshold for swipe detection
        isSwipe = true;
      }
    };

    const onTouchEnd = () => {
      if (!isSwipe) {
        scrollToTop();
      }
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    const scrollToTop = () => {
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo(0, 0);
      }

      const checkIfScrollCompleted = () => {
        if (window.scrollY === 0) {
          window.removeEventListener('scroll', checkIfScrollCompleted);
          resolve();
        }
      };

      window.addEventListener('scroll', checkIfScrollCompleted);
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  });
}
