const dropdown = () => {
  const roots = document.getElementsByClassName('Drylus-Dropdown__wrapper');

  const handleClickTrigger = (root) => {
    const dropdown = root.getElementsByClassName('Drylus-Dropdown__root')[0];
    dropdown.classList.add('Drylus-Dropdown__visible');
  };

  const handleClickContent = (content) => {
    content.classList.remove('Drylus-Dropdown__visible');
  };

  const handleClickDocument = (e) => {
    if (! Array.from(roots).some((root) => root.contains(e.target))) {
      Array.from(roots).forEach((root) => {
        const dropdown = root.getElementsByClassName('Drylus-Dropdown__root')[0];
        dropdown.classList.remove('Drylus-Dropdown__visible');
      });
    }
  };

  Array.from(roots).forEach((root) => {
    const trigger = root.getElementsByClassName('Drylus-Dropdown__trigger')[0];
    const content = root.getElementsByClassName('Drylus-Dropdown__root')[0];

    trigger.addEventListener('click', () => handleClickTrigger(root));
    content.addEventListener('click', () => handleClickContent(content));
  });

  document.addEventListener('click', handleClickDocument);
};



export default () => document._ready(dropdown);
