import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bc667d3-491e-4739-a4e7-c40350bcedaf/bucket/3e0abf7e-88af-434e-833e-d8a8ad8e9302.jpeg";

const SERVICES = [
  {
    title: "Пробный урок",
    price: "500 ₽",
    duration: "30 мин",
  },
  {
    title: "1 занятие",
    price: "1 700 ₽",
    duration: "55 мин",
  },
  {
    title: "4 занятия",
    price: "6 000 ₽",
    duration: "55 мин",
  },
  {
    title: "8 занятий",
    price: "10 400 ₽",
    duration: "55 мин",
  },
];


const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const WEEKDAY_TIMES = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const SAT_TIMES = ["14:00", "15:00", "16:00", "17:00", "18:00"];
const TIMES = WEEKDAY_TIMES;

const SLOTS: Record<string, boolean> = {};
["Пн", "Вт", "Ср", "Чт", "Пт"].forEach(day => {
  WEEKDAY_TIMES.forEach(time => { SLOTS[`${day}-${time}`] = true; });
});
SAT_TIMES.forEach(time => { SLOTS[`Сб-${time}`] = true; });

const TG_LINK = "https://t.me/lubovetoyaa";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Расписание", href: "#schedule" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const slots = SLOTS;

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide">Вокальная студия</span>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(n => (
              <button key={n.href} onClick={() => scrollTo(n.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#schedule")}
              className="bg-foreground text-background text-sm px-5 py-2 rounded hover:bg-foreground/80 transition-colors">
              Записаться
            </button>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_ITEMS.map(n => (
              <button key={n.href} onClick={() => scrollTo(n.href)} className="text-left text-sm py-1">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 animate-fade-up opacity-0 delay-100">
            Вокальная школа · Онлайн и офлайн
          </p>
          <h1 className="font-display font-light leading-tight mb-6 animate-fade-up opacity-0 delay-200" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)', textAlign: 'justify', textAlignLast: 'justify' }}>
            <span className="block w-full" style={{ textAlign: 'justify', textAlignLast: 'justify' }}>Ираева</span>
            <span className="block w-full" style={{ textAlign: 'justify', textAlignLast: 'justify' }}>Мария</span>
          </h1>

          {/* Фото под именем (мобильная версия) */}
          <div className="md:hidden w-full rounded overflow-hidden mb-6 animate-fade-up opacity-0 delay-300" style={{ maxHeight: 360 }}>
            <img src={HERO_IMAGE} alt="Ираева Мария" className="w-full h-full object-cover object-top" style={{ maxHeight: 360 }} />
          </div>

          {/* Кнопка под фото (мобильная версия) */}
          <div className="md:hidden mb-8 animate-fade-up opacity-0 delay-400">
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-foreground text-background px-8 py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors rounded">
              Записаться на урок
            </a>
          </div>

          <p className="font-display text-xl md:text-2xl font-light text-muted-foreground mb-4 animate-fade-up opacity-0 delay-300">
            Твой педагог по вокалу
          </p>
          <p className="text-muted-foreground max-w-md leading-relaxed mb-10 animate-fade-up opacity-0 delay-300">
            Индивидуальные уроки вокала для взрослых и детей. Онлайн и офлайн.
          </p>
          <div className="hidden md:flex flex-col sm:flex-row gap-3 animate-fade-up opacity-0 delay-400">
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
              className="bg-foreground text-background px-8 py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors rounded text-center">
              Записаться на урок
            </a>
            <button onClick={() => scrollTo("#services")}
              className="border border-border px-8 py-3 text-sm tracking-wide hover:bg-secondary transition-colors rounded">
              Узнать об услугах
            </button>
          </div>
          <div className="flex gap-10 mt-16 animate-fade-up opacity-0 delay-500">
            {[["+3", "лет опыта"], ["+200", "учеников"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-semibold">{n}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block flex-1 relative overflow-hidden min-h-[400px] md:min-h-0">
          <img src={HERO_IMAGE} alt="Ираева Мария"
            className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/5 to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad px-6 md:px-16 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-light mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>Обо мне</h2>
          <div className="space-y-6">
            {[
              "Меня зовут Мария, я вокалистка и преподаватель эстрадного вокала.",
              "Преподаю вокал по методике EVT.",
              "Прохожу обучения и повышаю уровень своих знаний.",
              "Был опыт выступления на телевидении.",
            ].map((text, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="font-display text-4xl font-light text-muted-foreground/40 leading-none pt-1">{i + 1}</span>
                <p className="font-display text-xl md:text-2xl font-light leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR YOU */}
      <section className="section-pad px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-light mb-12" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>Если ты хочешь:</h2>
          <div className="space-y-5 mb-14">
            {[
              "Выработать певческие навыки",
              "Перестать бояться",
              "Освоить вокальные приёмы и разобраться с певческим дыханием",
              "Насладиться своим голосом или записать его в студии звукозаписи",
            ].map((text, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="font-display text-4xl font-light text-muted-foreground/40 leading-none pt-1">{i + 1}</span>
                <p className="font-display text-xl md:text-2xl font-light leading-snug">{text}</p>
              </div>
            ))}
          </div>
          <p className="font-display text-2xl md:text-3xl font-light">То тебе ко мне — приглашаю тебя на свои занятия!</p>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-8 bg-foreground text-background px-10 py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors rounded">
            Записаться
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Что предлагаем</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">Услуги</h2>
            <p className="text-muted-foreground text-base">Я предлагаю вам свои индивидуальные уроки по вокалу</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title}
                className="border border-border rounded p-8 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow bg-card"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 className="font-display text-2xl font-light">{s.title}</h3>
                <div className="text-sm text-muted-foreground">{s.duration}</div>
                <div className="font-display text-4xl font-semibold">{s.price}</div>
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
                  className="mt-2 w-full border border-foreground text-foreground text-sm py-2 rounded hover:bg-foreground hover:text-background transition-colors text-center block">
                  Записаться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="section-pad px-6 md:px-16 bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Выбери время</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">Расписание и запись</h2>
          </div>

          <div className="bg-background rounded border border-border overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs text-muted-foreground font-normal w-20">Время</th>
                  {DAYS.map(d => (
                    <th key={d} className="px-2 py-3 text-center text-xs text-muted-foreground font-normal">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time, ti) => (
                  <tr key={time} className={ti % 2 === 0 ? "" : "bg-secondary/30"}>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{time}</td>
                    {DAYS.map(day => {
                      const key = `${day}-${time}`;
                      const available = !!slots[key];
                      const selected = selectedSlot === key;
                      return (
                        <td key={day} className="px-2 py-2 text-center">
                          {available ? (
                            <button
                              onClick={() => setSelectedSlot(selected ? null : key)}
                              className={`w-full rounded text-xs py-1.5 transition-colors ${selected
                                ? "bg-foreground text-background"
                                : "bg-accent/15 text-accent hover:bg-accent/25 border border-accent/30"}`}>
                              {selected ? "✓" : "своб."}
                            </button>
                          ) : (
                            <span className="block w-full py-1.5 text-xs text-muted-foreground/25">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedSlot && !bookingDone && (
            <div className="mt-8 bg-background border border-border rounded p-6 max-w-md animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <h3 className="font-display text-xl mb-1">Запись на урок</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {selectedSlot.replace("-", " в ")}
              </p>
              <div className="space-y-3">
                <input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  placeholder="Телефон или @telegram"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  onClick={() => { if (form.name && form.phone) setBookingDone(true); }}
                  className="w-full bg-foreground text-background py-3 text-sm rounded hover:bg-foreground/80 transition-colors">
                  Отправить заявку
                </button>
              </div>
            </div>
          )}

          {bookingDone && (
            <div className="mt-8 bg-background border border-border rounded p-6 max-w-md animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <div className="flex items-center gap-3 mb-2">
                <Icon name="CheckCircle" size={20} className="text-accent" />
                <h3 className="font-display text-xl">Заявка отправлена!</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Свяжемся с вами в ближайшее время для подтверждения.
              </p>
              <button onClick={() => { setBookingDone(false); setSelectedSlot(null); setForm({ name: "", phone: "" }); }}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                Выбрать другое время
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-pad px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Как нас найти</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 12\nст. м. Пушкинская" },
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@vocalstudio.ru" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00 – 21:00\nВс: 11:00 – 18:00" },
              ].map(c => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} fallback="Circle" size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
                    <div className="text-sm whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: "Send", label: "Telegram" },
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "Youtube", label: "YouTube" },
                ].map(s => (
                  <button key={s.label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                    title={s.label}>
                    <Icon name={s.icon} fallback="Circle" size={15} />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-secondary/40 rounded border border-border p-8 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl mb-2">Бесплатный пробный урок</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Познакомимся, определим ваш уровень и цели — совершенно бесплатно.
                </p>
              </div>
              <div className="space-y-3">
                <input placeholder="Ваше имя"
                  className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                <input placeholder="Телефон или @telegram"
                  className="w-full border border-border rounded px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors" />
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-foreground text-background py-3 text-sm rounded hover:bg-foreground/80 transition-colors">
                  Записаться на пробный урок
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg">Вокальная студия</span>
          <span className="text-xs text-muted-foreground">© 2024 · Все права защищены</span>
          <div className="flex gap-6">
            {NAV_ITEMS.map(n => (
              <button key={n.href} onClick={() => scrollTo(n.href)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}