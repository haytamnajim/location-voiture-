import React from 'react';

const testimonialsData = {
  fr: {
    tagline: "Avis de nos clients",
    title: "Ce Qu'ils En <span class=\"gold-gradient-text\">Pensent</span>",
    description: "Découvrez les retours d'expérience de nos clients VIP et passionnés d'automobile.",
    items: [
      {
        rating: 5,
        text: "\"Une expérience hors du commun. J'ai loué la Porsche 911 pour mon mariage à Marrakech. Le véhicule était dans un état clinique et la livraison directement à mon hôtel a été d'une fluidité exemplaire. Je recommande ANAS RENT CAR à 100% !\"",
        authorName: "Karim B.",
        authorRole: "Client Entrepreneur"
      },
      {
        rating: 5,
        text: "\"Professionnalisme, ponctualité et discrétion. Le Range Rover Autobiography que j'ai loué à Casablanca était impeccable. Le service de conciergerie 24/7 m'a énormément aidé pour adapter mon itinéraire au dernier moment.\"",
        authorName: "Sarah M.",
        authorRole: "Dirigeante d'Entreprise"
      },
      {
        rating: 5,
        text: "\"Toujours un plaisir de passer par ANAS RENT CAR lors de mes déplacements professionnels au Maroc. La transition vers les véhicules électriques de luxe (Audi e-tron) est fantastique, très silencieux et performant.\"",
        authorName: "Jean-Pierre D.",
        authorRole: "Client Régulier"
      }
    ]
  },
  ar: {
    tagline: "آراء عملائنا",
    title: "ماذا <span class=\"gold-gradient-text\">يقولون</span> عنا",
    description: "اكتشف تجارب وآراء عملائنا الكرام وعشاق السيارات الفاخرة.",
    items: [
      {
        rating: 5,
        text: "\"تجربة استثنائية بكل المقاييس. قمت باستئجار بورش 911 لحفل زفافي في مراكش. كانت السيارة في حالة ممتازة وكان التوصيل مباشرة إلى فندقي سلساً للغاية. أوصي بـ أناس لتأجير السيارات بشدة!\"",
        authorName: "كريم ب.",
        authorRole: "مقاول"
      },
      {
        rating: 5,
        text: "\"احترافية، دقة في المواعيد وسرية تامة. سيارة رينج روفر التي استأجرتها في الدار البيضاء كانت رائعة وخالية من العيوب. ساعدتني خدمة الكونسيرج المتاحة على مدار الساعة كثيراً لتعديل مساري في آخر لحظة.\"",
        authorName: "سارة م.",
        authorRole: "مديرة شركة"
      },
      {
        rating: 5,
        text: "\"يسعدني دائماً التعامل مع أناس لتأجير السيارات خلال رحلات عملي في المغرب. الانتقال إلى السيارات الكهربائية الفاخرة رائع للغاية، وتوفر هدوءاً وأداءً متميزين.\"",
        authorName: "جون بيير د.",
        authorRole: "زبون دائم"
      }
    ]
  }
};

export default function Testimonials({ language }) {
  const content = testimonialsData[language] || testimonialsData.fr;

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tagline">{content.tagline}</span>
          <h2 
            className="section-title"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
          <p className="section-description">{content.description}</p>
        </div>

        <div className="testimonials-grid">
          {content.items.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(item.rating)].map((_, starIdx) => (
                  <i key={starIdx} className="fa-solid fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <span className="author-name">{item.authorName}</span>
                  <span className="author-role">{item.authorRole}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
