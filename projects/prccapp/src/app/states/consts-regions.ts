import { SelectFilterItem, FilterOption, Legend, LegendItem, MultipleSelectFilterItem } from "./base-state";

export const QP_REGION_COLORING = 'rc';
export const QP_REGION_COLORING_TEMPERATURE = 'temperature';
export const QP_REGION_COLORING_VEG_COVER = 'vegetation';
export const QP_REGION_COLORING_CLUSTER = 'cluster';
export const QP_REGION_COLORING_ALL = 'cluster';

export const QP_REGION_COLORING_CAR = 'car';
export const QP_REGION_COLORING_QUALITY = 'quality';
export const QP_REGION_COLORING_CPC = 'cpc';

const Label_for_munis_dropdown_1 = 'תצוגת מדדים שונים של המצב הקיים';
const dropdown_1_option_1 = "לפי טמפ' פני השטח";
const dropdown_1_option_2 = 'לפי כיסוי צומח';
const dropdown_1_option_3 = 'לפי אשכול כלכלי חברתי';
const dropdown_1_option_4 = 'כל המדדים יחדיו';
const Label_for_munis_dropdown_2 = 'שכבות רקע';
const dropdown_2_option_0 = 'בחר שכבות';
const dropdown_2_option_1 = 'ציון הצללה משוקלל';
const dropdown_2_option_2 = 'גוש חלקה';
const dropdown_2_option_3 = 'פשטי הצפה';
const dropdown_2_option_4 = 'עצי יעד';
const dropdown_2_option_5 = 'תחנות אוטובוס';
// Region Colorings
// this defines the drop-down of display modes for the "munis" display
export const MUNI_COLORING_OPTIONS = new SelectFilterItem(
    QP_REGION_COLORING, Label_for_munis_dropdown_1, [
        new FilterOption(QP_REGION_COLORING_TEMPERATURE, dropdown_1_option_1),
        new FilterOption(QP_REGION_COLORING_VEG_COVER, dropdown_1_option_2),
        new FilterOption(QP_REGION_COLORING_CLUSTER, dropdown_1_option_3),
        new FilterOption(QP_REGION_COLORING_ALL, dropdown_1_option_4)
    ]
);
export const STAT_AREA_COLORING_OPTIONS = new SelectFilterItem(
    QP_REGION_COLORING, 'הצגה:', [
        new FilterOption(QP_REGION_COLORING_CAR, 'לפי כיסוי חופות העצים'),
        new FilterOption(QP_REGION_COLORING_QUALITY, 'לפי איכות המידע'),
    ]
);
export const REGION_COLORING_INTERPOLATE: {[key: string]: any[]} = {};
REGION_COLORING_INTERPOLATE[QP_REGION_COLORING_QUALITY] = [
    'match', ['coalesce', ['get', 'quality_score'], 0],
    0, ['to-color', '#cccccc'],
    1, ['to-color', '#FFC700'],
    2, ['to-color', '#FF7F00'],
    3, ['to-color', '#00D315'],
    ['to-color', '#00D315'],
];
REGION_COLORING_INTERPOLATE[QP_REGION_COLORING_CAR] = [
    'interpolate', ['exponential', 0.01], ['get', 'canopy_area_ratio'],
    0, ['to-color', '#ccc'],
    0.05, ['to-color', '#acecc2'],
    0.4, ['to-color', '#155b2e'],
];
REGION_COLORING_INTERPOLATE[QP_REGION_COLORING_CPC] = [
    'interpolate', ['exponential', 0.99], ['get', 'canopy_per_capita'],
    0, ['to-color', '#ccc'],
    10, ['to-color', '#acecc2'],
    150, ['to-color', '#155b2e'],
];

export const REGION_COLORING_LEGEND: {[key: string]: Legend} = {};
REGION_COLORING_LEGEND[QP_REGION_COLORING_QUALITY] = new Legend('מקרא איכות המידע', [
    new LegendItem('#00D315', '3 מקורות מידע ומעלה'),
    new LegendItem('#FF7F00', '2 מקורות מידע'),
    new LegendItem('#FFC700', 'מקור מידע אחד'),
    new LegendItem('#cccccc', 'אין מידע כלל'),
], 'ככל שיש יותר מקורות מידע ניתן להצליב ולטייב נתונים ולשפר את איכות המידע');
REGION_COLORING_LEGEND[QP_REGION_COLORING_CAR] = new Legend('מקרא כיסוי חופות העצים', [
    new LegendItem('#155b2e', 'כיסוי גבוה'),
    new LegendItem('#3b7f53', ''),
    new LegendItem('#60a478', '↑', false, true),
    new LegendItem('#86c89d', ''),
    new LegendItem('#acecc2', 'כיסוי נמוך'),
    new LegendItem('#ccc', 'אין מידע', true),
], 'לפי מיפוי חופות עצים של מפ״י');
REGION_COLORING_LEGEND[QP_REGION_COLORING_CPC] = new Legend('מקרא שטח חופות עצים לנפש', [
    new LegendItem('#155b2e', 'כיסוי גבוה'),
    new LegendItem('#3b7f53', ''),
    new LegendItem('#60a478', '↑', false, true),
    new LegendItem('#86c89d', ''),
    new LegendItem('#acecc2', 'כיסוי נמוך'),
    new LegendItem('#ccc', 'אין מידע', true),
], 'כיסוי הצומח מחושב לפי מיפוי חופות עצים של מפ״י, אוכלוסיה לפי נתוני למ״ס 2020');

// Muni filtering
export const QP_MUNI_FILTER_SEI = 'sei';
export const QP_MUNI_FILTER_SEI_LOW = 'low';
export const QP_MUNI_FILTER_SEI_MID = 'mid';
export const QP_MUNI_FILTER_SEI_HIGH = 'high';
export const QP_MUNI_FILTER_SEI_ALL = 'all';

export const QP_MUNI_FILTER_PD = 'pd';
export const QP_MUNI_FILTER_PD_LOW = 'low';
export const QP_MUNI_FILTER_PD_MID = 'mid';
export const QP_MUNI_FILTER_PD_HIGH = 'high';
export const QP_MUNI_FILTER_PD_ALL = 'all';

// This defines the drop-downs controls in the filter area of header, in state "munis"
export const MUNIS_FILTER_ITEMS = [
    MUNI_COLORING_OPTIONS,
    new MultipleSelectFilterItem(
        QP_MUNI_FILTER_SEI, Label_for_munis_dropdown_2, dropdown_2_option_0, [
            new FilterOption(QP_MUNI_FILTER_SEI_ALL, dropdown_2_option_1),
            new FilterOption(QP_MUNI_FILTER_SEI_LOW, dropdown_2_option_2),
            new FilterOption(QP_MUNI_FILTER_SEI_MID, dropdown_2_option_3),
            new FilterOption(QP_MUNI_FILTER_SEI_HIGH, dropdown_2_option_4),
            new FilterOption('bus', dropdown_2_option_5),
        ]
    )
];

export const MUNI_FILTER_ITEMS = [
    MUNI_COLORING_OPTIONS
];

export const STAT_AREA_FILTER_ITEMS = [
    STAT_AREA_COLORING_OPTIONS
];