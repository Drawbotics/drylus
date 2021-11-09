const filter = () => {
  const roots = document.getElementsByClassName('Drylus-Filter__root');

  const handleClickTrigger = (root) => {
    const panel = root.getElementsByClassName('Drylus-Filter__panel')[0];
    panel.classList.add('Drylus-Filter__visible');
  }

  const handleClickContent = (content) => {
    content.classList.remove('Drylus-Filter__visible');
  };

  const handleClickDocument = (e) => {
    if (!Array.from(roots).some((root) => root.contains(e.target))) {
      Array.from(roots).forEach((root) => {
        const panel = root.getElementsByClassName('Drylus-Filter__panel')[0];
        panel.classList.remove('Drylus-Filter__visible');
      });
    }
  };

  Array.from(roots).forEach((root) => {
    const trigger = root.getElementsByClassName('Drylus-Filter__trigger')[0];
    const content = root.getElementsByClassName('Drylus-Filter__panel')[0];

    trigger.addEventListener('click', () => handleClickTrigger(root));
    content.addEventListener('click', () => handleClickContent(content));
  });

  document.addEventListener('click', handleClickDocument);

}

export default () => document._ready(filter);
