import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskStatus } from "@/constants/task-status"
import { Search } from "lucide-react"
import { useQueryState } from "nuqs"
import { useState } from "react"


export default function HomeFilter() {
    const [paramSearch, setParamSearch] = useQueryState('search');
    const [paramStatus, setParamStatus] = useQueryState('status');

    const [search, setSearch] = useState(paramSearch || '');
    const [status, setStatus] = useState(paramStatus || 'all');

    const handleStatusChange = (value: string) => {
        setStatus(value);
        setParamStatus(value === 'all' ? null : value);
    }
    const handleSearch = () => {
        setParamSearch(search);
    }
    return (
        <div className="flex gap-2 space-y-4 ">
            <Select defaultValue="all" value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        <SelectItem value="all">All</SelectItem>
                        {taskStatus.map((status, i) => (
                            <SelectItem key={i} value={status.value}>{status.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Task,Description"
                className="bg-white w-full md:w-[300px]" />
            <Button onClick={handleSearch} className='cursor-pointer'>
                <Search size={20} />
            </Button>
        </div>
    )
}