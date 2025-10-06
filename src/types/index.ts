export interface TLVItem {
  tag: string;
  len: number;
  val: string;
}

export interface QRISPayload {
  raw: string;
  items: TLVItem[];
  merchantName: string;
  merchantCity: string;
  postalCode: string;
  type: 'static' | 'dynamic' | 'unknown';
  amount?: string;
  crc: string;
}

export type ConversionMode = 'no_amount' | 'fixed_amount';

export interface ConversionResult {
  original: QRISPayload;
  converted: {
    payload: string;
    items: TLVItem[];
    qrDataUrl: string;
  };
  mode: ConversionMode;
  fixedAmount?: number;
}

export interface EditorState {
  merchantName?: string;
  merchantCity?: string;
  postalCode?: string;
  billNumber?: string;
  referenceLabel?: string;
}
