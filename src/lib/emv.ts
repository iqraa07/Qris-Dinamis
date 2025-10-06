import type { TLVItem, QRISPayload } from '../types';

export const TAG_NAMES: Record<string, string> = {
  '00': 'Payload Format Indicator',
  '01': 'Point of Initiation Method',
  '26': 'Merchant Account (Acquirer)',
  '51': 'Merchant Account (Switching)',
  '52': 'Merchant Category Code',
  '53': 'Transaction Currency',
  '54': 'Transaction Amount',
  '58': 'Country Code',
  '59': 'Merchant Name',
  '60': 'Merchant City',
  '61': 'Postal Code',
  '62': 'Additional Data',
  '63': 'CRC',
};

export function parseTLV(payload: string): TLVItem[] {
  const items: TLVItem[] = [];
  let i = 0;
  const s = payload.trim();

  while (i < s.length) {
    const tag = s.slice(i, i + 2);
    if (tag.length < 2) break;
    i += 2;

    const lenStr = s.slice(i, i + 2);
    const len = parseInt(lenStr, 10);
    if (isNaN(len)) break;
    i += 2;

    const val = s.slice(i, i + len);
    i += len;

    items.push({ tag, len, val });

    if (tag === '63') break;
  }

  return items;
}

export function buildTLV(items: TLVItem[]): string {
  return items
    .map((it) => `${it.tag}${String(it.val.length).padStart(2, '0')}${it.val}`)
    .join('');
}

export function crc16ccitt(data: Uint8Array): number {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i] << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc & 0xffff;
}

export function computeCRC(payloadWithoutCRC: string): string {
  const data = new TextEncoder().encode(payloadWithoutCRC);
  return crc16ccitt(data).toString(16).toUpperCase().padStart(4, '0');
}

export function parseQRISPayload(payload: string): QRISPayload {
  const items = parseTLV(payload);
  const getTag = (tag: string) => items.find((it) => it.tag === tag)?.val || '';

  const methodTag = getTag('01');
  let type: 'static' | 'dynamic' | 'unknown' = 'unknown';
  if (methodTag === '11') type = 'static';
  else if (methodTag === '12') type = 'dynamic';

  const noCRC = items.filter((it) => it.tag !== '63');
  const withPlaceholder = [...noCRC, { tag: '63', len: 4, val: '0000' }];
  const tmp = buildTLV(withPlaceholder);
  const crc = computeCRC(tmp.slice(0, -4));

  return {
    raw: payload,
    items,
    merchantName: getTag('59'),
    merchantCity: getTag('60'),
    postalCode: getTag('61'),
    type,
    amount: getTag('54') || undefined,
    crc,
  };
}

export function convertToStatic(
  payload: string,
  options?: {
    fixedAmount?: number;
    edits?: {
      merchantName?: string;
      merchantCity?: string;
      postalCode?: string;
      billNumber?: string;
      referenceLabel?: string;
    };
  }
): string {
  const items = parseTLV(payload);
  const map = new Map(items.map((it) => [it.tag, it]));

  map.set('01', { tag: '01', len: 2, val: '11' });

  if (options?.fixedAmount !== undefined && options.fixedAmount > 0) {
    const amountStr = options.fixedAmount.toFixed(2);
    map.set('54', { tag: '54', len: amountStr.length, val: amountStr });
  } else {
    map.delete('54');
  }

  if (options?.edits) {
    if (options.edits.merchantName) {
      map.set('59', {
        tag: '59',
        len: options.edits.merchantName.length,
        val: options.edits.merchantName,
      });
    }
    if (options.edits.merchantCity) {
      map.set('60', {
        tag: '60',
        len: options.edits.merchantCity.length,
        val: options.edits.merchantCity,
      });
    }
    if (options.edits.postalCode) {
      map.set('61', {
        tag: '61',
        len: options.edits.postalCode.length,
        val: options.edits.postalCode,
      });
    }

    if (options.edits.billNumber || options.edits.referenceLabel) {
      const additionalData: TLVItem[] = [];
      if (options.edits.billNumber) {
        additionalData.push({
          tag: '01',
          len: options.edits.billNumber.length,
          val: options.edits.billNumber,
        });
      }
      if (options.edits.referenceLabel) {
        additionalData.push({
          tag: '05',
          len: options.edits.referenceLabel.length,
          val: options.edits.referenceLabel,
        });
      }
      const additionalDataStr = buildTLV(additionalData);
      map.set('62', {
        tag: '62',
        len: additionalDataStr.length,
        val: additionalDataStr,
      });
    }
  }

  map.delete('63');

  const orderedTags = [
    '00', '01', '26', '27', '51', '52', '53', '54', '55', '56', '57', '58',
    '59', '60', '61', '62',
  ];
  const result: TLVItem[] = [];

  for (const tag of orderedTags) {
    if (map.has(tag)) {
      result.push(map.get(tag)!);
      map.delete(tag);
    }
  }

  map.forEach((item) => {
    if (item.tag !== '63') result.push(item);
  });

  result.push({ tag: '63', len: 4, val: '0000' });
  const tmp = buildTLV(result);
  const crc = computeCRC(tmp.slice(0, -4));
  result[result.length - 1] = { tag: '63', len: 4, val: crc };

  return buildTLV(result);
}

export function parseAdditionalData(tag62Value: string): Record<string, string> {
  const result: Record<string, string> = {};
  const subItems = parseTLV(tag62Value);

  const subTagNames: Record<string, string> = {
    '01': 'Bill Number',
    '02': 'Mobile Number',
    '03': 'Store Label',
    '04': 'Loyalty Number',
    '05': 'Reference Label',
    '06': 'Customer Label',
    '07': 'Terminal Label',
    '08': 'Purpose of Transaction',
    '09': 'Additional Consumer Data Request',
  };

  subItems.forEach((item) => {
    const name = subTagNames[item.tag] || `Sub-${item.tag}`;
    result[name] = item.val;
  });

  return result;
}
