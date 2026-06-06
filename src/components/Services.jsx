import React from 'react';

const serviceData = {
  fr: {
    tagline: "Pourquoi ANAS RENT CAR ?",
    title: "Une Expérience de Location <span class=\"gold-gradient-text\">Inégalée</span>",
    description: "Nous redéfinissons les standards du voyage avec un service attentionné et personnalisé.",
    items: [
      {
        icon: "fa-gem",
        title: "Flotte Premium Exclusive",
        desc: "Des véhicules de dernière génération, parfaitement entretenus, révisés et dotés d'options haut de gamme."
      },
      {
        icon: "fa-headset",
        title: "Assistance VIP 24h/7j",
        desc: "Notre équipe dédiée est à votre disposition jour et nuit pour répondre à toutes vos demandes et imprévus."
      },
      {
        icon: "fa-shield-halved",
        title: "Transparence Totale",
        desc: "Aucun frais caché ni mauvaise surprise. Les prix indiqués incluent l'assurance de base et le kilométrage adapté."
      },
      {
        icon: "fa-truck-ramp-box",
        title: "Livraison sur Mesure",
        desc: "Nous vous livrons votre véhicule directement à l'aéroport, à votre hôtel ou à votre domicile, selon vos convenances."
      }
    ]
  },
  ar: {
    tagline: "لماذا أناس لتأجير السيارات ؟",
    title: "تجربة كراء <span class=\"gold-gradient-text\">لا مثيل لها</span>",
    description: "نعيد تعريف معايير السفر من خلال تقديم خدمات مخصصة واحترافية تلبي جميع تطلعاتكم.",
    items: [
      {
        icon: "fa-gem",
        title: "أسطول حصري ومميز",
        desc: "سيارات من أحدث طراز، خاضعة لصيانة مستمرة وفحص شامل ومجهزة بكافة وسائل الراحة الفاخرة."
      },
      {
        icon: "fa-headset",
        title: "دعم ومساعدة VIP على مدار الساعة",
        desc: "فريقنا المتخصص رهن إشارتكم ليلاً ونهاراً للرد على جميع استفساراتكم والتعامل مع الطوارئ."
      },
      {
        icon: "fa-shield-halved",
        title: "شفافية مطلقة",
        desc: "بدون مصاريف خفية أو مفاجآت غير سارة. الأسعار المعروضة تشمل التأمين الأساسي والمسافة المناسبة."
      },
      {
        icon: "fa-truck-ramp-box",
        title: "توصيل مخصص حسب الطلب",
        desc: "نوفر لكم خدمة توصيل السيارة مباشرة إلى المطار، الفندق، أو مقر إقامتكم بما يتناسب مع رغباتكم."
      }
    ]
  }
};

export default function Services({ language }) {
  const content = serviceData[language] || serviceData.fr;

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tagline">{content.tagline}</span>
          <h2 
            className="section-title"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
          <p className="section-description">{content.description}</p>
        </div>

        <div className="services-grid">
          {content.items.map((item, idx) => (
            <div key={idx} className={`service-card reveal delay-${idx + 1}`}>
              <div className="service-icon">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
