import HomeContent from "@/pages/home/components/content";
import HomeFilter from "@/pages/home/components/filter";

export default function Home() {

    return (
        <div className="container mx-auto p-2 md:p-4">
            <HomeFilter />
            <HomeContent />
        </div>
    )
}   