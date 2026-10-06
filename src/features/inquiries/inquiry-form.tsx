"use client";

import { useState, type FormEvent } from "react";
import styles from "./inquiry-form.module.css";

export function InquiryForm() {
  const [preview, setPreview] = useState<string | null>(null);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "ЗАЯВКА ВОЙ — ЧЕРНОВИК",
      "Тема: " + data.get("topic"),
      "Имя: " + data.get("name"),
      "Email: " + data.get("contact"),
      "Проект: " + (data.get("company") || "Не указан"),
      "Вид и форма льда: " + data.get("shape"),
      "",
      String(data.get("message")),
    ];
    setPreview(lines.join("\n"));
  }

  function download() {
    if (!preview) return;
    const url = URL.createObjectURL(
      new Blob([preview], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "вой-заявка.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <form
      className={styles.form}
      onSubmit={prepare}
      onChange={() => setPreview(null)}
    >
      <fieldset className={styles.topics}>
        <legend>Что обсудим?</legend>
        {["Поставки", "Партнёрство", "Мероприятие"].map((topic, index) => (
          <label key={topic}>
            <input
              type="radio"
              name="topic"
              value={topic}
              defaultChecked={index === 0}
            />
            <span>{topic}</span>
          </label>
        ))}
      </fieldset>
      <div className={styles.fields}>
        <label>
          Ваше имя <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Как к вам обращаться"
          />
        </label>
        <label>
          Email <span>*</span>
          <input
            name="contact"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="Для обратной связи"
          />
        </label>
        <label>
          Компания или проект
          <input
            name="company"
            autoComplete="organization"
            maxLength={150}
            placeholder="Название заведения"
          />
        </label>
        <label>
          Вид и форма льда
          <select name="shape" defaultValue="Подберём вместе">
            <option>Подберём вместе</option>
            <option>Формованный лёд — подберём форму</option>
            <option>Рассыпной лёд</option>
            <option>Блочный лёд</option>
            <option>Куб</option>
            <option>Сфера</option>
            <option>Цилиндр</option>
          </select>
        </label>
      </div>
      <label className={styles.message}>
        Несколько слов о задаче <span>*</span>
        <textarea
          name="message"
          rows={3}
          required
          maxLength={2000}
          placeholder="Город, формат, предполагаемый объём или дата события…"
        />
      </label>
      <div className={styles.submitRow}>
        <button type="submit">Подготовить заявку</button>
        <p>
          Прототип формы.
          <br />
          Данные пока не отправляются.
        </p>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {preview && (
          <div className={styles.preview}>
            <span>ЧЕРНОВИК ГОТОВ</span>
            <h3>Ваша заявка подготовлена.</h3>
            <p>
              Она ещё не отправлена. Сохраните текст, чтобы вернуться к нему
              позже.
            </p>
            <pre>{preview}</pre>
            <button type="button" onClick={download}>
              Скачать черновик ↓
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
