import type { Location, Image, User } from "./types/climbfind-types";

export const subTitle = $state({ text: "" });

export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});

export const currentLocations = $state({ locations: [] as Location[] });

export const currentImages = $state({ images: [] as Image[] });

export const currentUsers = $state({ users: [] as User[] });

export const currentDataSets = $state({
  locationsByCategory: {
    labels: ["Indoor Climbing", "Outdoor Boulder", "Outdoor Trad"],
    datasets: [
      {
        values: [0, 0, 0]
      }
    ]
  },
  locationsByUser: {
    labels: [] as string[], // Need to specify the type, throwing errors otherwise.
    datasets: [
      {
        values: [] as number[]  
      }
    ]
  }
});