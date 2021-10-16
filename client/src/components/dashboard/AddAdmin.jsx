import React, { useEffect, useState } from "react";
import { allAdmin, handleAddAdmin, handleDeleteAdmin } from "../../services/adminService";
import { ImUser, ImUserMinus } from "react-icons/im";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddAdmin = () => {
  const user = useSelector(state => state.user.user);
  const [newAdminEmail, setNewAdminEmail] = useState({ email: "" });
  const [admins, setAdmins] = useState([]);

  const submit = async e => {
    e.preventDefault();
    const res = await handleAddAdmin(newAdminEmail);
    allAdmin().then(res => setAdmins(res.reverse()));
    res.status === 201 && toast.success(res.message);
    res.status === 409 && toast.error(res.message);
  };

  const deleteAdmin = async id => {
    const res = await handleDeleteAdmin(id);
    if (res.status === 200) {
      toast.info(res.message);
      allAdmin().then(res => setAdmins(res.reverse()));
    }
  };

  useEffect(() => {
    allAdmin().then(res => setAdmins(res.reverse()));
  }, []);

  return (
    <div className="flex gap-8 p-5 pt-10">
      <table className="table-auto w-2/4 border-collapse border border-primary">
        <thead>
          <tr>
            <th className="border border-primary">Admin List</th>
            <th className="border border-primary">Status</th>
            <th className="border border-primary">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {admins.map(admin => (
            <tr className="" key={admin._id}>
              <td
                className={`border border-primary ${
                  user?.email === admin?.email && "text-primary"
                }`}
              >
                {admin.email}
              </td>
              <td className="border border-primary">
                {admin.password ? "Registered" : "Not registered"}
              </td>
              <td className="border border-primary text-danger text-2xl cursor-pointer">
                {user.email === admin.email ? (
                  <ImUser className="mx-auto w-full" />
                ) : (
                  <ImUserMinus onClick={() => deleteAdmin(admin._id)} className="mx-auto w-full" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form method="POST" onSubmit={submit} className="flex gap-5 w-2/4 flex-col">
        <input
          type="email"
          name=""
          id=""
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          defaultValue={newAdminEmail.email}
          onChange={e => setNewAdminEmail({ email: e.target.value })}
          placeholder="New admin's Email"
          className="py-2 text-xl px-4 ring-primary bg-light_gray rounded-md outline-none focus:ring-2"
        />
        <input
          type="submit"
          value="Add"
          className="py-1 w-2/4 mx-auto rounded-md bg-primary text-light hover:bg-secondary cursor-pointer shadow hover:shadow-lg uppercase font-bold text-sm"
        />
      </form>
    </div>
  );
};

export default AddAdmin;
