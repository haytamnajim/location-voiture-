import React from 'react';

export default function SuccessModal({ isOpen, onClose, details, language }) {
  if (!isOpen || !details) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="success-modal-overlay open" id="success-modal" onClick={(e) => e.target.id === 'success-modal' && handleClose()}>
      <div className="success-card">
        <div className="success-icon-container">
          <i className="fa-solid fa-crown gold-color"></i>
        </div>
        <h2 className="success-title">
          {language === 'ar' ? 'تم تسجيل الحجز بنجاح!' : 'Réservation Enregistrée !'}
        </h2>
        <p className="success-desc">
          {language === 'ar' 
            ? 'تهانينا، تم قبول طلب الحجز الخاص بك بنجاح.' 
            : 'Félicitations, votre demande a été prise en compte avec succès.'}
        </p>
        
        <div className="success-details-box">
          <div className="success-row">
            <span>{language === 'ar' ? 'الزبون :' : 'Client :'}</span>
            <strong id="success-client-name">{details.clientName}</strong>
          </div>
          <div className="success-row">
            <span>{language === 'ar' ? 'السيارة :' : 'Véhicule :'}</span>
            <strong id="success-car-name">{details.carName}</strong>
          </div>
          <div className="success-row">
            <span>{language === 'ar' ? 'المدة :' : 'Durée :'}</span>
            <strong id="success-duration">{details.duration}</strong>
          </div>
          <div className="success-row">
            <span>{language === 'ar' ? 'المجموع التقديري :' : 'Total Estimé :'}</span>
            <strong id="success-total-price" className="gold-color">{details.totalPrice}</strong>
          </div>
          <div className="success-row">
            <span>{language === 'ar' ? 'الحالة :' : 'Statut :'}</span>
            <span className="badge badge-success">
              {language === 'ar' ? 'في انتظار التأكيد VIP' : 'En attente de validation VIP'}
            </span>
          </div>
        </div>
        
        <p className="success-notice">
          <i className="fa-brands fa-whatsapp gold-color"></i>{' '}
          {language === 'ar' 
            ? 'سيتواصل معك أحد وكلائنا لتأكيد تفاصيل التوصيل خلال الـ 15 دقيقة القادمة عبر واتساب.' 
            : 'Un agent de conciergerie ANAS RENT CAR va vous contacter sur WhatsApp dans les 15 prochaines minutes pour confirmer les détails de la livraison.'}
        </p>
        
        <button className="btn btn-gold btn-close-success" id="close-success-btn" onClick={handleClose}>
          {language === 'ar' ? 'العودة للرئيسية' : "Retour à l'accueil"}
        </button>
      </div>
    </div>
  );
}
