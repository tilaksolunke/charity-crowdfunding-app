import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    collectedAmount: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    showDonarsInCampaign: { type: Boolean, required: true, default: true },
    images: { type: Array, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.campaigns) {
  delete mongoose.models.campaigns;
}

const CampaignModel = mongoose.model("campaigns", campaignSchema);

export default CampaignModel;
