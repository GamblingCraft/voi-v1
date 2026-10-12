import { company } from "@/lib/company";
import { ClosingCta } from "@/features/content/components/closing-cta";

export function BlogPromo({ compact = false }: { compact?: boolean }) {
  return (
    <ClosingCta
      compact={compact}
      title={
        company.telegramUrl
          ? "ЖУРНАЛ ВОЙ\nВ TELEGRAM"
          : "ЛЁД ВОЙ\nДЛЯ ВАШЕГО ЗАВЕДЕНИЯ"
      }
      href={company.telegramUrl ?? "/contacts#inquiry"}
      action={company.telegramUrl ? "Перейти в Telegram" : "Обсудить поставки"}
    />
  );
}
