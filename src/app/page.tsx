import Link from "next/dist/client/link";
import { prisma } from "../lib/prisma";
import { Button } from "../components/ui/button";
import { Snippet } from "@prisma/client";
export default async function Home() {
  const snippets = await prisma.snippet.findMany({});

  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <div className="flex items-center justify-between">
        <h1>Snippets</h1>
        <Link href="/snippet/new"><Button className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          New
        </Button></Link>
      </div>
      {
        snippets.map((snippet: Snippet) => (
          <div key={snippet.id} className="flex items-center justify-between border-b py-4 bg-gray-200 p-2 rounded-md my-2">
            <h1>{snippet.title}</h1>
            <Link href={`/snippet/${snippet.id}`}><Button variant="link">View</Button></Link>
          </div>
        ))
      }
    </div>
  );
}
