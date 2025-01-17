import * as React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import roomService from "../../../../services/roomService";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CreateOrEditEvent from "./common/CreateOrEditEvent";
import GeneralLoading from "../../../../components/base/GeneralLoading";
import { IRoom } from "../../../../types/room.types";
import Visibility from "../../../../components/base/visibility";
import imagesService from "../../../../services/imagesService";

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false);
  const [roomDetail, setEventDetail] = React.useState<IRoom>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      handleGetRoomDetail();
    }
  }, [id]);

  if (!id) {
    return <Navigate to={DEFINE_ROUTERS_ADMIN.eventsManager} />;
  }

  const handleGetRoomDetail = async () => {
    try {
      setLoading(true);
      const rs = await roomService.getRoom(id!);
      setEventDetail(rs.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: FormData, listImageDelete?: string[]) => {
    try {
      setLoading(true);
      const rs = await roomService.updateRoom(id!, data);
      if(listImageDelete?.length) await imagesService.deleteImages(listImageDelete)
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
      <Visibility visibility={Boolean(roomDetail?.id)}>
        <CreateOrEditEvent item={roomDetail} handleSubmit={handleSubmit} />
      </Visibility>
      <GeneralLoading isLoading={loading} />
    </>
  );
}
