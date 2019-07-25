const searchInput = () => {
  const roots = document.getElementsByClassName('Drylus-SearchInput__root');

  const handleClickSearch = (input) => input.focus();

  Array.from(roots).forEach((root) => {
    const input = root.getElementsByClassName('Drylus-Input__input')[0];
    const button = root.getElementsByClassName('Drylus-Button__root')[0];

    button.addEventListener('click', () => handleClickSearch(input));
  });
};


export default () => document._ready(searchInput);
