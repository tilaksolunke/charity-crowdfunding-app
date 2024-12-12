export const dynamic = "force-dynamic";

import PageTitle from "@/components/page-title";
import React from "react";
import CampaignForm from "../../_components/campaign-form";
import CampaignModel from "@/models/campaign-model";
import { connectDB } from "@/db/config";

connectDB();
interface Props {
  params: {
    campaignid: string;
  };
}

async function EditCampaignPage({ params }: Props) {
  const campaign = await CampaignModel.findById(params.campaignid);
  return (
    <div>
      <PageTitle title="Edit Campaign" />
      {campaign && (
        <CampaignForm
          initialData={JSON.parse(JSON.stringify(campaign))}
          isEditFrom={true}
        />
      )}
    </div>
  );
}

export default EditCampaignPage;
