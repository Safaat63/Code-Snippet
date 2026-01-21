'use server'
import {prisma} from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
export const saveSnippet = async (id:number, code:string)=>{
    await prisma.snippet.update({
        where:{id},
        data:{code}
    }
    )
    revalidatePath(`/snippet/${id}`)
    redirect(`/snippet/${id}`)
}

export const deleteSnippet = async (id:number) =>{
    await prisma.snippet.delete({
        where: {id}
        
    })
    revalidatePath ("/")
    redirect("/")
}

export async function createSnippet(
    prevState:{message: string},
    formData: FormData
) {
        

        try {

            const title = formData.get("title"); //deleted 'as string',cz it migh be an empty file
        const code = formData.get("code");

        if (typeof title !== "string" || title.length < 4) {
            return {message:"Title is Required and must be longer."}
        }

        if (typeof code !== "string" || code.length < 8 ) {
            return {message:"Code is Required and must be longer."}
        }

       await prisma.snippet.create({
            data: { title, code }
        });
        revalidatePath ("/")

        //throw new Error("Oops, something went wrong!"); //it was showing a forced error message though saving snippet was successful
            
        } catch (error: unknown) {
            if (error instanceof Error){
                return {message: error.message}
            }else{
                return {message : "Some Internal Issue"}
            }
        }

        
        redirect("/"); // works on server
    }