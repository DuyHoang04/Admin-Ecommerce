"use client"


import React from 'react'
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    value: string[];
    disabled?: boolean,
    onChange: (value: string) => void;
    onDelete: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, disabled, onChange, onDelete }) => {


    const onUpload = (result: any) => {
        console.log(result);

        onChange(result.info.secure_url);
    };


    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map(url => (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onDelete(url)} variant="destructive" size="sm">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>

                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                        </div>
                    ))
                }
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="j97jh668">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload