import faqStyles from "./faq.module.css";

export function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className={faqStyles.faq}>
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
