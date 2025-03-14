import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Table,
  TableProps,
} from 'antd';
import * as React from 'react';
import TicketService from '../../../../../services/ticketService';
import { useParams } from 'react-router-dom';
import { ITicket } from '../../../../../types/ticket.types';
import ExtractNameTicketType from '../../../../../utils/extract-name-ticket-type';

export default function CreateOrEditTicket() {
  const { id: eventId } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [tickets, setTickets] = React.useState<ITicket[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<ITicket | null>(
    null,
  );

  React.useEffect(() => {
    if (eventId) {
      fetchTickets(eventId);
    }
  }, [eventId]);

  React.useEffect(() => {
    if (openModal && isEditMode && selectedTicket) {
      form.setFieldsValue({
        type: selectedTicket.type,
        price: selectedTicket.price,
        quantity: selectedTicket.quantity,
      });
    }
  }, [openModal, isEditMode, selectedTicket, form]);

  const fetchTickets = async (eventId: string) => {
    try {
      setLoading(true);
      const rs = await TicketService.getAllTickets(eventId);
      setTickets(rs.data.content || []);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const ticketData = {
        ...values,
        eventId: eventId,
        quantity: parseInt(values.quantity)
      };

      if (isEditMode && selectedTicket) {
        await TicketService.updateTicket(selectedTicket._id, ticketData);
        message.success('Cập nhật vé thành công!');
      } else {
        await TicketService.createTicket(ticketData);
        message.success('Tạo vé thành công!');
      }

      setOpenModal(false);
      fetchTickets(eventId as string);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticket: ITicket) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa vé này không?',
      content: `Vé: ${ExtractNameTicketType(ticket.type)}`,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      style: {
        top: '50%',
        transform: 'translateY(-50%)',
      },
      onOk: async () => {
        try {
          setLoading(true);
          await TicketService.deleteTicket(ticket._id);
          message.success('Xóa vé thành công!');
          fetchTickets(eventId as string);
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setSelectedTicket(null);
    form.resetFields();
    setOpenModal(true);
  };

  const handleEdit = (ticket: ITicket) => {
    setIsEditMode(true);
    setSelectedTicket(ticket);
    setOpenModal(true);
  };

  const columns: TableProps<ITicket>['columns'] = [
    {
      title: 'Số thứ tự',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Loại vé',
      dataIndex: 'type',
      render: (text) => `${ExtractNameTicketType(text)}`,
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      render: (price) => `${price.toLocaleString()}`,
    },
    {
      title: 'Số lượng vé bán ra',
      dataIndex: 'quantity',
      render: (text) => `${text.toLocaleString()}`,
    },
    {
      title: 'Số lượng vé đã bán',
      dataIndex: 'soldQuantity',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="font-bold text-2xl">Quản lý danh sách vé</h1>
          <Button type="primary" onClick={handleOpenCreate}>
            Thêm vé mới
          </Button>
        </div>
        <Modal
          title={isEditMode ? 'Cập nhật vé' : 'Tạo vé mới'}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
          destroyOnClose
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Loại vé"
              name="type"
              rules={[{ required: true, message: 'Vui lòng chọn loại vé!' }]}
            >
              <Select
                placeholder="Chọn loại vé"
                options={[
                  { label: ExtractNameTicketType('VIP'), value: 'VIP' },
                  { label: ExtractNameTicketType("GENERAL"), value: 'GENERAL' },
                  { label: ExtractNameTicketType("VIP_PLUS"), value: 'VIP_PLUS' },
                  { label: ExtractNameTicketType("VIP_PLATINUM"), value: 'VIP_PLATINUM' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Giá vé"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
            >
              <Input type="number" min={0} />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <Input type="number" min={0} />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setOpenModal(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditMode ? 'Cập nhật' : 'Tạo'}
              </Button>
            </div>
          </Form>
        </Modal>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table columns={columns} dataSource={tickets} rowKey="_id" />
          </div>
        )}
      </div>
    </>
  );
}
