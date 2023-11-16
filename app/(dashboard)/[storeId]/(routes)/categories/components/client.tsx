"use client"

import React from 'react'
import { CategoryColumn, columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ApiList } from '@/components/ui/api-list';
import { useOrigin } from '@/hooks/use-origin';
import { DataTable } from '@/components/ui/data-table';

interface CategoriesClientProps {
    data: CategoryColumn[];
}


const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();
    const origin = useOrigin()

    const baseUrl = `${origin}/api/stores/${params.storeId}`;



    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading description='Manage categories for your store' title={`Category (${data.length})`} />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <DataTable data={data} searchKey='name' columns={columns} />
            <Heading title="API" description="API Calls for Categories" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" baseUrl={baseUrl} />
        </>
    )
}

export default CategoriesClient