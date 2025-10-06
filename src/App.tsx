import { useState, useRef } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useConversion } from './hooks/useConversion';
import { parseQRISPayload, TAG_NAMES, parseAdditionalData } from './lib/emv';
import { decodeQRFromImage, downloadDataURL, downloadText } from './lib/qr';
import type { ConversionMode, EditorState } from './types';
import './App.css';

function App() {
  const [currentPayload, setCurrentPayload] = useState<string | null>(null);
  const [parsedInfo, setParsedInfo] = useState<{ name: string; city: string; type: string } | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [mode, setMode] = useState<ConversionMode>('no_amount');
  const [fixedAmount, setFixedAmount] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [edits, setEdits] = useState<EditorState>({});
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [manualPayload, setManualPayload] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isDark, toggle } = useDarkMode();
  const { loading, error, result, convert, reset } = useConversion();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Tolong upload file gambar');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const payload = await decodeQRFromImage(file);
      if (!payload || payload.length < 10) {
        throw new Error('Payload QRIS tidak valid');
      }
      handlePayloadDetected(payload);
      setUploadError(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Gagal membaca QR code');
      setPreview(null);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleManualSubmit = () => {
    let payload = manualPayload.trim();
    if (!payload) {
      setUploadError('Masukkan payload terlebih dahulu');
      return;
    }

    payload = payload.replace(/\s+/g, '').replace(/\n/g, '');

    if (!/^[0-9A-Z.]+$/i.test(payload)) {
      setUploadError('Format payload EMVCo tidak valid - mengandung karakter tidak dikenal');
      return;
    }

    if (!payload.startsWith('0002')) {
      setUploadError('Payload harus dimulai dengan "0002"');
      return;
    }

    if (payload.length < 100) {
      setUploadError('Payload terlalu pendek - minimal 100 karakter');
      return;
    }

    setUploadError(null);
    setManualPayload(payload);
    handlePayloadDetected(payload);
  };

  const handleClear = () => {
    setPreview(null);
    setManualPayload('');
    setUploadError(null);
    setCurrentPayload(null);
    setParsedInfo(null);
    reset();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePayloadDetected = (payload: string) => {
    setCurrentPayload(payload);
    setShowTutorial(false);
    reset();

    try {
      const parsed = parseQRISPayload(payload);
      setParsedInfo({
        name: parsed.merchantName,
        city: parsed.merchantCity,
        type: parsed.type,
      });
    } catch (err) {
      console.error('Failed to parse payload:', err);
      setParsedInfo(null);
    }
  };

  const handleConvert = async () => {
    if (!currentPayload) return;

    try {
      const amount = mode === 'fixed_amount' ? parseFloat(fixedAmount) : undefined;
      await convert(currentPayload, mode, amount, showAdvanced ? edits : undefined);
    } catch (err) {
      console.error('Conversion failed:', err);
    }
  };

  const handleDownloadQR = () => {
    if (!result) return;
    const filename = `qris_static_${result.original.merchantName.replace(/\s+/g, '_')}_${Date.now()}.png`;
    downloadDataURL(result.converted.qrDataUrl, filename);
  };

  const handleDownloadPayload = () => {
    if (!result) return;
    const filename = `qris_payload_${Date.now()}.txt`;
    downloadText(result.converted.payload, filename);
  };

  const handleCopyPayload = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.converted.payload);
      alert('Payload berhasil disalin!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const additionalData = result?.converted.items.find((it) => it.tag === '62');

  return (
    <div className="app">
      <div className="hero-bg" />

      <header style={{ marginBottom: '2.5rem' }} className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem' }}>💳</div>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
                QRIS Converter Pro
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Ubah QRIS Dinamis menjadi Statik dengan mudah
              </p>
            </div>
          </div>
          <button className="btn btn-icon" onClick={toggle} title={isDark ? 'Mode terang' : 'Mode gelap'}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {showTutorial && (
        <div className="card card-highlight fade-in" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>🎓</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Cara Menggunakan (Sangat Mudah!)
              </h3>
              <ol style={{ marginLeft: '1.25rem', fontSize: '0.9375rem', lineHeight: '1.8' }}>
                <li><strong>Upload gambar QRIS</strong> atau tempel payload di bawah</li>
                <li><strong>Pilih mode konversi</strong>: tanpa nominal atau dengan nominal tetap</li>
                <li><strong>Klik tombol "Konversi"</strong> dan QR statis siap digunakan!</li>
                <li><strong>Download hasil</strong> dalam format PNG atau TXT</li>
              </ol>
              <button className="btn btn-ghost" style={{ marginTop: '0.75rem' }} onClick={() => setShowTutorial(false)}>
                Mengerti, Tutup Tutorial
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="card fade-in" style={{ marginBottom: '1.5rem', background: '#fee2e2', borderColor: '#fecaca', color: '#991b1b' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-2-md" style={{ marginBottom: '1.5rem' }}>
        <div className="card slide-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="step-indicator">1</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Upload QR Code</h2>
          </div>

          <div
            className={`drop-zone ${isDragging ? 'dragover' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            {uploadLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <span className="spinner" />
                <span>Membaca QR code...</span>
              </div>
            ) : preview ? (
              <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '220px', borderRadius: '0.75rem', boxShadow: 'var(--shadow-lg)' }}
                />
                <span className="badge badge-success badge-lg">✓ QR code terdeteksi</span>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📸</div>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Seret gambar ke sini atau klik untuk upload
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                  Format: PNG, JPG, JPEG
                </p>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="fade-in" style={{ marginTop: '1rem', padding: '0.875rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
              {uploadError}
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              📱 Atau Tempel Hasil Scan Google Lens
            </label>

            <div className="info-box" style={{ padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8125rem' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>💡 Cara Tercepat (Tanpa Upload!):</div>
              <ol style={{ marginLeft: '1.25rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
                <li>Buka <strong>Google Lens</strong> atau screenshot QR lalu buka di <strong>Google Photos</strong></li>
                <li>Tap icon <strong>Lens</strong> (kamera dengan titik di pojok)</li>
                <li>Tap area QR code → pilih <strong>"Copy text"</strong></li>
                <li>Paste di kotak bawah → klik <strong>"Parse Payload"</strong></li>
              </ol>
              <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem', fontSize: '0.75rem' }}>
                <strong>Format payload:</strong> Dimulai dengan <code>0002</code>, panjang 200-400 karakter, hanya angka dan huruf
                <div style={{ marginTop: '0.25rem', fontFamily: 'monospace', color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>
                  Contoh: 00020101021226XX...XXXX5802ID59XX...63XXXX
                </div>
              </div>
            </div>
            <textarea
              className="textarea"
              placeholder="Paste hasil scan Google Lens di sini (akan otomatis membersihkan spasi)...

Contoh format:
00020101021226XX016ID.CO.XXXXXX.WWW0118936009180000XXXXX..."
              value={manualPayload}
              onChange={(e) => setManualPayload(e.target.value)}
              style={{ minHeight: '100px' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleManualSubmit}>
                ⚡ Parse Payload
              </button>
              <button className="btn btn-ghost" onClick={handleClear}>
                🗑️ Bersihkan Semua
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
              💡 Tip: Spasi akan otomatis dihapus saat parse
            </div>
          </div>
        </div>

        {currentPayload && parsedInfo && (
          <div className="card fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="step-indicator step-inactive">📋</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Info QR Terdeteksi</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.25rem' }}>
                  Nama Merchant
                </span>
                <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>{parsedInfo.name || '-'}</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.25rem' }}>
                  Kota
                </span>
                <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>{parsedInfo.city || '-'}</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.25rem' }}>
                  Tipe Saat Ini
                </span>
                <span className={`badge badge-lg ${parsedInfo.type === 'dynamic' ? 'badge-warning' : 'badge-success'}`}>
                  {parsedInfo.type === 'dynamic' ? '⚡ Dynamic (01=12)' : '✓ Static (01=11)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {currentPayload && (
        <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="step-indicator">2</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Pilih Mode Konversi</h2>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Mode Konversi
            </label>
            <select className="select" value={mode} onChange={(e) => setMode(e.target.value as ConversionMode)}>
              <option value="no_amount">✨ Static Tanpa Nominal - Pembeli input nominal sendiri</option>
              <option value="fixed_amount">💰 Static dengan Nominal Tetap</option>
            </select>
          </div>

          {mode === 'fixed_amount' && (
            <div style={{ marginBottom: '1.5rem' }} className="fade-in">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Nominal Tetap (IDR)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Contoh: 50000"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <button className="btn btn-ghost" onClick={() => setShowAdvanced(!showAdvanced)} style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>⚙️ Edit Lanjutan (Opsional)</span>
              <span>{showAdvanced ? '▲' : '▼'}</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="fade-in" style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Nama Merchant (Kosongkan jika tidak ingin diubah)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nama toko/merchant"
                  value={edits.merchantName || ''}
                  onChange={(e) => setEdits({ ...edits, merchantName: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Kota
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nama kota"
                  value={edits.merchantCity || ''}
                  onChange={(e) => setEdits({ ...edits, merchantCity: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Bill Number (Tag 62.01)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Contoh: INV-2024-001"
                  value={edits.billNumber || ''}
                  onChange={(e) => setEdits({ ...edits, billNumber: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Reference Label (Tag 62.05)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Contoh: ORDER-123"
                  value={edits.referenceLabel || ''}
                  onChange={(e) => setEdits({ ...edits, referenceLabel: e.target.value })}
                />
              </div>
            </div>
          )}

          <button
            className="btn btn-primary btn-lg"
            onClick={handleConvert}
            disabled={loading || (mode === 'fixed_amount' && !fixedAmount)}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Mengkonversi...
              </>
            ) : (
              <>
                ⚡ Konversi ke QR Static Sekarang
              </>
            )}
          </button>
        </div>
      )}

      {result && (
        <div className="card scale-in" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span className="step-indicator">3</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Hasil Konversi</h2>
          </div>

          <div className="success-message" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>🎉</span>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>Berhasil Dikonversi!</div>
                <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  QR code static siap digunakan. Silakan download atau scan langsung.
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-2-md" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>QR Code Hasil</h3>
              <div className="qr-container">
                <img src={result.converted.qrDataUrl} alt="Static QR" style={{ width: '280px', height: '280px' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleDownloadQR}>
                  📥 Download PNG
                </button>
                <button className="btn" onClick={handleDownloadPayload}>
                  📄 Download TXT
                </button>
                <button className="btn btn-ghost" onClick={handleCopyPayload}>
                  📋 Copy Payload
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Info Merchant</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ padding: '0.875rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block' }}>Nama</span>
                  <span style={{ fontWeight: '700' }}>{result.converted.items.find(it => it.tag === '59')?.val || '-'}</span>
                </div>
                <div style={{ padding: '0.875rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block' }}>Kota</span>
                  <span style={{ fontWeight: '700' }}>{result.converted.items.find(it => it.tag === '60')?.val || '-'}</span>
                </div>
                <div style={{ padding: '0.875rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block' }}>Tipe</span>
                  <span className="badge badge-success">✓ Static (01=11)</span>
                </div>
                {result.fixedAmount && (
                  <div style={{ padding: '0.875rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'block' }}>Nominal Tetap</span>
                    <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--accent)' }}>
                      IDR {result.fixedAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
              </div>

              {additionalData && (
                <div style={{ marginTop: '1rem', padding: '0.875rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>
                    Additional Data (Tag 62)
                  </div>
                  {Object.entries(parseAdditionalData(additionalData.val)).map(([key, value]) => (
                    <div key={key} style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>{key}:</span> <code>{value}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Perbandingan Payload</h3>
            <div className="grid grid-2-md" style={{ gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>
                  Payload Asli ({result.original.type === 'dynamic' ? 'Dynamic' : 'Static'})
                </label>
                <textarea className="textarea" value={result.original.raw} readOnly style={{ minHeight: '100px' }} />
                {result.original.type === 'dynamic' && (
                  <span className="badge badge-warning" style={{ marginTop: '0.5rem' }}>
                    ⚡ Dynamic (01=12) {result.original.amount && `- Nominal: ${result.original.amount}`}
                  </span>
                )}
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem', color: 'var(--text-tertiary)' }}>
                  Payload Hasil (Static)
                </label>
                <textarea className="textarea" value={result.converted.payload} readOnly style={{ minHeight: '100px' }} />
                <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>
                  ✓ Static (01=11) - CRC: {result.converted.items.find(it => it.tag === '63')?.val}
                </span>
              </div>
            </div>
          </div>

          <details style={{ marginTop: '1.5rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '700', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '0.75rem' }}>
              📊 Detail EMV Tags (Klik untuk lihat)
            </summary>
            <div style={{ overflow: 'auto', marginTop: '1rem' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Panjang</th>
                    <th>Nilai</th>
                    <th>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {result.converted.items.map((item, idx) => (
                    <tr key={idx}>
                      <td><code>{item.tag}</code></td>
                      <td>{item.len}</td>
                      <td className="mono" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.val}
                      </td>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {TAG_NAMES[item.tag] || `Tag ${item.tag}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      )}

      <footer style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-tertiary)', border: '1px solid var(--border)', borderRadius: '1rem', background: 'var(--bg-secondary)' }}>
        <p style={{ fontWeight: '700', marginBottom: '0.75rem' }}>
          💡 Catatan Penting
        </p>
        <p style={{ lineHeight: '1.8' }}>
          Tool ini mengubah QRIS dinamis (01=12) menjadi statik (01=11) dan menghapus atau mengatur field nominal (Tag 54).<br />
          CRC dihitung ulang menggunakan algoritma CRC-16/CCITT-FALSE.<br />
          <strong>Semua proses berjalan di browser Anda</strong> - data tidak dikirim ke server manapun.
        </p>
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Created by</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.facebook.com/iqraa07" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
              📘 Facebook
            </a>
            <a href="https://t.me/arczyyy" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
              ✈️ Telegram
            </a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
            QRIS Converter Pro v2.0
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
