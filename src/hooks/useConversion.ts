import { useState } from 'react';
import type { ConversionResult, ConversionMode, EditorState } from '../types';
import { parseQRISPayload, convertToStatic } from '../lib/emv';
import { generateQRDataURL } from '../lib/qr';

export function useConversion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convert = async (
    payload: string,
    mode: ConversionMode = 'no_amount',
    fixedAmount?: number,
    edits?: EditorState
  ) => {
    setLoading(true);
    setError(null);

    try {
      const original = parseQRISPayload(payload);

      const convertedPayload = convertToStatic(payload, {
        fixedAmount: mode === 'fixed_amount' ? fixedAmount : undefined,
        edits: {
          merchantName: edits?.merchantName,
          merchantCity: edits?.merchantCity,
          postalCode: edits?.postalCode,
          billNumber: edits?.billNumber,
          referenceLabel: edits?.referenceLabel,
        },
      });

      const qrDataUrl = await generateQRDataURL(convertedPayload);

      const converted = parseQRISPayload(convertedPayload);

      const conversionResult: ConversionResult = {
        original,
        converted: {
          payload: convertedPayload,
          items: converted.items,
          qrDataUrl,
        },
        mode,
        fixedAmount,
      };

      setResult(conversionResult);
      return conversionResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    error,
    result,
    convert,
    reset,
  };
}
