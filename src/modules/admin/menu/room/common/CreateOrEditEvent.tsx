import * as React from "react";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { formatter, parser } from "../../../../../utils/input-format-money";
import ImgUpload from "../../../../../components/base/ImgUpload";
import { IEvent } from "../../../../../types/event.types";
import dayjs from "dayjs";
import imagesService from "../../../../../services/imagesService";
import onRemoveParams from "../../../../../utils/on-remove-params";

interface IProps {
  item?: IEvent;
  handleSubmit: (data: Record<string, any>) => void;
}

type FieldType = {
  name: string;
  imageThumbnail?: string;
  time: string;
  location: string;
  description?: string;
  capacity: number;
  ticketsAvailable: number;
  priceTicket: number;
};

export default function CreateOrEditEvent({ item, handleSubmit }: IProps) {
  const [file, setFile] = React.useState<any>();

  const [image, setImage] = React.useState<any>(item?.imageThumbnail);

  const [listImageDelete, setListImageDelete] = React.useState<string[]>([]);

  const [form] = Form.useForm();

  const handleDeleteImages = async () => {
    await imagesService.deleteImages(listImageDelete);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (item?._id && listImageDelete?.length) handleDeleteImages();
      const data = { ...values };
      let imageThumbnail = "";
      if (file) {
        const data = new FormData();
        data.append("image", file);
        const rs = await imagesService.uploadImage(data);
        imageThumbnail = rs.data;
      }

      const body = onRemoveParams({
        imageThumbnail,
        name: data.name,
        description: data.description ?? "",
        time: data.time,
        location: data.location,
        capacity: data.capacity,
        ticketsAvailable: data.ticketsAvailable,
        priceTicket: data.priceTicket,
      });

      handleSubmit(body);
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleUploadFile = async (file: File | undefined) => {
    if (file === undefined && item) {
      const urlImage = item.imageThumbnail ?? "";
      const newArr = listImageDelete;
      newArr.push(urlImage);
      setListImageDelete(newArr);
    }
    setFile(file);
    setImage(null);
  };

  return (
    <div className="w-full pe-10">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          name: item?.name,
          description: item?.description,
          time: item?.time ? dayjs(item?.time) : "",
          location: item?.location ?? "",
          capacity: item?.capacity ?? 0,
          ticketsAvailable: item?.ticketsAvailable ?? 0,
          priceTicket: item?.priceTicket ?? 0,
        }}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Form.Item<FieldType>
              label="Event name"
              name="name"
              rules={[{ required: true, message: "Please enter event name" }]}
            >
              <Input className="w-full" size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Event venue"
              name="location"
              rules={[{ required: true, message: "Please enter event venue" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Date of organization"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please enter date of organization",
                },
              ]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                minDate={dayjs().add(1, "day")}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item<FieldType>
              label="Capacity"
              name="capacity"
              rules={[
                {
                  required: true,
                  message: "Please enter capacity",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={formatter}
                parser={parser}
                min={0}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Tickets Available"
              name="ticketsAvailable"
              rules={[
                {
                  required: true,
                  message: "Please enter tickets available",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={formatter}
                parser={parser}
                min={0}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="priceTicket"
              name="priceTicket"
              rules={[
                {
                  required: true,
                  message: "Please enter price ticket",
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={formatter}
                parser={parser}
                min={0}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item<FieldType> label="Description" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item<any>
          label={
            <div className="text-sm space-x-2">
              <span>Thumbnail image event</span>
            </div>
          }
        >
          <ImgUpload
            imgProps={image}
            file={file}
            handleUploadFile={handleUploadFile}
          />
        </Form.Item>

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {item?._id ? "Update event" : "Add new event"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
