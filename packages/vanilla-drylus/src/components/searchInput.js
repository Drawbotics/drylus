const searchInput = () => {
  const roots = document.getElementsByClassName('Drylus-SearchInput__root');

  const handleClickSearch = (input) => input.focus();

  const handleFocusInput = (list) => {
    list.classList.add('Drylus-SearchInput__visible');
  };

  const handleBlurInput = (list) => {
    list.classList.remove('Drylus-SearchInput__visible');
  };

  Array.from(roots).forEach((root) => {
    const input = root.getElementsByClassName('Drylus-Input__input')[0];
    const button = root.getElementsByClassName('Drylus-Button__root')[0];
    const list = root.getElementsByClassName('Drylus-SearchInput__list')[0];

    button.addEventListener('click', () => handleClickSearch(input));
    input.addEventListener('focus', () => handleFocusInput(list));
    input.addEventListener('blur', () => handleBlurInput(list));
  });
};



export default () => document._ready(searchInput);
