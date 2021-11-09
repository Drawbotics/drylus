const filter = () => {
  const roots = Array.from(document.getElementsByClassName('Drylus-Filter__root'));

  const handleClickTrigger = (root, trigger) => {
    const panel = root.getElementsByClassName('Drylus-Filter__panel')[0];
    panel.classList.add('Drylus-Filter__visible');
    trigger.classList.add('Drylus-Filter__active')
  }

  const handleClickContent = (panel) => {
    panel.classList.remove('Drylus-Filter__visible');
  };

  const handleClickDocument = (e) => {
    // When a click occurs, close all filter panels unless the click occured
    // inside one of them, in which case it is filtered out
    const otherFilters = roots.filter(root => !root.contains(e.target));

    otherFilters.forEach((root) => {
      const panel = root.getElementsByClassName('Drylus-Filter__panel')[0];
      panel.classList.remove('Drylus-Filter__visible');

      // If the filter has not been set, also remove the active state
      const label = root.querySelector('[data-element="label"]');
      const trigger = root.querySelector('[data-element="trigger"]');
      if (label.dataset.defaultLabel === label.innerHTML) {
        trigger.classList.remove('Drylus-Filter__active');
      }
    });
  };

  const handleClickOption = (root, option) => {
    const newLabel = option.dataset.filterLabel;
    root.querySelector('[data-element="label"]').innerHTML = newLabel;
    root.querySelector('[data-element="trigger"]').classList.add('Drylus-Filter__active')
  }

  const handleClickClear = (root, trigger) => {
    const label = root.querySelector('[data-element="label"]');
    const panel = root.querySelector('.Drylus-Filter__panel');

    trigger.classList.remove('Drylus-Filter__active');
    label.innerHTML = label.dataset.defaultLabel;
    panel.classList.remove('Drylus-Filter__visible');
  } 

  roots.forEach((root) => {
    const trigger = root.getElementsByClassName('Drylus-Filter__trigger')[0];
    const panel = root.getElementsByClassName('Drylus-Filter__panel')[0];
    const clear = root.getElementsByClassName('Drylus-Filter__clear')[0];
    const options = root.getElementsByClassName('Drylus-Filter__option');

    trigger.addEventListener('click', () => handleClickTrigger(root, trigger));
    panel.addEventListener('click', () => handleClickContent(panel));
    panel.addEventListener('click', () => handleClickContent(root, trigger));
    clear.addEventListener('click', () => handleClickClear(root, trigger));
    Array.from(options).forEach((option) => {
      option.addEventListener('click', () => handleClickOption(root, option))
    });
  });

  document.addEventListener('click', handleClickDocument);

}

export default () => document._ready(filter);
