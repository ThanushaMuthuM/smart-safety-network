export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    try {
        const { lat, lng, mapsLink } = req.body || {};

        if (
            typeof lat !== "number" ||
            typeof lng !== "number"
        ) {
            return res.status(400).json({
                success: false,
                error: "Latitude and longitude are required"
            });
        }

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error("Telegram environment variables are missing");

            return res.status(500).json({
                success: false,
                error: "Telegram configuration is missing"
            });
        }

        const message =
`🚨 *EMERGENCY SOS!*

I need help. My current location:

📍 Latitude: ${lat.toFixed(6)}
📍 Longitude: ${lng.toFixed(6)}

🗺️ [Open in Google Maps](${mapsLink})

Please assist immediately.`;

        const telegramURL =
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const telegramResponse = await fetch(telegramURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });

        const result = await telegramResponse.json();

        if (!telegramResponse.ok || !result.ok) {
            console.error("Telegram API error:", result);

            return res.status(500).json({
                success: false,
                error: result.description || "Telegram API error"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Telegram SOS sent successfully"
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            success: false,
            error: "Failed to send Telegram message"
        });
    }
}