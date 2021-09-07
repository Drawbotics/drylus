import sv from '@drawbotics/drylus-style-vars';
import { countries } from 'countries-list';
import { Country } from 'country-state-city';
import { css } from 'emotion';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { Input, InputProps } from './Input';
import { Select } from './Select';

const styles = {
  group: css`
    position: relative;
  `,
  select: css`
    [data-element='select'] {
      color: transparent !important;
    }
  `,
  emoji: css`
    pointer-events: none;
    position: absolute;
    bottom: calc(${sv.marginExtraSmall} + 1px);
    left: ${sv.marginSmall};
    z-index: 99;
    font-size: 1.4rem;
  `,
};

const countryPrefixMapping: Record<keyof typeof countries, string> = Object.keys(countries).reduce(
  (memo, country) => ({
    ...memo,
    [country]: countries[country as keyof typeof countries].phone,
  }),
  {} as Record<keyof typeof countries, string>,
);

const timezoneCountryMapping: Record<string, string> = Country.getAllCountries().reduce(
  (memo, country) => ({
    ...memo,
    ...country.timezones?.reduce(
      (memo, timezone) => ({ ...memo, [timezone.zoneName]: country.isoCode }),
      {},
    ),
  }),
  {} as Record<string, string>,
);

export interface PhoneNumberInputProps<T = string>
  extends Exclude<InputProps, 'type' | 'leading'> {}

export const PhoneNumberInput = <T extends string>({
  value: _value,
  onChange,
  name,
  ...props
}: PhoneNumberInputProps<T>) => {
  const [country, setCountry] = useState<keyof typeof countries>();
  const value = typeof _value === 'function' ? _value(name) : _value;

  const handleChangeNumber = (_value: string | number) => {
    const value = _value as string;
    if (/\+?[^\d+]/g.test(value.replace(/\s/g, ''))) {
      // Invalid number format
      return;
    }
    const withPlusPrefix = value.replace(/^00/, '+');
    const countryFromNumber = Object.keys(countryPrefixMapping).find((key) =>
      withPlusPrefix
        .replace(/(\+)/g, '')
        .startsWith(countryPrefixMapping[key as keyof typeof countries]),
    );
    if (countryFromNumber != null && countryFromNumber != country) {
      setCountry(countryFromNumber as keyof typeof countries);
    }
    if (countryFromNumber != null) {
      onChange?.(withPlusPrefix, name);
    }
  };

  const handleChangeCountry = (newCountry: keyof typeof countries) => {
    const prefix = `+${countryPrefixMapping[newCountry]} `;
    if (value === '' && value == null) {
      onChange?.(value, name);
    } else {
      const match = Object.values(countryPrefixMapping)
        .map((prefix) => `00${prefix}|\\+${prefix}`)
        .join('|');
      const trailing = String(value).replace(new RegExp(match, 'g'), '');
      onChange?.(prefix + trailing.replace(/^\s/, ''), name);
    }
    setCountry(newCountry);
  };

  useEffect(() => {
    if (value != null && value !== '') {
      handleChangeNumber(value);
    } else {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = timezoneCountryMapping[timezone];
      if (country != null) {
        handleChangeCountry(country as keyof typeof countries);
      }
    }
  }, []);

  return (
    <div className={styles.group}>
      {country != null ? <div className={styles.emoji}>{countries[country].emoji}</div> : null}
      <Input
        {...props}
        leading={
          <Select
            className={styles.select}
            style={{ width: 75 }}
            value={country}
            options={Object.keys(countries).map((countryCode) => {
              const country = countries[countryCode as keyof typeof countries];
              return {
                value: countryCode as keyof typeof countries,
                label: country.name,
              };
            })}
            onChange={handleChangeCountry}
          />
        }
        type="tel"
        value={value}
        onChange={handleChangeNumber}
      />
    </div>
  );
};
