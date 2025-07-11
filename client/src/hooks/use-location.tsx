import { useState, useEffect } from 'react';
import { Location } from '../lib/types';

export function useLocation() {
  const [location, setLocation] = useState<Location>({
    lat: 12.9716,
    lng: 77.5946,
    address: "MG Road, Bangalore, India"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // For demo purposes, we'll use mock address
      // In production, you'd use a geocoding service
      setLocation({
        lat: latitude,
        lng: longitude,
        address: "Current Location, Bangalore, India"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
      // Keep default location
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, loading, error, refreshLocation: getCurrentLocation };
}
