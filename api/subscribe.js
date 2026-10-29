export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }
        
        // Di sini Anda bisa menambahkan logika penyimpanan email (ke Database, Google Sheets, atau Nodemailer)
        return res.status(200).json({ success: true, message: `Successfully registered ${email} for ISWMSE 2026 updates!` });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
