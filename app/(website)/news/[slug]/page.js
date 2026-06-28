import { notFound } from 'next/navigation';

async function getNewsBySlug(slug) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsFile?slug=${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.newsData[0]; // adjust if needed
}

export default async function NewsDetailPage({ params }) {
    const { slug } = params;
    const notice = await getNewsBySlug(slug);

    if (!notice) notFound();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                Published: {new Date(notice.createdAt).toLocaleDateString()}
            </p>

            {/* Option A: Embed the PDF */}
            <iframe
                src={notice.pdf_secure_url}
                width="100%"
                height="600"
                className="border rounded"
                title="PDF Viewer"
            />

            {/* Option B: Direct link to open in new tab */}
            <a
                href={notice.pdf_secure_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Open PDF in new tab
            </a>
        </div>
    );
}