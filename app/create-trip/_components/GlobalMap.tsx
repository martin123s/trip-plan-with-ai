import React, { useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { tripStore } from '@/store/useTripStore';
import { Activity, Itinerary } from './ChatBox';


const GlobalMap = () => {

  const currTrip = tripStore(state => state.currTrip)

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 2.5, // starting zoom
        projection: 'globe' 
      });
    }

    const markers: mapboxgl.Marker[] = []

    if (currTrip?.itinerary) {
      currTrip?.itinerary.forEach((itinerary: Itinerary) => {
        itinerary.activities.forEach((activity: Activity) => {
          const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
            .setPopup( new mapboxgl.Popup({offset: 25}).setText(activity.place_name))
            .addTo(mapRef.current!)
          markers.push(marker)

          const currentCenter = [activity?.geo_coordinates.longitude, activity.geo_coordinates.latitude] as [number, number]
          mapRef.current!.flyTo({
            center: currentCenter,
            zoom: 9,
            essential: true
          })
        })
      })
    }

    return () => {
      markers.forEach(marker => marker.remove())
    }
  },[currTrip])

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '95%', height: '82vh', borderRadius: 20 }}
    />
  )
}

export default GlobalMap