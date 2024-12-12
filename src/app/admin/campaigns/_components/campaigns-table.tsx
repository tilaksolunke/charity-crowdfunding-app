"use client";
import { Button, message, Table } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCampaign } from "@/actions/campaigns";

interface Props {
  campaigns: CampaignType[];
}

function CampaignsTable({ campaigns }: Props) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const result = await deleteCampaign(id);
      if (result.error) throw new Error(result.error);
      message.success("Campaign deleted successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render(category: string) {
        return <span>{category.toUpperCase()}</span>;
      },
    },
    {
      title: "Target Amount",
      dataIndex: "targetAmount",
      key: "targetAmount",
      render(targetAmount: number) {
        return `$${targetAmount}`;
      },
    },
    {
      title: "Collected Amount ",
      dataIndex: "collectedAmount",
      key: "collectedAmount",
      render(collectedAmount: number) {
        return `$${collectedAmount}`;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render(record: CampaignType) {
        return (
          <div className="flex gap-5">
            <Button
              onClick={() =>
                router.push(`/admin/campaigns/edit-campaign/${record._id}`)
              }
              size="small"
              icon={<i className="ri-edit-2-fill"></i>}
            />
            <Button
              size="small"
              onClick={() => onDelete(record._id)}
              icon={<i className="ri-delete-bin-fill"></i>}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={campaigns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default CampaignsTable;
