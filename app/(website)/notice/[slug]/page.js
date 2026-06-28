import { notFound } from 'next/navigation';

async function getNoticeBySlug(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pdfFile?slug=${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.pdfData[0]; // adjust if needed
}

export default async function NoticeDetailPage({ params }) {
    const { slug } = params;

    const notice = await getNoticeBySlug(slug);
    console.log(notice)
    if (!notice) notFound();

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">{notice.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                প্রকাশের তারিখ: {new Date(notice.createdAt).toLocaleDateString('en-GB')}
            </p>
            <iframe
                src={notice.pdf_secure_url}
                width="100%"
                height="700"
                className="border rounded-lg shadow"
                title="PDF Viewer"
            />
            <div className="mt-4">
                <a
                    href={notice.pdf_secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    📄 নতুন ট্যাবে PDF খুলুন
                </a>
            </div>
        </div>
    );
}