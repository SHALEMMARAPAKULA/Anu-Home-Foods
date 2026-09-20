import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, Check, Flame, ArrowRight, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const FloatingWidgets = () => {
  // Tooltip hover states
  const [quizHover, setQuizHover] = useState(false);
  const [waHover, setWaHover] = useState(false);

  // WhatsApp Popup State
  const [waOpen, setWaOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: 'Namaste! 🙏 Welcome to ANU HOME FOODS.', sender: 'bot', time: 'Just now' },
    { text: 'How can we help you select the perfect Andhra homemade pickle today?', sender: 'bot', time: 'Just now' }
  ]);

  // Taste Quiz Modal State
  const [quizOpen, setQuizOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [prefType, setPrefType] = useState('veg');
  const [spiceLevel, setSpiceLevel] = useState('spicy');
  const [recommendation, setRecommendation] = useState(null);

  const { addToCart } = useCart();

  // WhatsApp quick response handlers
  const handleQuickQuestion = (qText, botReply) => {
    setChatMessages(prev => [
      ...prev,
      { text: qText, sender: 'user', time: 'Just now' },
      { text: botReply, sender: 'bot', time: 'Just now' }
    ]);
  };

  // Taste Quiz recommendation generator
  const generateRecommendation = () => {
    let result = PRODUCTS.find(p => p.id === 'andhra-mango-pickle');

    if (prefType === 'non-veg') {
      result = PRODUCTS.find(p => p.id === 'boneless-chicken-pickle') || PRODUCTS[3];
    } else if (spiceLevel === 'extra-spicy') {
      result = PRODUCTS.find(p => p.id === 'andhra-red-chilli-pickle') || PRODUCTS[5];
    } else if (spiceLevel === 'mild') {
      result = PRODUCTS.find(p => p.id === 'tangy-lemon-pickle') || PRODUCTS[4];
    } else {
      result = PRODUCTS.find(p => p.id === 'authentic-gongura-pickle') || PRODUCTS[1];
    }

    setRecommendation(result);
    setStep(3);
  };

  return (
    <>
      {/* Floating Circular Action Trigger Buttons Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        alignItems: 'flex-end'
      }}>
        {/* Taste Quiz Bot Circular Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tooltip Title Pill (Reveals on Hover) */}
          {quizHover && (
            <div style={{
              background: 'var(--dark-brown)',
              color: 'var(--mustard-gold)',
              padding: '6px 14px',
              borderRadius: 'var(--border-radius-pill)',
              fontWeight: 800,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--mustard-gold)',
              whiteSpace: 'nowrap',
              animation: 'fade-slide-left 0.2s ease'
            }}>
              Taste Quiz Bot 🎯
            </div>
          )}

          <button
            onClick={() => { setQuizOpen(!quizOpen); setWaOpen(false); }}
            onMouseEnter={() => setQuizHover(true)}
            onMouseLeave={() => setQuizHover(false)}
            title="Taste Quiz Bot - Find Your Pickle Match"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--mustard-gold)',
              color: 'var(--dark-brown)',
              border: '2px solid var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              transition: 'transform 0.25s ease'
            }}
          >
            <Sparkles size={24} color="var(--chili-red)" />
          </button>
        </div>

        {/* WhatsApp Bot Circular Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tooltip Title Pill (Reveals on Hover) */}
          {waHover && (
            <div style={{
              background: '#075E54',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: 'var(--border-radius-pill)',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              whiteSpace: 'nowrap',
              animation: 'fade-slide-left 0.2s ease'
            }}>
              WhatsApp Support 🟢
            </div>
          )}

          <button
            onClick={() => { setWaOpen(!waOpen); setQuizOpen(false); }}
            onMouseEnter={() => setWaHover(true)}
            onMouseLeave={() => setWaHover(false)}
            title="WhatsApp Live Support Bot"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: '#fff',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {waOpen ? <X size={26} /> : <MessageCircle size={26} />}
            {!waOpen && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#00FF66',
                border: '2px solid #fff'
              }} />
            )}
          </button>
        </div>
      </div>

      {/* WHATSAPP CHAT BOT POPUP */}
      {waOpen && (
        <div style={{
          position: 'fixed',
          bottom: '92px',
          right: '24px',
          width: '350px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: '500px',
          background: 'var(--white)',
          borderRadius: 'var(--border-radius-lg)',
          border: '2px solid var(--mustard-gold)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'popup-slide 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
            color: '#fff',
            padding: '16px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: '#075E54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                AHF
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>ANU FOODS Support</h4>
                <span style={{ fontSize: '0.75rem', color: '#b9f6ca', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FF66', display: 'inline-block' }} /> Online | Instant Support
                </span>
              </div>
            </div>
            <button onClick={() => setWaOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ padding: '16px', background: '#e5ddd5', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#dcf8c6' : '#ffffff',
                  color: '#111',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts Chips */}
          <div style={{ padding: '10px 14px', background: '#f0f0f0', borderTop: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Quick Questions:</span>
            <button
              onClick={() => handleQuickQuestion('Which pickle is most spicy?', 'Our Andhra Red Chilli (Pandu Mirchi) and Spicy Garlic Pickles are extra fiery!')}
              style={{ textAlign: 'left', background: '#fff', border: '1px solid #ccc', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Flame size={14} color="var(--chili-red)" /> Which pickle is most spicy?
            </button>
            <button
              onClick={() => handleQuickQuestion('Do you have Non-Veg pickles?', 'Yes! We have Boneless Chicken Pickle (₹549) and Coastal Fish Pickle (₹599) freshly cooked to order!')}
              style={{ textAlign: 'left', background: '#fff', border: '1px solid #ccc', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ShoppingBag size={14} color="var(--mustard-gold)" /> Do you sell Non-Veg pickles?
            </button>
          </div>

          {/* Direct WhatsApp Redirect */}
          <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <a
              href="https://wa.me/919876543210?text=Hi%20ANU%20HOME%20FOODS,%20I%20want%20to%20order%20homemade%20pickles!"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                padding: '10px',
                borderRadius: 'var(--border-radius-pill)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              <MessageCircle size={18} /> Chat Directly on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* TASTE QUIZ BOT MODAL POPUP */}
      {quizOpen && (
        <div style={{
          position: 'fixed',
          bottom: '92px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          background: 'var(--white)',
          borderRadius: 'var(--border-radius-lg)',
          border: '2px solid var(--chili-red)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.35)',
          zIndex: 9999,
          overflow: 'hidden',
          animation: 'popup-slide 0.3s ease'
        }}>
          {/* Quiz Header */}
          <div style={{
            background: 'var(--chili-red)',
            color: '#fff',
            padding: '16px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--mustard-gold)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>Pickle Taste Assistant</h3>
            </div>
            <button onClick={() => setQuizOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Quiz Content Body */}
          <div style={{ padding: '20px' }}>
            {step === 1 && (
              <div>
                <h4 style={{ color: 'var(--dark-brown)', marginBottom: '14px', fontSize: '1rem' }}>
                  1. What pickle type do you prefer?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setPrefType('veg')}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: prefType === 'veg' ? '2px solid var(--chili-red)' : '1px solid var(--border-color)',
                      background: prefType === 'veg' ? 'rgba(184, 24, 32, 0.08)' : 'var(--cream)',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    Vegetarian Pickles (Mango, Gongura, Garlic)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrefType('non-veg')}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: prefType === 'non-veg' ? '2px solid var(--chili-red)' : '1px solid var(--border-color)',
                      background: prefType === 'non-veg' ? 'rgba(184, 24, 32, 0.08)' : 'var(--cream)',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    Non-Vegetarian Pickles (Chicken, Fish)
                  </button>
                </div>

                <button
                  className="btn-primary-gradient"
                  style={{ width: '100%', padding: '10px', justifyContent: 'center' }}
                  onClick={() => setStep(2)}
                >
                  Next Question <ArrowRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 style={{ color: 'var(--dark-brown)', marginBottom: '14px', fontSize: '1rem' }}>
                  2. Select your spice tolerance level:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setSpiceLevel('mild')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: spiceLevel === 'mild' ? '2px solid var(--mustard-gold)' : '1px solid var(--border-color)',
                      background: spiceLevel === 'mild' ? 'var(--cream)' : '#fff',
                      textAlign: 'left',
                      fontWeight: 600
                    }}
                  >
                    Tangy & Balanced Mild
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpiceLevel('spicy')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: spiceLevel === 'spicy' ? '2px solid var(--mustard-gold)' : '1px solid var(--border-color)',
                      background: spiceLevel === 'spicy' ? 'var(--cream)' : '#fff',
                      textAlign: 'left',
                      fontWeight: 600
                    }}
                  >
                    Traditional Andhra Hot
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpiceLevel('extra-spicy')}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: spiceLevel === 'extra-spicy' ? '2px solid var(--mustard-gold)' : '1px solid var(--border-color)',
                      background: spiceLevel === 'extra-spicy' ? 'var(--cream)' : '#fff',
                      textAlign: 'left',
                      fontWeight: 600
                    }}
                  >
                    Extra Fiery Pandu Mirchi Special
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStep(1)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }}>
                    Back
                  </button>
                  <button
                    className="btn-primary-gradient"
                    style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                    onClick={generateRecommendation}
                  >
                    Find My Match ✨
                  </button>
                </div>
              </div>
            )}

            {step === 3 && recommendation && (
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--mustard-gold)', color: 'var(--dark-brown)', padding: '3px 12px', borderRadius: '20px', fontWeight: 800 }}>
                  RECOMMENDED MATCH
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark-brown)', margin: '12px 0 6px 0', fontSize: '1.2rem' }}>
                  {recommendation.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#665a4e', marginBottom: '14px' }}>
                  {recommendation.shortDescription}
                </p>

                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--chili-red)', marginBottom: '16px' }}>
                  ₹{recommendation.price} <span style={{ fontSize: '0.85rem', color: '#888' }}>(500g Pack)</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn-primary-gradient"
                    style={{ flex: 1, padding: '10px', fontSize: '0.88rem', justifyContent: 'center' }}
                    onClick={() => {
                      addToCart(recommendation, '500g', 1);
                      setQuizOpen(false);
                    }}
                  >
                    <ShoppingBag size={15} /> Add to Cart
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    style={{ background: 'var(--cream)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '6px' }}
                    title="Retake Quiz"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes popup-slide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-slide-left {
          from { transform: translateX(10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default FloatingWidgets;
