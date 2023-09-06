import { SelectFilterItem, FilterOption, Legend, LegendItem, MultipleSelectFilterItem } from "./base-state";

export const QP_REGION_COLORING = 'rc';
export const QP_REGION_COLORING_TEMPERATURE = 'temperature';
export const QP_REGION_COLORING_VEG_COVER = 'vegetation';
export const QP_REGION_COLORING_CLUSTER = 'cluster';
export const QP_REGION_COLORING_ALL = 'all';

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
// this defines the drop-down of display modes for the "stat-areas" display
export const STAT_AREA_COLORING_OPTIONS = new SelectFilterItem(
    QP_REGION_COLORING, 'פירוט מדדי ציון ההצללה:', [
        new FilterOption(QP_REGION_COLORING_TEMPERATURE, dropdown_1_option_1),
        new FilterOption(QP_REGION_COLORING_VEG_COVER, dropdown_1_option_2),
        new FilterOption(QP_REGION_COLORING_CLUSTER, dropdown_1_option_3),
        new FilterOption(QP_REGION_COLORING_ALL, dropdown_1_option_4)
    ]
);
// this defines the drop-down of display modes for the "munis" display
export const SATELLITE_COLORING_OPTIONS = new SelectFilterItem(
    QP_REGION_COLORING, 'סוג לווין:', [
        new FilterOption(QP_REGION_COLORING_TEMPERATURE, dropdown_1_option_1),
        new FilterOption(QP_REGION_COLORING_VEG_COVER, dropdown_1_option_2),
        new FilterOption("satellite", "תצלום אויר")
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
REGION_COLORING_LEGEND["cluster"] = new Legend('מקרא אשכול כלכלי חברתי', [
    new LegendItem('#1E1E4D', '10'),
    new LegendItem('#272361', '9'),
    new LegendItem('#314177', '8'),
    new LegendItem('#3C5E91', '7'),
    new LegendItem('#497DB0', '6'),
    new LegendItem('#54A4DB', '5'),
    new LegendItem('#66AFE1', '4'),
    new LegendItem('#78BBE7', '3'),
    new LegendItem('#89C8EE', '2'),
    new LegendItem('#9BD7F5', '1'),
    new LegendItem('#D9D9D9', 'אין מידע כלל', true),
], 'אשכול כלכלי חברתי');
REGION_COLORING_LEGEND['vegetation'] = new Legend('מקרא כיסוי צומח', [
    new LegendItem('#2B5B34', 'כיסוי גבוה'),
    new LegendItem('#4D734E', ''),
    new LegendItem('#6D8F6E', ''),
    new LegendItem('#90B192', ''),
    new LegendItem('#BBDFC3', 'כיסוי נמוך'),
    new LegendItem('#D9D9D9', 'אין מידע', true),
], 'לפי מיפוי חופות עצים של מפ״י');
REGION_COLORING_LEGEND['temperature'] = new Legend('מקרא טמפרטורה', [
    new LegendItem('#EC1E26', 'טמפרטורה גבוהה'),
    new LegendItem('#DE5959', ''),
    new LegendItem('#E58586', ''),
    new LegendItem('#EDB1B2', ''),
    new LegendItem('#F7DEDF', 'טמפרטורה נמוכה'),
    new LegendItem('#D9D9D9', 'אין מידע', true),
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

const MUNIS_BG_LAYERS_SELECTION = new MultipleSelectFilterItem(
    'bglayers', Label_for_munis_dropdown_2, dropdown_2_option_0, [
        new FilterOption('kll', dropdown_2_option_1),
        new FilterOption('gush', dropdown_2_option_2),
        new FilterOption('pst', dropdown_2_option_3),
        new FilterOption('yaad', dropdown_2_option_4),
        new FilterOption('bus', dropdown_2_option_5),
    ]
)
const STAT_AREAS_BG_LAYERS_SELECTION = new MultipleSelectFilterItem(
    'sbglayers', Label_for_munis_dropdown_2, dropdown_2_option_0, [
        new FilterOption('kll', dropdown_2_option_1),
        new FilterOption('gush', dropdown_2_option_2),
        new FilterOption('pst', dropdown_2_option_3),
        new FilterOption('yaad', dropdown_2_option_4),
        new FilterOption('bus', dropdown_2_option_5),
    ]
)

// This defines the drop-downs controls in the filter area of header, in state "munis"
export const MUNIS_FILTER_ITEMS = [
    MUNI_COLORING_OPTIONS,
    MUNIS_BG_LAYERS_SELECTION
];

export const MUNI_FILTER_ITEMS = [
    MUNI_COLORING_OPTIONS
];

export const STAT_AREA_FILTER_ITEMS = [
    STAT_AREA_COLORING_OPTIONS,
    STAT_AREAS_BG_LAYERS_SELECTION
];

export const SATELLITE_FILTER_ITEMS = [
    SATELLITE_COLORING_OPTIONS
];
