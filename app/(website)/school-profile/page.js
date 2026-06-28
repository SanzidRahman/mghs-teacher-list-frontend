// page.tsx
import { Suspense } from "react";
import ViewSchoolProfile from "./ViewSchoolProfile";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ViewSchoolProfile />
        </Suspense>
    );
}