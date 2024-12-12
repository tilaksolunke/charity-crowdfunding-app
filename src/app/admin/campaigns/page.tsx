import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import { connectDB } from "@/db/config";
import CampaignModel from "@/models/campaign-model";
import React from "react";
import CampaignsTable from "./_components/campaigns-table";
connectDB();

async function CampaignsPage() {
  const campaigns: CampaignType[] = (await CampaignModel.find().sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Campaigns" />
        <LinkButton
          title="Create Campaign"
          path="/admin/campaigns/new-campaign"
        />
      </div>

      <CampaignsTable campaigns={JSON.parse(JSON.stringify(campaigns))} />
    </div>
  );
}

export default CampaignsPage;
