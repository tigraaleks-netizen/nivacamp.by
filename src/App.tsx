import { useState, FormEvent } from 'react';
import { 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  Wallet, 
  Info, 
  Navigation, 
  Mountain, 
  Tent, 
  Flame, 
  Waves, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X,
  ChevronRight,
  ArrowRight,
  Instagram,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Тарифы', href: '#tariffs' },
    { name: 'Автомобиль', href: '#car' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Условия', href: '#conditions' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-black tracking-tighter text-brand-orange flex items-center gap-2">
              <Mountain className="w-8 h-8" />
              NIVACAMP
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-brand-orange transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                className="bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                ЗАБРОНИРОВАТЬ
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-orange transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium hover:bg-white/5 hover:text-brand-orange transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-orange text-white px-6 py-4 rounded-lg text-lg font-bold mt-4"
              >
                ЗАБРОНИРОВАТЬ
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-brand-orange mx-auto mt-6" />
  </div>
);

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      tariff: formData.get('tariff'),
      comment: formData.get('comment'),
    };

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        const error = await response.json();
        console.error('Submission error:', error);
        alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Сетевая ошибка. Проверьте подключение.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/gallery-1.jpg" 
            alt="Niva Offroad" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
              Арендуйте <span className="text-brand-orange">Niva Legend</span> <br />
              <span className="text-white">Покоряйте бездорожье!</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-medium">
              Никаких инструкторов и полная свобода — всего от <span className="text-brand-orange font-bold">70 BYN/день</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#booking" 
                className="w-full sm:w-auto bg-brand-orange text-white px-10 py-5 rounded-full text-xl font-black hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                АРЕНДОВАТЬ СЕЙЧАС <ArrowRight className="w-6 h-6" />
              </a>
              <a 
                href="#car" 
                className="w-full sm:w-auto border-2 border-white/20 text-white px-10 py-5 rounded-full text-xl font-black hover:bg-white/10 transition-all"
              >
                ПОДРОБНЕЕ
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-orange rounded-full" />
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Тарифы и комплектации" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Asphalt Tariff */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-gray p-10 rounded-3xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Navigation className="w-32 h-32" />
              </div>
              <h3 className="text-3xl font-black uppercase mb-2 tracking-tighter">Асфальт</h3>
              <p className="text-brand-orange font-bold text-lg mb-4">Базовая комплектация</p>
              <p className="text-2xl font-black mb-8 text-white">от 70 BYN</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Компрессор', 'Огнетушитель', 'Домкрат', 'Аптечка', 
                  'Знак аварийной остановки', 'Поперечины на крыше', 'Видеорегистратор'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Offroad Tariff */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-orange p-10 rounded-3xl text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                <Mountain className="w-32 h-32" />
              </div>
              <h3 className="text-3xl font-black uppercase mb-2 tracking-tighter">Бездорожье</h3>
              <p className="text-white/80 font-bold text-lg mb-4">Для настоящих приключений</p>
              <p className="text-2xl font-black mb-8 text-white">250 BYN</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Набор инструментов', 'Фонарик', 'Нож', 'Топор', 'Лопата', 
                  'Трос буксировочный T-PLUS', 'Трос динамический T-PLUS', 
                  'Шакл 2 шт T-PLUS', 'Перчатки', 'Сапоги резиновые', 
                  'Стяжные ремни (2шт)', 'Электропила'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <h3 className="text-3xl font-black uppercase text-center mb-12 tracking-tighter">Дополнительные пакеты</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Tent className="w-8 h-8" />,
                title: 'Палатка на крыше',
                price: 'от 30 BYN',
                items: ['Стол', 'Стулья 2 шт', 'Палатка 2х местная', 'Спальник 2шт', 'Котелок и/или казан']
              },
              {
                icon: <Flame className="w-8 h-8" />,
                title: 'Шашлыки',
                price: '50 BYN',
                items: [
                  'Мангал', 'Шампуры/решетка', 'Дрова/лучина', 'Плед', 'Посуда (4 чел)', 
                  'Вода (питьевая/тех)', 'Специи/масло', 'Газовая плита'
                ]
              },
              {
                icon: <Waves className="w-8 h-8" />,
                title: 'Сапборды',
                price: '20-40 BYN',
                items: ['Сапборд 1-2 шт', 'Насос', 'Рюкзак']
              }
            ].map((pkg, idx) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-gray p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all"
              >
                <div className="bg-brand-orange/10 w-16 h-16 rounded-xl flex items-center justify-center text-brand-orange mb-6">
                  {pkg.icon}
                </div>
                <h4 className="text-xl font-black uppercase mb-2 tracking-tight">{pkg.title}</h4>
                <p className="text-brand-orange font-bold mb-6">{pkg.price}</p>
                <ul className="space-y-2">
                  {pkg.items.map((item) => (
                    <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-orange rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Specs & Benefits */}
      <section id="car" className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading 
            title="Автомобиль" 
            subtitle="Легендарная проходимость в современном исполнении. Идеальный выбор для тех, кто не ищет легких путей."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl rounded-full" />
              <img 
                src="/gallery-1.jpg" 
                alt="Niva Legend 2025" 
                className="rounded-2xl shadow-2xl relative z-10 border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-orange p-8 rounded-2xl z-20 hidden md:block">
                <p className="text-4xl font-black">2025</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Год выпуска</p>
              </div>
            </motion.div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                  <Info className="text-brand-orange" /> Технические характеристики
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Привод', value: 'Полный (4WD)' },
                    { label: 'Клиренс', value: '220 мм' },
                    { label: 'Багажник', value: 'до 630 л' },
                    { label: 'Расход', value: '10–11 л/100 км' },
                    { label: 'Резина', value: 'Грязевая MT' },
                    { label: 'КПП', value: 'Механическая' },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">{spec.label}</p>
                      <p className="text-lg font-bold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-brand-orange" /> Преимущества
                </h3>
                <ul className="space-y-4">
                  {[
                    'Отличная проходимость в любых условиях',
                    'Универсальность — для города, дачи, охоты, рыбалки',
                    'Возможность недорогой аренды на длительные сроки',
                    'Возможность аренды в разных комплектациях',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-gray-300">
                      <div className="mt-1 bg-brand-orange/20 p-1 rounded">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Галерея" subtitle="Наши автомобили в естественной среде обитания." />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '1', '2', '3', '4', '5', '6', '7', '8'
            ].map((num, idx) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden group relative"
              >
                <img 
                  src={`/gallery-${num}.jpg`} 
                  alt={`Niva Gallery ${num}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href="#gallery" className="p-4 bg-brand-orange rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Camera className="w-8 h-8" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section id="conditions" className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Условия аренды" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Navigation className="w-10 h-10" />,
                title: 'Требования',
                items: ['Возраст от 18 лет', 'можно без стажа вождения', 'Права категории B']
              },
              {
                icon: <Wallet className="w-10 h-10" />,
                title: 'Залог',
                items: ['не требуется с 21 года', '300 рублей до 21 года']
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: 'Страховка',
                items: ['автогражданка и КАСКО', 'Включены в стоимость']
              },
              {
                icon: <Car className="w-10 h-10" />,
                title: 'Что включено',
                items: ['Техосмотр', 'Запаска', 'Аптечка']
              }
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-dark p-8 rounded-2xl border border-white/5 hover:border-brand-orange/50 transition-all group"
              >
                <div className="text-brand-orange mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-orange rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Rent */}
      <section id="how-to-rent" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Как арендовать" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или позвоните нам' },
              { step: '02', title: 'Договор', desc: 'Подписываем договор и вносим залог' },
              { step: '03', title: 'Поехали!', desc: 'Забираете Ниву и отправляетесь в путь' }
            ].map((item, idx) => (
              <div key={item.step} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl shadow-brand-orange/20">
                  {item.step}
                </div>
                <h4 className="text-2xl font-black uppercase mb-4 tracking-tight">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form & Contacts */}
      <section id="contacts" className="py-24 bg-brand-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Контакты" />
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <a href="tel:+375333864363" className="bg-brand-orange/10 p-4 rounded-xl text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
                    <Phone className="w-8 h-8" />
                  </a>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-bold mb-1 tracking-widest">Телефон</p>
                    <a href="tel:+375333864363" className="text-2xl font-black hover:text-brand-orange transition-colors">+375 (33) 386-43-63</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-brand-orange/10 p-4 rounded-xl text-brand-orange">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-bold mb-1 tracking-widest">Email</p>
                    <a href="mailto:kvikfiks@gmail.com" className="text-2xl font-black hover:text-brand-orange transition-colors">kvikfiks@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-brand-orange/10 p-4 rounded-xl text-brand-orange">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-bold mb-1 tracking-widest">Адрес</p>
                    <p className="text-2xl font-black">г. Минск, ул. Каменногорская, 45</p>
                  </div>
                </div>

                <div className="pt-8">
                  <p className="text-gray-400 uppercase text-xs font-bold mb-4 tracking-widest">Мы в соцсетях</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://t.me/Alex_Vasilevich" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-brand-dark rounded-2xl border border-white/5 flex items-center justify-center hover:bg-brand-orange transition-all group"
                    >
                      <Send className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    </a>
                    <a 
                      href="https://www.instagram.com/niva_prokat_minsk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-brand-dark rounded-2xl border border-white/5 flex items-center justify-center hover:bg-brand-orange transition-all group"
                    >
                      <Instagram className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-brand-dark rounded-3xl border border-white/5">
                <h4 className="text-xl font-black uppercase mb-4 tracking-tight">Режим работы</h4>
                <p className="text-gray-400">Ежедневно: 09:00 – 21:00</p>
                <p className="text-gray-400">Прием заявок: 24/7</p>
              </div>
            </div>

            <div id="booking" className="bg-brand-dark p-10 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter">Оставить заявку</h3>
              
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-brand-orange/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-orange" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Заявка принята!</h4>
                  <p className="text-gray-400">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-brand-orange font-bold hover:underline"
                  >
                    Отправить еще одну заявку
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Ваше имя</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Иван Иванов"
                        className="w-full bg-brand-gray border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Телефон</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+375 (__) ___-__-__"
                        className="w-full bg-brand-gray border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Выберите тариф</label>
                    <select 
                      name="tariff"
                      className="w-full bg-brand-gray border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors appearance-none"
                    >
                      <option>Асфальт</option>
                      <option>Бездорожье</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Комментарий</label>
                    <textarea 
                      name="comment"
                      rows={4}
                      placeholder="Укажите даты аренды и дополнительные пакеты..."
                      className="w-full bg-brand-gray border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full bg-brand-orange text-white py-5 rounded-xl text-xl font-black hover:bg-orange-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
                  </button>
                  
                  <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-brand-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-2xl font-black tracking-tighter text-brand-orange flex items-center gap-2">
            <Mountain className="w-8 h-8" />
            NIVACAMP
          </div>
          
          <div className="text-gray-500 text-sm font-medium">
            © 2026 NIVACAMP. Все права защищены.
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/niva_prokat_minsk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-orange transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://t.me/Alex_Vasilevich" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-orange transition-colors"
            >
              <Send className="w-6 h-6" />
            </a>
            <a 
              href="tel:+375333864363" 
              className="text-gray-400 hover:text-brand-orange transition-colors"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
