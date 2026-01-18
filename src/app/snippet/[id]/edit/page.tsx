import EditSnippetForm from '@/src/components/EditSnippetForm';
import {prisma} from '@/src/lib/prisma'
import React from 'react'

const EditPageSnippet = async ({params}:{params: Promise<{id:string}>}) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where:{
      id
    }
  })

  if (!snippet) return <h1>Page Not Found!</h1>
  return (
    <EditSnippetForm snippet = {snippet}/>
  )
}

export default EditPageSnippet;