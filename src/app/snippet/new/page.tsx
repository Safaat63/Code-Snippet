'use client'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as actions from '@/actions/index'
import React, { useActionState } from 'react';
import Link from 'next/link';


const CreateSnippetPage = () => {

    const [formDataAction, errorAction] = useActionState(actions.createSnippet, { message: "" });




    return (
        <div className="flex flex-col gap-8">
            <Link href='/'>
                <Button className="font-bold text-xl">Home</Button>
            </Link>

            <form action={errorAction}>
                <div>
                    <Label>Title</Label>
                    <Input type="text" name="title" id="title" />
                </div>
                <div>
                    <Label>Code</Label>
                    <Textarea name="code" id="code" />
                </div>
                {formDataAction.message && <div className="p-2 bg-red-300 border-red-400">{formDataAction.message}</div>}

                <Button type="submit" className="my-4">New</Button>
            </form>
        </div>
    )
}

export default CreateSnippetPage;