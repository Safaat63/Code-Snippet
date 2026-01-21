import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link";
import * as actions from '@/actions'



type SnippetDetailProps = {
  params: Promise<{ id: string }>
}

export default async function SnippetDetailpage({
  params,
}: SnippetDetailProps) {
  const id = parseInt((await params).id);
  //await new Promise((r) => setTimeout(r, 1000))

  const snippet = await prisma.snippet.findUnique({
    where: { id }


  })

  if (!snippet) return <h1>Snippet Not Found</h1>

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id)



  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href='/'>
          <Button className="font-bold text-xl">Home</Button>
        </Link>


      </div>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl"> My Post: {snippet?.title}</h1>
        <div className="flex items-center gap-2">

          <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link>
          <form action={deleteSnippetAction}>

            <Button variant='destructive' type="submit">Delete</Button>

          </form>
        </div>

      </div>
      <pre className="bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>

  )
}
//this whole thing will change the dynamic page into static so that page reloads fast.

export const generateStaticParams = async () =>{
  const snippets = await prisma.snippet.findMany();
  return snippets.map((snippet)=>{ 
    return {id: snippet.id.toString() }
  })
}

