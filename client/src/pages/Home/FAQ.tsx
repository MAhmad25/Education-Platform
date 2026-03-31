// FAQ.tsx
import SectionHeader from './SectionHeader';
import FAQItem from './FAQItem';
import { FAQ_ITEMS } from './homeData';

export default function FAQ() {
  return (
    <section className="px-[5vw] pt-[6vw]">
      <SectionHeader
        tag="FAQ"
        title="Honest answers to <em style='color:var(--color-red);font-style:italic'>real questions.</em>"
      />
      <div className="border-t-2 border-ink">
        {FAQ_ITEMS.map(item => <FAQItem key={item.id} item={item} />)}
      </div>
    </section>
  );
}
