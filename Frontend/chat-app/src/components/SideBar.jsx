import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
} from "@mui/material";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //   const filteredOptions=showOnlineOnly?users.filter((user)=>)

  return (
    <aside
      style={{
        height: "100%",
        width: "20rem",
        // lg: { width: "18rem" },
        borderRight: "1px solid #D1D5DB",
        display: "flex",
        // flexDirection: "column",
        // transition: "all 200ms",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #D1D5DB",
          width: "100%",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Users style={{ width: "1.5rem", height: "1.5rem" }} />
          <span style={{ fontWeight: "500", display: ["none", "block"] }}>
            Contacts
          </span>
        </div>
        <div
          style={{
            marginTop: "0.75rem",
            display: ["none", "flex"],
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {/* <label
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              style={{
                width: "1rem",
                height: "1rem",
              }}
            />
            <span style={{ fontSize: "0.875rem" }}>Show online only</span>
          </label> */}

          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => setSelectedUser(user)}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent="SS"
                >
                  <Avatar src={user.profilePhoto} alt={user.fullName} />
                </Badge>
              </ListItemAvatar>
              <ListItemText primary={user.fullName} />
            </ListItem>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

// import { useEffect, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { Users } from "lucide-react";

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
//     useChatStore();

//   const { onlineUsers } = [];
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   const filteredUsers = showOnlineOnly
//     ? users.filter((user) => onlineUsers.includes(user._id))
//     : users;

//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           {/* <span className="text-xs text-zinc-500">
//             ({onlineUsers.length - 1} online)
//           </span> */}
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {filteredUsers.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             // className={`
//             //   w-full p-3 flex items-center gap-3
//             //   hover:bg-base-300 transition-colors
//             //   ${
//             //     selectedUser?._id === user._id
//             //       ? "bg-base-300 ring-1 ring-base-300"
//             //       : ""
//             //   }
//             // `}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img
//                 src={user.profilePic || "/avatar.png"}
//                 alt={user.name}
//                 className="size-12 object-cover rounded-full"
//               />
//               {/* {onlineUsers.includes(user._id) && (
//                 <span
//                   className="absolute bottom-0 right-0 size-3 bg-green-500
//                   rounded-full ring-2 ring-zinc-900"
//                 />
//               )} */}
//             </div>

//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-zinc-400">
//                 {/* {onlineUsers.includes(user._id) ? "Online" : "Offline"} */}
//               </div>
//             </div>
//           </button>
//         ))}

//         {filteredUsers.length === 0 && (
//           <div className="text-center text-zinc-500 py-4">No online users</div>
//         )}
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;
