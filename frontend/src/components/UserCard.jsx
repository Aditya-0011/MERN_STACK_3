import { useState } from "react";

import {
  EditOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DeleteFilled,
  HeartFilled,
} from "@ant-design/icons";

import { Card, Flex } from "antd";
import { ConfigProvider } from "antd";

import UserModel from "./UserModal.jsx";

const { Meta } = Card;

export default function UserCard({ user, onDelete, onUpdate }) {
  const [like, setLike] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleModalDisplay = () => {
    setOpenModel(!openModel);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Card: {
              actionsBg: "#f0f2f5",
              tabsMarginBottom: 12,
            },
          },
        }}
      >
        <Card
          key={1}
          style={{ width: 380, height: "auto" }}
          cover={
            <img
              alt="example"
              src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}&mouth=smile&eyes=default&eyebrows=default`}
              style={{ height: 200, backgroundColor: "#f0f2f5" }}
            />
          }
          actions={[
            like ? (
              <HeartFilled
                key="like"
                style={{ color: "red", fontSize: 20 }}
                onClick={handleLike}
              />
            ) : (
              <HeartOutlined
                key="like"
                style={{ color: "red", fontSize: 20 }}
                onClick={handleLike}
              />
            ),
            <EditOutlined
              key="edit"
              style={{ fontSize: 20 }}
              onClick={handleModalDisplay}
            />,
            <DeleteFilled
              key="delete"
              style={{ fontSize: 20 }}
              onClick={handleDelete}
            />,
          ]}
        >
          <Meta
            title={<h3 style={{ lineHeight: "18px" }}>{user.name}</h3>}
            description={
              <Flex gap="middle" vertical>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <MailOutlined
                    style={{
                      paddingRight: "5px",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  />{" "}
                  {user.email}
                </span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <PhoneOutlined
                    style={{
                      paddingRight: "5px",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  />{" "}
                  {user.phone}
                </span>
                <span style={{ fontSize: 14, color: "#334155" }}>
                  <GlobalOutlined
                    style={{
                      paddingRight: "5px",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  />{" "}
                  http://{user.website}
                </span>
              </Flex>
            }
          />
        </Card>
        <UserModel
          user={user}
          openModel={openModel}
          onClose={handleModalDisplay}
          onUpdate={onUpdate}
        />
      </ConfigProvider>
    </>
  );
}
