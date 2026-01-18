'use server'
import {prisma} from '@/lib/prisma'
import { redirect } from 'next/navigation'
export const saveSnippet = async (id:number, code:string)=>{
    await prisma.snippet.update({
        where:{id},
        data:{code}
    }
    )
    redirect(`/snippet/${id}`)
}

export const deleteSnippet = async (id:number) =>{
    await prisma.snippet.delete({
        where: {id}
        
    })
    redirect("/")
}

export async function createSnippet(prevState:{message: string}, formData: FormData) {
        "use server";

        const title = formData.get("title"); //deleted as string,cz it migh be an empty file
        const code = formData.get("code");

        if (typeof title !== "string" || title.length < 4) {
            return {message:"Title is Required and must be longer."}
        }

        if (typeof code !== "string" || code.length < 8 ) {
            return {message:"Code is Required and must be longer."}
        }

        const snippet = await prisma.snippet.create({
            data: { title, code }
        });

        console.log("Snippet created:", snippet);

        redirect("/"); // works on server
    }