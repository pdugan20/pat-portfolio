// Filters for excluding non-music content from listening data.
// Uses case-insensitive substring matching unless noted otherwise.

// Holiday/Christmas albums — matched against album names.
// Use partial strings to catch remastered/deluxe/expanded editions.
export const HOLIDAY_ALBUM_PATTERNS: string[] = [
  'charlie brown christmas',
  'jolly christmas',
  'white christmas',
  "elvis' christmas",
  'christmas album',
  'very she & him christmas',
  'the christmas song',
  'legendary christmas',
  'swinging christmas',
  'christmas with',
  'christmas party',
  'christmas portrait',
  'merry christmas',
  'happy holidays',
  'holiday celebration',
];

// Holiday/Christmas track name patterns — substring matches against track names.
export const HOLIDAY_TRACK_PATTERNS: string[] = [
  'christmas',
  'o tannenbaum',
  'tannenbaum',
  'jingle bell',
  'silent night',
  'rudolph',
  'frosty the snowman',
  'winter wonderland',
  'let it snow',
  'deck the hall',
  'hark, the herald',
  'herald angels',
  'what child is',
  'little drummer boy',
  'my little drum',
  'feliz navidad',
  'white christmas',
  'blue christmas',
  'santa claus',
  'santa baby',
  'holly jolly',
  'rockin around',
  'chestnuts roasting',
  'silver bells',
  'sleigh ride',
  'auld lang syne',
  'joy to the world',
  'o come all ye',
  'o holy night',
  'away in a manger',
  'we wish you a merry',
  'twelve days of',
  'first noel',
  'do you hear what i hear',
  "baby it's cold outside",
  'marshmallow world',
  'wonderful christmastime',
  'last christmas',
  'have yourself a merry',
  "i'll be home for christmas",
  'carol of the bells',
  'god rest ye merry',
  'here comes santa',
  'nutcracker',
];

// Specific holiday track titles — exact match (case-insensitive) for tracks
// that are holiday-associated but don't contain obvious keywords.
// These are primarily from A Charlie Brown Christmas and similar holiday albums.
export const HOLIDAY_TRACK_EXACT: string[] = [
  'skating',
  'greensleeves',
  'linus and lucy',
  'fur elise',
  'für elise',
];

// Audiobook track name patterns — substring matches against track names.
// Catches tracks from audiobook apps (Libby) and numbered chapter formats.
export const AUDIOBOOK_TRACK_PATTERNS: string[] = ['libby--open-'];

// Audiobook track name regexes — for patterns that need regex matching.
// Catches numbered chapters like "- Part 3", "- Track 007", "- 02".
export const AUDIOBOOK_TRACK_REGEXES: RegExp[] = [
  /- part \d+/i,
  /- track \d+/i,
  /- \d{2,3}$/,
  /\(\d+\)$/,
];

// Audiobook authors — matched against artist names.
// Only exact matches (case-insensitive) to avoid false positives.
export const AUDIOBOOK_ARTISTS: string[] = [
  'stephen king',
  'thomas pynchon',
  'andrew ross sorkin',
  'andy weir',
  'j.r.r. tolkien',
  'j.k. rowling',
  'michael crichton',
  'john grisham',
  'tom clancy',
  'hunter s. thompson',
  'ezra klein and derek thompson',
  'ian fleming',
];

export function isHolidayAlbum(albumName: string): boolean {
  const lower = albumName.toLowerCase();
  return HOLIDAY_ALBUM_PATTERNS.some(pattern => lower.includes(pattern));
}

export function isHolidayTrack(trackName: string, artistName: string): boolean {
  const lowerTrack = trackName.toLowerCase();
  const lowerArtist = artistName.toLowerCase();

  // Check track name patterns (substring)
  if (HOLIDAY_TRACK_PATTERNS.some(pattern => lowerTrack.includes(pattern))) {
    return true;
  }

  // Check exact holiday track titles, but only for known holiday artists
  // to avoid filtering "Greensleeves" by a non-holiday artist, etc.
  if (
    lowerArtist === 'vince guaraldi trio' ||
    lowerArtist === 'bing crosby' ||
    lowerArtist === 'nat king cole'
  ) {
    if (HOLIDAY_TRACK_EXACT.some(title => lowerTrack === title)) {
      return true;
    }
  }

  return false;
}

export function isAudiobookTrack(trackName: string): boolean {
  const lower = trackName.toLowerCase();
  if (AUDIOBOOK_TRACK_PATTERNS.some(pattern => lower.includes(pattern))) {
    return true;
  }
  if (AUDIOBOOK_TRACK_REGEXES.some(regex => regex.test(trackName))) {
    return true;
  }
  return false;
}

export function isAudiobookArtist(artistName: string): boolean {
  const lower = artistName.toLowerCase();
  return AUDIOBOOK_ARTISTS.some(name => lower === name);
}
