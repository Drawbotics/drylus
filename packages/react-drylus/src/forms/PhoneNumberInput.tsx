import sv from '@drawbotics/drylus-style-vars';
import { countries } from 'countries-list';
import countryTimezones from 'country-state-city/lib/assets/country.json';
import { css, cx } from '@emotion/css';
import React, { useEffect } from 'react';
import { useState } from 'react';

import { Size } from '../enums';
import { Responsive } from '../types';
import { isFunction, useResponsiveProps } from '../utils';
import { Input, InputProps } from './Input';
import { Select } from './Select';

const styles = {
  group: css`
    position: relative;
  `,
  select: css`
    [data-element='select'] {
      color: transparent !important;

      > option {
        color: initial;
      }
    }
  `,
  emoji: css`
    pointer-events: none;
    position: absolute;
    top: calc(${sv.marginExtraSmall} + 1px);
    left: ${sv.marginSmall};
    z-index: 1;
    font-size: 1.4em;
  `,
  small: css`
    top: 4px;
  `,
};

type CountryCode = keyof typeof countries;

const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const countryPrefixMapping: Record<keyof typeof countries, string> = Object.keys(countries).reduce(
  (memo, country) => ({
    ...memo,
    [country]: String(countries[country as keyof typeof countries].phone[0]),
  }),
  {} as Record<CountryCode, string>,
);

interface CountryTimezone {
  isoCode: string;
  phonecode: string;
  timezones?: Array<{ zoneName: string }>;
}

const timezoneCountryMapping: Record<string, string> = (countryTimezones as CountryTimezone[]).reduce(
  (memo: Record<string, string>, country: CountryTimezone) => {
    if (country.timezones) {
      country.timezones.forEach((tz) => {
        memo[tz.zoneName] = country.isoCode;
      });
    }
    return memo;
  },
  {},
);

export function getTrailingPhoneNumber(value: string): string {
  const match = Object.values(countryPrefixMapping)
    .map((prefix) => `00${prefix}|\\+${prefix}`)
    .join('|');
  const trailing = String(value).replace(new RegExp(match, 'g'), '');
  return trailing;
}

export interface PhoneNumberInputProps<T = string>
  extends Exclude<InputProps<T>, 'type' | 'leading' | 'responsive'> {
  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const PhoneNumberInput = <T extends string>({
  responsive,
  ...rest
}: PhoneNumberInputProps<T>) => {
  const { value: _value, onChange, name, size, ...props } = useResponsiveProps<
    PhoneNumberInputProps<T>
  >(rest, responsive);
  const [country, setCountry] = useState<keyof typeof countries>();
  const value = isFunction(_value) ? _value(name) : _value;

  const handleChangeNumber = (_value: number | string) => {
    const value = String(_value);
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
      const trailing = getTrailingPhoneNumber(String(value));
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
      {country != null ? (
        <div className={cx(styles.emoji, { [styles.small]: size === Size.SMALL })}>
          {getFlagEmoji(country)}
        </div>
      ) : null}
      <Input
        {...props}
        size={size}
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
        name={name}
        type="tel"
        value={_value}
        onChange={handleChangeNumber}
      />
    </div>
  );
};
