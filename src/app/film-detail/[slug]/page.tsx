import Poster from "@/components/custom/Poster";
import Playbar from "@/components/custom/Playbar";
import TabsSection from "@/components/custom/Tabs";
import FilmInfo from "@/components/custom/FilmInfo";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";

export default function FilmDetailPage() {
    return (
        <main className="flex flex-col min-h-screen bg-zinc-950 text-white overflow-x-hidden ">
            <div className="bg-zinc-900 shadow-lg overflow-hidden">
                <section className="relative min-h-screen">

                    <Poster />

                    <div className="relative z-20 max-w-10xl mx-auto px-4 sm:px-6 md:px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                            <div className="lg:col-span-3 space-y-6">
                                <FilmInfo />
                            </div>

                            <div className="lg:col-span-7 flex flex-col gap-8 bg-zinc-950 border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
                                <div className="w-full">
                                    <Playbar />
                                </div>

                                <div className="w-full">
                                    <TabsSection />
                                </div>

                                <div className="w-full">
                                    <CommentRatingTabs />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}
