"use client";

import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface Dictionary {
  [key: string]: string;
}

async function loadDictionary(locale: string): Promise<Dictionary> {
  const dictionaries: Record<string, Dictionary> = {
    en: (await import("@/lib/dictionaries/en.json")).default,
    ca: (await import("@/lib/dictionaries/ca.json")).default,
    es: (await import("@/lib/dictionaries/es.json")).default,
  };
  return dictionaries[locale] || dictionaries.en;
}

interface TrackCardProps {
  title: string;
  description: string;
  badge: string;
  theoryHref: string;
  exercisesHref: string;
  theoryLabel: string;
  exercisesLabel: string;
  icon: React.ReactNode;
}

function TrackCard({
  title,
  description,
  badge,
  theoryHref,
  exercisesHref,
  theoryLabel,
  exercisesLabel,
  icon,
}: TrackCardProps) {
  return (
    <article className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            {icon}
            {badge}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <a href={theoryHref} className="flex-1 text-center px-4 py-3 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">{theoryLabel}</a>
          <a href={exercisesHref} className="flex-1 text-center px-4 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">{exercisesLabel}</a>
        </div>
      </div>
    </article>
  );
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const dictionary = await loadDictionary(locale);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image src="/next.svg" alt="Logo" width={32} height={32} className="h-8 w-8 dark:invert" priority />
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{dictionary.hero_title}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href={`/${locale}`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{dictionary.nav_home}</a>
              <a href={`/${locale}/social`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{dictionary.nav_social}</a>
              <a href={`/${locale}/scientific`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{dictionary.nav_scientific}</a>
            </nav>
            <div className="flex items-center gap-4">
              <LanguageSwitcher locale={locale} dictionary={{
                language: dictionary.language,
                select_language: dictionary.select_language,
                catalan: dictionary.catalan,
                spanish: dictionary.spanish,
                english: dictionary.english,
              }} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative bg-zinc-900 dark:bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 dark:opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/20 border border-blue-500/20 dark:border-blue-900/30 text-blue-400 dark:text-blue-300 text-sm font-medium mb-6">{dictionary.comprehensive_curriculum}</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{dictionary.hero_title}</h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">{dictionary.hero_description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`/${locale}/social`} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">{dictionary.explore_social}</a>
              <a href={`/${locale}/scientific`} className="px-8 py-4 border border-zinc-600 hover:border-zinc-400 text-zinc-100 hover:text-white rounded-xl font-semibold text-lg bg-zinc-800/50 hover:bg-zinc-800 transition-all">{dictionary.explore_scientific}</a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{dictionary.choose_your_track}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">{dictionary.hero_subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <TrackCard title={dictionary.social_track_title} description={dictionary.social_track_description} badge={dictionary.track_social_badge} theoryHref={`/${locale}/social`} exercisesHref={`/${locale}/social/exercises`} theoryLabel={dictionary.social_theory} exercisesLabel={dictionary.social_exercises} icon={<span className="text-2xl">📊</span>} />
            <TrackCard title={dictionary.scientific_track_title} description={dictionary.scientific_track_description} badge={dictionary.track_scientific_badge} theoryHref={`/${locale}/scientific`} exercisesHref={`/${locale}/scientific/exercises`} theoryLabel={dictionary.scientific_theory} exercisesLabel={dictionary.scientific_exercises} icon={<span className="text-2xl">🔬</span>} />
          </div>
        </section>

        <section className="bg-zinc-100 dark:bg-zinc-900 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                title: dictionary.theory_content,
                description: dictionary.track_description_social,
                icon: "📖",
              }, {
                title: dictionary.practice_exercises,
                description: dictionary.track_description_scientific,
                icon: "✏️",
              }, {
                title: dictionary.interactive_learning,
                description: dictionary.comprehensive_curriculum,
                icon: "💡",
              }].map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">{dictionary.get_started}</h3>
              <p className="text-blue-100 mb-8 text-lg">{dictionary.hero_description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`/${locale}/social`} className="px-8 py-4 bg-white text-blue-600 hover:bg-zinc-100 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">{dictionary.explore_social}</a>
                <a href={`/${locale}/scientific`} className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all">{dictionary.explore_scientific}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{dictionary.footer_copyright}</p>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">{dictionary.language}:</span>
              <LanguageSwitcher locale={locale} dictionary={{
                language: dictionary.language,
                select_language: dictionary.select_language,
                catalan: dictionary.catalan,
                spanish: dictionary.spanish,
                english: dictionary.english,
              }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
