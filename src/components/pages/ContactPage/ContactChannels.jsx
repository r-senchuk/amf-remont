/**
 * ContactChannels Component
 * Layout container for phone and email contact cards
 */
import React from 'react';

function ContactChannels() {
  return (
    <div className="mt-8 md:mt-10">
      {/* Grid Container */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Phone Card */}
        <article className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200 p-6 flex flex-col gap-4 transition-all duration-200">
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-orange to-accent-orange-light text-white shadow-md">
              <i className="material-icons text-xl">phone_in_talk</i>
            </span>
            <h3 className="text-lg font-semibold text-slate-800 m-0">
              Zadzwoń bezpośrednio
            </h3>
          </div>
          
          {/* Card Body */}
          <div className="flex-1">
            <p className="text-[0.9375rem] text-slate-600 leading-relaxed mb-3">
              Podczas krótkiej rozmowy zapytamy Cię m.in. o:
            </p>
            <ul className="list-disc list-inside text-[0.9375rem] text-slate-600 mb-4 leading-[1.8]">
              <li>typ lokalu (mieszkanie / dom),</li>
              <li>lokalizację we Wrocławiu lub okolicach,</li>
              <li>metraż,</li>
              <li>zakres planowanych prac.</li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-5">
            {/* Anatolij */}
            <div className="flex gap-3">
              <span className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-1">
                <i className="material-icons text-base">person</i>
              </span>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-medium text-slate-800 block text-[0.9375rem]">
                    Anatolij – wyceny i terminy
                  </span>
                  <a 
                    href="tel:+48796019986" 
                    className="text-primary font-semibold text-base hover:underline decoration-primary decoration-2 underline-offset-2 transition-all"
                  >
                    +48 796 019 986
                  </a>
                </div>
                {/* Anatolij Messengers */}
                <div className="flex gap-3">
                  <a 
                    href="whatsapp://send?phone=+48796019986" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="WhatsApp"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <img src="/assets/social/wa.svg" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://t.me/+48796019986" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Telegram"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-sky-100 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <img src="/assets/social/tlegr.svg" alt="Telegram" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Maks */}
            <div className="flex gap-3">
              <span className="h-9 w-9 flex items-center justify-center rounded-full bg-accent-green/10 text-accent-green flex-shrink-0 mt-1">
                <i className="material-icons text-base">person</i>
              </span>
              <div className="flex-1">
                <div className="mb-2">
                  <span className="font-medium text-slate-800 block text-[0.9375rem]">
                    Maks – koordynacja prac
                  </span>
                  <a 
                    href="tel:+48795621905" 
                    className="text-accent-green font-semibold text-base hover:underline decoration-accent-green decoration-2 underline-offset-2 transition-all"
                  >
                    +48 795 621 905
                  </a>
                </div>
                {/* Maks Messengers */}
                <div className="flex gap-3">
                  <a 
                    href="whatsapp://send?phone=+48795621905" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="WhatsApp"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <img src="/assets/social/wa.svg" alt="WhatsApp" className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://t.me/+48795621905" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Telegram"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-sky-100 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <img src="/assets/social/tlegr.svg" alt="Telegram" className="w-5 h-5" />
                  </a>
                  <a 
                    href="viber://chat?number=%2B48795621905" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Viber"
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-purple-100 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <img src="/assets/social/vb.svg" alt="Viber" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Email Card */}
        <article className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-slate-200 p-6 flex flex-col gap-4 transition-all duration-200">
          {/* Card Header */}
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-green to-emerald-400 text-white shadow-md">
              <i className="material-icons text-xl">email</i>
            </span>
            <h3 className="text-lg font-semibold text-slate-800 m-0">
              Wolisz napisać e-mail?
            </h3>
          </div>
          
          {/* Card Body */}
          <div className="flex-1">
            <p className="text-[0.9375rem] text-slate-600 leading-relaxed mb-3">
              Wyślij wiadomość na adres:
            </p>
            
            {/* Email Address */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <i className="material-icons text-base">mail_outline</i>
              </span>
              <a 
                href="mailto:amfgroupremont@gmail.com" 
                className="text-primary font-bold text-base hover:underline decoration-primary decoration-2 underline-offset-2 break-all transition-all"
              >
                amfgroupremont@gmail.com
              </a>
            </div>
            
            <p className="text-[0.9375rem] text-slate-600 leading-relaxed mb-3">
              Żebyśmy mogli szybko i konkretnie odpowiedzieć, dodaj w treści maila:
            </p>
            <ul className="list-disc list-inside text-[0.9375rem] text-slate-600 mb-4 leading-[1.8]">
              <li>lokalizację (np. Wrocław – Krzyki),</li>
              <li>metraż lokalu,</li>
              <li>krótki opis prac (np. wykończenie od stanu deweloperskiego / remont łazienki / remont generalny),</li>
              <li>orientacyjny termin, kiedy chcesz rozpocząć remont.</li>
            </ul>
          </div>
          
          {/* Response Time Note */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <i className="material-icons text-primary text-lg">schedule</i>
            <p className="text-sm text-slate-600 m-0">
              Zazwyczaj odpowiadamy jeszcze <span className="font-medium text-slate-800">tego samego dnia roboczego</span>.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ContactChannels;
