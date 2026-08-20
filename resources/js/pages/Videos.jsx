import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/PublicLayout';
import PublicPagination from '../components/PublicPagination';

function PlayIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function YoutubeIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="2.5" y="6" width="19" height="12" rx="3" />
            <path d="M10.5 9.5v5l4.5-2.5Z" fill="currentColor" stroke="none" />
        </svg>
    );
}

function InstagramIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
    );
}

const PLATFORM_ICON = {
    youtube: YoutubeIcon,
    instagram: InstagramIcon,
};

export default function Videos({ videos }) {
    return (
        <PublicLayout>
            <Head title="Videos | RideEV" />

            <div className="bg-zinc-950 text-white min-h-screen pt-[140px] pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-[10px] lg:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-4">
                            Watch & Explore
                        </p>
                        <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-white">Videos</h1>
                    </motion.div>

                    {videos.data.length === 0 ? (
                        <p className="text-center text-zinc-500 font-light">No videos yet. Check back soon.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {videos.data.map((video, index) => {
                                const PlatformIcon = PLATFORM_ICON[video.platform];
                                return (
                                    <motion.a
                                        key={video.id}
                                        href={video.video_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                        className="group block bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-white/20 transition-colors"
                                    >
                                        <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                                            {video.thumbnail_url ? (
                                                <img
                                                    src={video.thumbnail_url}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs uppercase tracking-widest">
                                                    No thumbnail
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                                    <PlayIcon className="w-6 h-6 ml-0.5" />
                                                </div>
                                            </div>

                                            {PlatformIcon && (
                                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white">
                                                    <PlatformIcon className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-base font-medium text-white leading-snug line-clamp-2">
                                                {video.title}
                                            </h3>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    )}

                    <PublicPagination links={videos.links} />
                </div>
            </div>
        </PublicLayout>
    );
}
