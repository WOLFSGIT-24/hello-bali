export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  submittedAt: string;
  source: string;
  preferredDate?: string;
  preferredTime?: string;
  status: "Pending" | "Contacted" | "Scheduled" | "Completed";
  notes?: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  imageUrl: string;
  images: string[];
  bullets: string[];
}

export interface FloorPlanUnit {
  id: string;
  unitNo?: string;
  title: string;
  type: string;
  facing?: string;
  sbua: string;
  carpetArea: string;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  highlights: string[];
}

export interface CommuteDestination {
  id: string;
  name: string;
  distance: string;
  icon: string;
  category: "Business" | "School" | "Hospital" | "Leisure" | "Transit";
  times: {
    driving: number;
    transit: number;
    walking: number;
  };
}

export interface SpecificationCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface ConsultantItem {
  role: string;
  name: string;
  address: string;
}

export interface TrackRecordProject {
  title: string;
  type: string;
  location: string;
  imageUrl: string;
}

export interface MasterPlanPoint {
  id: number;
  name: string;
  category: "Entrance & Arrival" | "Sports & Wellness" | "Family & Kids" | "Nature & Landscape" | "Infrastructure";
}

