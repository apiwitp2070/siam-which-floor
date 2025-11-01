export type Locale = "en" | "th";

export interface LocalizedText {
  en: string;
  th: string;
}

export interface StationStop {
  name: LocalizedText;
  code?: string;
  aliases?: string[];
  searchTokens?: string[];
}

export interface LineInfo {
  name: LocalizedText;
  color: string;
  floorLabel: LocalizedText;
}

export type LineId = "sukhumvit" | "silom";

export interface PlatformRoute {
  id: string;
  line: LineInfo;
  directionLabel: LocalizedText;
  nextStation: StationStop;
  terminalStation: StationStop;
  stops: StationStop[];
}

export const ALL_LOCALES: Locale[] = ["en", "th"];

const station = (
  name: LocalizedText,
  code?: string,
  aliases: string[] = [],
  searchTokens: string[] = []
): StationStop => ({
  name,
  code,
  aliases,
  searchTokens,
});

export const ROUTES: PlatformRoute[] = [
  {
    id: "sukhumvit-khu-khot",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#00994C",
      floorLabel: {
        en: "Upper level · Level 3",
        th: "ชั้นบน · ชั้น 3",
      },
    },
    directionLabel: {
      en: "Towards Khu Khot",
      th: "ไปคูคต",
    },
    nextStation: station(
      { en: "Ratchathewi", th: "ราชเทวี" },
      "N1",
      [],
      ["ราชเทวี"]
    ),
    terminalStation: station(
      { en: "Khu Khot", th: "คูคต" },
      "N24",
      [],
      ["คูคต"]
    ),
    stops: [
      station({ en: "Ratchathewi", th: "ราชเทวี" }, "N1", [], ["ราชเทวี"]),
      station({ en: "Phaya Thai", th: "พญาไท" }, "N2", [], ["พญาไท"]),
      station(
        { en: "Victory Monument", th: "อนุสาวรีย์ชัยสมรภูมิ" },
        "N3",
        [],
        ["อนุสาวรีย์ชัยสมรภูมิ", "อนุสาวรีย์ชัย"]
      ),
      station({ en: "Sanam Pao", th: "สนามเป้า" }, "N4", [], ["สนามเป้า"]),
      station({ en: "Ari", th: "อารีย์" }, "N5", [], ["อารีย์"]),
      station({ en: "Sena Ruam", th: "เสนาร่วม" }, "N6", [], ["เสนาร่วม"]),
      station({ en: "Saphan Khwai", th: "สะพานควาย" }, "N7", [], ["สะพานควาย"]),
      station({ en: "Mo Chit", th: "หมอชิต" }, "N8", ["Mo Chid"], ["หมอชิต"]),
      station(
        { en: "Ha Yaek Lat Phrao", th: "ห้าแยกลาดพร้าว" },
        "N9",
        [],
        ["ห้าแยกลาดพร้าว"]
      ),
      station(
        { en: "Phahon Yothin 24", th: "พหลโยธิน 24" },
        "N10",
        [],
        ["พหลโยธิน 24"]
      ),
      station({ en: "Ratchayothin", th: "รัชโยธิน" }, "N11", [], ["รัชโยธิน"]),
      station({ en: "Sena Nikhom", th: "เสนานิคม" }, "N12", [], ["เสนานิคม"]),
      station(
        { en: "Kasetsart University", th: "มหาวิทยาลัยเกษตรศาสตร์" },
        "N13",
        ["Kaset"],
        ["มหาวิทยาลัยเกษตรศาสตร์", "เกษตรศาสตร์", "เกษตร"]
      ),
      station(
        { en: "Royal Forest Department", th: "กรมป่าไม้" },
        "N14",
        [],
        ["กรมป่าไม้"]
      ),
      station({ en: "Bang Bua", th: "บางบัว" }, "N15", [], ["บางบัว"]),
      station(
        { en: "11th Infantry Regiment", th: "กรมทหารราบที่ 11" },
        "N16",
        [],
        ["กรมทหารราบที่ 11"]
      ),
      station(
        { en: "Wat Phra Sri Mahathat", th: "วัดพระศรีมหาธาตุ" },
        "N17",
        [],
        ["วัดพระศรีมหาธาตุ"]
      ),
      station(
        { en: "Phahon Yothin 59", th: "พหลโยธิน 59" },
        "N18",
        [],
        ["พหลโยธิน 59"]
      ),
      station({ en: "Sai Yud", th: "สายหยุด" }, "N19", [], ["สายหยุด"]),
      station({ en: "Saphan Mai", th: "สะพานใหม่" }, "N20", [], ["สะพานใหม่"]),
      station(
        { en: "Bhumibol Adulyadej Hospital", th: "โรงพยาบาลภูมิพลอดุลยเดช" },
        "N21",
        ["Bhumibol Hospital"],
        ["โรงพยาบาลภูมิพลอดุลยเดช", "รพ.ภูมิพล"]
      ),
      station(
        { en: "Royal Thai Air Force Museum", th: "พิพิธภัณฑ์กองทัพอากาศ" },
        "N22",
        [],
        ["พิพิธภัณฑ์กองทัพอากาศ"]
      ),
      station(
        { en: "Yaek Kor Por Aor", th: "แยก คปอ." },
        "N23",
        [],
        ["แยกคปอ", "คปอ"]
      ),
      station({ en: "Khu Khot", th: "คูคต" }, "N24", [], ["คูคต"]),
    ],
  },
  {
    id: "sukhumvit-kheha",
    line: {
      name: { en: "Sukhumvit Line", th: "สายสุขุมวิท" },
      color: "#00994C",
      floorLabel: {
        en: "Upper level · Level 2",
        th: "ชั้นบน · ชั้น 2",
      },
    },
    directionLabel: {
      en: "Towards Kheha",
      th: "ไปเคหะ",
    },
    nextStation: station(
      { en: "Chit Lom", th: "ชิดลม" },
      "E1",
      ["Chitlom"],
      ["ชิดลม"]
    ),
    terminalStation: station({ en: "Kheha", th: "เคหะ" }, "E23", [], ["เคหะ"]),
    stops: [
      station({ en: "Chit Lom", th: "ชิดลม" }, "E1", ["Chitlom"], ["ชิดลม"]),
      station({ en: "Phloen Chit", th: "เพลินจิต" }, "E2", [], ["เพลินจิต"]),
      station({ en: "Nana", th: "นานา" }, "E3", [], ["นานา"]),
      station({ en: "Asok", th: "อโศก" }, "E4", [], ["อโศก"]),
      station({ en: "Phrom Phong", th: "พร้อมพงษ์" }, "E5", [], ["พร้อมพงษ์"]),
      station(
        { en: "Thong Lo", th: "ทองหล่อ" },
        "E6",
        ["Thonglor"],
        ["ทองหล่อ"]
      ),
      station({ en: "Ekkamai", th: "เอกมัย" }, "E7", ["Ekkamai"], ["เอกมัย"]),
      station({ en: "Phra Khanong", th: "พระโขนง" }, "E8", [], ["พระโขนง"]),
      station({ en: "On Nut", th: "อ่อนนุช" }, "E9", [], ["อ่อนนุช"]),
      station({ en: "Bang Chak", th: "บางจาก" }, "E10", [], ["บางจาก"]),
      station({ en: "Punnawithi", th: "ปุณณวิถี" }, "E11", [], ["ปุณณวิถี"]),
      station({ en: "Udom Suk", th: "อุดมสุข" }, "E12", [], ["อุดมสุข"]),
      station({ en: "Bang Na", th: "บางนา" }, "E13", [], ["บางนา"]),
      station({ en: "Bearing", th: "แบริ่ง" }, "E14", [], ["แบริ่ง"]),
      station({ en: "Samrong", th: "สำโรง" }, "E15", [], ["สำโรง"]),
      station({ en: "Pu Chao", th: "ปู่เจ้า" }, "E16", [], ["ปู่เจ้า"]),
      station(
        { en: "Chang Erawan", th: "ช้างเอราวัณ" },
        "E17",
        [],
        ["ช้างเอราวัณ"]
      ),
      station(
        { en: "Royal Thai Naval Academy", th: "โรงเรียนนายเรือ" },
        "E18",
        [],
        ["โรงเรียนนายเรือ"]
      ),
      station({ en: "Pak Nam", th: "ปากน้ำ" }, "E19", [], ["ปากน้ำ"]),
      station(
        { en: "Srinagarindra", th: "ศรีนครินทร์" },
        "E20",
        [],
        ["ศรีนครินทร์"]
      ),
      station({ en: "Phraek Sa", th: "แพรกษา" }, "E21", [], ["แพรกษา"]),
      station({ en: "Sai Luat", th: "สายลวด" }, "E22", [], ["สายลวด"]),
      station({ en: "Kheha", th: "เคหะ" }, "E23", [], ["เคหะ"]),
    ],
  },
  {
    id: "silom-bang-wa",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#006241",
      floorLabel: {
        en: "Lower level · Level 2",
        th: "ชั้นล่าง · ชั้น 2",
      },
    },
    directionLabel: {
      en: "Towards Bang Wa",
      th: "ไปบางหว้า",
    },
    nextStation: station(
      { en: "Ratchadamri", th: "ราชดำริ" },
      "S1",
      [],
      ["ราชดำริ"]
    ),
    terminalStation: station(
      { en: "Bang Wa", th: "บางหว้า" },
      "S12",
      [],
      ["บางหว้า"]
    ),
    stops: [
      station({ en: "Ratchadamri", th: "ราชดำริ" }, "S1", [], ["ราชดำริ"]),
      station({ en: "Sala Daeng", th: "ศาลาแดง" }, "S2", [], ["ศาลาแดง"]),
      station({ en: "Chong Nonsi", th: "ช่องนนทรี" }, "S3", [], ["ช่องนนทรี"]),
      station(
        { en: "Saint Louis", th: "เซนต์หลุยส์" },
        "S4",
        [],
        ["เซนต์หลุยส์"]
      ),
      station({ en: "Surasak", th: "สุรศักดิ์" }, "S5", [], ["สุรศักดิ์"]),
      station(
        { en: "Saphan Taksin", th: "สะพานตากสิน" },
        "S6",
        [],
        ["สะพานตากสิน"]
      ),
      station(
        { en: "Krung Thon Buri", th: "กรุงธนบุรี" },
        "S7",
        [],
        ["กรุงธนบุรี"]
      ),
      station(
        { en: "Wongwian Yai", th: "วงเวียนใหญ่" },
        "S8",
        [],
        ["วงเวียนใหญ่"]
      ),
      station(
        { en: "Pho Nimit", th: "โพธิ์นิมิตร" },
        "S9",
        [],
        ["โพธิ์นิมิตร"]
      ),
      station({ en: "Talat Phlu", th: "ตลาดพลู" }, "S10", [], ["ตลาดพลู"]),
      station({ en: "Wutthakat", th: "วุฒากาศ" }, "S11", [], ["วุฒากาศ"]),
      station({ en: "Bang Wa", th: "บางหว้า" }, "S12", [], ["บางหว้า"]),
    ],
  },
  {
    id: "silom-national-stadium",
    line: {
      name: { en: "Silom Line", th: "สายสีลม" },
      color: "#006241",
      floorLabel: {
        en: "Lower level · Level 3",
        th: "ชั้นล่าง · ชั้น 3",
      },
    },
    directionLabel: {
      en: "Towards National Stadium",
      th: "ไปสนามกีฬาแห่งชาติ",
    },
    nextStation: station(
      { en: "National Stadium", th: "สนามกีฬาแห่งชาติ" },
      "W1",
      ["MBK"],
      ["สนามกีฬาแห่งชาติ", "MBK"]
    ),
    terminalStation: station(
      { en: "National Stadium", th: "สนามกีฬาแห่งชาติ" },
      "W1",
      ["MBK"],
      ["สนามกีฬาแห่งชาติ", "MBK"]
    ),
    stops: [
      station(
        { en: "National Stadium", th: "สนามกีฬาแห่งชาติ" },
        "W1",
        ["MBK"],
        ["สนามกีฬาแห่งชาติ", "MBK"]
      ),
    ],
  },
];

export interface StationLookup {
  station: StationStop;
  route: PlatformRoute;
  line: LineInfo;
}

export const buildStationLookup = (): StationLookup[] => {
  const lookups: StationLookup[] = [];

  for (const route of ROUTES) {
    route.stops.forEach((stop) => {
      lookups.push({
        station: stop,
        route,
        line: route.line,
      });
    });
  }

  return lookups;
};
