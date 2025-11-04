"use client";

import { useEffect, useState } from "react";
import { useFilmStore } from "@/stores/filmStore";
import Poster from "@/components/custom/Poster";
import FilmInfo from "@/components/custom/FilmInfo";
import Playbar from "@/components/custom/Playbar";
import TabsSection from "@/components/custom/Tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams } from "next/navigation";

export default function FilmDetailPage() {
    const filmId = useParams().filmId as string;
    const [activeTab, setActiveTab] = useState<"comments" | "ratings">("comments");

    const {
        film,
        filmActors,
        filmDirectors,
        filmRatings,
        filmParts,
        fetchFullFilmDetail,
        isLoading,
        clearFilm,
    } = useFilmStore();

    useEffect(() => {
        clearFilm();
        if (filmId) fetchFullFilmDetail(filmId);
    }, [filmId]);

    if (isLoading || !film)
        return <div className="text-center py-20">Đang tải dữ liệu phim...</div>;

    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <Header />
            <section className="relative min-h-screen">
                <Poster film={film} />
                <div className="relative z-20 max-w-10xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-zinc-900/80 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                        <div className="lg:col-span-3 flex flex-col bg-[#191B24] gap-8 border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
                            <FilmInfo film={film} director={filmDirectors as any} actor={filmActors as any} rating={filmRatings as any} />
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-8 bg-[#191B24] border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
                            <Playbar activeTab={activeTab} setActiveTab={setActiveTab} episodes={filmParts?.parts?.[0]?.episodes || []} />
                            <TabsSection filmActor={filmActors as any} film={film} part={filmParts as any} />
                            <CommentRatingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
