import * as React from 'react';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  TimePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { formatter, parser } from '../../../../../utils/input-format-money';
import ImgUpload from '../../../../../components/base/ImgUpload';
import { IEvent } from '../../../../../types/event.types';
import dayjs, { Dayjs } from 'dayjs';
import imagesService from '../../../../../services/imagesService';
import onRemoveParams from '../../../../../utils/on-remove-params';
import ExtractNameEventType from '../../../../../utils/extract-name-event-type';

interface IProps {
  item?: IEvent;
  handleSubmit: (data: Record<string, any>) => void;
}

type FieldType = {
  name: string;
  imageThumbnail?: string;
  startDate: Dayjs;
  endDate?: Dayjs;
  startTime?: Dayjs;
  endTime?: Dayjs;
  location: string;
  description?: string;
  capacity: number;
  eventOrganization: string;
  type: string;
};

const DEFINE_OPTIONS = [
  {
    value: "MUSIC_CONCERT",
    label: ExtractNameEventType("MUSIC_CONCERT"),
  },
  {
    value: "CULTURAL_ARTS",
    label: ExtractNameEventType("CULTURAL_ARTS"),
  },
  {
    value: "TRAVEL",
    label: ExtractNameEventType("TRAVEL"),
  },
  {
    value: "WORKSHOP",
    label: ExtractNameEventType("WORKSHOP"),
  },
  {
    value: "MOVIE",
    label: ExtractNameEventType("MOVIE"),
  },
  {
    value: "TOUR",
    label: ExtractNameEventType("TOUR"),
  },
  {
    value: "SPORTS",
    label: ExtractNameEventType("SPORTS"),
  },
  {
    value: "NEWS",
    label: ExtractNameEventType("NEWS"),
  },
  {
    value: "OTHER",
    label: ExtractNameEventType("OTHER"),
  },
]

export default function CreateOrEditEvent({ item, handleSubmit }: IProps) {
  const [file, setFile] = React.useState<any>();

  const [image, setImage] = React.useState<any>(item?.imageThumbnail);

  const [listImageDelete, setListImageDelete] = React.useState<string[]>([]);

  const [form] = Form.useForm();

  const handleDeleteImages = async () => {
    await imagesService.deleteImages(listImageDelete);
  };

  const formatDate = (date: Dayjs) => date.format('YYYY-MM-DD');
  const formatTime = (time: Dayjs) => time.format('HH:mm');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      if (item?._id && listImageDelete?.length) handleDeleteImages();
      const data = { ...values };
      let imageThumbnail = '';
      if (file) {
        const data = new FormData();
        data.append('image', file);
        const rs = await imagesService.uploadImage(data);
        imageThumbnail = rs.data;
      }

      const body = onRemoveParams({
        imageThumbnail,
        name: data.name,
        description: data.description ?? '',
        startDate: formatDate(values.startDate),
        endDate: values.endDate  ? formatDate(values.endDate) : null,
        startTime: values.startTime ? formatTime(values.startTime) : null,
        endTime: values.endTime ? formatTime(values.endTime) : null,
        location: data.location,
        capacity: data.capacity,
        eventOrganization: data.eventOrganization,
        type: data.type,
      });

      handleSubmit(body);
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleUploadFile = async (file: File | undefined) => {
    if (file === undefined && item) {
      const urlImage = item.imageThumbnail ?? '';
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
          startDate: item?.startDate ? dayjs(item.startDate) : dayjs(),
          endDate: item?.endDate ? dayjs(item.endDate) : dayjs(),
          startTime: item?.startTime ? dayjs(item.startTime, 'HH:mm') : dayjs(),
          endTime: item?.endTime ? dayjs(item.endTime, 'HH:mm') : dayjs(),
          location: item?.location ?? '',
          capacity: item?.capacity ?? null,
          eventOrganization: item?.eventOrganization ?? '',
          type: item?.type ?? '',
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên sự kiện"
          name="name"
          rules={[{ required: true, message: 'Hãy điền tên sự kiện' }]}
        >
          <Input className="w-full" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Địa điểm tổ chức"
          name="location"
          rules={[{ required: true, message: 'Hãy điền địa điểm tổ chức sự kiện' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ngày bắt đầu"
          name="startDate"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
        >
          <DatePicker 
            format="DD/MM/YYYY" 
            className="w-full"
            disabledDate={(current) => current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giờ bắt đầu"
          name="startTime"
          rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
        >
          <TimePicker 
            format="HH:mm" 
            className="w-full" 
            minuteStep={15}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ngày kết thúc"
          name="endDate"
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
        >
          <DatePicker 
            format="DD/MM/YYYY" 
            className="w-full"
            disabledDate={(current) => current < dayjs().startOf('day')}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giờ kết thúc"
          name="endTime"
          rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}
        >
          <TimePicker 
            format="HH:mm" 
            className="w-full" 
            minuteStep={15}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Sức chứa của sự kiện"
          name="capacity"
          rules={[
            {
              required: true,
              message: 'Hãy điền sức chứa của sự kiện',
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
          label="Đơn vị tổ chức sự kiện"
          name="eventOrganization"
          rules={[
            {
              required: true,
              message: 'Hãy điền đơn vị tổ chức sự kiện',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Loại sự kiện"
          name="type"
          rules={[
            {
              required: true,
              message: 'Hãy chọn sự kiện',
            },
          ]}
        >
          <Select options={DEFINE_OPTIONS}/>
        </Form.Item>

        <Form.Item<FieldType> label="Mô tả sự kiện" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item<any>
          label={
            <div className="text-sm space-x-2">
              <span>Ảnh đại diện sự kiện</span>
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
            {item?._id ? 'Cập nhật sự kiện' : 'Thêm mới sự kiện'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
