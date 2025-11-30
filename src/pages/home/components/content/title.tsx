import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type Props = {
    addTask: () => void;
}

export default function HomeTableTitle({ addTask }: Props) {
    return (
        <div className="flex justify-between items-center">
            <h1>Task List</h1>
            <Button size="sm" className='cursor-pointer' onClick={addTask}>
                <Plus size={20} />
                Add Task
            </Button>
        </div>
    )
}