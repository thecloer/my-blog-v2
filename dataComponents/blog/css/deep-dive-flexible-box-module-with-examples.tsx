import type { CSSProperties, FC, MouseEventHandler, PropsWithChildren } from 'react';
import { useState } from 'react';

// types
type PassingProps = {
  className?: string;
  style?: CSSProperties;
};
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

// SandBox
const SandBox: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => (
  <div className={`my-6 ${className}`} style={style}>
    {children}
  </div>
);

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
 * Flex components
 */

// FlexContainer
const FlexContainer: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => {
  return (
    <div className={`rounded-lg border-2 border-bgDark-700 bg-orange-500 px-3 py-2 ${className}`} style={style}>
      {children}
    </div>
  );
};

// FlexItem
const FlexItem: FC<PropsWithChildren<PassingProps>> = ({ children, className = '', style }) => {
  return (
    <div
      className={`my-2 mx-1 rounded-lg border-2 border-bgDark-700 bg-yellow-400 px-2 py-1 text-black ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// Others
const Gap: FC<PassingProps> = ({ className, style }) => (
  <div
    className={`grow rounded border-4 border-dashed border-violet-300 bg-violet-600 bg-clip-padding ${className}`}
    style={style}
  ></div>
);
const Line = () => <div className='border border-white'></div>;

/**
 * Examples
 */

const FLEX_ITEMS = ['The first item', 'Item 2', 'Third', 'Item number 4', 'No. 5'];

// Example 1: display
export const Display = () => {
  const options = [
    { text: 'block', value: 'block' },
    { text: 'flex', value: 'flex' },
    { text: 'inline-flex', value: 'inline-flex' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={className}>
        {FLEX_ITEMS.map((item, i) => (
          <FlexItem key={i} className={i === 0 && className !== 'block' ? 'w-16' : undefined}>
            {item}
          </FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'display'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 2: flex-direction
export const Direction = () => {
  const options = [
    { text: 'row', value: 'flex-row' },
    { text: 'row-reverse', value: 'flex-row-reverse' },
    { text: 'column', value: 'flex-col' },
    { text: 'column-reverse', value: 'flex-col-reverse' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex ${className}`}>
        {FLEX_ITEMS.map((item, i) => (
          <FlexItem key={i}>{item}</FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'flex-direction'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 3: flex-wrap
export const Wrap = () => {
  const options = [
    { text: 'nowrap', value: 'flex-nowrap' },
    { text: 'wrap', value: 'flex-wrap' },
    { text: 'wrap-reverse', value: 'flex-wrap-reverse' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex w-60 ${className}`}>
        {FLEX_ITEMS.map((item, i) => (
          <FlexItem key={i}>{item}</FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'flex-wrap'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 4: justify-content
export const JustifyContent = () => {
  const options = [
    { text: 'flex-start', value: 'justify-start' },
    { text: 'flex-end', value: 'justify-end' },
    { text: 'center', value: 'justify-center' },
    { text: 'space-between', value: 'justify-between' },
    { text: 'space-around', value: 'justify-around' },
    { text: 'space-evenly', value: 'justify-evenly' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex ${className}`}>
        {FLEX_ITEMS.slice(0, 3).map((item, i) => (
          <FlexItem key={i}>{item}</FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'justify-content'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 4 - 2: space-between & space-around & space-evenly
export const SpaceBetweenAroundEvenly = () => {
  const options = [
    { text: 'space-between', value: 'between' },
    { text: 'space-around', value: 'around' },
    { text: 'space-evenly', value: 'evenly' },
  ];
  const [mode, setMode] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className='flex'>
        {mode === 'between' ? null : <Gap className='my-2 mx-1' />}
        <FlexItem className='mx-0'>{FLEX_ITEMS[0]}</FlexItem>
        <Gap className='my-2 mx-1' />
        {mode === 'around' ? (
          <>
            <Line />
            <Gap className='my-2 mx-1' />
          </>
        ) : null}
        <FlexItem className='mx-0'>{FLEX_ITEMS[1]}</FlexItem>
        <Gap className='my-2 mx-1' />
        {mode === 'around' ? (
          <>
            <Line />
            <Gap className='my-2 mx-1' />
          </>
        ) : null}
        <FlexItem className='mx-0'>{FLEX_ITEMS[2]}</FlexItem>
        {mode === 'between' ? null : <Gap className='my-2 mx-1' />}
      </FlexContainer>
      <Controller
        name={'space-between-around-evenly'}
        options={options}
        onChange={(selectedOption) => setMode(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 4 - 3: align module(flex-start vs start)
export const AlignModule = () => {
  const flexDirections = [
    { text: 'row', value: 'row' },
    { text: 'row-reverse', value: 'flex-row-reverse' },
  ];
  const JustifyContents = [
    { text: 'flex-start', value: 'flex-start' },
    { text: 'start', value: 'start' },
    { text: 'flex-end', value: 'flex-end' },
    { text: 'end', value: 'end' },
  ];
  const [direction, setDirection] = useState(flexDirections[0].value);
  const [justifyContent, setJustifyContent] = useState(JustifyContents[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex ${direction}`} style={{ justifyContent }}>
        <FlexItem>{FLEX_ITEMS[0]}</FlexItem>
        <FlexItem>{FLEX_ITEMS[1]}</FlexItem>
      </FlexContainer>
      <div>
        <span className='mr-4'>flex-direction:</span>
        <Controller
          name={'align-module-flex-direction'}
          className='inline-flex'
          options={flexDirections}
          onChange={(selectedOption) => setDirection(selectedOption.value)}
        />
      </div>
      <div>
        <span className='mr-4'>justify-content:</span>
        <Controller
          name={'align-module-justify-content'}
          className='inline-flex'
          options={JustifyContents}
          onChange={(selectedOption) => setJustifyContent(selectedOption.value)}
        />
      </div>
    </SandBox>
  );
};

// Example 5: align-items
export const AlignItems = () => {
  const options = [
    { text: 'stretch', value: 'items-stretch' },
    { text: 'flex-start', value: 'items-start' },
    { text: 'flex-end', value: 'items-end' },
    { text: 'center', value: 'items-center' },
    { text: 'baseline', value: 'items-baseline' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex h-40 ${className}`}>
        {FLEX_ITEMS.map((item, i) => (
          <FlexItem key={i} className={i === 1 ? 'pt-4 text-3xl font-medium' : i === 2 ? 'text-sm' : ''}>
            {item}
          </FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'align-items'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 6: align-content
export const AlignContent = () => {
  const options = [
    { text: 'flex-start', value: 'content-start' },
    { text: 'flex-end', value: 'content-end' },
    { text: 'center', value: 'content-center' },
    { text: 'space-between', value: 'content-between' },
    { text: 'space-around', value: 'content-around' },
    { text: 'stretch', value: 'content-stretch' },
  ];
  const [className, setClassName] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex h-80 flex-wrap ${className}`}>
        {FLEX_ITEMS.map((item, i) => (
          <FlexItem key={i} className='w-[calc(50%-0.5rem)]'>
            {item}
          </FlexItem>
        ))}
      </FlexContainer>
      <Controller
        name={'align-content'}
        options={options}
        onChange={(selectedOption) => setClassName(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 7: flex-basis
export const FlexBasis = () => {
  const flexBasisOptions = [
    { text: 'auto', value: 'basis-auto' },
    { text: '0%', value: 'basis-0' },
    { text: '30%', value: 'basis-1/3' },
    { text: '50%', value: 'basis-[calc(50%-0.5rem)]' },
    { text: '100%', value: 'basis-full' },
    { text: '7rem', value: 'basis-28' },
    { text: '20rem', value: 'basis-80' },
  ];
  const flexWrapOptions = [
    { text: 'wrap', value: 'flex-wrap' },
    { text: 'nowrap', value: 'flex-nowrap' },
  ];
  const wordBreakOptions = [
    { text: 'break-word', value: 'break-all' },
    { text: 'normal', value: 'break-normal' },
  ];
  const [basis, setBasis] = useState(flexBasisOptions[0].value);
  const [flexWrap, setFlexWrap] = useState(flexWrapOptions[0].value);
  const [wordBreak, setWordBreak] = useState(wordBreakOptions[0].value);

  return (
    <SandBox>
      <FlexContainer className={`flex ${flexWrap}`}>
        {['AAAAAAA', 'BBBB', 'CCCCCCCCCCC'].map((item, i) => (
          <FlexItem key={i} className={`${basis} ${wordBreak}`}>
            {item}
          </FlexItem>
        ))}
      </FlexContainer>

      <div className='mt-2 grid gap-4 sm:grid-cols-2'>
        <CodeController
          name='flex-basis'
          selector='.container'
          attributeMap={{
            'flex-wrap': {
              options: flexWrapOptions,
              selectedValue: flexWrap,
              onChange: (selectedValue) => setFlexWrap(selectedValue),
            },
          }}
          className='rounded bg-bgDark-50 px-4 py-2 shadow dark:bg-bgDark-800'
        />
        <CodeController
          name='flex-basis'
          selector='.item'
          attributeMap={{
            'flex-basis': {
              options: flexBasisOptions,
              selectedValue: basis,
              onChange: (selectedValue) => setBasis(selectedValue),
            },
            'word-break': {
              options: wordBreakOptions,
              selectedValue: wordBreak,
              onChange: (selectedValue) => setWordBreak(selectedValue),
            },
          }}
          className='rounded bg-bgDark-50 py-2 px-4 shadow dark:bg-bgDark-800'
        />
      </div>
    </SandBox>
  );
};

// Example 8: flex-grow
export const FlexGrow = () => {
  const options = [
    { text: '(0 / 0 / 0)', value: 0 },
    { text: '(1 / 1 / 1)', value: 1 },
    { text: '(0 / 1 / 1)', value: 2 },
    { text: '(1 / 2 / 3)', value: 3 },
  ];
  const valueGrowMap = [
    ['grow-0', 'grow-0', 'grow-0'],
    ['grow', 'grow', 'grow'],
    ['grow-0', 'grow', 'grow'],
    ['grow', 'grow-[2]', 'grow-[3]'],
  ];
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  return (
    <SandBox>
      <FlexContainer className='flex'>
        {FLEX_ITEMS.slice(0, 3).map((item, i) => {
          const grow = valueGrowMap[selectedValue][i];
          return (
            <FlexItem key={i} className={`flex ${grow}`}>
              {item}
              {grow !== 'grow-0' && <Gap />}
            </FlexItem>
          );
        })}
        {selectedValue === 0 ? <Gap className='my-2 mx-1' /> : null}
      </FlexContainer>
      <Controller
        name='flex-grow'
        options={options}
        onChange={(selectedOption) => setSelectedValue(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 9: flex-shrink
export const FlexShrink = () => {
  const options = [
    { text: '1 / 1 / 1', value: 0 },
    { text: '0 / 1 / 1', value: 1 },
    { text: '0 / 1 / 100', value: 2 },
  ];
  const valueShrinkMap = [
    ['shrink', 'shrink', 'shrink'],
    ['shrink-0', 'shrink', 'shrink'],
    ['shrink-0', 'shrink', 'shrink-[100]'],
  ];
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const dragHandler: MouseEventHandler = (e) => {
    const background = e.currentTarget;
    const container = background.firstElementChild! as HTMLElement;
    const controller = container.firstElementChild! as HTMLElement;
    if (e.target !== controller) return;

    const resizeContainer = (e: Event) => {
      const { clientX: mouseX } = e as MouseEvent;
      const containerLeftX = container.getBoundingClientRect().left;
      const width = mouseX - containerLeftX;
      container.style.width = `${width}px`;
    };

    background.addEventListener('mousemove', resizeContainer);
    background.addEventListener('mouseleave', () => background.removeEventListener('mousemove', resizeContainer));
    background.addEventListener('mouseup', () => background.removeEventListener('mousemove', resizeContainer));
  };

  return (
    <SandBox>
      <div onMouseDown={dragHandler}>
        <div className='relative inline-block'>
          <div className='absolute -right-2 top-0 bottom-0 w-4 hover:cursor-ew-resize'></div>
          <FlexContainer className='flex border-r-4'>
            {['AAAAAAA', 'BBBB', 'CCCCCCCCCCC'].map((item, i) => {
              const shrink = valueShrinkMap[selectedValue][i];
              return (
                <FlexItem key={i} className={`flex break-all ${shrink}`}>
                  {item}
                </FlexItem>
              );
            })}
          </FlexContainer>
        </div>
      </div>
      <Controller
        name='flex-shrink'
        options={options}
        onChange={(selectedOption) => setSelectedValue(selectedOption.value)}
      />
    </SandBox>
  );
};

// Example 10: align-self
export const AlignSelf = () => {
  const items = [
    { text: 'stretch', value: 'self-stretch' },
    { text: 'flex-start', value: 'self-start' },
    { text: 'center', value: 'self-center' },
    { text: 'flex-end', value: 'self-end' },
  ];

  return (
    <SandBox>
      <FlexContainer className='flex h-40'>
        {items.map(({ text, value }, i) => (
          <FlexItem key={i} className={value}>
            {text}
          </FlexItem>
        ))}
      </FlexContainer>
    </SandBox>
  );
};

// Example 11: order
export const Order = () => {
  const items = [
    { text: 'A (order: 3)', value: 'order-3' },
    { text: 'B (order: 1)', value: 'order-1' },
    { text: 'C (order: 0)', value: '' },
    { text: 'D (order: 2)', value: 'order-2' },
    { text: 'E (order: -1)', value: '-order-1' },
  ];

  return (
    <SandBox>
      <FlexContainer className='flex'>
        {items.map(({ text, value }, i) => (
          <FlexItem key={i} className={value}>
            {text}
          </FlexItem>
        ))}
      </FlexContainer>
    </SandBox>
  );
};
