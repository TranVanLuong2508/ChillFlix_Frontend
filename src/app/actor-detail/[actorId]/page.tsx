"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ActorInfo from "@/components/custom/ActorInfo";
import FilmActor from "@/components/custom/FilmActor";
import { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";
import { ActorData } from "@/types/actorData";
import { actorServices } from "@/services/actorService";
import { FilmActorData } from "@/types/filmActorData";
import { filmActorServices } from "@/services/filmActorService";

export default function ActorDetail() {
    const [actorData, setActorData] = useState<ActorData | null>(null);
    const [filmActorData, setFilmActorData] = useState<FilmActorData[] | null>(null);
    const actorId = useParams().actorId;

    const fetchActorData = async () => {
        try {
            const actorRes = await actorServices.getActorById(actorId as string);
            setActorData(actorRes.data);
        } catch (error) {
            console.error("Error fetching actor data:", error);
        }
    };

    const fetchFilmActorData = async () => {
        try {
            const filmActorRes = await filmActorServices.getFilmsByActorId(actorId as string);
            setFilmActorData(filmActorRes.data.result);
        } catch (error) {
            console.error("Error fetching film actor data:", error);
        }
    };

    useEffect(() => {
        if (!actorId) return;
        fetchActorData();
        fetchFilmActorData();
    }, [actorId]);

    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <Header />
            <section className="relative flex-1 w-full">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 lg:gap-12 items-start justify-center">
                        <div className="lg:col-span-4 flex justify-center border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
                            <ActorInfo actor={actorData as any} />
                        </div>
                        <div className="lg:col-span-12 flex flex-col gap-8 mt-8 lg:mt-0">
                            <FilmActor filmActorData={filmActorData as any} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>


    );
}
