import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { IemStarRating } from "./iem-star-rating";

describe("FragBasic editorial stars", () => {
  it.each([
    { score: 0, stars: "0", fill: [0, 0, 0, 0, 0] },
    { score: 7.8, stars: "3.9", fill: [100, 100, 100, 90, 0] },
    { score: 9.1, stars: "4.55", fill: [100, 100, 100, 100, 55] },
    { score: 10, stars: "5", fill: [100, 100, 100, 100, 100] },
  ])("draws and labels a $score/10 rating", ({ score, stars, fill }) => {
    const html = renderToStaticMarkup(createElement(IemStarRating, { score }));
    const drawn = [...html.matchAll(/clip-path:inset\(0 (\d+)% 0 0\)/g)];
    expect(drawn.map((match) => 100 - Number(match[1]))).toEqual(fill);
    expect(html).toContain(`>${stars}<span aria-hidden="true">/5</span>`);
    expect(html).toContain(" out of 5 stars");
    expect(html).toContain("FragBasic editorial rating");
  });

  it.each([-1, 11, NaN])("omits stars for an invalid score of %s", (score) => {
    const html = renderToStaticMarkup(createElement(IemStarRating, { score }));
    expect(html).toContain("Editorial rating pending");
    expect(html).not.toContain("<svg");
  });
});
