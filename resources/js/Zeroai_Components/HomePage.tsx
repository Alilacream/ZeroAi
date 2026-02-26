import { Footer } from './utils/Footer';
import { HeroSection } from './utils/HeroSection';
import { FeaturesBento } from './utils/FeaturesBento';
import { TechnicalSpecs } from './utils/TechnicalSpecs';
import { FinalCta } from './utils/FinalCta';
import Navigation from './utils/Navbar';

function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-zinc-800 selection:text-white">
            <Navigation />
            <main>
                <HeroSection />
                <FeaturesBento />
                <TechnicalSpecs />
                <FinalCta />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
