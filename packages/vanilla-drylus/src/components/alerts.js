const alerts = () => {
  const roots = document.getElementsByClassName('Drylus-AlertsProvider__root');

  const handleClickClose = (root) => {
    setTimeout(() => root.remove(), 300);
    root.classList.remove('Drylus-AlertsProvider__alertExit');
    root.classList.add('Drylus-AlertsProvider__alertExitActive');
  };

  Array.from(roots).forEach((root) => {
    const button = root.getElementsByClassName('Drylus-Button__root')[0];

    button.addEventListener('click', () => handleClickClose(root));
  });
};


export default () => document._ready(alerts);
