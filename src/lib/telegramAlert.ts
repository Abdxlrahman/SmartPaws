'use client';

export function getTelegramCredentials(): { token: string; chatId: string } | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('tg_token') || '';
  const chatId = localStorage.getItem('tg_chatid') || '';
  if (!token || !chatId) return null;
  return { token, chatId };
}

export async function sendTelegramAlert(message: string): Promise<boolean> {
  const creds = getTelegramCredentials();
  if (!creds) return false;
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${creds.token}/sendMessage?chat_id=${creds.chatId}&text=🐾 ${encodeURIComponent(message)}&parse_mode=Markdown`
    );
    return res.ok;
  } catch {
    return false;
  }
}
