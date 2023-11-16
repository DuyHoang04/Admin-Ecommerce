import prismadb from "@/lib/primsadb"
import BillboardForm from "./components/billboard-form"

export default async function BillBoardPage(
    { params }: {
        params: { billboardId: string }
    }) {

    const billboard = await prismadb.billBoard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}