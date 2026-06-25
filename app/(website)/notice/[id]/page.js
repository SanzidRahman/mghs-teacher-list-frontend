// app/notice/[slug]/page.jsx

export default async function Page({ searchParams }) {
    const pdfUrl = searchParams.url;

    return (
        <div className="w-full h-screen">
            <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="PDF Viewer"
            />
        </div>
    );
}