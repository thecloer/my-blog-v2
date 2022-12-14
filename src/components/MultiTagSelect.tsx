import type { TagInfo } from '@/types/data.type';
import type { FC } from 'react';

type Props = {
  options: TagInfo[];
  selectedTags?: TagInfo[];
  onChange: (newSelectedTags: TagInfo[]) => void;
};

const MultiTagSelect: FC<Props> = ({ options, selectedTags = [], onChange }) => {
  const isOptionSelected = (option: TagInfo) => selectedTags.includes(option);
  const selectOption = (option: TagInfo) =>
    onChange(isOptionSelected(option) ? selectedTags.filter((v) => v !== option) : [...selectedTags, option]);
  const clearOptions = () => onChange([]);

  return (
    <div className='p-1 text-sm'>
      <div className='flex items-center rounded-md border border-gray-300 bg-white p-2 dark:bg-bgDark-800'>
        <div className='flex grow flex-wrap gap-2'>
          {selectedTags.length === 0 ? (
            <span className='cursor-default pl-2 text-base text-gray-400'>Select Tags</span>
          ) : (
            selectedTags.map((v, i) => (
              <button
                key={i}
                className='group flex items-center rounded bg-primary-300 px-[6px] py-[2px] hover:bg-red-200 dark:bg-primary-600 dark:hover:bg-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
              >
                {v.name}
                <span className='ml-1 font-medium text-bgDark-500 group-hover:text-red-500 dark:text-bgDark-50 dark:group-hover:text-red-600'>
                  &times;
                </span>
              </button>
            ))
          )}
        </div>
        <button
          className='flex h-6 w-7 items-center justify-center text-xl font-medium text-bgDark-500 hover:text-red-500'
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          &times;
        </button>
      </div>
      <ul className='mt-3 flex flex-wrap gap-2'>
        {options.map((option) => (
          <li key={option.name}>
            <button
              className={`flex cursor-pointer items-center gap-2 rounded px-[6px] py-[2px] hover:bg-primary-400 dark:hover:bg-primary-700
              ${isOptionSelected(option) ? 'bg-primary-300 dark:bg-primary-600' : 'bg-bgDark-100 dark:bg-bgDark-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}
            >{`${option.name} (${option.count})`}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiTagSelect;
