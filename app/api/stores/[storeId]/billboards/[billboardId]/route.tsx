import prismadb from "@/lib/primsadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {
        params: { billboardId: string, storeId: string }
    }) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { label, imageUrl } = body;

        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });

        if (!label) return new NextResponse("Label is required", { status: 400 });

        if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 });

        if (!params.billboardId) return new NextResponse("Billboard id is required", { status: 400 });


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const billboard = await prismadb.billBoard.update({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);



    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) {
    try {
        const { userId } = auth();

        console.log(userId);


        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const billboard = await prismadb.billBoard.delete({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request, { params }: {
        params: { storeId: string, billboardId: string }
    }) {

    try {


        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeById = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
            }
        })


        if (!storeById) {
            return new NextResponse("Store Id is require", { status: 405 });
        }

        const billboard = await prismadb.billBoard.findFirst({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_GET_BY_ID]', error);
        return new NextResponse("Internal error", { status: 500 });
    }

}