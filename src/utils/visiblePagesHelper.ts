export function visiblePagesHelper(currentPage: number, totalPages: number, navWindow: number, pages: number[]) {
  const window = navWindow % 2 === 0 ? navWindow + 1 : navWindow;
  const halfWindow = Math.ceil(window / 2);

  if (totalPages <= window) {
    return pages;
  }

  if (currentPage <= halfWindow) {
    return pages.slice(0, window);
  }

  if (currentPage >= totalPages - halfWindow) {
    return pages.slice(totalPages - window);
  }

  return pages.slice(currentPage - halfWindow, currentPage + halfWindow - 1);
}
