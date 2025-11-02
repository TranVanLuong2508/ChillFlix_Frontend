"use client";

import { act, use, useEffect, useState } from "react";
import { filmServices } from "@/services/filmService";
import Poster from "@/components/custom/Poster";
import FilmInfo from "@/components/custom/FilmInfo";
import Playbar from "@/components/custom/Playbar";
import TabsSection from "@/components/custom/Tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams } from "next/navigation";
import { FilmData } from "@/types/filmData";
import { FilmDirectorData } from "@/types/filmDirectorData";
import { FilmActorData } from "@/types/filmActorData";
import { partServices } from "@/services/partService";
import { RatingData } from "@/types/ratingData";

import { PartData } from "@/types/partData";
import { actorServices } from "@/services/actorService";
import { filmActorServices } from "@/services/filmActorService";

export default function FilmDetailPage({ params }: { params: { id: string } }) {

    const [activeTab, setActiveTab] = useState<"comments" | "ratings">("comments");
    const [filmData, setFilmData] = useState<FilmData | null>();
    const [filmDirectorData, setFilmDirectorData] = useState<FilmDirectorData | null>();
    const [filmActorData, setFilmActorData] = useState<FilmActorData[]>([]);
    const [filmRatingData, setFilmRatingData] = useState<RatingData | null>();
    const [filmPartData, setFilmPartData] = useState<{ parts: PartData[] } | null>(null);
    const filmId = useParams().filmId;

    const fetchFilm = async () => {
        try {
            const res = await filmServices.getFilmId(filmId as string);
            const directorRes = await filmServices.getDirectorByFilm(filmId as string);
            const actorRes = await filmServices.getActorByFilmId(filmId as string);
            const ratingRes = await filmServices.getRatingsByFilmId(filmId as string);
            const partRes = await partServices.getPartsByFilmId(filmId as string);
            const partData = partRes.data.result.length > 0 ? partRes.data.result[0] : null;

            setFilmDirectorData(directorRes.data.result);
            setFilmData(res.data.film);
            setFilmActorData(actorRes.data.result);
            setFilmRatingData(ratingRes.data.result);
            setFilmPartData({
                parts: partData ? [partData] : [],
            });
        } catch (error) {
            console.error("Failed to fetch film:", error);
        }

    };

    const fetchFilmActors = async () => {
        try {

            const filmActorRes = await filmActorServices.getActorsByFilmId(filmId as string);
            setFilmActorData(filmActorRes.data.result);

            console.log("Film Actors:", filmActorRes.data.result);
        } catch (error) {
            console.error("Failed to fetch film actors:", error);
        }
    };


    useEffect(() => {
        if (!filmId) return;
        fetchFilm();
        fetchFilmActors();
    }, [filmId, params.id]);

    if (!filmData) return <div className="text-center py-20">Đang tải dữ liệu...</div>;
    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <Header />
            <section className="relative min-h-screen">
                <Poster film={filmData} />
                <div className="relative z-20 max-w-10xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-zinc-900/80 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                        <div className="lg:col-span-3 flex flex-col bg-[#191B24] gap-8 border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
                            <FilmInfo film={filmData} director={filmDirectorData as any} actor={filmActorData as any} rating={filmRatingData as any} />
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-8 bg-[#191B24] border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
                            <Playbar activeTab={activeTab} setActiveTab={setActiveTab} episodes={filmPartData?.parts?.[0]?.episodes || []} />
                            <TabsSection filmActor={filmActorData as any} film={filmData} part={filmPartData as any} />
                            <CommentRatingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
