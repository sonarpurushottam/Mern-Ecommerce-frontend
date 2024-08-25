import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { question: 'How do I place an order?', answer: 'You can place an order by adding items to your cart and proceeding to checkout.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and Apple Pay.' },
  { question: 'How can I track my order?', answer: 'Once your order is shipped, you will receive an email with tracking details.' },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="text-left max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                onClick={() => toggleFAQ(index)}
                className="text-lg font-semibold cursor-pointer mb-2"
              >
                {faq.question}
              </h3>
              {openIndex === index && <p className="text-gray-700">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
