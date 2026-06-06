import React, { useState } from 'react';

const contactData = {
  fr: {
    tagline: "Nous Contacter",
    title: "Prêt à Prendre <br><span class=\"gold-gradient-text\">La Route ?</span>",
    desc: "Vous avez une demande particulière, un événement spécial ou souhaitez louer un véhicule sur une longue durée ? Envoyez-nous un message.",
    phoneLabel: "Téléphone / WhatsApp",
    emailLabel: "Adresse Email",
    officeLabel: "Siège Social",
    officeValue: "Angle Boulevard Zerktouni & Massira, Casablanca, Maroc",
    formTitle: "Envoyez-nous un message",
    namePlaceholder: "Votre nom...",
    emailPlaceholder: "Votre e-mail...",
    subjectPlaceholder: "De quoi s'agit-il ?",
    messagePlaceholder: "Votre message détaillé...",
    submitBtn: "Envoyer le Message",
    sendingBtn: "Envoi en cours...",
    successAlert: "Votre message a été envoyé avec succès ! Nous vous recontacterons sous 2 heures.",
    nameLabel: "Nom complet",
    mailLabel: "Adresse e-mail",
    subjectLabel: "Sujet",
    messageLabel: "Votre message"
  },
  ar: {
    tagline: "اتصل بنا",
    title: "جاهز <br><span class=\"gold-gradient-text\">للانطلاق؟</span>",
    desc: "هل لديك طلب خاص، مناسبة مميزة أو ترغب في استئجار سيارة لفترة طويلة؟ أرسل لنا رسالة وسنجيبك في أقرب وقت.",
    phoneLabel: "الهاتف / واتساب",
    emailLabel: "البريد الإلكتروني",
    officeLabel: "المقر الرئيسي",
    officeValue: "ملتقى شارع الزرقطوني والمسيرة، الدار البيضاء، المغرب",
    formTitle: "أرسل لنا رسالة",
    namePlaceholder: "اسمك الكامل...",
    emailPlaceholder: "بريدك الإلكتروني...",
    subjectPlaceholder: "ما هو موضوع الرسالة؟",
    messagePlaceholder: "اكتب رسالتك بالتفصيل هنا...",
    submitBtn: "إرسال الرسالة",
    sendingBtn: "جاري الإرسال...",
    successAlert: "تم إرسال رسالتك بنجاح! سنتصل بك في غضون ساعتين.",
    nameLabel: "الاسم الكامل",
    mailLabel: "البريد الإلكتروني",
    subjectLabel: "الموضوع",
    messageLabel: "رسالتك"
  }
};

export default function Contact({ language }) {
  const content = contactData[language] || contactData.fr;

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setShowSuccess(false);

    // Simulate form submission delay
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      // Reset form fields
      setName('');
      setSubject('');
      setMessage('');

      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 6000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <div className="contact-info-card reveal">
          <span className="section-tagline">{content.tagline}</span>
          <h2 
            className="contact-card-title"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
          <p className="contact-card-desc">{content.desc}</p>
          
          <div className="info-list">
            <div className="info-item">
              <i className="fa-solid fa-phone info-icon"></i>
              <div>
                <h4>{content.phoneLabel}</h4>
                <p>
                  <a href="tel:+212632230098" className="hover-gold">+212 6 32 23 00 98</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-envelope info-icon"></i>
              <div>
                <h4>{content.emailLabel}</h4>
                <p>
                  <a href="mailto:contact@anasrentcar.com" className="hover-gold">contact@anasrentcar.com</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-location-dot info-icon"></i>
              <div>
                <h4>{content.officeLabel}</h4>
                <p>{content.officeValue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card reveal delay-2">
          <h3 className="form-title">{content.formTitle}</h3>
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">{content.nameLabel}</label>
              <input 
                type="text" 
                id="contact-name" 
                placeholder={content.namePlaceholder} 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">{content.subjectLabel}</label>
              <input 
                type="text" 
                id="contact-subject" 
                placeholder={content.subjectPlaceholder} 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">{content.messageLabel}</label>
              <textarea 
                id="contact-message" 
                rows="5" 
                placeholder={content.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-gold w-full text-center" disabled={isSending}>
              {isSending ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> {content.sendingBtn}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> {content.submitBtn}
                </>
              )}
            </button>
          </form>
          
          <div className={`alert alert-success ${showSuccess ? '' : 'hide'}`} id="contact-success" style={{ marginTop: '20px' }}>
            <i className="fa-solid fa-circle-check"></i> {content.successAlert}
          </div>
        </div>
      </div>
    </section>
  );
}
