// components/Footer.tsx
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-8">
            <div className="max-w-6xl mx-auto px-10 py-8">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-3">About School</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Founded: 1965</li>
                            <li>Location: Dhaka, Bangladesh</li>
                            <li>Students: 2000+</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Admission</li>
                            <li>Academic</li>
                            <li>Teachers</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Result</li>
                            <li>Routine</li>
                            <li>Calendar</li>
                            <li>Forms</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-3">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📞 +880-2-XXXXXXX</li>
                            <li>✉️ info@mzs.edu.bd</li>
                            <li>📍 Dhaka, Bangladesh</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-6 pt-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Moulvibazar Govt. High School. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;