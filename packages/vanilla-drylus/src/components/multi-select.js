function _createItem({ label, value }) {
  return `
    <div class="Drylus-MultiSelect__value" data-element="value">
      <div class="Drylus-Tag__root Drylus-Tag__inversed">${label}
        <i data-value="${value}" class="Drycon Drycon-x Drylus-Icon__root Drylus-Icon__clickable"></i>
      </div>
    </div>
  `;
}

function _getValuesArray(values) {
  return values == '' || values == null ? '' : values.includes(',') ? values.split(',') : [values];
}

const multiSelect = () => {
  const roots = document.getElementsByClassName('Drylus-MultiSelect__root');

  const handleClickTag = ({ tag, trigger, option }) => {
    const currentValues = trigger.getAttribute('value');
    const tagValue = tag.dataset.value;

    const values =
      currentValues != null
        ? currentValues
            .split(',')
            .filter((value) => value !== tagValue)
            .join(',')
        : '';
    trigger.setAttribute('value', values);

    /* eslint-disable no-debugger, no-use-before-define */
    handleSetValues({ values, trigger, option });
  };

  const handleClickTrigger = (trigger, options) => {
    trigger.classList.add('Drylus-MultiSelect__active');
    options.classList.add('Drylus-MultiSelect__open');
  };

  const handleSetValues = ({ values, trigger, option }) => {
    const valuesArray = _getValuesArray(values);

    const valuesContainer = document.createElement('div');
    valuesContainer.classList.add('Drylus-MultiSelect__values');

    // Set the tags
    for (const value of valuesArray) {
      const optionItem = Array.from(option).find((optionEl) => optionEl.dataset.value === value);
      const label = optionItem.innerText;
      const generatedItem = _createItem({ label, value });

      valuesContainer.insertAdjacentHTML('beforeend', generatedItem);
    }

    // Set the disabled/enabled options
    for (const optionItem of option) {
      if (valuesArray.includes(optionItem.dataset.value)) {
        optionItem.classList.add('Drylus-MultiSelect__disabledOption');
      } else {
        optionItem.classList.remove('Drylus-MultiSelect__disabledOption');
      }
    }

    trigger.innerHTML = '';
    if (valuesArray.length > 0) {
      trigger.insertAdjacentHTML('afterbegin', valuesContainer.outerHTML);

      const tagElements = trigger.querySelectorAll(`[data-value]`);
      for (const tag of tagElements) {
        tag.addEventListener('click', () => {
          handleClickTag({
            tag,
            trigger,
            option,
          });
        });
      }
    } else {
      trigger.insertAdjacentHTML(
        'afterbegin',
        '<div class="Drylus-MultiSelect__placeholder">--</div>',
      );
    }
  };

  const handleClickOption = ({ optionItem, trigger, option }) => {
    const value = optionItem.dataset.value;

    // Set new value in `value`
    const currentValues = trigger.getAttribute('value');
    const values =
      currentValues != null && currentValues != ''
        ? [...currentValues.split(','), value].join(',')
        : value;
    trigger.setAttribute('value', values);

    handleSetValues({ values, trigger, option });
  };

  const handleClickDocument = (e) => {
    if (!Array.from(roots).some((root) => root.contains(e.target))) {
      Array.from(roots).forEach((root) => {
        const trigger = root.getElementsByClassName('Drylus-MultiSelect__select')[0];
        const options = root.getElementsByClassName('Drylus-MultiSelect__options')[0];
        options.classList.remove('Drylus-MultiSelect__open');
        trigger.classList.remove('Drylus-MultiSelect__active');
      });
    }
  };

  Array.from(roots).forEach((root) => {
    const trigger = root.getElementsByClassName('Drylus-MultiSelect__select')[0];
    const options = root.getElementsByClassName('Drylus-MultiSelect__options')[0];
    const option = options.getElementsByClassName('Drylus-MultiSelect__option');

    if (trigger.getAttribute('value') != null) {
      const values = trigger.getAttribute('value');
      handleSetValues({ trigger, option, values });
    }

    trigger.addEventListener('click', () => handleClickTrigger(trigger, options));
    for (const optionItem of option) {
      optionItem.addEventListener('click', () =>
        handleClickOption({ optionItem, trigger, option }),
      );
    }
  });

  document.addEventListener('click', handleClickDocument);
};

export default () => document._ready(multiSelect);
