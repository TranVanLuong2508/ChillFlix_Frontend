import Poster from "@/components/ui/Poster";
import Playbar from "@/components/ui/Playbar";
import TabsSection from "@/components/ui/Tabs";
import FilmInfo from "@/components/ui/FilmInfo";
import Comment from "@/components/ui/Comment";

export default function FilmDetailPage() {
    return (
        <main className="flex flex-col min-h-screen bg-zinc-950 text-white overflow-x-hidden">

            <div className="bg-zinc-900 shadow-lg overflow-hidden">
                <section className="relative min-h-screen">
                    <Poster />

                    <div className="relative z-20 container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

                            <div className="lg:col-span-3">
                                <FilmInfo />
                            </div>

                            <div className="lg:col-span-7">
                                <Playbar />
                                <TabsSection />
                                <Comment />
                            </div>

                        </div>
                    </div>
                </section>
            </div>

        </main>
    );
}
