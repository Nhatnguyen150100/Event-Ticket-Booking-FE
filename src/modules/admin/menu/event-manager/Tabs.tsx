import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface TabProps {
  eventContent: React.ReactNode;
  ticketContent: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ eventContent, ticketContent }) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Event",
      children: eventContent, 
    },
    {
      key: "2",
      label: "Ticket",
      children: ticketContent, 
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Tab;
