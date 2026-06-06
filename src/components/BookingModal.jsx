import React, { useState, useEffect } from 'react';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  car, 
  language, 
  initialSearchValues, 
  onBookingSuccess 
}) {
  const [pickupLocation, setPickupLocation] = useState('casablanca');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [daysCount, setDaysCount] = useState(3);
  

  // Driver details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Set limits
  const todayStr = new Date().toISOString().split("T")[0];
  const [returnMinDate, setReturnMinDate] = useState('');

  // Sync with initialSearchValues when modal opens or search values change
  useEffect(() => {
    if (isOpen) {
      if (initialSearchValues.pickupLocation) {
        setPickupLocation(initialSearchValues.pickupLocation);
      }
      if (initialSearchValues.pickupDate) {
        setPickupDate(initialSearchValues.pickupDate);
        const start = new Date(initialSearchValues.pickupDate);
        const endMin = new Date(start);
        endMin.setDate(endMin.getDate() + 1);
        setReturnMinDate(endMin.toISOString().split("T")[0]);
      } else {
        setPickupDate(todayStr);
        const start = new Date();
        const endMin = new Date(start);
        endMin.setDate(endMin.getDate() + 1);
        setReturnMinDate(endMin.toISOString().split("T")[0]);
      }

      if (initialSearchValues.returnDate) {
        setReturnDate(initialSearchValues.returnDate);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setReturnDate(tomorrow.toISOString().split("T")[0]);
      }
    }
  }, [isOpen, initialSearchValues]);

  // Recalculate days count whenever dates change
  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      if (end > start) {
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setDaysCount(diffDays);
      } else {
        setDaysCount(1);
      }
    }
  }, [pickupDate, returnDate]);

  if (!isOpen || !car) return null;

  // Category names mapping
  let categoryName = "";
  if (language === 'ar') {
    switch (car.category) {
      case "peugeot": categoryName = "بيجو سيتي"; break;
      case "renault": categoryName = "رينو سيتي"; break;
      case "dacia": categoryName = "داسيا اقتصادية"; break;
      default: categoryName = car.category;
    }
  } else {
    switch (car.category) {
      case "peugeot": categoryName = "Peugeot Citadine"; break;
      case "renault": categoryName = "Renault Citadine"; break;
      case "dacia": categoryName = "Dacia Économique"; break;
      default: categoryName = car.category;
    }
  }

  const basePricePerDay = car.price;
  const baseCost = basePricePerDay * daysCount;
  const grandTotal = baseCost;

  const formatPrice = (val) => val.toLocaleString("fr-FR");

  // Handle pickup date change inside modal
  const handlePickupDateChange = (e) => {
    const dateVal = e.target.value;
    setPickupDate(dateVal);

    const start = new Date(dateVal);
    const endMin = new Date(start);
    endMin.setDate(endMin.getDate() + 1);

    const endMinStr = endMin.toISOString().split("T")[0];
    setReturnMinDate(endMinStr);

    if (new Date(returnDate) <= start) {
      setReturnDate(endMinStr);
    }
  };

  // Handle manual changes to days count
  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value) || 1;
    setDaysCount(days);
    if (pickupDate) {
      const start = new Date(pickupDate);
      const end = new Date(start);
      end.setDate(end.getDate() + days);
      setReturnDate(end.toISOString().split("T")[0]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format pickup location for display
    let formattedLoc = pickupLocation.charAt(0).toUpperCase() + pickupLocation.slice(1);
    if (language === "ar") {
      const locMap = {
        casablanca: "الدار البيضاء",
        marrakech: "مراكش",
        rabat: "الرباط",
        tanger: "طنجة",
        agadir: "أكادير"
      };
      formattedLoc = locMap[pickupLocation] || formattedLoc;
    }

    const totalEstimateStr = `${formatPrice(grandTotal)} DH`;
    const durationText = `${daysCount} ${daysCount > 1 ? (language === 'ar' ? 'أيام' : 'Jours') : (language === 'ar' ? 'يوم' : 'Jour')}`;

    // Generate WhatsApp text
    let message = "";
    if (language === "ar") {
      message = `مرحباً أناس لتأجير السيارات،\n\n` +
                `أرغب في حجز السيارة التالية:\n` +
                `🚗 السيارة: ${car.name}\n` +
                `👤 السائق: ${clientName}\n` +
                `📞 الهاتف: ${clientPhone}\n` +
                `📍 مكان الاستلام: ${formattedLoc}\n` +
                `📅 الفترة: من ${pickupDate} إلى ${returnDate} (${daysCount} ${daysCount > 1 ? 'أيام' : 'يوم'})\n` +
                `💵 المجموع التقديري: ${totalEstimateStr}\n\n` +
                `يرجى تأكيد الحجز الخاص بي. شكراً لكم!`;
    } else {
      message = `Bonjour ANAS RENT CAR,\n\n` +
                `Je souhaite effectuer une réservation pour le véhicule suivant :\n` +
                `🚗 Véhicule : ${car.name}\n` +
                `👤 Conducteur : ${clientName}\n` +
                `📞 Téléphone : ${clientPhone}\n` +
                `📍 Lieu : ${formattedLoc}\n` +
                `📅 Période : du ${pickupDate} au ${returnDate} (${daysCount} ${daysCount > 1 ? 'jours' : 'jour'})\n` +
                `💵 Total estimé : ${totalEstimateStr}\n\n` +
                `Merci de confirmer ma réservation VIP.`;
    }

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/212632230098?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Callback to trigger Success Modal
    onBookingSuccess({
      clientName,
      carName: car.name,
      duration: durationText,
      totalPrice: totalEstimateStr
    });

    // Reset form states
    setClientName('');
    setClientPhone('');
    handleClose();
  };

  return (
    <div className="booking-modal-overlay open" id="booking-modal" onClick={(e) => e.target.id === 'booking-modal' && handleClose()}>
      <div className="booking-modal-card">
        <button className="modal-close" onClick={handleClose} aria-label="Fermer le modal">&times;</button>
        
        <div className="modal-grid">
          {/* Selected Car Preview */}
          <div className="modal-car-preview">
            <span className="modal-badge gold-bg">
              {language === 'ar' ? 'السيارة المختارة' : 'Véhicule Sélectionné'}
            </span>
            <h3 className="modal-car-name" id="modal-car-name">{car.name}</h3>
            <div className="modal-car-category" id="modal-car-category">{categoryName}</div>
            
            <div className="modal-img-container">
              <img id="modal-car-img" src={car.image} alt={car.name} />
            </div>

            <div className="modal-specs-grid">
              <div className="modal-spec-item">
                <i className="fa-solid fa-gauge-high"></i>
                <span id="modal-spec-engine">{car.specs.engine}</span>
              </div>
              <div className="modal-spec-item">
                <i className="fa-solid fa-gears"></i>
                <span id="modal-spec-trans">{car.specs.transmission}</span>
              </div>
              <div className="modal-spec-item">
                <i className="fa-solid fa-gas-pump"></i>
                <span id="modal-spec-fuel">{car.specs.fuel}</span>
              </div>
              <div className="modal-spec-item">
                <i className="fa-solid fa-users"></i>
                <span id="modal-spec-seats">{car.specs.seats}</span>
              </div>
            </div>

            <div className="modal-pricing-box">
              <span className="pricing-label">{language === 'ar' ? 'السعر اليومي' : 'Tarif journalier'}</span>
              <div className="pricing-value">
                <span id="modal-day-price">{car.price}</span> 
                <span className="currency"> {language === 'ar' ? 'درهم / يوم' : 'DH / jour'}</span>
              </div>
            </div>
          </div>

          {/* Booking Process Form */}
          <div className="modal-booking-form">
            <h3 className="modal-title">
              <i className="fa-solid fa-file-invoice-dollar gold-color"></i> {language === 'ar' ? 'تفاصيل الحجز الخاص بك' : 'Détails de votre réservation'}
            </h3>
            
            <form id="booking-form" onSubmit={handleSubmit}>
              {/* Dates & Agency */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="book-pickup-location">{language === 'ar' ? 'مكان الاستلام' : 'Lieu de prise en charge'}</label>
                  <select 
                    id="book-pickup-location" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                  >
                    <option value="casablanca">Casablanca</option>
                    <option value="marrakech">Marrakech</option>
                    <option value="rabat">Rabat</option>
                    <option value="tanger">Tanger</option>
                    <option value="agadir">Agadir</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="book-days">{language === 'ar' ? 'عدد الأيام' : 'Nombre de jours'}</label>
                  <input 
                    type="number" 
                    id="book-days" 
                    min="1" 
                    max="90" 
                    value={daysCount}
                    onChange={handleDaysChange}
                    required
                  />
                </div>
              </div>

              {/* Date inputs */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="book-start-date">{language === 'ar' ? 'تاريخ الاستلام' : 'Date de départ'}</label>
                  <input 
                    type="date" 
                    id="book-start-date" 
                    value={pickupDate}
                    min={todayStr}
                    onChange={handlePickupDateChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="book-end-date">{language === 'ar' ? 'تاريخ الإرجاع' : 'Date de retour'}</label>
                  <input 
                    type="date" 
                    id="book-end-date" 
                    value={returnDate}
                    min={returnMinDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                  />
                </div>
              </div>



              {/* Client Details */}
              <div className="client-details-section">
                <label className="group-label">{language === 'ar' ? 'معلومات السائق' : 'Coordonnées du conducteur'}</label>
                <div className="form-row">
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="client-name" 
                      placeholder={language === 'ar' ? 'الاسم الكامل...' : 'Nom complet...'} 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="tel" 
                      id="client-phone" 
                      placeholder={language === 'ar' ? 'الهاتف / واتساب...' : 'Téléphone / WhatsApp...'} 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Real-time Summary Box */}
              <div className="price-summary-box">
                <div className="summary-line">
                  <span>
                    {language === 'ar' 
                      ? `سعر الحجز الأساسي (${daysCount} يوم)` 
                      : `Tarif de base (${daysCount} ${daysCount > 1 ? 'jours' : 'jour'})`}
                  </span>
                  <span id="summary-base-price">{formatPrice(baseCost)} DH</span>
                </div>

                <div className="summary-line total-line">
                  <span>{language === 'ar' ? 'المجموع الإجمالي التقريبي' : 'Total estimé TTC'}</span>
                  <span id="summary-total-price" className="gold-gradient-text">{formatPrice(grandTotal)} DH</span>
                </div>
              </div>

              <button type="submit" className="btn btn-gold w-full text-center mt-4" id="submit-booking-btn">
                <i className="fa-solid fa-check-double"></i> {language === 'ar' ? 'تأكيد الحجز VIP الخاص بي' : 'Confirmer Ma Réservation VIP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
