import prismadb from "@/lib/primsadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { userId } = auth();
        const body = await req.json();
        const { name } = body;
        const storeId = params.storeId;




        if (!userId) return new NextResponse("Unauthenticated", { status: 400 });

        if (!name) return new NextResponse("Name is required", { status: 400 });

        if (!storeId) return new NextResponse("Store id is required", { status: 400 });

        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId
            },
            data: {
                name
            }
        })



        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const storeId = params.storeId;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: storeId,
                userId
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}