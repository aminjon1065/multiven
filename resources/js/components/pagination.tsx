import { Button } from '@/components/ui/button';

const Pagination = () => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
                <Button variant="outline" size="sm">
                    Previous
                </Button>
                <Button variant="outline" size="sm">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
