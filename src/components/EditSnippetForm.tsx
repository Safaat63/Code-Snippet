'use client'
import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import type { Snippet } from '@prisma/client'
import { Button } from './ui/button'
import { saveSnippet } from "@/src/actions"

const EditSnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSnippet(snippet.id, code);
  };

  return (
    <div className="flex flex-col gap-4">

      <form onSubmit={handleSubmit} className="flex items-center justify-between">

        <h1 className="text-xl font-bold">Your code:</h1>

        <Button type="submit">Save</Button>

      </form>

      <Editor
        height="40vh"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || '')}
      />
    </div>
  )
}

export default EditSnippetForm;