# Thecloer's Blog version 2.0.0

My personal blog about dev study. Supports mdx

## file structure

```
.
├── data: mdx files
├── dataComponents: components for mdx files
├── public
│   └── data: public assets for mdx files
│
├── src: source files for web site
│   ├── components
│   ├── config
│   ├── containers
│   ├── hooks
│   ├── layouts
│   ├── lib
│   ├── pages
│   ├── repositories
│   └── types
└── styles: css files for web site
```

## Usage

### Specific Mdx Syntax

1. importing jsx, tsx file in mdx file

- `/dataComponents/TestButton.tsx`

```tsx
const TestButton = () => {
  return <button>click!</button>;
};

export default TestButton;
```

- `/data/test.mdx`

```tsx
import TestButton from './TestButton';

<TestButton />;
```

2. using MdxCustomComponents in mdx file

mdx custom components path: `/src/components/mdx/MdxCustomComponents`

```tsx
<Image
  src='/data/testImage.png' //required
  alt='test image' //required
  width='650px'
  height='270px'
  title='This is test image'
  className='rounded'
/>
```

3. using html in mdx file

```html
<div className="bg-yellow-500 flex gap-1 p-1">
  <div className="bg-lime-500 w-2 h-1"></div>
  <div className="bg-lime-500 w-2 h-1"></div>
</div>
```

4. code highlight

highlight line 1, 3 and 4 example

````
```ts {1,3-4}
const testString = "Hello world"; //highlighted
const logger = console.log;

log(testString); //highlighted
console.log(testString); //highlighted
```
````

5. katex

syntax: https://katex.org/docs/supported.html

```
$$
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
$$

$f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi$
```

### Front Matter

- Blog

```
---
title: string
description: string
date: string
thumbnail: string
tags: string[] | null
series: string | null
---
```

## TODO:

- [ ] i18n(en, ko)
- [ ] Projects
- [ ] About me
- [ ] Migrate to Nextjs 13
- [ ] Nextjs 13 + [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)

```

```
