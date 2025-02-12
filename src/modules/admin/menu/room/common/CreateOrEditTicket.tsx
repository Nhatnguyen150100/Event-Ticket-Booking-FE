import { Button, message, Spin, Table, TableProps } from "antd";
import * as React from "react";
import TicketService from "../../../../../services/ticketService"; 
import { useParams } from "react-router-dom";
import { ITicket } from "../../../../../types/ticket.types"; 


export default function CreateOrEditTicket() {

  const { id: eventId } = useParams<{ id: string }>(); 
  
  const [loading, setLoading] = React.useState(false);
  const [tickets, setTickets] = React.useState<ITicket[]>([]); 

  React.useEffect(() => {
    if (eventId) {
      fetchTickets(eventId);
    }
  }, [eventId]);

  const fetchTickets = async (eventId: string) => {
    try {
      setLoading(true);
      const rs = await TicketService.getAllTickets(eventId);
      console.log("API Response:", rs.data);
  
      setTickets(rs.data.content || []); 
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  console.log(tickets);
  


  const columns: TableProps["columns"] = [
    {
      title: "Number",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `${price.toLocaleString()}`, 
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Delete",
      key: "deleteEvent",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record._id)}>
        Delete
      </Button>
      ),
    },
  ];

  const handleDelete = async (ticketId: string) => {
    try {
      setLoading(true);
      await TicketService.deleteTicket(ticketId);
      message.success("Deleted successfully!");
  
      fetchTickets(eventId as string); 
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="font-bold text-2xl">List Ticket Manager</h1>
          <Button type="primary">Add New Ticket</Button>
        </div>
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
