export function smoothScrollToTop(): Promise<void> {
  let isResolved = false; // Flag to ensure promise is resolved only once

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
      if (window.scrollY === 0 && !isResolved) {
        window.removeEventListener('scroll', checkIfScrollCompleted);
        isResolved = true; // Set flag to true
        resolve();
      } else {
        // Use requestAnimationFrame for more efficient and smooth scrolling
        window.requestAnimationFrame(checkIfScrollCompleted);
      }
    };

    window.addEventListener('scroll', checkIfScrollCompleted);
    scrollToTop();
  });
}
