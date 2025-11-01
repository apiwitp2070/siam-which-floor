import { useMemo, useState } from "react";
import {
  ALL_LOCALES,
  buildStationLookup,
  type StationLookup,
  type Locale,
} from "./data/siamRoutes";
import { useI18n } from "./i18n";
import "./App.css";

const UI_TEXT = {
  title: { en: "Siam", th: "สยาม" },
  subtitle: { en: "Which Platform?", th: "ขึ้นฝั่งไหน ?" },
  destinationLabel: { en: "Destination station", th: "สถานีปลายทาง" },
  searchPlaceholder: {
    en: "Try Asok, Bang Wa, National Stadium…",
    th: "ลองพิมพ์ อโศก บางหว้า สนามกีฬาแห่งชาติ…",
  },
  search: { en: "Search", th: "ค้นหา" },
  clearSearch: { en: "Clear search", th: "ล้างการค้นหา" },
  suggestionsLabel: { en: "Popular from Siam", th: "ยอดนิยมจากสยาม" },
  levelLabel: { en: "Level", th: "ชั้น" },
  nextStopLabel: { en: "Next stop", th: "สถานีถัดไป" },
  terminalLabel: { en: "Terminal", th: "ปลายทาง" },
  noResultsTitle: { en: "No station found", th: "ไม่พบสถานี" },
  noResultsPrefix: {
    en: "Double-check the spelling or try searching by station code such as",
    th: "ตรวจสอบการสะกดอีกครั้งหรือค้นด้วยรหัสสถานี เช่น",
  },
  noResultsMid: { en: "for Mo Chit or", th: "สำหรับหมอชิต หรือ" },
  noResultsSuffix: { en: "for Asok.", th: "สำหรับอโศก" },
  languageToggle: { en: "Language selection", th: "เลือกภาษา" },
} as const;

const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  th: "ไทย",
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const { locale, setLocale, t } = useI18n();

  const stationLookup = useMemo(() => buildStationLookup(), []);

  const normalizedActiveQuery = activeQuery.trim().toLowerCase();

  const heoContentElement = document.getElementById("hero-content");

  const matches = useMemo(() => {
    if (!normalizedActiveQuery) {
      return [];
    }

    const scored: Array<StationLookup & { score: number }> = [];

    for (const entry of stationLookup) {
      const searchTargets = [
        entry.station.name.en,
        entry.station.name.th,
        entry.route.directionLabel.en,
        entry.route.directionLabel.th,
        entry.station.code ?? "",
        ...(entry.station.aliases ?? []),
        ...(entry.station.searchTokens ?? []),
      ]
        .map((value) => value.toLowerCase())
        .filter(Boolean);

      if (searchTargets.length === 0) {
        continue;
      }

      const exact = searchTargets.some(
        (value) => value === normalizedActiveQuery
      );
      const startsWith = searchTargets.some((value) =>
        value.startsWith(normalizedActiveQuery)
      );
      const includes = searchTargets.some((value) =>
        value.includes(normalizedActiveQuery)
      );

      if (!exact && !startsWith && !includes) continue;

      const score = exact ? 0 : startsWith ? 1 : 2;
      scored.push({ ...entry, score });
    }

    return scored
      .sort((a, b) => {
        if (a.score !== b.score) return a.score - b.score;
        const nameA = a.station.name[locale] ?? a.station.name.en;
        const nameB = b.station.name[locale] ?? b.station.name.en;
        return nameA.localeCompare(nameB, locale === "th" ? "th" : "en", {
          sensitivity: "base",
        });
      })
      .map(({ ...rest }) => rest);
  }, [locale, normalizedActiveQuery, stationLookup]);

  const showResults = normalizedActiveQuery.length > 0;
  const hasMatches = matches.length > 0;

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setActiveQuery(trimmed);
    if (heoContentElement) {
      heoContentElement.classList.add("show-result");
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    setActiveQuery("");
    if (heoContentElement) {
      heoContentElement.classList.remove("show-result");
    }
  };

  const isSearchDisabled = inputValue.trim().length === 0;

  return (
    <div className="app-root">
      <header className="app-header">
        <div
          className="language-toggle"
          role="group"
          aria-label={t(UI_TEXT.languageToggle)}
        >
          {ALL_LOCALES.map((option) => (
            <button
              type="button"
              key={option}
              className={`language-button${
                locale === option ? " is-active" : ""
              }`}
              onClick={() => setLocale(option)}
              aria-pressed={locale === option}
            >
              {LOCALE_LABEL[option]}
            </button>
          ))}
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div id="hero-content" className="hero-content">
            <div className="hero-title-container">
              <h1 id="hero-title" className="hero-title">
                {t(UI_TEXT.title)}
              </h1>
              <h2 className="hero-subtitle">{t(UI_TEXT.subtitle)}</h2>
            </div>

            <div
              className="search-block"
              aria-label={t(UI_TEXT.destinationLabel)}
            >
              <label className="search-label" htmlFor="station-search">
                {t(UI_TEXT.destinationLabel)}
              </label>
              <div className="search-input-wrapper">
                <input
                  id="station-search"
                  className="search-input"
                  autoComplete="off"
                  placeholder={t(UI_TEXT.searchPlaceholder)}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <div className="search-input-button-wrapper">
                  {inputValue && (
                    <>
                      <button
                        type="button"
                        className="clear-button"
                        onClick={handleClear}
                        aria-label={t(UI_TEXT.clearSearch)}
                      >
                        ✕
                      </button>
                      <button
                        type="button"
                        className="clear-button search-button"
                        onClick={handleSearch}
                        disabled={isSearchDisabled}
                      >
                        {t(UI_TEXT.search)}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showResults && (
        <main className="results-section" aria-live="polite">
          {hasMatches ? (
            <div className="results-list">
              {matches.map((match) => (
                <StationCard
                  key={`${match.route.id}-${
                    match.station.code ?? match.station.name.en
                  }`}
                  match={match}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <h2>{t(UI_TEXT.noResultsTitle)}</h2>
              <p>
                {t(UI_TEXT.noResultsPrefix)} <strong>N8</strong>{" "}
                {t(UI_TEXT.noResultsMid)} <strong>E4</strong>{" "}
                {t(UI_TEXT.noResultsSuffix)}
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

interface StationCardProps {
  match: StationLookup;
}

function StationCard({ match }: StationCardProps) {
  const { line, route, station } = match;
  const { t } = useI18n();

  return (
    <article className="station-card">
      <div className="station-card-header">
        <span className="line-chip" style={{ backgroundColor: line.color }}>
          {t(line.name)}
        </span>
        <h2>{t(station.name)}</h2>
        {station.code && <span className="station-code">{station.code}</span>}
        <p>{t(route.directionLabel)}</p>
      </div>

      <dl className="station-details">
        <div>
          <dt>{t(UI_TEXT.levelLabel)}</dt>
          <dd>{t(line.floorLabel)}</dd>
        </div>
        <div>
          <dt>{t(UI_TEXT.nextStopLabel)}</dt>
          <dd>
            {t(route.nextStation.name)}{" "}
            {route.nextStation.code && (
              <span className="meta-code">{route.nextStation.code}</span>
            )}
          </dd>
        </div>
        <div>
          <dt>{t(UI_TEXT.terminalLabel)}</dt>
          <dd>
            {t(route.terminalStation.name)}{" "}
            {route.terminalStation.code && (
              <span className="meta-code">{route.terminalStation.code}</span>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default App;
