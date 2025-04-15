export default function TopBar() {
    return (
        <header className="bg-white h-24 border-gray-900/25 border-b max-h-24 min-h-24 px-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="bg-yellow-300 h-8 w-8 rounded-full"></div>
                <div className="ml-4 text-sm sm:text-base">Notificaciones</div>
            </div>
            <div className="flex items-center">
                <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>
                <div className="text-sm sm:text-base">Carlos Roberto Diaz</div>
            </div>
        </header>
    );
}