"use client"

import React from 'react'
import { SizeColumn, columns } from './columns'
import { Heading } from '@/components/ui/heading'
import { useOrigin } from '@/hooks/use-origin'
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { ApiList } from '@/components/ui/api-list';
import { useParams, useRouter } from 'next/navigation';

interface SizesClientProps {
    data: SizeColumn[]
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin()
    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`} description="Manage sizes for your products" />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" baseUrl={baseUrl} />
        </>
    )
}

export default SizesClient