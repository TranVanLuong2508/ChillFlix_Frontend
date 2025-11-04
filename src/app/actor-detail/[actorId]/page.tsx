"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ActorInfo from "@/components/custom/ActorInfo";
import FilmActor from "@/components/custom/FilmActor";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useActorStore } from "@/stores/actorStore";

export default function ActorDetail() {
    const actorId = useParams().actorId as string;
    const { actor, filmActorData, isLoading, fetchActorDetail, clearActor } = useActorStore();

    useEffect(() => {
        if (!actorId) return;
        clearActor();
        fetchActorDetail(actorId);
    }, [actorId]);

    if (isLoading || !actor)
        return <div className="text-center py-20">Đang tải thông tin diễn viên...</div>;

    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <Header />
            <section className="relative flex-1 w-full">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 lg:gap-12 items-start justify-center">
                        <div className="lg:col-span-4 flex justify-center border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
                            <ActorInfo actor={actor as any} />
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
