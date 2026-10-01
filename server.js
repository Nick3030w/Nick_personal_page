require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_LIMIT = 5;
const contactAttempts = new Map();
let mailTransporter;

app.disable('x-powered-by');

app.use((req, res, next) => {
    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    });
    next();
});

app.use(express.json({ limit: '12kb', strict: true }));
app.use(express.urlencoded({ extended: false, limit: '12kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function normalizeSingleLine(value) {
    return typeof value === 'string'
        ? value.trim().replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ')
        : '';
}

function normalizeMessage(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
    })[character]);
}

function isValidEmail(value) {
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(ipAddress) {
    const now = Date.now();
    const recentAttempts = (contactAttempts.get(ipAddress) || [])
        .filter((timestamp) => now - timestamp < CONTACT_WINDOW_MS);

    if (recentAttempts.length >= CONTACT_LIMIT) {
        contactAttempts.set(ipAddress, recentAttempts);
        return true;
    }

    recentAttempts.push(now);
    contactAttempts.set(ipAddress, recentAttempts);
    return false;
}

function getMailTransporter() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
        throw new Error('La configuración de correo está incompleta.');
    }

    if (!mailTransporter) {
        mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    return mailTransporter;
}

app.post('/api/contact', async (req, res) => {
    const honeypot = normalizeSingleLine(req.body?.website);

    // Los bots suelen completar este campo invisible. Se responde con éxito
    // para no revelar el filtro ni generar correo no deseado.
    if (honeypot) {
        return res.json({ success: true, message: 'Mensaje recibido.' });
    }

    if (isRateLimited(req.ip)) {
        res.set('Retry-After', String(Math.ceil(CONTACT_WINDOW_MS / 1000)));
        return res.status(429).json({
            success: false,
            error: 'Has enviado varios mensajes. Espera unos minutos antes de intentar de nuevo.',
        });
    }

    const name = normalizeSingleLine(req.body?.name);
    const email = normalizeSingleLine(req.body?.email).toLowerCase();
    const message = normalizeMessage(req.body?.message);

    if (name.length < 2 || name.length > 100) {
        return res.status(400).json({
            success: false,
            error: 'El nombre debe tener entre 2 y 100 caracteres.',
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Ingresa una dirección de correo válida.',
        });
    }

    if (message.length < 10 || message.length > 2000) {
        return res.status(400).json({
            success: false,
            error: 'El mensaje debe tener entre 10 y 2000 caracteres.',
        });
    }

    try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');
        const transporter = getMailTransporter();

        await transporter.sendMail({
            from: `"Contacto del portafolio" <${process.env.EMAIL_USER}>`,
            replyTo: { name, address: email },
            to: process.env.EMAIL_TO,
            subject: `Nuevo mensaje de ${name} desde el portafolio`,
            text: `Nuevo mensaje de contacto\n\nNombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
            html: `
                <div style="max-width:640px;margin:auto;padding:32px;background:#10171b;color:#f2f7f5;font-family:Arial,sans-serif;border-radius:18px;">
                    <p style="margin:0 0 8px;color:#67f5d2;font-size:12px;letter-spacing:1.5px;">PORTAFOLIO / NUEVO CONTACTO</p>
                    <h2 style="margin:0 0 28px;font-size:26px;">Nuevo mensaje de ${safeName}</h2>
                    <p style="margin:0 0 8px;color:#93a39f;"><strong style="color:#f2f7f5;">Correo:</strong> ${safeEmail}</p>
                    <div style="margin-top:24px;padding:20px;background:#080c0f;border-left:3px solid #67f5d2;border-radius:10px;line-height:1.65;">${safeMessage}</div>
                </div>
            `,
        });

        return res.json({ success: true, message: 'Mensaje enviado correctamente.' });
    } catch (error) {
        console.error('No se pudo enviar el correo de contacto:', error.message);
        return res.status(500).json({
            success: false,
            error: 'No fue posible enviar el mensaje en este momento. Intenta de nuevo más tarde.',
        });
    }
});

app.use('/api', (req, res) => {
    res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError || error.type === 'entity.too.large') {
        return res.status(400).json({
            success: false,
            error: 'La solicitud no tiene un formato válido.',
        });
    }
    return next(error);
});

const cleanupTimer = setInterval(() => {
    const oldestAllowed = Date.now() - CONTACT_WINDOW_MS;
    contactAttempts.forEach((attempts, ipAddress) => {
        const recentAttempts = attempts.filter((timestamp) => timestamp > oldestAllowed);
        if (recentAttempts.length) contactAttempts.set(ipAddress, recentAttempts);
        else contactAttempts.delete(ipAddress);
    });
}, CONTACT_WINDOW_MS);
cleanupTimer.unref();

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Portafolio disponible en http://localhost:${PORT}`);
    });
}

module.exports = app;
