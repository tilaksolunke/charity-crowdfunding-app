interface CampaignType {
  _id: string;
  name: string;
  description: string;
  images: string[];
  targetAmount: number;
  collectedAmount: number;
  startDate: string;
  endDate: string;
  createdBy: UserType;
}

interface UserType {
  _id: string;
  userName: string;
  email: string;
  profilePic: string;
  isActive: boolean;
  isAdmin: boolean;
  clerkUserId: string;
}
