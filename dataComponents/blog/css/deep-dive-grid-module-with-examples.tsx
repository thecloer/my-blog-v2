import type { FC, PropsWithChildren } from 'react';
import type { PassingProps } from 'dataComponents/common/common.type';

// types
type OptionsValue = string | number;
type ControllerOption<T extends OptionsValue> = { text: string; value: T };
type AttributeOptionMap<T extends OptionsValue> = Record<
  string,
  { options: ControllerOption<T>[]; selectedValue: string; onChange: (selectedValue: string) => void }
>;

// lib
const makeOptionId = (fieldName: string, optionValue: OptionsValue) =>
  `${fieldName}-${typeof optionValue === 'string' ? optionValue.replaceAll(' ', '-') : optionValue}`;

/**
 * Common components
 */

// Controller
const Controller = <T extends OptionsValue>({
  name,
  options,
  onChange,
  className = '',
  style,
}: PassingProps & {
  name: string;
  options: ControllerOption<T>[];
  onChange: (selectedOption: ControllerOption<T>) => void;
}) => {
  return (
    <fieldset className={`mt-2 flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {options.map((option, i) => (
        <label
          key={i}
          htmlFor={makeOptionId(name, option.value)}
          className='flex items-center gap-2 text-bgDark-700 dark:text-bgDark-300'
        >
          <input
            id={makeOptionId(name, option.value)}
            type='radio'
            value={option.value}
            name={name}
            defaultChecked={i === 0}
            onChange={() => onChange(option)}
            className='h-4 w-4'
          />
          {option.text}
        </label>
      ))}
    </fieldset>
  );
};

// CodeController
const CodeController = <T extends OptionsValue>({
  name,
  selector,
  attributeMap,
  className = '',
  style,
}: PassingProps & { name: string; selector: string; attributeMap: AttributeOptionMap<T> }) => {
  return (
    <div className={className} style={style}>
      <div className='text-left'>{`${selector}  {`}</div>
      {Object.keys(attributeMap).map((attribute, i) => {
        const { options, selectedValue, onChange } = attributeMap[attribute];
        return (
          <div key={i}>
            <label htmlFor={`${name}-${attribute}-${i}`} className='ml-4 mr-2'>
              {attribute}:
            </label>
            <select
              id={`${name}-${attribute}-${i}`}
              className=''
              value={selectedValue}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <span className='ml-1'>;</span>
          </div>
        );
      })}
      <div className='text-left'>{`}`}</div>
    </div>
  );
};

/**
 * Grid components
 */

// GridContainer
const Container: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => {
  return (
    <div className={`rounded-lg border-2 border-bgDark-700 bg-orange-500 px-3 py-2 ${className}`} style={style}>
      {children}
    </div>
  );
};

// GridItem
const Item: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => {
  return (
    <div
      className={`my-2 mx-1 rounded-lg border-2 border-bgDark-700 bg-yellow-400 px-2 py-1 text-black ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

/**
 * Examples
 */

// Example 1: display
export const Display = () => {};
