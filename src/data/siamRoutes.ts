import rawStations from "./stations.json" with { type: "json" };

export type Locale = "en" | "th";

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
  floorLabel: LocalizedText;
}

export interface PlatformRoute {
  id: string;
  line: LineInfo;
  directionLabel: LocalizedText;
  nextStation: StationStop;
  terminalStation: StationStop;
  stops: StationStop[];
}

export interface StationLookup {
  station: StationStop;
  route: PlatformRoute;
  line: LineInfo;
}

export const ALL_LOCALES: Locale[] = ["en", "th"];

type StationInput = {
  name: LocalizedText;
  code?: string;
  tokens?: string[];
};

type StationsJson = {
  sukhumvit: {
    northbound: StationInput[];
    eastbound: StationInput[];
  };
  silom: {
    bangwa: StationInput[];
    national_stadium: StationInput[];
  };
};

const stations = rawStations as StationsJson;

const buildStops = (group: StationInput[]): StationStop[] =>
  group.map(({ name, code, tokens }) => ({
    name,
    ...(code ? { code } : {}),
    ...(tokens && tokens.length > 0 ? { searchTokens: tokens } : {}),
  }));

const northboundStops = buildStops(stations.sukhumvit.northbound);
const eastboundStops = buildStops(stations.sukhumvit.eastbound);
const bangwaStops = buildStops(stations.silom.bangwa);
const nationalStadiumStops = buildStops(stations.silom.national_stadium);

export const ROUTES: PlatformRoute[] = [
  {
    id: "sukhumvit-khu-khot",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#79B72A",
      floorLabel: {
        en: "↑ Upper level",
        th: "↑ ชั้นบน",
      },
    },
    directionLabel: {
      en: "Towards Khu Khot",
      th: "ไปคูคต",
    },
    nextStation: northboundStops[0],
    terminalStation: northboundStops[northboundStops.length - 1],
    stops: northboundStops,
  },
  {
    id: "sukhumvit-kheha",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#79B72A",
      floorLabel: {
        en: "↓ Lower level",
        th: "↓ ชั้นล่าง",
      },
    },
    directionLabel: {
      en: "Towards Kheha",
      th: "ไปเคหะ",
    },
    nextStation: eastboundStops[0],
    terminalStation: eastboundStops[eastboundStops.length - 1],
    stops: eastboundStops,
  },
  {
    id: "silom-bang-wa",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#007874",
      floorLabel: {
        en: "↓ Lower level",
        th: "↓ ชั้นล่าง",
      },
    },
    directionLabel: {
      en: "Towards Bang Wa",
      th: "ไปบางหว้า",
    },
    nextStation: bangwaStops[0],
    terminalStation: bangwaStops[bangwaStops.length - 1],
    stops: bangwaStops,
  },
  {
    id: "silom-national-stadium",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#007874",
      floorLabel: {
        en: "↑ Upper level",
        th: "↑ ชั้นบน",
      },
    },
    directionLabel: {
      en: "Towards National Stadium",
      th: "ไปสนามกีฬาแห่งชาติ",
    },
    nextStation: nationalStadiumStops[0],
    terminalStation:
      nationalStadiumStops[nationalStadiumStops.length - 1],
    stops: nationalStadiumStops,
  },
];

export const buildStationLookup = (): StationLookup[] =>
  ROUTES.flatMap((route) =>
    route.stops.map((station) => ({
      station,
      route,
      line: route.line,
    }))
  );
