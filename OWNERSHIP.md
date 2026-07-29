# Fragbasic — Ownership Doc

## One-sentence product
FPS gear database website for gaming peripherals to provide structured rating, compare different products and review to go through.

## Who uses it / why they care
People spend too much time looking for products/peripherals individually, this website saves them time and summarises most aspect in understandable form instead of all technical
there are 100+ visitors weekly

## Live URL
https://fragbasic.fun

## Stack (honest: what I understand vs copy-pasted)
| Tech | Own level (0-5) | Proof file I can explain |
|------|-----------------|---------------------------|
| Next App Router | 2 | Every file |
| Tailwind tokens | 4 | Every file |
| Motion | 3 | where used |
| Mousepad types | 1 | Schema |
| Filter/compare lib | 2 | Mostly vibe-coded |
| SEO helpers | 0 | All vibe coded |

## Repo map (top files I must know)
- app routes: /mousepads /mousepads/glasspads /mousepads/guides /iem /iem/compare mousepads/compare mousepads/compare/universal /best /accessories/mouse-skates
- data: schema for mousepads glasspads iems /src/data/mousepads /src/data/all
- data/features/landing for code splitting 
- types: based on schema mostly string and integer /data/types/ for iems, accessory, mousepad
- lib helpers: mostly from shadcn, and css variables /data/lib/ all
- key components: compare pages, scales, calibration of speed-control /data/lib/mousepads

## Core user flows (step by step)
1. Land on home → scroll down a bit get the basic idea and start exploring with section to pages, either from navbar or from the pages hyperlinks itself, if scrolled all the way down there is a decent footer for navigation aswell
2. Browse mousepads → filter → open detail
browse mousepads and glasspads, filter them according to companies and all stuff speed/control/mud

3. Compare pads (published + universal)
comparing 2 pads or 3 pads really gives an edge to the user to choose right one

4. IEMs / skates / best guides (brief)
iems are a big part of this, skates are accessories for mouse, best guides are pages listing the best products/peripherals according to me

## Data model (today)
- Where does a Mousepad live?
in data/mousepads/

- What fields drive filters/sort/compare?
1. companies 2. speed/control 3. price 4. tuning for iems

- What is "feel" vs specs?
feel is basically community driven review, specs is from companies/manufacturers

## Auth / backend
- Today: none / static
- Future: what would need a database?
supabase for database and supabase bucked for images, this is enough to handle ~1000 products currently its close to 100

## What I did not write or cannot explain
I didnt write any kind of data, it is either taken from community reviews or from internet
UI part is 60% vibe coded, 30% shadcn and 10% written by me

## Top risks (demo-breakers, SEO, wrong data, mobile)
- community review if its wrong
- a bit less responsive on mobile
- seo is fine I worked on it but still needs some polish

## 90-second demo script
0:00–0:15  Problem: FPS players waste hours comparing pads/IEMs, this website helps them take a better look at reviews from one place
0:15–0:35  Home → this gives an idea of what fragbasic is, scroll down for information regarding products
0:35–0:60  Mousepads: filter between companies, speed type, feel. Or search them up based on your preference if you got a name
0:60–0:80  Compare 2 pads (or universal) → show the decision edge, this page helps you compare side by side instead of 2 tabs
0:80–0:90  One line: next I will be working on improving the design system, typography, spacing and overall css, after that will be moving make the data dynamic using supabase

## Design audit notes (type, space, motion, inconsistency)
- landing page -> after first 3 components hero and 2 others it gets dull and loses its design sense
- product page -> the dropdowns are inconsistent
- tables -> typography and spacing is not good + feels too bulky
- compare -> for iems need to improve compare as they also need graphs

## % ownership gut feel (0–100) and why
Product vision - 90%
Domain knowledge - 70%
Code (UI) - 50%
Code (data/lib) - 0%
Nextjs platform - 60%