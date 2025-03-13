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
      label: "Thông tin sự kiện",
      children: eventContent, 
    },
    {
      key: "2",
      label: "Quản lý vé của sự kiện",
      children: ticketContent, 
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Tab;
