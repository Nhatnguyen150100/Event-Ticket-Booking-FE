import { Button, message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { IQueryUser } from "../../../../types/user.types";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import { IEvent } from "../../../../types/event.types";
import eventService from "../../../../services/eventService";
import { formatDate } from "../../../../utils/format-date";
import ExtractNameEventType from "../../../../utils/extract-name-event-type";

export default function EventsManger() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    nameLike: "",
  });
  const [eventsList, setEventsList] = React.useState<IEvent[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetEventsList = async () => {
    try {
      setLoading(true);
      const rs = await eventService.getAllEvents(query);
      setEventsList(rs.data.content);
      setQuery({
        ...query,
        total: rs.data.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (_item: IEvent) => {
    Modal.confirm({
      title: "Bạn có muốn xóa sự kiện này không?",
      content: `Sự kiện: ${_item.name}`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await eventService.deleteEvent(_item._id);
          message.success(rs.message);
          handleGetEventsList();
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetEventsList();
  }, [query.page, query.limit]);

  const columns: TableProps<IEvent>["columns"] = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Tên sự kiện",
      dataIndex: "name",
      align: "justify",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Loại sự kiện",
      dataIndex: "type",
      align: "justify",
      key: "type",
      render: (text) => <span className="text-lg font-medium">{ExtractNameEventType(text)}</span>,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "imageThumbnail",
      key: "icon",
      render: (img) => (
        <img crossOrigin="anonymous" className="h-[80px]" src={img} />
      ),
    },
    {
      title: "Thời gian tổ chức",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <span className="text-lg font-medium">{formatDate(text)}</span>
      ),
    },
    {
      title: "Địa điểm tổ chức sự kiện",
      dataIndex: "location",
      key: "location",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
      render: (text) => <span className="text-lg font-medium ">{text.toLocaleString()}</span>,
    },
    {
      title: "Đơn vị tổ chức",
      dataIndex: "eventOrganization",
      key: "eventOrganization",
      render: (text) => (
        <span className="text-lg font-medium">{text}</span>
      ),
    },
    {
      title: "Xóa sự kiện",
      key: "deleteEvent",
      align: "center",
      dataIndex: "deleteEvent",
      render: (_, _item: IEvent) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEvent(_item);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const handleClickRow = (record: IEvent) => {
    navigate(DEFINE_ROUTERS_ADMIN.editEvent.replace(":id", record._id));
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Quản lý danh sách dự kiện</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.nameLike!}
            onHandleChange={(value) => {
              setQuery({ ...query, nameLike: value });
            }}
            onSearch={() => handleGetEventsList()}
          />
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              navigate(DEFINE_ROUTERS_ADMIN.newEvent);
            }}
          >
            Thêm mới sự kiện
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<IEvent>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={eventsList}
              pagination={{
                current: query.page,
                pageSize: query.limit,
                total: query.total,
                onChange: (page, limit) => {
                  setQuery({ ...query, page, limit });
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
