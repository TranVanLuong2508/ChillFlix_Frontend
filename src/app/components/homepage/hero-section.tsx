"use client"

import { Play, Info } from "lucide-react"

export default function HeroSection() {
    return (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url(/placeholder.svg?height=500&width=1200&query=movie hero banner dark)",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-2xl space-y-4">
                        {/* Badge */}
                        <div className="inline-block">
                            <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                Phim Mới
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            Lựa Chọn TV Thần
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                            Một bộ phim hành động kịch tính với những cảnh quay ngoạn mục và diễn xuất tuyệt vời. Đừng bỏ lỡ bộ phim
                            được mong chờ nhất năm nay.
                        </p>

                        {/* Rating and Info */}
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="text-accent">★★★★★</span>
                                <span className="text-muted-foreground">9.2/10</span>
                            </div>
                            <span className="text-muted-foreground">2024</span>
                            <span className="text-muted-foreground">120 phút</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                                <Play className="w-5 h-5 fill-current" />
                                Xem Ngay
                            </button>
                            <button className="flex items-center gap-2 bg-card hover:bg-card/80 text-foreground px-6 py-3 rounded-lg font-semibold border border-border transition-colors">
                                <Info className="w-5 h-5" />
                                Chi Tiết
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
