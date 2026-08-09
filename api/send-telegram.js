export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    try {
        const { lat, lng, mapsLink } = req.body;

        if (!lat || !lng || !mapsLink) {
            return res.status(400).json({
                success: false,
                error: "Location data is missing"
            });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return res.status(500).json({
                success: false,
                error: "Telegram environment variables are not configured"
            });
        }

        const message = `
🚨 *EMERGENCY SOS!*

I need help immediately.

📍 *Latitude:* ${Number(lat).toFixed(6)}
📍 *Longitude:* ${Number(lng).toFixed(6)}

🗺️ [Open Location in Google Maps](${mapsLink})

⚠️ Please assist immediately.
`;

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "Markdown"
                })
            }
        );

        const result = await telegramResponse.json();

        if (!telegramResponse.ok || !result.ok) {
            return res.status(500).json({
                success: false,
                error: result.description || "Telegram API error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Telegram message sent successfully"
        });

    } catch (error) {
        console.error("Telegram error:", error);

        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}