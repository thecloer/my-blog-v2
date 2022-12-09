export const generateSlug = (text: string) => text.replaceAll(' ', '-');
export const releaseSlug = (text: string) => text.replaceAll('-', ' ');

export const encodeURISlug = (text: string) => encodeURIComponent(generateSlug(text));
export const decodeURISlug = (text: string) => releaseSlug(decodeURIComponent(text));
