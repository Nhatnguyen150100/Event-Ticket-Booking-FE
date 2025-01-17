import * as React from "react";
import { IRoom } from "../../../../../types/room.types";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import onRemoveParams from "../../../../../utils/on-remove-params";
import TextArea from "antd/es/input/TextArea";
import { formatter, parser } from "../../../../../utils/input-format-money";
import ImgUpload from "../../../../../components/base/ImgUpload";
import facilitiesService from "../../../../../services/facilitiesService";
import { IFacilities } from "../../../../../types/facilities.types";

interface IProps {
  item?: IRoom;
  handleSubmit: (data: FormData, listImageDelete?: string[]) => void;
}

type FieldType = {
  name: string;
  description: string;
  bedType: string;
  acreage: number;
  normalDayPriceStart?: number;
  normalDayPriceEnd?: number;
  summerPriceStart?: number;
  summerPriceEnd?: number;
  hotDayPriceStart?: number;
  hotDayPriceEnd?: number;
  holidayPriceStart?: number;
  holidayPriceEnd?: number;
  titleHoliday?: string;
};

export default function CreateOrEditRoom({ item, handleSubmit }: IProps) {
  const [facilitiesList, setFacilities] = React.useState<IFacilities[]>([]);
  const [listFacilitiesId, setListFacilitiesId] = React.useState<string[]>(
    item?.facilitiesRooms?.map((item) => item.facilityId) ?? []
  );
  const [files, setFiles] = React.useState<any>({
    img_1: undefined,
    img_2: undefined,
    img_3: undefined,
    img_4: undefined,
    img_5: undefined,
    img_6: undefined,
  });

  const [listImg, setListImg] = React.useState<any>({
    img_1: item?.img_1,
    img_2: item?.img_2,
    img_3: item?.img_3,
    img_4: item?.img_4,
    img_5: item?.img_5,
    img_6: item?.img_6,
  });

  const [listImageDelete, setListImageDelete] = React.useState<string[]>([]);

  const [form] = Form.useForm();

  const handleGetFacilitiesList = async () => {
    const rs = await facilitiesService.getAllFacilities({});
    setFacilities(rs.data.content);
  };

  const optionsSelect = React.useMemo(() => {
    return facilitiesList.map((item) => ({
      label: (
        <div className="flex flex-row justify-start items-center space-x-3">
          <img
            className="h-[24px] w-[24px]"
            src={`/icon-facilities/${item.icon}.png`}
          />
          <span>{item.name}</span>
        </div>
      ),
      value: item.id,
    }));
  }, [facilitiesList]);

  React.useEffect(() => {
    handleGetFacilitiesList();
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = { ...values };
    if (listFacilitiesId.length < 0) {
      message.error("Hãy chọn tiện ích cho phòng");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("bedType", data.bedType);
    formData.append("acreage", data.acreage.toString());
    formData.append("normalDayPriceStart", data.normalDayPriceStart?.toString() ?? "");
    formData.append("normalDayPriceEnd", data.normalDayPriceEnd?.toString() ?? "");
    formData.append("summerPriceStart", data.summerPriceStart?.toString() ?? "");
    formData.append("summerPriceEnd", data.summerPriceEnd?.toString() ?? "");
    formData.append("hotDayPriceStart", data.hotDayPriceStart?.toString() ?? "");
    formData.append("hotDayPriceEnd", data.hotDayPriceEnd?.toString() ?? "");
    formData.append("holidayPriceStart", data.holidayPriceStart?.toString() ?? "");
    formData.append("holidayPriceEnd", data.holidayPriceEnd?.toString() ?? "");
    formData.append("titleHoliday", data.titleHoliday?.toString() ?? "");
    formData.append("listFacilitiesId", listFacilitiesId.toString() ?? "");
    const listImg = onRemoveParams(files, [""]);
    if (Object.keys(listImg).length > 0) {
      for (const key in listImg) {
        formData.append(key, listImg[key]);
      }
    }
    handleSubmit(
      formData,
      listImageDelete.map((imageDelete) => imageDelete)
    );
  };

  const handleUploadFile = (
    file: File | undefined,
    field: "img_1" | "img_2" | "img_3" | "img_4" | "img_5" | "img_6"
  ) => {
    if (file === undefined && item) {
      const urlImage = item[field] ?? "";
      const newArr = listImageDelete;
      newArr.push(urlImage);
      setListImageDelete(newArr);
    }
    setFiles((pre: any) => ({
      ...pre,
      [field]: file ?? "",
    }));
    setListImg((pre: any) => ({
      ...pre,
      [field]: null,
    }));
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
          bedType: item?.bedType,
          acreage: item?.acreage,
          normalDayPriceStart: item?.normalDayPriceStart,
          normalDayPriceEnd: item?.normalDayPriceEnd,
          summerPriceStart: item?.summerPriceStart,
          summerPriceEnd: item?.summerPriceEnd,
          hotDayPriceStart: item?.hotDayPriceStart,
          hotDayPriceEnd: item?.hotDayPriceEnd,
          holidayPriceStart: item?.holidayPriceStart,
          holidayPriceEnd: item?.holidayPriceEnd,
          titleHoliday: item?.titleHoliday,
        }}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Form.Item<FieldType>
              label="Tên phòng"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên phòng" }]}
            >
              <Input className="w-full" size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Loại giường"
              name="bedType"
              rules={[
                { required: true, message: "Hãy nhập loại giường trong phòng" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Diện tích phòng"
              name="acreage"
              rules={[{ required: true, message: "Hãy nhập diện tích phòng" }]}
            >
              <InputNumber
                placeholder="Diện tích phòng (m2)"
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mô tả phòng"
              name="description"
              rules={[{ required: true, message: "Hãy nhập mô tả phòng" }]}
            >
              <TextArea className="h-full" rows={8}/>
            </Form.Item>

            <Form.Item<FieldType>
              label="Tiêu đề ngày lễ"
              name="titleHoliday"
              rules={[{ required: true, message: "Hãy nhập mô tả ngày lễ" }]}
            >
              <TextArea className="h-full" rows={3}/>
            </Form.Item>
          </div>
          <div>
            <Form.Item<FieldType>
              label="Giá phòng tháng thấp điểm - giá đầu"
              name="normalDayPriceStart"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              rules={[
                { required: true, message: "Hãy nhập giá thuê thấp nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng tháng thấp điểm - giá cuối"
              name="normalDayPriceEnd"
              rules={[
                { required: true, message: "Hãy nhập giá thuê cao nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng tháng đầu hè - giá đầu"
              name="summerPriceStart"
              rules={[
                { required: true, message: "Hãy nhập giá thuê thấp nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng tháng đầu hè - giá cuối"
              name="summerPriceEnd"
              rules={[
                { required: true, message: "Hãy nhập giá thuê cao nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng tháng cao điểm - giá đầu"
              name="hotDayPriceStart"
              rules={[
                { required: true, message: "Hãy nhập giá thuê thấp nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng tháng cao điểm - giá cuối"
              name="hotDayPriceEnd"
              rules={[
                { required: true, message: "Hãy nhập giá thuê cao nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng ngày lễ - giá đầu"
              name="holidayPriceStart"
              rules={[
                { required: true, message: "Hãy nhập giá thuê thấp nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              label="Giá phòng ngày lễ - giá cuối"
              name="holidayPriceEnd"
              rules={[
                { required: true, message: "Hãy nhập giá thuê cao nhất" },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                formatter={formatter}
                parser={parser}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item<FieldType>
          label={
            <div className="text-sm space-x-2">
              <span className="text-red-500">*</span>
              <span>Danh sách tiện ích</span>
            </div>
          }
          labelCol={{ span: 3 }}
        >
          <Select
            size="large"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Chọn tiện ích"
            value={listFacilitiesId}
            onChange={(value) => setListFacilitiesId(value)}
            options={optionsSelect}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-4 mt-4">
          <div>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_1}
                file={files.img_1}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_1")
                }
              />
            </Form.Item>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_2}
                file={files.img_2}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_2")
                }
              />
            </Form.Item>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_3}
                file={files.img_3}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_3")
                }
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_4}
                file={files.img_4}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_4")
                }
              />
            </Form.Item>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_5}
                file={files.img_5}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_5")
                }
              />
            </Form.Item>
            <Form.Item<any>
              label={
                <div className="text-sm space-x-2">
                  <span>Ảnh của phòng</span>
                </div>
              }
            >
              <ImgUpload
                imgProps={listImg.img_6}
                file={files.img_6}
                handleUploadFile={(file: File | undefined) =>
                  handleUploadFile(file, "img_6")
                }
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {item?.id ? "Cập nhật phòng" : "Thêm mới phòng"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
