import * as React from "react";
import CreateOrEditRoom from "./common/CreateOrEditRoom";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GeneralLoading from "../../../../components/base/GeneralLoading";
import roomService from "../../../../services/roomService";

export default function CreateRoom() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const rs = await roomService.createRoom(data);
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
      <CreateOrEditRoom handleSubmit={handleSubmit} />
      <GeneralLoading isLoading={loading} />
    </>
  );
}
