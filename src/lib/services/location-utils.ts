import { currentDataSets, loggedInUser } from "$lib/runes.svelte";
import { climbfindService } from "./climbfind-service";
import type { Location, User } from "$lib/types/climbfind-types";

export function computeByCategory(locationList: Location[]) {
  currentDataSets.locationsByCategory.datasets[0].values = [0, 0, 0];
  
  locationList.forEach((location) => {
    if (location.category == "Indoor Climbing") {
      currentDataSets.locationsByCategory.datasets[0].values[0] += 1;
    } else if (location.category == "Outdoor Boulder") {
      currentDataSets.locationsByCategory.datasets[0].values[1] += 1;
    } else if (location.category == "Outdoor Trad") {
      currentDataSets.locationsByCategory.datasets[0].values[2] += 1;
    }
  });
}

export function computeByUser(locationList: Location[], users: User[]) {
  currentDataSets.locationsByUser.labels = [];
  currentDataSets.locationsByUser.datasets[0].values = [];
  
  users.forEach((user) => {
    currentDataSets.locationsByUser.labels.push(`${user.lastName}, ${user.firstName}`);
    currentDataSets.locationsByUser.datasets[0].values.push(0);
  });

  users.forEach((user, i) => {
    locationList.forEach((location) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const locationUserId = location.userid?._id || location.userid;
      if (String(locationUserId) === String(user._id)) {
        currentDataSets.locationsByUser.datasets[0].values[i] += 1;
      }
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function refreshLocationMap(map: any) {
  const locations = await climbfindService.getLocations(loggedInUser.token);
  locations.forEach((location: Location) => {
    if (location.userid && typeof location.userid !== "string") {
      const popup = `${location.title} - added by ${location.userid.firstName} ${location.userid.lastName}`;
      map.addMarker(location.latitude, location.longitude, popup);
    }
  });
  const lastLocation = locations[locations.length - 1];
  if (lastLocation) map.moveTo(lastLocation.latitude, lastLocation.longitude);
}