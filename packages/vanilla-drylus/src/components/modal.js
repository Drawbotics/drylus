const modal = () => {
  let outlet = document.getElementById('vanilla-modals-outlet');

  if (!outlet) {
    const outletElement = document.createElement('div');
    outletElement.setAttribute('id', 'vanilla-modals-outlet');
    outletElement.setAttribute('class', 'Drylus-ThemeProvider__root');
    document.body.appendChild(outletElement);
    outlet = outletElement;
  }

  const triggers = document.querySelectorAll('[data-modal-trigger]');
  const modals = document.querySelectorAll('[data-modal]');

  const handleClickTrigger = (id) => {
    const modal = Array.from(modals).find((modal) => modal.getAttribute('data-modal') === id);

    if (modal) {
      modal.style = null;
      modal.style.opacity = '0';
      modal.style.transition = 'all 0.15s ease-in-out';
      modal.style.display = 'flex';

      setTimeout(() => {
        modal.style.opacity = '1';
      }, 100);
    }
  };

  const hideModal = (modal) => {
    modal.style.opacity = '0';

    setTimeout(() => {
      modal.style = 'display: none';
    }, 150);
  };

  const handleClickOverlay = (e, modal) => {
    if (e.target === modal) {
      hideModal(modal);
    }
  };

  const handleCloseModal = (id) => {
    const modal = Array.from(modals).find((modal) => modal.getAttribute('data-modal') === id);
    if (modal) {
      hideModal(modal);
    }
  };

  Array.from(triggers).forEach((trigger) => {
    trigger.addEventListener('click', () =>
      handleClickTrigger(trigger.getAttribute('data-modal-trigger')),
    );
  });

  Array.from(modals).forEach((modal) => {
    modal.classList.add('Drylus-Modal__modalEnter');
    modal.remove();
    outlet.appendChild(modal);

    const close = modal.querySelector('[data-element="close"]');

    close.addEventListener('click', () => handleCloseModal(modal.getAttribute('data-modal')));
    modal.addEventListener('click', (e) => handleClickOverlay(e, modal));
  });
};

export const closeModal = (id) => {
  const modal = document.querySelector(`[data-modal="${id}"]`);
  modal.style.opacity = '1';

  setTimeout(() => {
    modal.style = 'display: none';
  }, 150);
};

export default () => document._ready(modal);
