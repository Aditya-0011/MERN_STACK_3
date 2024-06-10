import { useState, useEffect } from "react";

import { Flex } from "antd";

import UserCard from "./UserCard.jsx";
import Loading from "./Loading.jsx";

export default function CardRender() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (userId) => {
    setLoading(true);
    setUsers(users.filter((user) => user.id !== userId));
    setLoading(false);
  };

  const handleUpdate = (id, name, email, phone, website) => {
    setLoading(true);
    const user = users.find((user) => user.id === id);
    if (user) {
      const updatedUser = {
        ...user,
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        website: website || user.website,
      };
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loading />
        </div>
      )}
      <Flex
        wrap
        gap="middle"
        style={{
          justifyContent: "left",
          margin: "30px",
          padding: "30px",
        }}
      >
        {users.map((user, i) => (
          <UserCard
            key={i}
            user={user}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Flex>
    </>
  );
}
