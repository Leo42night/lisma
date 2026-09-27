import { useEffect, useRef } from 'react';
import { useLocation, type Location } from 'react-router-dom';

export default function usePrevLoc() {
    const location = useLocation();
    const currentLocRef = useRef<Location>(location);
    const prevLocRef = useRef<Location | null>(null);

    useEffect(() => {
        // Jika lokasi berubah, pindahkan lokasi saat ini ke lokasi sebelumnya
        if (currentLocRef.current.pathname !== location.pathname) {
            prevLocRef.current = currentLocRef.current;
            currentLocRef.current = location;
        }
    }, [location]);

    return prevLocRef.current;
}