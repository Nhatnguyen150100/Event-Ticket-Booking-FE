import * as React from "react";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GeneralLoading from "../../../../components/base/GeneralLoading";
import eventService from "../../../../services/eventService";
import CreateOrEditEvent from "./common/CreateOrEditEvent";

export default function CreateEvent() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const rs = await eventService.createEvent(data);
      message.success(rs.message);
      navigate(-1);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        className="min-w-[220px]"
        icon={<ArrowLeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        Trở lại
      </Button>
      <CreateOrEditEvent handleSubmit={handleSubmit} />
      <GeneralLoading isLoading={loading} />
    </>
  );
}
