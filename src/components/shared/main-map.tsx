import mapbox from 'mapbox-gl'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { env } from '@/enviroment'
import { create } from 'zustand'
import { Button } from '../ui/button'

type Props = {
  className?: string
}

interface PropertyGeoJSON {
  id: string
  name: string
  lastname: string
  category: string
  avatar: string
  price: string
}

const useMapPopup = create<{
  especialist: PropertyGeoJSON | null
  set: (data: PropertyGeoJSON | null) => void
}>((set) => ({
  especialist: null,
  set: (especialist) => set({ especialist })
}))

const PopupBase = forwardRef<HTMLDivElement>((_, ref) => {
  const especialist = useMapPopup((state) => state.especialist)

  return (
    <div className="hidden">
      <div ref={ref} className="w-[240px] bg-white">
        <div className="w-full aspect-square relative">
          <img
            src={especialist?.avatar}
            alt={`${especialist?.name} ${especialist?.lastname}`}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="p-2 text-sm font-sans">
          <p>
            {especialist?.name} {especialist?.lastname}
          </p>
          <p className="text-muted-foreground">{especialist?.category}</p>
          <p className="text-muted-foreground mb-3">$ {especialist?.price}</p>

          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => alert(`Especialist: ${especialist?.name}`)}
          >
            Detalle
          </Button>
        </div>
      </div>
    </div>
  )
})

const MainMap = (props: Props) => {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const [zoom] = useState(9)
  const [lng] = useState(-70.9)
  const [lat] = useState(42.35)

  useEffect(() => {
    if (mapRef.current !== null) return // initialize map only once

    const map = new mapbox.Map({
      accessToken: env.mapboxAccessToken,
      container: mapContainerRef.current!,
      style: env.mapboxStyleUrl,
      center: [lng, lat],
      zoom
    })

    mapRef.current = map

    map.on('load', () => {
      // LOAD START

      map.addSource('earthquakes', {
        type: 'geojson',
        data: '/data/example-geojson.json',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      })

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      })

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      })

      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })

        const feature = features?.[0]
        const clusterId = feature.properties?.cluster_id
        const source = map.getSource('earthquakes') as mapboxgl.GeoJSONSource

        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || feature.geometry.type !== 'Point') return

          const center = feature.geometry.coordinates as mapboxgl.LngLatLike
          map.easeTo({ center, zoom })
        })
      })

      map.on('click', 'unclustered-point', (e) => {
        const feature = e.features?.[0]

        if (!feature) return null
        if (feature.geometry.type !== 'Point') return null

        const coordinates = feature.geometry.coordinates as [number, number]
        const properties = feature.properties as PropertyGeoJSON

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        useMapPopup.getState().set(properties)

        new mapbox.Popup({ closeButton: false })
          .setLngLat(coordinates)
          .setDOMContent(popupRef.current!)
          .addTo(map)
      })

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''
      })

      // LOAD END
    })
  }, [])

  return (
    <>
      <PopupBase ref={popupRef} />

      <div
        ref={mapContainerRef}
        className={cn('w-full h-full', props.className)}
      />
    </>
  )
}

export default MainMap
