// Bengali numeral and date conversion utilities

const bnDigits: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};


function toBnDigits(str: string): string {
  return str.replace(/[0-9]/g, (digit) => bnDigits[digit] || digit);
}


export function toBnNum(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '০';

  
  const numVal = typeof num === 'number' ? num : parseFloat(num.toString());
  let str: string;
  if (!isNaN(numVal) && Number.isInteger(numVal)) {
    str = numVal.toLocaleString('en-US');
  } else {
    str = num.toString();
  }

  return toBnDigits(str);
}


export function formatBnUnit(unit: string): string {
  const normalized = unit?.toLowerCase()?.trim() || '';
  if (normalized === 'kg' || normalized === 'কেজি') return 'প্রতি কেজি';
  if (normalized === 'liter' || normalized === 'litre' || normalized === 'লিটার') return 'প্রতি লিটার';
  if (normalized === 'dozen' || normalized === 'ডজন') return 'প্রতি ডজন';
  if (normalized === 'piece' || normalized === 'pc' || normalized === 'পিস') return 'প্রতি পিস';
  if (normalized.startsWith('প্রতি')) return unit;
  return `প্রতি ${unit}`;
}

const bnDays = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

const bnMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const enWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export function getBnFormattedDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';

  const dayName = bnDays[enWeekdays.indexOf(get('weekday'))];
  const dayNum = toBnDigits(get('day'));
  const monthName = bnMonths[Number(get('month')) - 1];
  const yearNum = toBnDigits(get('year')); // no comma in year

  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}