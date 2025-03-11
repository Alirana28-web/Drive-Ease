import { AnimatePresence , motion} from "framer-motion";
import { BsPerson } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export const UsersList = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <p className="text-red-500">No users found.</p>;
  }

  return (
    <motion.div>
      <h3 className="text-xl font-semibold text-indigo-800 mb-4">
        Registered Users ({data.length})
      </h3>
      <motion.ul className="space-y-4">
        <AnimatePresence>
          {data.map((user) => (
            <motion.li
              key={user._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <BsPerson className="text-indigo-600" size={20} />
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdEmail className="text-indigo-600" size={20} />
                  <span>{user.email}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

