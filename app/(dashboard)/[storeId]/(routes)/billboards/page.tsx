import prismadb from "@/lib/primsadb";
import BillBoardClient from "./components/client";
import { format } from "date-fns";
import { BillBoardColumn } from "./components/columns";

export default async function BillBoardPage({ params }: { params: { storeId: string } }) {


    const billBoards = await prismadb.billBoard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    const formattedBillboards: BillBoardColumn[] = billBoards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoardClient data={formattedBillboards} />
            </div>
        </div>
    )
}