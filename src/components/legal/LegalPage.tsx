"use client";

import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useLanguage } from "@/components/site/LanguageProvider";

type DocumentKind = "privacy" | "terms";

const content = {
  ar: {
    back: "الرجوع للرئيسية", label: "معلومات الموقع", updated: "آخر تحديث: 17 تشرين الأول 2026", contact: "للاستفسارات المتعلقة بهذه الصفحة، تواصل عبر:",
    privacy: {
      title: "سياسة الخصوصية",
      introduction: "توضح هذه الصفحة كيفية استخدام البيانات ضمن الموقع الشخصي للدكتورة بتول موفق، عند التصفح أو اختيار اللغة أو التواصل عبر البريد الإلكتروني.",
      sections: [
        { title: "التصفح والتواصل", text: "يعرض الموقع معلومات مهنية وأكاديمية، ولا يتضمن نموذج تواصل أو إنشاء حساب أو عمليات دفع. الضغط على رابط البريد يفتح تطبيق البريد لديك، ولا يرسل رسالة تلقائياً. إذا اخترت مراسلتنا، تتضمن الرسالة عنوان بريدك والمعلومات التي تشاركها، وتُستخدم للتعامل مع استفسارك ومتابعته." },
        { title: "تفضيل اللغة", text: "يحفظ الموقع اللغة التي تختارها محلياً في متصفحك باستخدام التخزين المحلي، لتذكّر تفضيلك عند الزيارة التالية. يمكنك إزالة هذا التفضيل من إعدادات بيانات الموقع في المتصفح، وعندها قد تعود اللغة إلى الإعداد الافتراضي." },
        { title: "المحتوى والخدمات الخارجية", text: "عند فتح فيديو مشروع، يُحمّل مشغّل فيديو من Cloudinary، وقد يتلقى مزوّد الخدمة بيانات تقنية مثل عنوان الإنترنت ومعلومات المتصفح ويستخدم تقنيات تخزين خاصة به. كما تقود بعض الروابط إلى Instagram وResearchGate ويوتوبيان ومواقع ناشرين ومؤسسات أخرى. تخضع معالجة البيانات لدى هذه الخدمات لسياساتها الخاصة." },
        { title: "البيانات التقنية والاستضافة", text: "يتطلب عرض الموقع إرسال طلبات تقنية إلى مزوّد الاستضافة. وقد يحتفظ المزوّد بسجلات تقنية، مثل عنوان الإنترنت ووقت الطلب، لأغراض التشغيل والأمان. تعتمد تفاصيل هذه السجلات ومدد الاحتفاظ بها على إعدادات خدمة الاستضافة." },
        { title: "الاستفسارات والتحديثات", text: "يمكنك التواصل عبر البريد أدناه للاستفسار عن بيانات المراسلات التي شاركتها أو لطلب تصحيحها أو حذفها. وقد تُحدّث هذه الصفحة عند تغيير وظائف الموقع أو الخدمات المستخدمة، مع إظهار تاريخ آخر تحديث." },
      ],
    },
    terms: {
      title: "شروط الاستخدام",
      introduction: "تنظّم هذه الشروط استخدام الموقع الشخصي للدكتورة بتول موفق والاطلاع على محتواه المعماري والبحثي والمهني.",
      sections: [
        { title: "الغرض من الموقع", text: "الموقع منصة تعريفية تعرض السيرة المهنية والأعمال والاهتمامات البحثية والمساهمات الأكاديمية. المحتوى المنشور للتعريف والاطلاع، ولا يُعد عرضاً تعاقدياً أو استشارة هندسية خاصة بمشروع. تُناقش أي خدمات أو شراكات مهنية باتفاق مستقل." },
        { title: "حقوق المحتوى والمصادر", text: "تعود حقوق النصوص والصور والتصاميم والأبحاث إلى أصحابها المعنيين. عرض بحث أو صورة أو رابط لا ينقل حقوق الملكية أو يمنح ترخيصاً لإعادة الاستخدام. عند الاقتباس أو إعادة النشر، يجب مراعاة حقوق المؤلفين المشاركين والناشرين وأصحاب الصور، والحصول على الإذن المطلوب من صاحب الحق." },
        { title: "الاستخدام المسؤول", text: "يرجى استخدام الموقع بصورة مشروعة، دون محاولة تعطيل تشغيله أو الوصول إلى أنظمته دون تصريح، ودون تحريف المحتوى أو نسب أعمال أو آراء إلى أصحابها بصورة غير دقيقة." },
        { title: "الدقة والروابط الخارجية", text: "قد تتغيّر المعلومات المهنية والبحثية بمرور الوقت؛ وللاستفسارات الحالية يُرجى التواصل مباشرة. تتيح الروابط الخارجية الاطلاع على المصادر والخدمات الأصلية، وهي تخضع لشروط الجهات التي تديرها. لا يعني إدراج الرابط امتلاك ذلك الموقع أو التحكّم في محتواه." },
        { title: "التحديثات والتواصل", text: "قد يتغيّر محتوى الموقع أو هذه الشروط مع تطويره. يظهر تاريخ آخر تحديث أعلى الصفحة. لأي استفسار عن الاستخدام أو حقوق المحتوى أو تصحيح معلومات منشورة، يمكنك التواصل عبر البريد أدناه." },
      ],
    },
  },
  en: {
    back: "Back to home", label: "SITE INFORMATION", updated: "Last updated: 17 October 2026", contact: "For inquiries about this page, contact:",
    privacy: {
      title: "Privacy Policy",
      introduction: "This page explains how data is used on Dr. Batool Mowafaq's personal website when you browse, choose a language, or contact us by email.",
      sections: [
        { title: "Browsing and correspondence", text: "The website presents professional and academic information. It has no contact form, account registration, or payment facility. Selecting an email link opens your email application and does not send a message automatically. If you choose to write to us, your message includes your email address and the information you share, which are used to handle and follow up on your inquiry." },
        { title: "Language preference", text: "The website saves your selected language locally in your browser using local storage, so it can remember your preference on future visits. You can remove this preference through your browser's site-data settings, which may restore the default language." },
        { title: "External content and services", text: "Opening a project video loads a Cloudinary video player. The provider may receive technical data, such as your IP address and browser information, and use its own storage technologies. Other links lead to Instagram, ResearchGate, Utopian, publishers, and other organizations. These services process data under their own privacy policies." },
        { title: "Technical data and hosting", text: "Displaying the website requires technical requests to the hosting provider. The provider may retain technical logs, such as IP addresses and request times, for operation and security. The details and retention periods of these logs depend on the hosting service's settings." },
        { title: "Questions and updates", text: "You can use the email address below to ask about correspondence data you have shared or request its correction or deletion. This page may be updated when website features or services change; its latest update date appears above." },
      ],
    },
    terms: {
      title: "Terms of Use",
      introduction: "These terms describe the use of Dr. Batool Mowafaq's personal website and its architectural, research, and professional content.",
      sections: [
        { title: "Purpose of the website", text: "The website introduces professional experience, work, research interests, and academic contributions. Its content is provided for information and does not constitute a contractual offer or project-specific engineering advice. Professional services and collaborations are discussed under a separate agreement." },
        { title: "Content rights and attribution", text: "Rights in texts, photographs, designs, and research belong to their respective owners. Displaying a paper, image, or link does not transfer ownership or grant a reuse license. Quotation or republication must respect the rights of co-authors, publishers, photographers, and other rights holders, including obtaining any required permission." },
        { title: "Responsible use", text: "Please use the website lawfully, without attempting to disrupt its operation or access its systems without authorization, and without misrepresenting content or inaccurately attributing work or views to others." },
        { title: "Accuracy and external links", text: "Professional and research information may change over time; please contact us directly for current inquiries. External links provide access to original sources and services and are governed by their operators' terms. Including a link does not imply ownership or control of the linked website or its content." },
        { title: "Updates and contact", text: "Website content and these terms may change as the site develops. The latest update date appears above. For questions about use, content rights, or corrections to published information, contact the email address below." },
      ],
    },
  },
};

