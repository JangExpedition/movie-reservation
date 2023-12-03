export const classAddAndRemove = (
  ref: HTMLElement | null,
  addClass: string,
  removeClass: string
) => {
  if (ref) {
    ref.classList.add(`${addClass}`);
    ref.classList.remove(`${removeClass}`);
  }
};
