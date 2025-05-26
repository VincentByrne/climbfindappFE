import axios from "axios";
import type { Session, User, Location, Image } from "$lib/types/climbfind-types";
import { loggedInUser, currentLocations, currentImages, currentUsers } from "$lib/runes.svelte";
import { computeByCategory, computeByUser } from "./location-utils.js";

export const climbfindService = {
   //baseUrl: "http://localhost:3000",
   baseUrl: "https://climbfindbe.glitch.me/",

    saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.climbfind = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.climbfind;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    if (loggedInUser.token) {
      await this.refreshLocationInfo();
      await this.refreshUserInfo();
    }
  },

  clearSession() {
    currentLocations.locations = [];
    currentImages.images = [];
    currentUsers.users = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("climbfind");
  },

  async signup(user: User): Promise<boolean> {
  try {
    console.log('Signup service called with:', user);
    const response = await axios.post(`${this.baseUrl}/api/users`, user);
    console.log('Signup response:', response.data);
    
    return response.status === 201;
  } catch (error) {
    console.error('Signup error:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', error.response.data);
    }
    return false;
  }
},

  async refreshLocationInfo() {
  if (loggedInUser.token) {
    currentLocations.locations = await this.getLocations(loggedInUser.token);
    currentImages.images = await this.getImages(loggedInUser.token);
    computeByCategory(currentLocations.locations);
    computeByUser(currentLocations.locations, currentUsers.users);
  }
},

  async refreshUserInfo() {
  if (loggedInUser.token) {
    currentUsers.users = await this.getUsers(loggedInUser.token);
    computeByUser(currentLocations.locations, currentUsers.users);
  }
},

   async login(email: string, password: string): Promise<Session | null> {
  try {
    const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
      email,
      password
    });
    if (response.data.success) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      const session: Session = {
        name: response.data.name,
        token: response.data.token,
        _id: response.data._id
      };
      this.saveSession(session, email);
      await this.refreshLocationInfo();
      await this.refreshUserInfo();
      return session;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
},

  async getUsers(token: string): Promise<User[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

   async getLocations(token: string): Promise<Location[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/locations`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getLocationById(id: string, token: string): Promise<Location | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/locations/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async addLocation(location: Location, token: string): Promise<Location | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/locations`, location);
    
      await this.refreshLocationInfo();
      
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteLocation(id: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/locations/${id}`);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getImages(token: string): Promise<Image[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/images`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getImagesByLocation(locationId: string, token: string): Promise<Image[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const location = await this.getLocationById(locationId, token);
      return location?.images || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async addImage(locationId: string, image: Image, token: string): Promise<Image | null> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/locations/${locationId}/images`, image);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async deleteImage(id: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/images/${id}`);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  

  

};