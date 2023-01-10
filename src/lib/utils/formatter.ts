export const generateSlug = (text: string) => text.replaceAll(' ', '-');
export const releaseSlug = (text: string) => text.replaceAll('-', ' ');

export const encodeURISlug = (text: string) => encodeURIComponent(generateSlug(text));
export const decodeURISlug = (text: string) => releaseSlug(decodeURIComponent(text));

export const formatAsMinutes = (minutes: number) => `${Math.ceil(minutes)} min`;

const splitBySpaceAndComma = (string: string) =>
  string
    .replace(/[\s,]+/g, ' ')
    .trim()
    .split(' ');
export const parseSearchString = (searchString: string) => {
  const parsedSearchString = splitBySpaceAndComma(decodeURIComponent(searchString));
  return parsedSearchString.length === 1 ? parsedSearchString[0] : parsedSearchString;
};
