import { useEffect, useState } from "react";

import { Form, Input, Modal } from "antd";

export default function UserModel({ user, openModel, onClose, onUpdate }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    onUpdate(user.id, values.name, values.email, values.phone, values.website);
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (openModel) {
      setOpen(true);
    }
  }, [openModel]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Modal
        open={open}
        title="Update User"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => {
          setOpen(false);
          onClose();
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
            style={{ width: "100%", marginTop: "20px", padding: "0 20px" }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          style={{ fontWeight: "bold", padding: "10px" }}
          initialValue={user.name}
        >
          <Input defaultValue={user.name} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          style={{ fontWeight: "bold", padding: "10px" }}
          initialValue={user.email}
        >
          <Input defaultValue={user.email} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
          style={{ fontWeight: "bold", padding: "10px" }}
          initialValue={user.phone}
        >
          <Input defaultValue={user.phone} />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: "Please input your website!",
            },
          ]}
          style={{ fontWeight: "bold", padding: "10px" }}
          initialValue={user.website}
        >
          <Input defaultValue={user.website} />
        </Form.Item>
      </Modal>
    </div>
  );
}
