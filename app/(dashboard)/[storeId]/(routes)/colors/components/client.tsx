"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ColorColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";
import { useOrigin } from "@/hooks/use-origin";

interface ColorClientProps {
    data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    const origin = useOrigin()
    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Colors (${data.length})`} description="Manage colors for your products" />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Colors" />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId" baseUrl={baseUrl} />
        </>
    );
};
