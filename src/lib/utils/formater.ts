export const generateSlug = (text: string) => text.replaceAll(' ', '-');
export const releaseSlug = (text: string) => text.replaceAll('-', ' ');
