import React from 'react';

const statsData = {
  fr: [
    { number: "50+", label: "Véhicules de luxe" },
    { number: "10k+", label: "Clients Satisfaits" },
    { number: "5★", label: "Note Moyenne Google" },
    { number: "24h", label: "Livraison Express" }
  ],
  ar: [
    { number: "+50", label: "سيارة فاخرة" },
    { number: "+10k", label: "زبون راضٍ" },
    { number: "★5", label: "متوسط تقييم جوجل" },
    { number: "24س", label: "توصيل سريع" }
  ]
};

export default function Stats({ language }) {
  const list = statsData[language] || statsData.fr;

  return (
    <section className="stats-section">
      <div className="container stats-container">
        {list.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
