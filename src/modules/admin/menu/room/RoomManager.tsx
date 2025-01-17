import { Button,  message, Modal, Spin, Table, TableProps } from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { IQueryUser } from "../../../../types/user.types";
import { DeleteOutlined } from "@ant-design/icons";
import { IRoom } from "../../../../types/room.types";
import { useNavigate } from "react-router-dom";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import roomService from "../../../../services/roomService";

export default function RoomManager() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    nameLike: "",
  });
  const [roomList, setRoomList] = React.useState<IRoom[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetRoomList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await roomService.getAllRooms(queryParam);
      setRoomList(rs.data.content);
      setQuery({
        ...queryParam,
        total: rs.data.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (_room: IRoom) => {
    Modal.confirm({
      title: "Bạn có muốn xóa phòng này này",
      content: `Phòng: ${_room.name}`,
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
          const rs = await roomService.deleteRoom(_room.id);
          message.success(rs.message);
          handleGetRoomList();
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetRoomList();
  }, []);

  const columns: TableProps<IRoom>["columns"] = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      align: "justify",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Ảnh phòng",
      dataIndex: "img_1",
      key: "icon",
      render: (img) => <img className="h-[80px]" src={img} />,
    },
    {
      title: "Loại giường",
      dataIndex: "bedType",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Diện tích phòng",
      dataIndex: "acreage",
      align: "center",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text} m2</span>,
    },
    {
      title: "Xóa phòng",
      key: "deleteRoom",
      align: "center",
      dataIndex: "deleteRoom",
      render: (_, _item: IRoom) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRoom(_item);
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

  const handleClickRow = (record: IRoom) => {
    navigate(DEFINE_ROUTERS_ADMIN.editRoom.replace(":id", record.id));
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">
          Danh sách các phòng trong khách sạn
        </h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.nameLike!}
            onHandleChange={(value) => {
              setQuery({ ...query, nameLike: value });
              if (!value)
                handleGetRoomList({
                  page: query.page,
                  limit: query.limit,
                });
            }}
            onSearch={() => handleGetRoomList()}
          />
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              navigate(DEFINE_ROUTERS_ADMIN.newRoom);
            }}
          >
            Thêm 1 phòng mới
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<IRoom>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={roomList}
              pagination={{
                current: query.page,
                pageSize: query.limit,
                total: query.total,
                onChange: (page, limit) => {
                  handleGetRoomList({
                    ...query,
                    page,
                    limit,
                  });
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
