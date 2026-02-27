import AboutSection from './utils/AboutSection';
import { Footer } from './utils/Footer';
import { HeroSection } from './utils/HeroSection';
import { LeadershipSection } from './utils/LeadershipSection';
import Navigation from './utils/Navbar';
import SloganSection from './utils/SloganSection';

function Home() {
    return (
        <div className="dark min-h-screen bg-[#0a0e1a] font-['Inter',sans-serif]">
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <LeadershipSection />
                <SloganSection />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