export default function LegalPage({ kind }: { kind: DocumentKind }) {
  const { language, setLanguage } = useLanguage();
  const t = content[language];
  const document = t[kind];
  const ar = language === "ar";
  return <>
    <Header language={language} onLanguageChange={setLanguage} />
    <main className="legal-page" lang={language} dir={ar ? "rtl" : "ltr"} aria-labelledby="legal-title">
      <div className="legal-shell">
        <Link className="back-link" href="/"><span aria-hidden="true">{ar ? "→" : "←"}</span>{t.back}</Link>
        <p className="eyebrow">{t.label}</p>
        <h1 id="legal-title">{document.title}</h1>
        <p className="updated">{t.updated}</p>
        <p className="introduction">{document.introduction}</p>
        {document.sections.map((section, index) => <section className="legal-section" key={section.title} aria-labelledby={`legal-section-${index}`}>
          <span className="number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h2 id={`legal-section-${index}`}>{section.title}</h2><p>{section.text}</p></div>
        </section>)}
        <div className="contact"><p>{t.contact}</p><a href="mailto:utopian.iraq@gmail.com" dir="ltr">utopian.iraq@gmail.com</a></div>
      </div>
      <style jsx>{`
        .legal-page { background: #f4f1e9; color: #242321; padding: 56px 0 80px; }
        .legal-shell { width: min(calc(100% - 80px), 960px); margin-inline: auto; }
        .legal-page :global(.back-link) { display: inline-flex; gap: 14px; align-items: center; min-height: 44px; margin-bottom: 36px; color: #9c573b; font-size: 12px; text-decoration: none; }
        .eyebrow { margin: 0 0 16px; color: #9c573b; font-size: 10px; letter-spacing: .12em; }
        h1 { margin: 0; font-family: var(--font-serif, Georgia), serif; font-weight: 400; font-size: clamp(36px, 4vw, 54px); line-height: 1.3; }
        .updated { margin: 18px 0 28px; color: #817466; font-size: 12px; }
        .introduction { max-width: 760px; margin: 0 0 36px; color: #655c52; font-size: 16px; line-height: 1.9; }
        .legal-section { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 22px; padding-block: 28px; border-top: 1px solid #d8c5b2; }
        .number { padding-top: 6px; font-size: 11px; color: #9c573b; }
        h2 { margin: 0 0 14px; font-family: var(--font-serif, Georgia), serif; font-weight: 400; font-size: 25px; line-height: 1.5; }
        .legal-section p, .contact p { margin: 0; color: #655c52; font-size: 14px; line-height: 2; }
        .contact { padding-top: 28px; border-top: 1px solid #d8c5b2; }
        .contact a { display: inline-block; max-width: 100%; min-height: 44px; padding-block: 8px; color: #9c573b; font-size: 16px; overflow-wrap: anywhere; }
        a:focus-visible, .legal-page :global(.back-link:focus-visible) { outline: 2px solid #b68a55; outline-offset: 5px; }
        .legal-page[lang="ar"] { font-family: var(--font-tajawal), sans-serif; }
        .legal-page[lang="ar"] h1, .legal-page[lang="ar"] h2 { font-family: inherit; font-weight: 500; }
        .legal-page[lang="ar"] .eyebrow { font-size: 13px; letter-spacing: 0; }
        .legal-page[lang="ar"] .legal-section p { font-size: 16px; }
        @media (max-width: 750px) { .legal-page { padding-block: 32px 48px; } .legal-shell { width: calc(100% - 40px); } .legal-section { grid-template-columns: 24px minmax(0, 1fr); gap: 12px; padding-block: 24px; } h2 { font-size: 23px; } }
      `}</style>
    </main>
    <Footer />
  </>;
}
