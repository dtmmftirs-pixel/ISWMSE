export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
  }

  // Catatan: Di sini Anda bisa menambahkan fetch() ke Google Apps Script / Google Sheets seperti di portal KPRI jika ingin menyimpan daftar email ke Spreadsheet.
  return res.status(200).json({
    status: 'success',
    message: 'Thank you for subscribing to ISWMSE 2026 updates!'
  });
}
