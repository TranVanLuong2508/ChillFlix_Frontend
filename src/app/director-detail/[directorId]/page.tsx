"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FilmActor from "@/components/custom/FilmActor";
import { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";
import { DirectorData } from "@/types/directorData";
import { FilmDirectorData } from "@/types/filmDirectorData";
import { directorServices } from "@/services/directorService";
import DirectorInfo from "@/components/custom/DirectorInfo";
import { filmDirectorServices } from "@/services/filmDirectorService";

export default function DirectorDetail() {
    const [directorData, setDirectorData] = useState<DirectorData | null>(null);
    const [filmDirectorData, setFilmDirectorData] = useState<FilmDirectorData[] | null>(null);
    const directorId = useParams().directorId;

    const fetchDirectorData = async () => {
        try {
            const directorRes = await directorServices.getDirectorById(directorId as string);
            setDirectorData(directorRes.data);
        } catch (error) {
            console.error("Error fetching director data:", error);
        }
    };

    const fetchFilmDirectorData = async () => {
        try {
            const filmDirectorRes = await filmDirectorServices.getFilmsByDirectorId(directorId as string);
            setFilmDirectorData(filmDirectorRes.data.result);
        } catch (error) {
            console.error("Error fetching film director data:", error);
        }
    };

    useEffect(() => {
        if (!directorId) return;
        fetchDirectorData();
        fetchFilmDirectorData();
    }, [directorId]);

    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <Header />
            <section className="relative flex-1 w-full">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 lg:gap-12 items-start justify-center">
                        <div className="lg:col-span-4 flex justify-center border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
                            <DirectorInfo director={directorData as any} />
                        </div>
                        <div className="lg:col-span-12 flex flex-col gap-8 mt-8 lg:mt-0">
                            <FilmActor filmActorData={filmDirectorData as any} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>


    );
}
