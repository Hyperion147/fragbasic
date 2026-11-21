-- A one-time editorial review of the November 2026 catalog. The URL, model,
-- scale and previous score record the inputs. Keep all unrelated CMS data.
WITH reviews (slug, previous_score, source_type, label, url, published_score, scale, note) AS (
  VALUES
    ('7hz-salnotes-zero', 9.1, 'review', 'SoundGuys listening test', 'https://www.soundguys.com/7hz-salnotes-zero-review-115406/', 7.7, 10,
     'SoundGuys scored the Zero 7.7/10 overall. The reviewer found it comfortable and cautioned that directional cues could be difficult to locate in shooters.'),
    ('dunu-titan-x', 8.3, 'review', 'HiFi Oasis listening test', 'https://www.hifioasis.com/reviews/dunu-titan-x-review/', 7, 10,
     'HiFi Oasis gave the 3.5 mm Titan X 7/10. The reviewer heard good instrument separation and heard bass mask lower voices on some tracks.'),
    ('kz-edx-pro-2', 7.8, 'reddit', 'EDX Pro 2 owner listening notes', 'https://www.reddit.com/r/iems/comments/1n6zuam/i_got_a_kz_edx_pro_2_i_like_it/', NULL, NULL,
     'One owner heard pronounced sub-bass alongside clear treble on the Pro 2. This listening comparison contains no overall score.'),
    ('moondrop-chu-ii', 8.2, 'review', 'SoundGuys listening test', 'https://www.soundguys.com/moondrop-chu-ii-review-104977/', 7.2, 10,
     'SoundGuys scored the Chu II 7.2/10 overall. Its listening test found clear vocals and an average stereo width.'),
    ('simgot-ew200', 8.7, 'review', 'Tunog Labs listening test', 'https://tunoglabs.com/reviews/simgot-ew200/', 7.6, 10,
     'Tunog Labs scored the EW200 7.6/10 across six criteria. The reviewer praised its imaging and found some consonants sharp.'),
    ('tangzu-waner-sg', 8.0, 'review', 'SoundGuys listening test', 'https://www.soundguys.com/tangzu-waner-s-g-review-115508/', 8.1, 10,
     'SoundGuys gave the original Wan’er 8.1/10 overall. Its measurements show a bass emphasis and a softer top end.'),
    ('tangzu-waner-sg-2', 8.2, 'review', 'TechXReviews listening comparison', 'https://techxreviews.com/tangzu-waner-s-g-2-review/', NULL, NULL,
     'Comparing the standard second generation with the original, the reviewer found lighter bass and clearer vocals, with similar instrument separation. The review gives listening impressions.'),
    ('tangzu-waner-sg-2-jade-dragon', 8.2, 'review', 'Tunog Labs Jade Dragon listening test', 'https://tunoglabs.com/reviews/tangzu-waner-sg-ii/', 6.9, 10,
     'Tunog Labs tested the Jade Dragon finish and scored it 6.9/10 overall. The listener enjoyed its vocal presence and found the large shells uncomfortable.'),
    ('tangzu-waner-sg-2-red-lion', 8.2, 'review', 'Prime Audio Red Lion listening test', 'https://primeaudio.org/tangzu-waner-sg-2-red-lion-edition-review/', 4.6, 5,
     'Prime Audio gave the Red Lion edition 4.6/5. The reviewer heard a warmer mid-bass and gentler upper frequencies.'),
    ('tangzu-waner-sg-2-red-lion', 8.2, 'review', 'HiFi Mai Tai Red Lion listening test', 'https://hifimaitai.com/2026/03/06/tangzu-waner-red-lion-review/', 61.47, 100,
     'HiFi Mai Tai scored this edition 61.47/100 overall. The reviewer found the stage narrow and thought vocals sounded thin on some tracks.'),
    ('truthear-zero-red', 8.8, 'review', 'SoundGuys listening test', 'https://www.soundguys.com/truthear-x-crinacle-zero-red-review-126764/', 8.1, 10,
     'SoundGuys scored the Red 8.1/10 overall. The reviewer found a comfortable fit with the contoured shells and confirmed that the included adapter increases bass.')
), calibrated AS (
  SELECT reviews.*,
         round((2 * previous_score + avg(10 * published_score / scale) OVER (PARTITION BY slug)) / 3, 1) AS overall,
         row_number() OVER (PARTITION BY slug ORDER BY url) AS source_position
  FROM reviews
), per_product AS (
  SELECT slug, previous_score, overall,
         jsonb_agg(jsonb_build_object('type', source_type, 'label', label, 'url', url, 'note',
           note || CASE
             WHEN source_position > 1 THEN ''
             WHEN overall IS NULL THEN format(' FragBasic retained its %s/10 editorial estimate.', previous_score)
             ELSE format(' In November 2026, FragBasic weighted its previous %s/10 and the cited overall review scores two to one, giving %s/10.', previous_score, overall)
           END
         ) ORDER BY source_position) AS review_sources
  FROM calibrated
  GROUP BY slug, previous_score, overall
)
UPDATE iems
SET data = jsonb_set(
      CASE WHEN overall IS NULL THEN iems.data
           ELSE jsonb_set(iems.data, '{ratings,fragbasic}', to_jsonb(overall), false) END,
      '{sources}', iems.data->'sources' || review_sources
    ),
    updated_at = CURRENT_TIMESTAMP
FROM per_product
WHERE iems.slug = per_product.slug AND iems.status = 'published'
  AND iems.data->>'slug' = per_product.slug
  AND jsonb_typeof(iems.data->'sources') = 'array'
  AND iems.data#>'{ratings,fragbasic}' = to_jsonb(previous_score)
  AND NOT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(iems.data->'sources') existing
    JOIN jsonb_array_elements(review_sources) proposed ON existing->>'url' = proposed->>'url'
  );
