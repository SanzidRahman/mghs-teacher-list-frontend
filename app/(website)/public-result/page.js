"use client";

import { useEffect, useState } from "react";
import { getYearlyResults } from "@/lib/helper";
import YearlyResultCard from "@/components/YearlyResultCard";

export default function YearlyResultPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getYearlyResults();
            setResults(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">

            <h1 className="text-4xl font-bold text-center mb-10">
                বার্ষিক পরীক্ষার ফলাফল
            </h1>

            <div className="space-y-8">

                {results.map((result) => (
                    <YearlyResultCard
                        key={result._id}
                        results={results}
                    />
                ))}

            </div>

        </div>
    );
}