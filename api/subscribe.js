export default async function handler(req, res) {
  // Hanya izinkan HTTP POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { email } = req.body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        status: 'error',
        message: 'Harap masukkan alamat email yang valid.'
      });
    }

    // Tempatkan webhook / integrasi Google Sheets / Database di sini jika dibutuhkan
    console.log(`[ISWMSE 2026] New subscriber received: ${email}`);

    return res.status(200).json({
      status: 'success',
      message: 'Terima kasih telah berlangganan informasi ISWMSE 2026!',
      email
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kendala pada server. Silakan coba beberapa saat lagi.'
    });
  }
}
