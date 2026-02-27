import { FeaturesBento } from './utils/FeaturesBento';
import { FinalCta } from './utils/FinalCta';
import { Footer } from './utils/Footer';
import { HeroSection } from './utils/HeroSection';
import Navigation from './utils/Navbar';
import { TechnicalSpecs } from './utils/TechnicalSpecs';

function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 antialiased selection:bg-zinc-800 selection:text-white">
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
