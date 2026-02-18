import { useNavigate } from 'react-router-dom';

/* ─── ROUTE VERIFICATION MODE ─── */
export default function EndWorld() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 w-full h-full bg-red-600 flex flex-col items-center justify-center p-20 text-center z-[9999]">
            <h1 className="text-white text-6xl font-black mb-10 animate-bounce">
                IF YOU SEE THIS RED SCREEN:
            </h1>
            <p className="text-white text-3xl font-bold bg-black/40 p-10 rounded-3xl border-8 border-white mb-10">
                THE ROUTE "/end" IS WORKING!
            </p>
            <p className="text-yellow-300 text-xl font-black">
                Please confirm if you see this Red background and the Bouncing text.
            </p>
            <button
                onClick={() => navigate('/')}
                className="mt-20 px-20 py-10 bg-white text-black text-2xl font-black rounded-full shadow-[0_20px_0_rgb(200,200,200)] active:translate-y-2 active:shadow-none transition-all"
            >
                EXIT TEST
            </button>
        </div>
    );
}
