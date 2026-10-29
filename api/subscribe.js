export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email address is required' });
    }

    try {
        // Catatan Pengembangan AI ke depan:
        // Di sini Anda bisa menambahkan fetch() ke Web App URL Google Apps Script 
        // untuk menyimpan daftar email subscriber ke Google Sheets, 
        // atau memanggil API Fonnte untuk notifikasi admin.

        return res.status(200).json({
            status: 'success',
            message: `Thank you! Updates for ISWMSE 2026 will be sent to ${email}.`
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
