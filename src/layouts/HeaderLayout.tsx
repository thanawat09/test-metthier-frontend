
import { GoTasklist } from "react-icons/go";
export default function HeaderLayout() {
    return (
        <nav className="flex justify-between p-4 shadow-xl flex-none" >
            <div>
                <GoTasklist className="text-4xl" />
            </div>


        </nav>
    )
}