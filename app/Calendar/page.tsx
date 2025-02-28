import Link from 'next/link';
import NavBar from "@/components/navigation-bar";

export default function Calendar() {
    return (
        <div className="bg-[rgb(230,230,230)] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <h1 className="text-black text-center text-5xl underline text-bold">Calendar (Placeholder page)</h1>

                <Link
                className="rounded-full border border-solid border-black/[.08] dark:border-black/[.70] text-black transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:text-[#ffffff] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-8 sm:h-10 px-3 sm:px-4 sm:min-w-40"
                href="/" // Main page
                //target="_blank"
                rel="noopener noreferrer"
                >
                    Back
                </Link>
            </main>

            <NavBar />
        </div>

        
    )
}
