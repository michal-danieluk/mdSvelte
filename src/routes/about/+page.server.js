import { fail } from '@sveltejs/kit'
import nodemailer from 'nodemailer'

// Konfiguracja - najlepiej przenieść to do zmiennych środowiskowych
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = process.env.SMTP_PORT || 587
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const TO_EMAIL = process.env.TO_EMAIL || 'michal@example.com' // Twój adres email

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()

    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    // Walidacja
    if (!name || !email || !message) {
      return fail(400, {
        error: 'Wszystkie pola są wymagane',
        name,
        email,
        message
      })
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return fail(400, {
        error: 'Nieprawidłowy adres email',
        name,
        email,
        message
      })
    }

    // Walidacja długości wiadomości
    if (message.length < 10) {
      return fail(400, {
        error: 'Wiadomość musi zawierać co najmniej 10 znaków',
        name,
        email,
        message
      })
    }

    try {
      // Konfiguracja transportera
      const transporter = nodemailer.createTransporter({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false, // true dla portu 465, false dla innych portów
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      })

      // Opcje emaila
      const mailOptions = {
        from: `"Formularz kontaktowy - ${name}" <${SMTP_USER}>`,
        to: TO_EMAIL,
        replyTo: email,
        subject: `Nowa wiadomość od ${name} z formularza kontaktowego`,
        text: `Otrzymałeś nową wiadomość z formularza kontaktowego:\n\nImię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}\n\n---\nTa wiadomość została wysłana z formularza kontaktowego na Twojej stronie.`,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #0d9488;">Nowa wiadomość z formularza kontaktowego</h2><div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong>Imię:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p></div><div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;"><p><strong>Wiadomość:</strong></p><p style="white-space: pre-wrap; margin-top: 10px;">${message}</p></div><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 12px;">Ta wiadomość została wysłana z formularza kontaktowego na Twojej stronie.</p></div>`
      }

      // Wysyłanie emaila
      const info = await transporter.sendMail(mailOptions)

      console.log('Email wysłany:', info.messageId)

      return {
        success: true,
        message: 'Wiadomość została wysłana pomyślnie!'
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania:', error)
      return fail(500, {
        error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.',
        name,
        email,
        message
      })
    }
  }
}

// Wyłącz prerenderowanie dla tej strony
export const prerender = false
