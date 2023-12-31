"use client"

import React from 'react'
import { ProductColumn, columns } from './columns'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useOrigin } from '@/hooks/use-origin'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

interface ProductsClientProps {
    data: ProductColumn[]
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {


    const params = useParams();
    const router = useRouter();
    const origin = useOrigin()
    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description="Manage products for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" baseUrl={baseUrl} />
        </>
    )
}

export default ProductsClient