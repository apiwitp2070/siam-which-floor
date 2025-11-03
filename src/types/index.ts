export type Locale = "en" | "th";

export const ALL_LOCALES: Locale[] = ["en", "th"];

export interface LocalizedText {
  en: string;
  th: string;
}

export interface StationStop {
  name: LocalizedText;
  code?: string;
  searchTokens?: string[];
}

export interface LineInfo {
  name: LocalizedText;
  color: string;
}

export interface PlatformRoute {
  id: string;
  line: LineInfo;
  nextStation: StationStop;
  terminalStation: StationStop;
  stops: StationStop[];
  floorLabel: LocalizedText;
  remark?: LocalizedText;
}

export interface StationLookup {
  station: StationStop;
  route: PlatformRoute;
  line: LineInfo;
}

export interface StationInput {
  name: LocalizedText;
  code?: string;
  tokens?: string[];
}

export interface StationsJson {
  sukhumvit: {
    northbound: StationInput[];
    eastbound: StationInput[];
  };
  silom: {
    bangwa: StationInput[];
    national_stadium: StationInput[];
  };
  pink: StationInput[];
  yellow: {
    northbound: StationInput[];
    middlebound: StationInput[];
    eastbound: StationInput[];
  };
  gold: StationInput[];
}
