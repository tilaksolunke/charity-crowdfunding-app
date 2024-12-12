"use server";

import CampaignModel from "@/models/campaign-model";
import { getCurrentUserDataFromMongoDB } from "./users";
import { connectDB } from "@/db/config";
import { message } from "antd";
import { revalidatePath } from "next/cache";

connectDB();

export const addNewCampaign = async (reqBody: any) => {
  try {
    const currentUser = await getCurrentUserDataFromMongoDB();
    reqBody.createdBy = currentUser?.data?._id;
    const campaign = new CampaignModel(reqBody);
    await campaign.save();
    revalidatePath(`/admin/campaigns`);
    return {
      message: "Campaign added successfully.",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const editCampaign = async (reqBody: any) => {
  try {
    await CampaignModel.findOneAndUpdate(
      { _id: reqBody._id },
      { $set: reqBody }
    );
    return {
      message: "Campaign updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    await CampaignModel.findByIdAndDelete(id);
    revalidatePath(`/admin/campaigns`);
    return {
      message: "Campaign deleted successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
