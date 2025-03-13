import * as React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { IEvent } from "../../../../types/event.types";
import eventService from "../../../../services/eventService";
import Visibility from "../../../../components/base/visibility";
import GeneralLoading from "../../../../components/base/GeneralLoading";
import CreateOrEditEvent from "./common/CreateOrEditEvent";
import Tab from "./Tabs";
import CreateOrEditTicket from "./common/CreateOrEditTicket";

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false);
  const [eventDetail, setEventDetail] = React.useState<IEvent>();
  const navigate = useNavigate();

  
  React.useEffect(() => {
    if (id) {
      handleGetEventDetail();
    }
  }, [id]);

  if (!id) {
    return <Navigate to={DEFINE_ROUTERS_ADMIN.eventsManager} />;
  }

  const handleGetEventDetail = async () => {
    try {
      setLoading(true);
      const rs = await eventService.getEvent(id);
      setEventDetail(rs.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const rs = await eventService.updateEvent(id, data);
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
        Back
      </Button>
      <Tab
        eventContent={
          <Visibility visibility={Boolean(eventDetail?._id)}>
            <CreateOrEditEvent item={eventDetail} handleSubmit={handleSubmit} />
          </Visibility>
        }
        ticketContent={
          <Visibility visibility={Boolean(eventDetail?._id)}>
          <CreateOrEditTicket  />
        </Visibility>
        }
      />
      <GeneralLoading isLoading={loading} />
    </>
  );
}
