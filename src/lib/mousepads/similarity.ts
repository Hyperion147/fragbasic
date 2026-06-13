import { mousepads } from "@/data/mousepads/mousepads";
import type { Mousepad } from "@/types/mousepad";
import {
  getMousepadCompany,
  getMousepadFullName,
} from "../mousepads";
import type { SimilarMousepadOptions } from "./filters";

export function getSimilarMousepads(
  mousepad: Mousepad,
  options: SimilarMousepadOptions = {}
) {
  const { excludeSameBrand = false, limit = 3 } = options;

  return mousepads
    .filter((candidate) => {
      if (candidate.slug === mousepad.slug) {
        return false;
      }

      if (
        excludeSameBrand &&
        getMousepadCompany(candidate) === getMousepadCompany(mousepad)
      ) {
        return false;
      }

      return true;
    })
    .map((candidate) => ({
      mousepad: candidate,
      score: getMousepadSimilarityScore(mousepad, candidate),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return getMousepadFullName(left.mousepad).localeCompare(
        getMousepadFullName(right.mousepad)
      );
    })
    .slice(0, limit)
    .map((entry) => entry.mousepad);
}

function getMousepadSimilarityScore(source: Mousepad, candidate: Mousepad) {
  const categoryScore = source.category === candidate.category ? 40 : 0;
  const speedScore = Math.max(0, 20 - Math.abs(source.feel.speed - candidate.feel.speed) * 5);
  const controlScore = Math.max(
    0,
    20 - Math.abs(source.feel.control - candidate.feel.control) * 5
  );
  const sharedGames = source.recommendedFor.games.filter((game) =>
    candidate.recommendedFor.games.includes(game)
  ).length;
  const gameScore = sharedGames * 6;

  return categoryScore + speedScore + controlScore + gameScore;
}
