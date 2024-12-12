"use client";
import { addNewCampaign, editCampaign } from "@/actions/campaigns";
import { uploadImagesToFirebaseAndReturnUrls } from "@/helpers/uploads";
import { Button, Form, Input, message, Select, Switch, Upload } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const { TextArea } = Input;
const categories = [
  {
    value: "medical",
    label: "Medical",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "emergency",
    label: "Emergency",
  },
  {
    value: "Environment",
    label: "Environment",
  },
  {
    value: "others",
    label: "Others",
  },
];

interface Props {
  initialData?: any;
  isEditFrom?: boolean;
}

function CampaignForm({ initialData, isEditFrom = false }: Props) {
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState(
    initialData?.isActive || false
  );
  const [showDonarsInCampaign, setShowDonarsInCampaign] = React.useState(
    initialData?.showDonarsInCampaign || false
  );
  const [newlySelectedFiles = [], setNewlySelectedFiles] = React.useState<
    any[]
  >([]);

  const [existingImages, setExistingImages] = React.useState<any[]>(
    initialData?.images || []
  );
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.isActive = isActive;
      values.showDonarsInCampaign = showDonarsInCampaign;

      const newlyUploadedImages = await uploadImagesToFirebaseAndReturnUrls(
        newlySelectedFiles
      );

      values.images = [...existingImages, ...newlyUploadedImages];

      let response: any = null;
      if (isEditFrom) {
        values._id = initialData._id;
        response = await editCampaign(values);
      } else {
        response = await addNewCampaign(values);
      }
      if (response.error) throw new Error(response.error);
      message.success(response.message);
      router.refresh();
      router.push("/admin/campaigns");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        onFinish(values);
      }}
      initialValues={initialData}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-3">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input a name" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="lg:col-span-3">
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input a description" }]}
          >
            <TextArea />
          </Form.Item>
        </div>

        <Form.Item
          name="organizer"
          label="Organizer"
          rules={[{ required: true, message: "Please input an organizer" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="targetAmount"
          label="Target Amount"
          rules={[{ required: true, message: "Please input an target amount" }]}
        >
          <Input type="number" min={100} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input a category" }]}
        >
          <Select options={categories} />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start date"
          rules={[{ required: true, message: "Please input a start date" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End date"
          rules={[{ required: true, message: "Please input a end date" }]}
        >
          <Input type="date" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 ml-3">
        <div className="flex gap-5">
          <span>Is Active?</span>
          <Switch
            checked={isActive}
            onChange={(checked) => setIsActive(checked)}
          />
        </div>

        <div className="flex gap-5">
          <span>Show Donars in Campaign ?</span>
          <Switch
            checked={showDonarsInCampaign}
            onChange={(checked) => setShowDonarsInCampaign(checked)}
          />
        </div>
      </div>

      <Upload
        className="mt-5 ml-5"
        beforeUpload={(file) => {
          setNewlySelectedFiles((prev) => [...prev, file]);
          return false;
        }}
        listType="picture-card"
        multiple
      >
        Upload Images
      </Upload>

      <div className="flex flex-wrap mt-5 gap-5">
        {existingImages.map((image, index) => (
          <div
            className="p-3 border rounded flex flex-col gap-2 border-dashed"
            key={index}
          >
            <img className="w-24 h-24 object-cover" src={image} alt="" />
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setExistingImages((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              Delete
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-5 mr-3 mt-5">
        <Button onClick={() => router.push("/admin/campaigns")}>Cancle</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default CampaignForm;
