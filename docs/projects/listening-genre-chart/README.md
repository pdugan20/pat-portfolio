# Listening Genre Chart

Add a stacked horizontal bar chart to `/listening` showing genre breakdown by month, powered by the Rewind API's `/v1/listening/genres` endpoint.

## Context

The `/listening` page currently shows a horizontal bar chart of total scrobbles per month when a year is selected. This feature replaces that with a stacked genre bar chart — each month's bar is segmented by genre, showing what you actually listened to.

When a specific month is selected, the stacked bar collapses into individual genre bars sorted by play count.

## API Endpoint

```text
GET /v1/listening/genres
```

**Query params:**

| Param      | Type   | Default | Description                                      |
| ---------- | ------ | ------- | ------------------------------------------------ |
| `group_by` | string | `month` | Grouping period: `week`, `month`, `year`         |
| `limit`    | number | `10`    | Max genres per period (rest bucketed as "Other") |
| `from`     | string | —       | Range start (ISO 8601)                           |
| `to`       | string | —       | Range end (ISO 8601)                             |
| `date`     | string | —       | Single day (YYYY-MM-DD), overrides from/to       |

**Response shape:**

```json
{
  "data": [
    {
      "period": "2025-01",
      "genres": {
        "Pop": 103,
        "Hip-Hop": 93,
        "Alternative": 61,
        "Other": 89
      },
      "total": 556
    }
  ]
}
```

The API handles "Other" bucketing server-side based on `limit`.

## Genre Coverage

Assessed 2026-03-13:

- **Top 20 artists**: 20/20 have genre populated (100%)
- **Genre taxonomy**: ~20 distinct genres, clean single-label strings (Classic Rock, Hip-Hop, Folk, etc.)
- **Coverage gap**: Genre is well-populated for high-playcount artists but likely sparse in the long tail. ~1,221 genre-attributed plays in 2025 vs ~8,760 expected total. Scrobbles for artists without genre data won't appear in the genre chart.
- **Implication**: The chart will undercount total plays but accurately represent the genre distribution of known artists. This is acceptable — the total scrobble count in the sentence above covers the full picture.

## Design

### Year view (no month selected)

Stacked horizontal bar chart inside the existing tinted container:

- One bar per month (Jan–Dec on y-axis)
- Each bar segmented by genre, colors assigned per genre
- "Other" segment in a muted gray
- Legend row above or below the chart showing genre → color mapping
- Hover a segment to see genre name + play count
- Click a bar to select that month (existing behavior)

### Month view (month selected)

Individual horizontal bars, one per genre:

- Sorted by play count descending
- Same color mapping as the stacked view
- Genre label on y-axis, play count on x-axis
- Provides a detailed breakdown of a single month

### All-time view (no year selected)

Keep the existing line chart — genre stacking across 14 years of monthly data would be too dense.

### Color strategy

- Build a `Map<string, string>` of genre → color on the client
- Collect all unique genre names across all periods in the response
- Assign from a fixed palette of 8-10 visually distinct colors
- "Other" always gets the same muted color
- Colors are stable for a given dataset — "Rock" is always the same color regardless of which months it appears in

### Genre stability across months

Genres shift month to month — that's intentional. January's top genres may differ from February's. A genre can appear as a colored segment in one month and be part of "Other" in another. This accurately reflects listening patterns.

## Task Tracker

### Phase 1: Route Handler and Types

- [x] **1.1** Create `app/api/listening/genres/route.ts` — proxy to `/v1/listening/genres` with `group_by`, `from`, `to`, `limit` pass-through (5-min cache)
- [x] **1.2** Add `GenrePeriod` and `GenreResponse` types to `lib/rewind/types.ts`

### Phase 2: Color Palette

- [x] **2.1** Create `lib/listening/genre-colors.ts` — fixed palette of 8 colors (light + dark variants), "Other" always muted gray
- [x] **2.2** Create `buildGenreColorMap(data, isDark)` + `getGenreKeys(data, colorMap)` utilities — assigns colors by frequency rank

### Phase 3: Stacked Bar Chart (Year View)

- [x] **3.1** `@visx/shape` BarStackHorizontal confirmed available
- [x] **3.2** Create `components/listening/GenreChart.tsx` — stacked horizontal bar chart using BarStackHorizontal with custom children render for rounded segments
- [x] **3.3** Add genre legend component — row of genre → color chips
- [x] **3.4** Add hover tooltip — genre name + play count on segment hover
- [x] **3.5** Wire `onBarClick` to select month (existing behavior)

### Phase 4: Individual Genre Bars (Month View)

- [x] **4.1** Create month detail view in `GenreChart.tsx` — individual horizontal bars per genre, sorted by play count
- [x] **4.2** Use same color mapping as stacked view for consistency

### Phase 5: Integration

- [x] **5.1** Fetch genre data in `ListeningContent.tsx` when a year is selected (`/api/listening/genres?group_by=month&from=YEAR-01-01&to=YEAR-12-31&limit=5`)
- [x] **5.2** Replace current `ListeningTrends` bar chart with `GenreChart` for year view (falls back to ListeningTrends if no genre data)
- [x] **5.3** When month is selected, pass single-period genre data to month detail view (handled by GenreChart's `selectedMonth` prop)
- [x] **5.4** Keep line chart for all-time view (no change)

### Phase 6: Month Selection

- [x] **6.1** When a month is selected, GenreChart transitions from stacked view to month detail view showing individual genre bars
- [x] **6.2** Bar click toggles month (click again to deselect) — wired in ListeningContent.tsx

### Phase 7: Polish

- [ ] **7.1** Loading state — skeleton while genre data fetches
- [ ] **7.2** Empty state — graceful handling when genre data is sparse (show total scrobble bars as fallback?)
- [ ] **7.3** Dark mode — verify all colors work in both themes
- [ ] **7.4** Responsive — verify chart renders well on mobile widths
- [ ] **7.5** Test year transitions — switching years fetches new genre data
