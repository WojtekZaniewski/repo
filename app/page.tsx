"use client"

import { Scissors, Shield, Star, Clock, Phone, MapPin, Plus, Minus, Sparkles, Crown, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY)

    let isScrolling = false
    const handleWheel = (e: WheelEvent) => {
      // Disable custom scroll on mobile devices
      if (window.innerWidth < 768) return
      
      if (isScrolling) return

      e.preventDefault()
      isScrolling = true

      const sections = document.querySelectorAll(".section-snap")
      const totalSections = sections.length

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        // Scroll down
        const nextSection = currentSection + 1
        setCurrentSection(nextSection)
        sections[nextSection]?.scrollIntoView({ behavior: "smooth" })
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        const prevSection = currentSection - 1
        setCurrentSection(prevSection)
        sections[prevSection]?.scrollIntoView({ behavior: "smooth" })
      }

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrolling = false
      }, 1000)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    // Only add wheel listener on desktop
    if (window.innerWidth >= 768) {
      window.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (window.innerWidth >= 768) {
        window.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // Update current section based on clicked navigation
      const sections = ["home", "services", "reviews", "contact"]
      const index = sections.indexOf(sectionId)
      if (index !== -1) setCurrentSection(index)
    }
  }

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "Jak długo trwa wizyta?",
      answer:
        "Czas wizyty zależy od wybranej usługi. Strzyżenie zajmuje około 45-60 minut, koloryzacja 2-3 godziny, a kompleksowe makeover może trwać do 4 godzin. Zawsze informujemy o przewidywanym czasie podczas rezerwacji.",
    },
    {
      question: "Czy oferujecie konsultacje przed zabiegiem?",
      answer:
        "Tak, każda wizyta rozpoczyna się od bezpłatnej konsultacji. Omawiamy Twoje oczekiwania, analizujemy strukturę włosów i dobieramy najlepsze rozwiązania. Chcemy, żebyś była w 100% zadowolona z efektu.",
    },
    {
      question: "Jakie produkty używacie?",
      answer:
        "Używamy wyłącznie profesjonalnych produktów najwyższej jakości od renomowanych marek takich jak L'Oréal Professionnel, Kerastase i Olaplex. Wszystkie produkty są bezpieczne i dostosowane do różnych typów włosów.",
    },
    {
      question: "Jak mogę umówić wizytę?",
      answer:
        "Wizytę możesz umówić przez nasz system rezerwacji online, telefonicznie lub osobiście w salonie. Zalecamy rezerwację z wyprzedzeniem, szczególnie na weekendy i wieczory. Przyjmujemy również wizyty bez umówienia, w miarę dostępności.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-x-hidden">
      <div
        id="home"
        className="section-snap hero-section relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50"
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{
              transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.2 + mouseY * 0.01}px)`,
              filter: "grayscale(20%) contrast(1.1) brightness(0.8)",
            }}
          >
            <source src="/bg.mov" type="video/mp4" />
            <source src="/bg.webm" type="video/webm" />
            {/* Fallback image if video doesn't load */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url(/placeholder.svg?height=1080&width=1920&query=luxury+modern+hair+salon+interior+with+elegant+styling+chairs+mirrors+and+professional+lighting+bright+white+cinematic)",
              }}
            />
          </video>
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/15" />
        </div>

        <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-transparent ring-1 ring-yellow-400/40 backdrop-blur-xl rounded-full shadow-lg shadow-black/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-400/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
            <div className="relative">
              <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg md:text-2xl text-black tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>LA PASSIONE</span>
              <span className="font-light text-xs text-gray-600 tracking-widest uppercase hidden sm:block">Salon Fryzjerski</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {[
              { name: "Strona Główna", id: "home" },
              { name: "Portfolio", id: "portfolio" },
              { name: "Usługi", id: "services" },
              { name: "Opinie", id: "reviews" },
              { name: "Kontakt", id: "contact" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="px-3 md:px-4 py-2 bg-transparent ring-1 ring-gray-300/40 backdrop-blur-xl rounded-full hover:bg-white/20 hover:ring-gray-400/50 transition-all duration-300 shadow-lg shadow-gray-900/10 hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 text-gray-800 text-sm md:text-base"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-transparent text-gray-900 hover:bg-white/20 rounded-full px-4 md:px-6 py-2 md:py-3 font-semibold shadow-xl shadow-gray-900/20 ring-1 ring-yellow-400/30 hover:ring-yellow-400/50 transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <span className="hidden sm:inline">Umów Wizytę</span>
              <span className="sm:hidden">Umów</span>
            </Button>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center bg-white/10">
          <div
            className="transform transition-all duration-1000 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.15 - mouseY * 0.03}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <div className="text-center mb-6 md:mb-8">
              <div className="relative inline-block">
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider mb-4 text-black drop-shadow-2xl text-center relative"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    textShadow: "3px 3px 6px rgba(0,0,0,0.3), 0 0 30px rgba(255, 215, 0, 0.2)"
                  }}
                >
                  LA PASSIONE
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
                    <Gem className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
                  </div>
                </h1>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-yellow-500/80 to-transparent rounded-full"></div>
                <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 text-gray-600 font-light text-sm md:text-lg tracking-widest">
                  ✦ Salon Fryzjerski Premium ✦
                </div>
              </div>
            </div>

            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed text-pretty font-light tracking-wide drop-shadow-sm text-center px-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                textShadow: "2px 2px 4px rgba(0,0,0,0.15)"
              }}
            >
              Gdzie elegancja spotyka się z pasją
            </p>

            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 hover:from-gray-50 hover:via-white hover:to-gray-50 rounded-full px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold shadow-2xl shadow-gray-900/20 hover:shadow-gray-900/30 transition-all duration-300 transform hover:scale-105 ring-1 ring-yellow-400/40 hover:ring-yellow-400/60 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-400/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-300"
            >
              <span className="hidden sm:inline">Umów Wizytę Online</span>
              <span className="sm:hidden">Umów Wizytę</span>
            </Button>
          </div>

          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.01),
              transform: `translate(-50%, ${mouseY * 0.02}px)`,
            }}
          >
            <div className="w-6 h-10 border-2 border-gray-600/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="section-snap relative z-10 min-h-screen flex items-center py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
              Portfolio
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Zobacz nasze najnowsze prace i inspiruj się luksusowymi stylizacjami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Elegant Bob",
                category: "Strzyżenie",
                image: "/placeholder.jpg",
                description: "Klasyczny bob z nowoczesnym akcentem"
              },
              {
                title: "Balayage Blonde",
                category: "Koloryzacja",
                image: "/placeholder.jpg",
                description: "Naturalne przejścia kolorów dla naturalnego wyglądu"
              },
              {
                title: "Wedding Updo",
                category: "Stylizacja",
                image: "/placeholder.jpg",
                description: "Eleganckie upięcie na specjalne okazje"
              },
              {
                title: "Curly Revival",
                category: "Pielęgnacja",
                image: "/placeholder.jpg",
                description: "Regeneracja i odżywienie naturalnych loków"
              },
              {
                title: "Modern Pixie",
                category: "Strzyżenie",
                image: "/placeholder.jpg",
                description: "Odważne, nowoczesne strzyżenie"
              },
              {
                title: "Ombre Magic",
                category: "Koloryzacja",
                image: "/placeholder.jpg",
                description: "Dramatyczne przejścia kolorów"
              }
            ].map((work, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-yellow-600 uppercase tracking-wider">{work.category}</span>
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{work.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{work.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="relative overflow-hidden bg-black text-white hover:bg-gray-800 rounded-full px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-yellow-400/30 hover:ring-yellow-400/50">
              Zobacz Więcej Prac
            </Button>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="section-snap relative z-10 min-h-screen flex items-center py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-gray-100 via-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="rounded-2xl md:rounded-3xl bg-white/90 ring-1 ring-gray-300/50 backdrop-blur-xl p-6 md:p-12 shadow-2xl shadow-gray-900/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-2000">
            <div className="text-center mb-12 md:mb-16">
              <div className="relative inline-block mb-6 md:mb-8">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-balance text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Nasze Usługi
                </h2>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2">
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
                </div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto text-pretty font-light leading-relaxed px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Od klasycznych strzyżeń po awangardowe koloryzacje<br/>
                <span className="text-base md:text-lg text-gray-600 italic">tworzymy luksusowy look idealny dla Ciebie</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  num: "01.",
                  title: "Strzyżenie",
                  desc: "Precyzyjne strzyżenie dopasowane do kształtu Twojej twarzy i stylu życia. Od klasyki po nowoczesne trendy.",
                },
                {
                  num: "02.",
                  title: "Koloryzacja",
                  desc: "Profesjonalna koloryzacja z użyciem najlepszych produktów. Balayage, ombre, klasyczne kolory i odważne zmiany.",
                },
                {
                  num: "03.",
                  title: "Stylizacja",
                  desc: "Eleganckie upięcia na specjalne okazje, codzienne stylizacje i profesjonalne porady dotyczące pielęgnacji.",
                },
                {
                  num: "04.",
                  title: "Pielęgnacja",
                  desc: "Regenerujące zabiegi, masaże głowy i profesjonalne kuracje przywracające włosom zdrowie i blask.",
                },
              ].map((service) => (
                <div
                  key={service.num}
                  className="rounded-2xl bg-white/80 ring-1 ring-gray-300/50 backdrop-blur-xl p-8 h-80 flex flex-col hover:ring-yellow-400/50 transition-all duration-300 shadow-xl shadow-gray-900/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
                >
                  <div className="flex-1">
                    <div className="text-3xl font-sans font-bold text-yellow-500 mb-4">{service.num}</div>
                    <h3 className="text-xl font-sans font-semibold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 hover:from-gray-50 hover:via-white hover:to-gray-50 rounded-full px-12 py-4 text-lg font-semibold shadow-xl shadow-gray-900/20 ring-1 ring-yellow-400/30 hover:ring-yellow-400/50 transition-all duration-300 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-400/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-200"
              >
                Zobacz Pełną Ofertę
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section-snap relative z-10 min-h-screen flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/90 ring-1 ring-gray-300/50 backdrop-blur p-12 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-2000">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                Opinie Klientek
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto text-pretty" style={{ fontFamily: 'Inter, sans-serif' }}>
                Poznaj historie zadowolonych klientek, które zaufały naszemu doświadczeniu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Anna K.",
                  role: "Stała klientka",
                  image: "/woman-portrait.png",
                  text: "Niesamowita transformacja! Stylista idealnie zrozumiał moje oczekiwania. Czuję się jak nowa osoba!",
                },
                {
                  name: "Marta S.",
                  role: "Nowa klientka",
                  image: "/blonde-woman-portrait.png",
                  text: "Profesjonalizm na najwyższym poziomie. Atmosfera salonu jest wyjątkowa, a efekty przeszły moje oczekiwania.",
                },
                {
                  name: "Karolina M.",
                  role: "Stała klientka",
                  image: "/brunette-woman-portrait.png",
                  text: "Wreszcie znalazłam salon, gdzie czuję się komfortowo. Indywidualne podejście i perfekcyjne wykonanie!",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className="rounded-2xl bg-white/80 ring-1 ring-gray-300/50 backdrop-blur p-8 hover:ring-yellow-400/50 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400/80 text-yellow-400/80" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{review.text}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-gray-600 text-sm">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-snap relative z-10 min-h-screen flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/90 ring-1 ring-gray-300/50 backdrop-blur p-12 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-2000">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Często Zadawane Pytania
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed text-pretty" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług, terminów i sposobów
                  rezerwacji.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white/80 ring-1 ring-gray-300/50 backdrop-blur overflow-hidden hover:ring-yellow-400/50 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/70 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4 text-gray-900">{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0 text-yellow-500" />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0 text-yellow-500" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-snap relative z-10 min-h-screen flex items-center py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/90 ring-1 ring-gray-300/50 backdrop-blur p-12 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-2000">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                Umów Wizytę
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto text-pretty" style={{ fontFamily: 'Inter, sans-serif' }}>
                Wybierz dogodny termin i pozwól nam zadbać o Twoje włosy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="rounded-2xl bg-gradient-to-br from-white/95 to-gray-100/95 text-gray-900 p-8 shadow-2xl shadow-gray-900/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                <h3 className="text-2xl font-bold mb-6">Rezerwacja Online</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        Imię
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                        placeholder="Twoje imię"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Nazwisko
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                        placeholder="Twoje nazwisko"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Usługa
                    </label>
                    <select
                      id="service"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Wybierz usługę</option>
                      <option value="cut">Strzyżenie</option>
                      <option value="color">Koloryzacja</option>
                      <option value="styling">Stylizacja</option>
                      <option value="treatment">Pielęgnacja</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-2">
                        Data
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-2">
                        Godzina
                      </label>
                      <select
                        id="time"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Wybierz godzinę</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-2">
                      Dodatkowe uwagi
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent resize-none bg-white/80 backdrop-blur-sm"
                      placeholder="Opisz swoje oczekiwania..."
                    />
                  </div>
                  <Button className="relative overflow-hidden w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-3 font-semibold text-base shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-yellow-400/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-300">
                    Potwierdź Rezerwację
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xl text-gray-700 leading-relaxed text-pretty">
                    Możesz również umówić wizytę telefonicznie lub odwiedzić nas osobiście. Jesteśmy otwarci od
                    poniedziałku do soboty.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Phone, title: "Telefon", info: "+48 123 456 789" },
                    { icon: MapPin, title: "Adres", info: "ul. Piękna 15, 00-001 Warszawa" },
                    { icon: Clock, title: "Godziny otwarcia", info: "Pon-Sob: 9:00-19:00" },
                  ].map((contact) => (
                    <div
                      key={contact.title}
                      className="rounded-2xl bg-gradient-to-br from-white/95 to-gray-100/95 text-gray-900 p-6 shadow-2xl shadow-gray-900/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-400/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{contact.title}</h4>
                          <p className="text-gray-700">{contact.info}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/90 backdrop-blur-2xl ring-1 ring-gray-300/50 p-12 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-2000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Scissors className="w-6 h-6 text-gray-900" />
                  <span className="text-xl font-semibold text-gray-900">LA PASSIONE</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-pretty">
                  Luksusowy salon fryzjerski w sercu Warszawy. Tworzymy niepowtarzalne stylizacje z pasją i dbałością o
                  każdy detal.
                </p>
              </div>

              {[
                { title: "USŁUGI", items: ["Strzyżenie", "Koloryzacja", "Stylizacja", "Pielęgnacja"] },
                { title: "INFORMACJE", items: ["O nas", "Nasz zespół", "Cennik", "Galeria"] },
                { title: "KONTAKT", items: ["Umów wizytę", "Kontakt", "Lokalizacja", "Regulamin"] },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-900 transition-colors text-sm leading-relaxed"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300/50 pt-12 mb-12">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Bądź na bieżąco</h3>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/80 ring-1 ring-gray-300/50 backdrop-blur border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400/50 focus:outline-none"
                  />
                  <Button className="relative overflow-hidden bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6 h-[50px] font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-yellow-400/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-300">
                    Zapisz się
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300/50 pt-8">
              <p className="text-gray-600 text-sm text-center">© 2025 LA PASSIONE Salon Fryzjerski</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
