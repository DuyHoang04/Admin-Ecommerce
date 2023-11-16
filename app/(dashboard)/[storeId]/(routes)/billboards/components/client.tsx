"use client"

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillBoardColumn, columns } from './columns'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'
import { useOrigin } from '@/hooks/use-origin'



interface BillboardClientProps {
    data: BillBoardColumn[];
}

const BillBoardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const params = useParams()
    const router = useRouter()

    const baseUrl = `${origin}/api/stores/${params.storeId}`;

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading description='Manage Bill Board for you store' title={`Bill Board  (${data.length})`} />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
            <Heading title="API" description="API Calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" baseUrl={baseUrl} />
        </>
    )
}

export default BillBoardClient