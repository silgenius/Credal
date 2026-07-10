import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Faq from '@/components/landing/Faq';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}