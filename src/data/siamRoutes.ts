import type {
  StationsJson,
  StationInput,
  StationStop,
  PlatformRoute,
  StationLookup,
} from "../types";
import rawStations from "./stations.json";

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
const pinkStops = buildStops(stations.pink);
const yellowNorthStops = buildStops(stations.yellow.northbound);
const yellowMiddleStops = buildStops(stations.yellow.middlebound);
const yellowEastStops = buildStops(stations.yellow.eastbound);
const goldStops = buildStops(stations.gold);

const landmarkInfo = {
  north: {
    floorLabel: {
      en: "↑ Upper level",
      th: "↑ ชั้นบน",
    },
    nextStation: northboundStops[0],
    terminalStation: northboundStops[northboundStops.length - 1],
  },
  east: {
    floorLabel: {
      en: "↓ Lower level",
      th: "↓ ชั้นล่าง",
    },
    nextStation: eastboundStops[0],
    terminalStation: eastboundStops[eastboundStops.length - 1],
  },
  south: {
    floorLabel: {
      en: "↓ Lower level",
      th: "↓ ชั้นล่าง",
    },
    nextStation: bangwaStops[0],
    terminalStation: bangwaStops[bangwaStops.length - 1],
  },
};

export const ROUTES: PlatformRoute[] = [
  {
    id: "sukhumvit-khu-khot",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#79B72A",
    },
    ...landmarkInfo.north,
    stops: northboundStops,
  },
  {
    id: "sukhumvit-kheha",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#79B72A",
    },
    ...landmarkInfo.east,
    stops: eastboundStops,
  },
  {
    id: "silom-bang-wa",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#007874",
    },
    ...landmarkInfo.south,
    stops: bangwaStops,
  },
  {
    id: "silom-national-stadium",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#007874",
    },
    floorLabel: {
      en: "↑ Upper level",
      th: "↑ ชั้นบน",
    },
    nextStation: nationalStadiumStops[0],
    terminalStation: nationalStadiumStops[nationalStadiumStops.length - 1],
    stops: nationalStadiumStops,
  },
  {
    id: "pink",
    line: {
      name: { en: "Pink Line", th: "สายสีชมพู" },
      color: "#E56187",
    },
    ...landmarkInfo.north,
    stops: pinkStops,
    remark: {
      en: "Ride N17 Wat Phra Sri Mahathat and interchange to MRT Pink Line.",
      th: "นั่งบีทีเอสไปลง N17 วัดพระศรีมหาธาตุ แล้วต่อ MRT สายสีชมพู",
    },
  },
  {
    id: "yellow-northbound",
    line: {
      name: { en: "Yellow Line", th: "สายสีเหลือง" },
      color: "#FFD500",
    },
    ...landmarkInfo.north,
    stops: yellowNorthStops,
    remark: {
      en: "Ride to N9 Ha Yaek Lat Phrao and interchange to the MRT Yellow Line.",
      th: "นั่งบีทีเอสไปลง N9 ห้าแยกลาดหร้าว แล้วต่อ MRT สายสีเหลือง",
    },
  },
  {
    id: "yellow-middlebound",
    line: {
      name: { en: "Yellow Line", th: "สายสีเหลือง" },
      color: "#FFD500",
    },
    ...landmarkInfo.north,
    stops: yellowMiddleStops,
    remark: {
      en: "Ride to N2 Phaya Thai, interchange at Airport Rail Link then interchange at YL11 Hua Mak.",
      th: "นั่งบีทีเอสไปลง N2 พญาไท แล้วต่อ Airport Rail Link ไปยัง YL11 หัวหมาก",
    },
  },
  {
    id: "yellow-eastbound",
    line: {
      name: { en: "Yellow Line", th: "สายสีเหลือง" },
      color: "#FFD500",
    },
    ...landmarkInfo.east,
    stops: yellowEastStops,
    remark: {
      en: "Ride to E15 Samrong and interchange to MRT Yellow Line.",
      th: "นั่งบีทีเอสไปลง E15 สำโรง แล้วต่อ MRT สายสีเหลือง",
    },
  },
  {
    id: "gold",
    line: {
      name: { en: "Gold Line", th: "สายสีทอง" },
      color: "#AD8C18",
    },
    ...landmarkInfo.south,
    stops: goldStops,
  },
];

export const buildStationLookup = (): StationLookup[] =>
  ROUTES.flatMap((route) =>
    route.stops.map(
      (station) =>
        ({
          station,
          route,
          line: route.line,
        } satisfies StationLookup)
    )
  );
