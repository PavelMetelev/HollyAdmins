"use server";

import { z } from "zod";

const formSchema = z.object({
  nickname: z.string().min(3, "Ник слишком короткий").max(255),
  role: z.enum(["Стажер", "Мл.сотрудник", "Сотрудник"]),
  contact: z.string().min(3, "Укажите корректный способ связи").max(255),
  captcha: z.string().min(1, "Введите капчу"),
  expectedCaptcha: z.string(),
});

export async function submitRequest(formData: any) {
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { nickname, role, contact, captcha, expectedCaptcha } = result.data;

  if (captcha !== expectedCaptcha) {
    return { error: "Неверная капча" };
  }

  try {
    // Send to Telegram
    const botToken = "8723698068:AAHm03ABBeb7el6Y-zwLoP8-kwNP42P3_To";
    const chatId = "8568574541";
    const text = `🔔 *Новый запрос AHK*\n\n👤 *Ник:* ${nickname}\n🎖 *Должность:* ${role}\n📱 *Связь:* ${contact}\n📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      console.error("Telegram API error:", await response.text());
      return { error: "Ошибка при отправке в Telegram" };
    }

    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Произошла ошибка при обработке запроса" };
  }
}
