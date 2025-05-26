<script lang="ts">
  import { onMount } from "svelte";

  export let height: number = 80;
  let id = "climbfind-map-id";
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
  let minZoom = 7;
  let activeLayer = "Terrain";
  
  let imap: any;
  let control: any;
  let overlays: any = {};
  let baseLayers: any;
  let L: any;

  onMount(() => {
    L = (window as any).L;
    
    // Icon Fix Andre
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
    
    const DefaultIcon = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    
    baseLayers = {
      Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri"
      })
    };
    
    let defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom,
      minZoom,
      layers: [defaultLayer]
    });
    
    control = L.control.layers(baseLayers, overlays).addTo(imap);
  });

  export function addMarker(lat: number, lng: number, popupText: string) {
    if (!L || !imap) return;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }

  export function moveTo(lat: number, lng: number) {
    if (!L || !imap) return;
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div {id} class="box" style="height: {height}vh"></div>