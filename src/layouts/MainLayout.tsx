import ContentLayout from "@/layouts/ContentLayout"
import HeaderLayout from "@/layouts/HeaderLayout"


export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderLayout />
            <ContentLayout />
        </div>
    )
}